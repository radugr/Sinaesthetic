/**
 * Drawing on canvas
 */
var draw = (function() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	context.lineWidth = 1;
	
	var positionX, positionY, nextPositionX, nextPositionY, drawing, currentColor, direction, speed;

	function initialize() {
		positionX = 0;
		positionY = 0;
		nextPositionX = 0;
		nextPositionY = 0;
		drawing = false;
		currentColor = "black";
		direction;
		context.clearRect(0,0,canvas.width,canvas.height);
	}
	
	function move () {
		
		switch (direction) {
			case "left":
				nextPositionX = positionX - 1;
				break;
			case "right":
				nextPositionX = positionX + 1;
				break;
			case "up":
				nextPositionY = positionY - 1;
				break;
			case "down":
				nextPositionY = positionY + 1;
				break;
			default:
				//nothing
				break;
		} 
		
		//normalize values - keep drawing in the canvas
		nextPositionX = nextPositionX % canvas.width;
		nextPositionY = nextPositionY % canvas.height;
		
		nextPositionX = nextPositionX < 0 ? 0 : nextPositionX;
		nextPositionY = nextPositionY < 0 ? 0 : nextPositionY;
						
	}
	
	function stroke() {
		
		move();
		
		// do the actual drawing
		context.beginPath();
		context.moveTo(positionX,positionY);
		context.lineTo(nextPositionX,nextPositionY);
		context.strokeStyle = currentColor;
		context.stroke();
		context.closePath();
		
		// update position
		positionX = nextPositionX;
		positionY = nextPositionY;
		
		// continue drawing until stop is called
		drawing && window.requestAnimationFrame(stroke);
	}	
	
	function strokeTo(x,y) {
		context.beginPath();
		context.moveTo(positionX,positionY);
		context.lineTo(x,y);
		context.strokeStyle = currentColor;
		context.stroke();
		context.closePath();
		
		positionX = x;
		positionY = y;
	}
	
	//TODO: show a cursor
	function showCursor () {
		context.moveTo(positionX,positionY);
		window.requestAnimationFrame(showCursor);
	}
	
	initialize();
	
	return {
		color : function (color) {
			currentColor = color;
		},
		move : function (dir) {
			direction = dir;
		},
		moveup : function () {
			direction = "up";
		}, 
		movedown : function () {
			direction = "down"; 
		},
		moveleft : function () {
			direction = "left";
		},
		moveright : function () {
			direction = "right";
		},
		gotoposition : function (x, y) {
			positionX = x % canvas.width;
			positionY = y % canvas.height;
		},
		start : function () {
			drawing = true;
			stroke();
			icons.activate("drawing");
		}, 
		stop : function () {
			drawing = false;
			icons.deactivate("drawing");
		}, 
		refresh : function () {
			initialize();
			icons.deactivate("drawing");
		}, 
		stroketo : function (x,y) {
			strokeTo(x, y);
		}
	};
})()