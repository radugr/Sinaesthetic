var predefined = (function() {

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');	
	
	/** 
	 * Inspired from: http://stackoverflow.com/questions/21180453/olympics-rings-with-javascript-on-html5-canvas 
	 */
	function drawOlympicCircles() {
		// clear canvas first: 
		canvas.width = canvas.width;
		var radius = 150;
		
		// to position in the middle of the painting
		var offsetX = (canvas.width / 2) - 4 * radius;
		var offsetY = (canvas.height / 2) - 2.5 * radius;
		
		var circles = [ {
			color : 'blue',
			x : offsetX + 2 * radius - radius / 2,
			y : offsetY + 2 * radius,
			isTop : true
		}, {
			color : 'black',
			x : offsetX + 4 * radius,
			y : offsetY + 2 * radius,
			isTop : true
		}, {
			color : 'red',
			x : offsetX + 6 * radius + radius / 2,
			y : offsetY + 2 * radius,
			isTop : true
		}, {
			color : 'yellow',
			x : offsetX + 3 * radius - radius / 4,
			y : offsetY + 3 * radius,
			isTop : false
		}, {
			color : 'green',
			x : offsetX + 5 * radius + radius / 4,
			y : offsetY + 3 * radius,
			isTop : false
		} ];

		function drawArc(context, color, x, y, start, end) {
			if (color !== 'white')
				drawArc(context, 'white', x, y, start, end);

			context.lineWidth = color === 'white' ? 24 : 18;
			context.strokeStyle = color;

			context.beginPath();
			context.arc(x, y, radius, start - Math.PI / 2, end - Math.PI / 2,
					true);
			context.stroke();
		}

		circles.forEach(function(circle) {
			drawArc(context, circle.color, circle.x, circle.y, 0, Math.PI * 2);
		});

		circles.forEach(function(circle) {
			if (circle.isTop) {
				drawArc(context, circle.color, circle.x, circle.y, Math.PI,
						Math.PI * 2 / 3);
				drawArc(context, circle.color, circle.x, circle.y,
						Math.PI * 5 / 3, Math.PI * 4 / 3);
			} else {
				drawArc(context, circle.color, circle.x, circle.y, 0,
						Math.PI / 3);
				drawArc(context, circle.color, circle.x, circle.y,
						Math.PI * 2 / 3, Math.PI / 3);
			}
		});

	};
	
	/**
	 * Inspired from: http://chimera.labs.oreilly.com/books/1234000000770/ch01.html#canvas_graphing_calculator
	 */
	function drawLines () {
		canvas.width = canvas.width;
		var i = 0;
	    axisPos = 1;
	    canvasWidth = canvas.width; // Get the width of the canvas
	    canvasHeight = canvas.height; // Get the height of the canvas

	    // Loop through and draw horizontal/vertical lines at each eighth of the grid
	    // First draw vertical line
	    for (i=0,j=0;i<=canvasWidth;i+=(canvasWidth)/4,j++)
	    {
	    	if (!(j==0) && !(j == 4)) {
	    		context.lineWidth = 3;
	            context.strokeStyle = '#126688';
		        
		        context.beginPath();
		        context.moveTo(i, 0);
		        context.lineTo(i, canvasWidth);
		        context.stroke();
		        context.closePath();
	    	}            
	    }
	    
	    // Then draw horizontal line
	    for (i=0,j=0;i<=canvasWidth;i+=(canvasHeight)/4,j++)
	    {
	    	if (!(j==0) && !(j == 4)) {
	            context.lineWidth = 3;
	            context.strokeStyle = '#126688';
	            
		        context.beginPath();
		        context.moveTo(0, i);
		        context.lineTo(canvasWidth, i);
		        context.stroke();
		        context.closePath();
	    	}
	    }		
		
	}

	return {
		draw : function (thing) {
			switch (thing) {
			case "olympic":
				drawOlympicCircles();
				break;
			case "world":
				
				break;
			
			case "lines":
				drawLines();
				break;
			}
			
			
		}
	};
})();