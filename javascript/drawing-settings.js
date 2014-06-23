/**
 * Handles brush and color selection
 * 
 * 
 */
var drawingSettings = (function () {
	
	var selectedBrush = {type: "square", factor : 45};
	var selectedColor = "black";
	
	var colorListeners = {};
	var brushListeners = {};
	
	function setSelectedColor (color) {
		var colorSelectedCanvas = document.getElementById("colorSelected");
		context = colorSelectedCanvas.getContext("2d");
		selectedColor = color;
		fillBackgroundCanvas(context,color);
	}
	setSelectedColor(selectedColor); // first time init
	
	function setSelectedBrush (brush) {
		var brushSelectedElement = document.getElementById("brushSelected");
		context = brushSelectedElement.getContext("2d");
		selectedBrush = brush;
		if(brush.type == "round") {
			drawCircle(context, selectedBrush.factor);
		} else if ( brush.type == "square") {
			drawSquare(context, selectedBrush.factor);
		}		
	}
	setSelectedBrush(selectedBrush); // first time init
	
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
	
	function addColorPickListener (element,color,name) {
		var listener = function () {
			setSelectedColor(color);
		};
		element.addEventListener("click", listener);
		colorListeners[name] = listener;
	}
	
	function addBrushSelectListener(element,brush,name) {
		var listener = function () {
			setSelectedBrush(brush);
		};
		
		element.addEventListener("click", listener);
		brushListeners[name] = listener;
	}
	
	function initBrushCanvases () {
		var context;
		
		// WARN: brushes have been inverted - circle is square 
		// init round brush 
		var brushSquare1 = document.getElementById("brushSquare1");
		context = brushSquare1.getContext("2d");
		drawCircle(context, brushSquare1.width / 8);
		addBrushSelectListener(brushSquare1,{type:"round",factor:brushSquare1.width / 8}, "small round");
		
		
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
		addBrushSelectListener(brushSquare4,{type:"round",factor:brushSquare4.width / 4}, "big round");
		
		// init square brush 
		var brushCircle1 = document.getElementById("brushCircle1");
		context = brushCircle1.getContext("2d");
		drawSquare(context, brushCircle1.width / 6);
		addBrushSelectListener(brushCircle1,{type:"square",factor:brushCircle1.width / 6}, "small square");
		
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
		addBrushSelectListener(brushCircle4,{type:"square",factor:brushCircle4.width / 2}, "big square");
	}
	
	function initColorCanvases () {
		var context,color;
		
		// init colors
		var brushColor1 = document.getElementById("brushColor1");
		context = brushColor1.getContext("2d");
		color = "#ffffff";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor1,color,"white");		
		
		var brushColor2 = document.getElementById("brushColor2");
		context = brushColor2.getContext("2d");
		color = "#ffccc9";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor2,color,"pink");		
		
		
		var brushColor3 = document.getElementById("brushColor3");
		context = brushColor3.getContext("2d");
		color = "#ffce93";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor3,color);
		
		var brushColor4 = document.getElementById("brushColor4");
		context = brushColor4.getContext("2d");
		color = "#fffc9e";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor4,color,"yellow");
	
		var brushColor5 = document.getElementById("brushColor5");
		context = brushColor5.getContext("2d");
		color = "#efefef";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor5,color,"light grey");
		
		var brushColor6 = document.getElementById("brushColor6");
		context = brushColor6.getContext("2d");
		color = "#fd6864";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor6,color,"strong pink");
		
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
		addColorPickListener(brushColor9,color,"grey");
		
		var brushColor10 = document.getElementById("brushColor10");
		context = brushColor10.getContext("2d");
		color = "#fe0000";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor10,color,"red");
		
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
		color = "#330001";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor22,color);
		
		var brushColor23 = document.getElementById("brushColor23");
		context = brushColor23.getContext("2d");
		color = "#643403";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor23,color);
		
		var brushColor24 = document.getElementById("brushColor24");
		context = brushColor24.getContext("2d");
		color = "#343300";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor24,color);
		
		var brushColor25 = document.getElementById("brushColor25");
		context = brushColor25.getContext("2d");
		color = "#013300";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor25,color);
		
		var brushColor26 = document.getElementById("brushColor26");
		context = brushColor26.getContext("2d");
		color = "#003532";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor26,color);
		
		var brushColor27 = document.getElementById("brushColor27");
		context = brushColor27.getContext("2d");
		color = "#010066";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor27,color);
		
		var brushColor28 = document.getElementById("brushColor28");
		context = brushColor28.getContext("2d");
		color = "#340096";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor28,color);
		
		var brushColor29 = document.getElementById("brushColor29");
		context = brushColor29.getContext("2d");
		color = "#036400";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor29,color);
		
		var brushColor30 = document.getElementById("brushColor30");
		context = brushColor30.getContext("2d");
		color = "#34696d";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor30,color);
		
		var brushColor31 = document.getElementById("brushColor31");
		context = brushColor31.getContext("2d");
		color = "#00009b";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor31,color);
		
		var brushColor32 = document.getElementById("brushColor32");
		context = brushColor32.getContext("2d");
		color = "#303498";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor32,color);
		
		var brushColor33 = document.getElementById("brushColor33");
		context = brushColor33.getContext("2d");
		color = "#009901";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor33,color);
		
		var brushColor34 = document.getElementById("brushColor34");
		context = brushColor34.getContext("2d");
		color = "#329a9d";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor34,color);
		
		var brushColor35 = document.getElementById("brushColor35");
		context = brushColor35.getContext("2d");
		color = "#3531ff";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor35,color);
		
		var brushColor36 = document.getElementById("brushColor36");
		context = brushColor36.getContext("2d");
		color = "#340096";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor36,color);
		
		var brushColor37 = document.getElementById("brushColor37");
		context = brushColor37.getContext("2d");
		color = "#32cb00";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor37,color);
		
		var brushColor38 = document.getElementById("brushColor38");
		context = brushColor38.getContext("2d");
		color = "#00d2cb";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor38,color);
		
		var brushColor39 = document.getElementById("brushColor39");
		context = brushColor39.getContext("2d");
		color = "#3166ff";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor39,color);
		
		var brushColor40 = document.getElementById("brushColor40");
		context = brushColor40.getContext("2d");
		color = "#6434fc";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor40,color);
		
		var brushColor41 = document.getElementById("brushColor41");
		context = brushColor41.getContext("2d");
		color = "#34ff34";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor41,color);
		
		var brushColor42 = document.getElementById("brushColor42");
		context = brushColor42.getContext("2d");
		color = "#68cbd0";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor42,color);
		
		var brushColor43 = document.getElementById("brushColor43");
		context = brushColor43.getContext("2d");
		color = "#34cdf9";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor43,color);
		
		var brushColor44 = document.getElementById("brushColor44");
		context = brushColor44.getContext("2d");
		color = "#6665cd";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor44,color);
		
		var brushColor45 = document.getElementById("brushColor45");
		context = brushColor45.getContext("2d");
		color = "#67fd9a";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor45,color);
		
		var brushColor46 = document.getElementById("brushColor46");
		context = brushColor46.getContext("2d");
		color = "#96fffb";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor46,color);
		
		var brushColor47 = document.getElementById("brushColor47");
		context = brushColor47.getContext("2d");
		color = "#cbcefb";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor47,color);
		
		var brushColor48 = document.getElementById("brushColor48");
		context = brushColor48.getContext("2d");
		color = "#9698ed";
		fillBackgroundCanvas(context,color);
		addColorPickListener(brushColor48,color);
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
			console.log({type : selectedBrush.type, factor: selectedBrush.factor*0.2});
			return {type : selectedBrush.type, factor: selectedBrush.factor*0.2};
		}, 
		getColor : function () {
			return selectedColor;
		},
		setBrushType : function (type) {
			if (brushListeners[type]) {
				brushListeners[type]();
			}
		},
		setBrushColor : function (color) {
			if (colorListeners[color]){
				colorListeners[color]();
			}
		}
	};
	
})();