/**
 * Creates sound in the browser
 * 
 * It reads the canvas as input and replays a sound from it
 * 
 * We can read the canvas using two methods
 * 	1. using toDataURL - transforms the canvas to PNG 
 *  2. using getImageData
 * 
 * 
 * Sound can be created by transforming the data from the canvas into a matrix
 * 	*  
 * 	* 
 *  * 
 *   
 * Sound can be replayed based on a resolution to allow the user to adjust with the method. 
 * 
 * based on 	
 * 		http://flippinawesome.org/2013/10/28/audio-synthesis-in-javascript/
 * 		http://bucephalus.org/text/CanvasHandbook/CanvasHandbook.html#examples-of-pixel-manipulation
 */
var sound = (function() {
		
	
	var audio = new window.webkitAudioContext();;
	var playing; // used for stoping play
	var resolution;
	
	var canvas = document.getElementById("canvas");
	var sonarcanvas = document.getElementById("canvas-top");
	var context = sonarcanvas.getContext("2d");
	
	var BORDER_SIGNAL_FREQ = 2349.32;
	var AREA_DRAWN_FREQ = 392.00;
	
	context.lineWidth = 1;
	sonarcanvas.width = sonarcanvas.parentElement.getBoundingClientRect().width;
	sonarcanvas.height = sonarcanvas.parentElement.getBoundingClientRect().height;
	
	var previousRectanglePosition = {};
	
	//TODO: signal reaching bounds
	function moverectangle(position) {
		clearCanvas();
		var x,y,w;
		
		w = Math.sqrt(resolution);
		x = Math.floor((position * w) % sonarcanvas.width);
		y = w * Math.floor((position * w) / sonarcanvas.width);
		
		//console.log(x,y,w);
		context.beginPath();
		context.rect(x,y,w,w);
		context.stroke();

		var currentRectanglePosition = {
			x : x,
			y : y,
			width : w,
			height : w
		};
		
		readPaintingArea(currentRectanglePosition);
		
		if(currentRectanglePosition.y > previousRectanglePosition.y ) {
			// signal we moved down
			createOscillator(BORDER_SIGNAL_FREQ);
		}
		
		previousRectanglePosition = currentRectanglePosition;
	}
	
	
	/**
	 *	Sample image data representation of an array:
	 *		{
	 *		  width : 256,
	 *		  height: 256,
	 *		  data  : [ 0,0,0,255,   1,0,0,255,   ..., 255,0,0,255,
	 * 		            0,1,0,255,   1,1,0,255,   ..., 255,1,0,255,
	 *		            ...,
	 *		            0,255,0,255, 1,255,0,255, ..., 255,255,0,255 ]
	 *		}	
	 *	where the length of the data array is 4*256*256, i.e. it contains 262144 integer components.
	 */
	function readPaintingArea (area) {
		var canvasContext = canvas.getContext("2d");
		var imageData = canvasContext.getImageData(area.x,area.y,area.width,area.height);
		var normalizedImageData = normalize(imageData.data);		
		
		if(normalizedImageData != 0) {
			// try using only one note
			createOscillator(AREA_DRAWN_FREQ);		
		} 
		//createOscillator(normalizedImageData);		
	}
	
	function readPainting (currentPosition) {
		if (currentPosition * resolution < sonarcanvas.width * sonarcanvas.height) {
			setTimeout(function (){
				if(playing){
					moverectangle(currentPosition);
					readPainting(currentPosition+1);
				}
			}, 100);
		}
	}
	
	function normalize(dataarray) {
		var result = 0;
		for (var i=0;i<dataarray.length;i++) {
			result += dataarray[i];
		}
		return result % 255;
	}	
	
	function clearCanvas() {
		sonarcanvas.width = sonarcanvas.width;
	}
	
	function createOscillator(freq) {
		//console.log(freq);
        var attack = 10,
            decay = 20,
            gain = audio.createGain(),
            osc = audio.createOscillator();

        gain.connect(audio.destination);
        gain.gain.setValueAtTime(0, audio.currentTime);
        gain.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 10);
        gain.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 10);

        osc.frequency.value = freq;
        osc.type = "sine";
        osc.connect(audio.destination);
        osc.start(0);
        

        setTimeout(function() {
            osc.stop(0);
            
            osc.disconnect(audio.destionation);
            gain.disconnect(audio.destination);
        }, decay)
    }
	
	
	// attach mouse drawing to onclick of drawing icon 	
	document.getElementById("replaybutton").addEventListener("click", function() {
		if(!playing) {
			start(1000);
			icons.activate("replay");
			canvas.style.zIndex = 2;
			sonarcanvas.style.zIndex = 4;
		} else {
			stop();
			canvas.style.zIndex = 2;
			sonarcanvas.style.zIndex = 0;
			icons.deactivate("replay");
		}		
	});
		
	function start(res) {
		resolution = res;
		playing = 1;
		previousRectanglePosition = {};
		icons.activate("speaker");
		readPainting(0);
	}
	
	function stop () {
		playing = 0;
		icons.deactivate("speaker");
		clearCanvas();
	}
	
	return {
		start : function (res) {
			start(res);
		},
		stop : function () {
			stop(res);
		}
	};
})();