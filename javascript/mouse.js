/**
 * Use the mouse to draw on canvas
 * - enabled by clicking on pen tool
 */
var mouseDrawing = (function() {

	var isDrawing = false;
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	var isMouseDown = false;
		
	var previousMousePosition = {
		x : -1,
		y : -1
	};

	var currentMousePosition = {
		x : -1,
		y : -1
	};

	function init() {
		isMouseDown = false;
		previousMousePosition.x = -1;
		previousMousePosition.y = -1;
		currentMousePosition.x = -1;
		currentMousePosition.y = -1;
	}
	
	function updateMousePosition(event){
		previousMousePosition.x = currentMousePosition.x;
		previousMousePosition.y = currentMousePosition.y;
		currentMousePosition.x = event.clientX - canvas.parentElement.offsetLeft;
		currentMousePosition.y = event.clientY - canvas.parentElement.offsetTop;
	}

	function draw() {
		context.beginPath();
		context.moveTo(currentMousePosition.x, currentMousePosition.y);
		context.lineTo(previousMousePosition.x, previousMousePosition.y);
		context.strokeStyle = drawingSettings.getColor();
		context.lineCap = drawingSettings.getCurrentBrush().type;
		context.lineWidth = drawingSettings.getCurrentBrush().factor;
		context.stroke();
		context.closePath();
	}

	function onmove(event) {
		updateMousePosition(event);
		if (isMouseDown && (previousMousePosition.x + previousMousePosition.y > 0)) {
			draw();
		}
	}

	function onbuttondown(event) {
		isMouseDown = true;
		updateMousePosition(event);
	}
	
	function onbuttonup(event) {
		init();
	}

	function attachHandlers() {
		canvas.addEventListener("mousemove", onmove);
		canvas.addEventListener("mousedown", onbuttondown);
		canvas.addEventListener("mouseup", onbuttonup);
	}

	function detachHandlers() {
		canvas.removeEventListener("mousemove", onmove);
		canvas.removeEventListener("mousedown", onbuttondown);
		canvas.removeEventListener("mouseup", onbuttonup);
	}
	
	function start() {
		init();
		attachHandlers();
		isDrawing = true;
	}
	
	function stop() {
		detachHandlers();
		isDrawing = false;
	}
	
	// attach mouse drawing to onclick of drawing icon 	
	document.getElementById("drawingbutton").addEventListener("click", function() {
		
		if(!isDrawing) {
			start();
			icons.activate("drawing");
			persist.hide();
			drawingSettings.show();
		} else {
			stop();
			drawingSettings.hide();
			icons.deactivate("drawing");
		}
		
	});
	
	return {
		start : function() {
			start();
		},
		stop : function() {
			stop();
		}
	};
})();