/**
 * Handles brush and color selection
 * 
 * 
 */
var drawingSettings = (function () {
	
	var selectedBrush = {type: "square", factor : 15};
	var selectedColor = "black";
	
	function setSelectedColor (color) {
		var colorSelectedCanvas = document.getElementById("colorSelected");
		context = colorSelectedCanvas.getContext("2d");
		selectedColor = color;
		fillBackgroundCanvas(context,color);
	}
	
	function setSelectedBrush (brush) {
		var brushSelectedElement = document.getElementById("brushSelected");
		context = brushSelectedElement.getContext("2d");
		selectedBrush = brush;
		if(brush.type == "circle") {
			drawCircle(context, selectedBrush.factor);
		} else if ( brush.type == "square") {
			drawSquare(context, selectedBrush.factor);
		}		
	}
		
	function drawCircle (context,radius) {
		context.clearRect(0,0,context.canvas.width,context.canvas.height);
		context.beginPath();
		context.fillStyle = "#126688";
		context.arc(context.canvas.width * 0.5, context.canvas.height * 0.5, radius, 0, 2*Math.PI, false);
		context.fill();
		context.closePath();
	}
	
	function drawSquare (context,width) {
		context.clearRect(0,0,context.canvas.width,context.canvas.height);
		context.fillStyle = "#126688";
		context.fillRect(context.canvas.width * 0.5 - width * 0.5, context.canvas.height * 0.5 - width * 0.5, width, width);
	}
	
	function fillBackgroundCanvas(context,color) {
		context.clearRect(0,0,context.canvas.width,context.canvas.height);
		context.fillStyle = color;
		context.fillRect(0,0,context.canvas.width,context.canvas.height);
	}
	
	function addColorPickListener (element,color) {
		element.addEventListener("click", function () {
			setSelectedColor(color);
		});
	}
	
	function addBrushSelectListener(element,brush) {
		element.addEventListener("click", function () {
			setSelectedBrush(brush);
		});
	}
	
	function initBrushCanvases () {
		var context;
		
		// WARN: brushes have been inverted - circle is square 
		// init round brush 
		var brushSquare1 = document.getElementById("brushSquare1");
		context = brushSquare1.getContext("2d");
		drawCircle(context, brushSquare1.width / 8);
		addBrushSelectListener(brushSquare1,{type:"round",factor:brushSquare1.width / 8});
		
		var brushSquare2 = document.getElementById("brushSquare2");
		context = brushSquare2.getContext("2d");
		drawCircle(context, brushSquare2.width / 6.5);
		addBrushSelectListener(brushSquare2,{type:"round",factor:brushSquare2.width / 6.5});
		
		var brushSquare3 = document.getElementById("brushSquare3");
		context = brushSquare3.getContext("2d");
		drawCircle(context, brushSquare1.width / 5);
		addBrushSelectListener(brushSquare3,{type:"round",factor:brushSquare1.width / 5});
		
		var brushSquare4 = document.getElementById("brushSquare4");
		context = brushSquare4.getContext("2d");
		drawCircle(context, brushSquare1.width / 4);
		addBrushSelectListener(brushSquare4,{type:"round",factor:brushSquare4.width / 4});
		
		// init square brush 
		var brushCircle1 = document.getElementById("brushCircle1");
		context = brushCircle1.getContext("2d");
		drawSquare(context, brushCircle1.width / 6);
		addBrushSelectListener(brushCircle1,{type:"square",factor:brushCircle1.width / 6});
		
		var brushCircle2 = document.getElementById("brushCircle2");
		context = brushCircle2.getContext("2d");
		drawSquare(context, brushCircle2.width / 4);
		addBrushSelectListener(brushCircle2,{type:"square",factor:brushCircle2.width / 3});
			
		var brushCircle3 = document.getElementById("brushCircle3");
		context = brushCircle3.getContext("2d");
		drawSquare(context, brushCircle3.width / 3);
		addBrushSelectListener(brushCircle3,{type:"square",factor:brushCircle3.width / 3});
	
		var brushCircle4 = document.getElementById("brushCircle4");
		context = brushCircle4.getContext("2d");
		drawSquare(context, brushCircle4.width / 2);
		addBrushSelectListener(brushCircle4,{type:"square",factor:brushCircle4.width / 2});
	}
	
	function initColorCanvases () {
		var context,color;
		
		// init colors
		var brushColor1 = document.getElementById("brushColor1");
		context = brushColor1.getContext("2d");
		color = "#ffffff";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor1,color);
		
		var brushColor2 = document.getElementById("brushColor2");
		context = brushColor2.getContext("2d");
		color = "#ffccc9";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor2,color);		
		
		var brushColor3 = document.getElementById("brushColor3");
		context = brushColor3.getContext("2d");
		color = "#ffce93";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor3,color);
		
		var brushColor4 = document.getElementById("brushColor4");
		context = brushColor4.getContext("2d");
		color = "#fffc9e";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor4,color);
		
		var brushColor5 = document.getElementById("brushColor5");
		context = brushColor5.getContext("2d");
		color = "#efefef";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor5,color);
		
		var brushColor6 = document.getElementById("brushColor6");
		context = brushColor6.getContext("2d");
		color = "#fd6864";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor6,color);
		
		var brushColor7 = document.getElementById("brushColor7");
		context = brushColor7.getContext("2d");
		color = "#fe996b";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor7,color);
		
		var brushColor8 = document.getElementById("brushColor8");
		context = brushColor8.getContext("2d");
		color = "#fffe65";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor8,color);
		
		var brushColor9 = document.getElementById("brushColor9");
		context = brushColor9.getContext("2d");
		color = "#c0c0c0";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor9,color);
		
		var brushColor10 = document.getElementById("brushColor10");
		context = brushColor10.getContext("2d");
		color = "#fe0000";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor10,color);
		
		var brushColor11 = document.getElementById("brushColor11");
		context = brushColor11.getContext("2d");
		color = "#f8a102";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor11,color);
		
		var brushColor12 = document.getElementById("brushColor12");
		context = brushColor12.getContext("2d");
		color = "#ffcc67";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor12,color);
		
		var brushColor13 = document.getElementById("brushColor13");
		context = brushColor13.getContext("2d");
		color = "#9b9b9b";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor13,color);
		
		var brushColor14 = document.getElementById("brushColor14");
		context = brushColor14.getContext("2d");
		color = "#cb0000";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor14,color);
		
		var brushColor15 = document.getElementById("brushColor15");
		context = brushColor15.getContext("2d");
		color = "#f56b00";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor15,color);
		
		var brushColor16 = document.getElementById("brushColor16");
		context = brushColor16.getContext("2d");
		color = "#ffcb2f";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor16,color);
		
		var brushColor17 = document.getElementById("brushColor17");
		context = brushColor17.getContext("2d");
		color = "#656565";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor17,color);
		
		var brushColor18 = document.getElementById("brushColor18");
		context = brushColor18.getContext("2d");
		color = "#9a0000";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor18,color);
		
		var brushColor19 = document.getElementById("brushColor19");
		context = brushColor19.getContext("2d");
		color = "#ce6301";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor19,color);
		
		var brushColor20 = document.getElementById("brushColor20");
		context = brushColor20.getContext("2d");
		color = "#cd9934";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor20,color);
		
		var brushColor21 = document.getElementById("brushColor21");
		context = brushColor21.getContext("2d");
		color = "#343434";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor21,color);
		
		var brushColor22 = document.getElementById("brushColor22");
		context = brushColor22.getContext("2d");
		color = "#343434";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor22,color);
		
		var brushColor23 = document.getElementById("brushColor23");
		context = brushColor23.getContext("2d");
		color = "#343434";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor23,color);
		
		var brushColor24 = document.getElementById("brushColor24");
		context = brushColor24.getContext("2d");
		color = "#343434";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor24,color);
	}
		
	initBrushCanvases();
	initColorCanvases();	
	
	function show() {
		document.getElementById("drawingSettings").style.display = "block";
	}
	
	function hide() {
		document.getElementById("drawingSettings").style.display = "none";
	}
	
	return {
		show: function () {
			show();
		},
		hide: function () {
			hide();
		},
		getCurrentBrush : function () {
			return selectedBrush;
		}, 
		getColor : function () {
			return selectedColor;
		}
	};
	
})();