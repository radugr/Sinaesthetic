/**
 * Drawing on canvas ( by sound )
 */
var draw = (function() {
	
	var isStroking = false;
	
	var canvas = document.getElementById("canvas");
	canvas.width = canvas.parentElement.getBoundingClientRect().width;
	canvas.height = canvas.parentElement.getBoundingClientRect().height;
	
	var drawingcontext = canvas.getContext("2d");
	
	var sonarcanvas = document.getElementById("canvas-top");
	sonarcanvas.width = sonarcanvas.parentElement.getBoundingClientRect().width;
	sonarcanvas.height = sonarcanvas.parentElement.getBoundingClientRect().height;
	
	var sonarcanvascontext = sonarcanvas.getContext("2d");
	sonarcanvascontext.lineWidth = 2;
	
	var initialPosition = {
		x : sonarcanvas.width / 2,
		y : sonarcanvas.height / 2
	}
	
	var currentPosition = {
		x : initialPosition.x,
		y : initialPosition.y
	}
	
	function drawCross(x,y) {
		
		sonarcanvascontext.beginPath();
		sonarcanvascontext.moveTo(x-20,y);
		sonarcanvascontext.lineTo(x+20,y);
		sonarcanvascontext.stroke();
		sonarcanvascontext.closePath();
		
		sonarcanvascontext.beginPath();
		sonarcanvascontext.moveTo(x,y-20);
		sonarcanvascontext.lineTo(x,y+20);
		sonarcanvascontext.stroke();
		sonarcanvascontext.closePath();
		
	}
	
	function moveBrush(deltaX,deltaY) {
		
		var nextX = currentPosition.x + deltaX;
		var nextY = currentPosition.y + deltaY;
		
		clearCanvas();
		
		drawCross(nextX,nextY);
		
		if(isStroking){
			// stroke on the underlying canvas
			drawingcontext.strokeStyle = drawingSettings.getColor();
			drawingcontext.lineCap = drawingSettings.getCurrentBrush().type;
			drawingcontext.lineWidth = drawingSettings.getCurrentBrush().factor;
			drawingcontext.beginPath();
			drawingcontext.moveTo(currentPosition.x,currentPosition.y);
			drawingcontext.lineTo(nextX,nextY);
			drawingcontext.stroke();
			drawingcontext.closePath();
		}		
		
		currentPosition.x = nextX;
		currentPosition.y = nextY;
	}
	
	
	
	function clearCanvas() {
		sonarcanvas.width = sonarcanvas.width;
	}	
	
	function clearDrawingCanvas() {
		canvas.width = canvas.width;
	}
	
	//attach to refresh button
	document.getElementById("refreshbutton").addEventListener("click", function() {
		icons.activate("refresh");
		clearDrawingCanvas();
		setTimeout(function(){
			icons.deactivate("refresh");
		},200);
	});
	
	//TODO: create a sound when moving the brush
	function move(direction) {
		var resolution = 10;
		sound.createPing();
		switch (direction) {
			case "up":
				moveBrush(0,-resolution);
				break;
			case "down":
				moveBrush(0,resolution);
				break;
			case "left":
				moveBrush(-resolution,0);
				break;
			case "right":
				moveBrush(resolution,0);
				break;
		}
	}
	
	function init() {
		moveBrush(0,0);		
	}
	
	return {
		color : function (color) {
			currentColor = color;
		},
		moveup : function () {
			move("up");
		}, 
		movedown : function () {
			move("down"); 
		},
		moveleft : function () {
			move("left");
		},
		moveright : function () {
			move("right");
		},
		move : function (direction) {
			move(direction);
		},
		start : function () {			
			icons.activate("drawing")
			init();
			drawingSettings.show();
		}, 
		stop : function () {
			icons.deactivate("drawing");
			drawingSettings.hide();
		}, 
		refresh : function () {
			clearDrawingCanvas();
		}, 
		stroke : function () {
			isStroking = isStroking ? false : true; 
		}
	};
})()