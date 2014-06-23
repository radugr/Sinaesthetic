var tutorial = (function () {
	
	/*
	 * I
	 * Welcome to the Sonar tutorial. 
	 * 
	 * II
	 * The Sonar is a feature that translates painting into sound. 
	 * 
	 * Imagine a moving rectangle on top of your painting. 
	 * 
	 * When the rectangle is over a painted area, it emits a sound. 
	 * 
	 * The rectangle moves from left to right, up to down. 
	 * 
	 * It emits a high pitched sound when it hits the border
	 * 
	 * 
	 * III
	 * Let's start to get used to the sonar with a simple image. 
	 * 
	 * The image is composed of five vertical and five orizontal lines, equally spaced on the canvas. 
	 * 
	 * 
	 * IV
	 * When you are ready say play and the sonar will start. 
	 *  
	 * V 
	 * Are you ready to try something harder? 
	 * When you are ready say ready and the sonar will start for a new image. 
	 * This time the olympic circles are drawn in the middle of the canvas.  
	 *  
	 * VI
	 * Congratulations, you have finished the Sonar tutorial. 
	 * You can say play anytime you like while using the application to start the sonar.
	 * 
	 */
	
	var FIRST_MESSAGE = "Welcome to the Sonar tutorial. " +
			"The Sonar is a feature that translates painting into sound. " +
			"The Sonar moves over the painting from left to right, top to bottom, silently if the area is empty " +
			"and emiting a sound if the area is filled."			
	
	var SECOND_MESSAGE = "It emits a high pitched sound when it hits the painting border." +
			"Let's start with a simple image. " +
			"The image is composed of three vertical and three orizontal lines, equally spaced on the canvas. " +
			"When you are ready say play and the sonar will start!";	
	
	vr.addCallback(function(result) {
		sound.stop();
		loadSecondImage();
	}, {
		transcript : "next"
	});
	
	function loadFirstImage () {
		predefined.draw("lines");
	}
	
	function loadSecondImage () {
		predefined.draw("olympic");
	}
	
	function sayFirstMessage() {
		tts.speak({
			message : FIRST_MESSAGE,
			onstart : function () {
				vr.stop();
			},
			onend : function () {
				vr.start();
				setTimeout(saySecondMessage,0);
			}
		});
	}
	
	function saySecondMessage() {
		tts.speak({
			message : SECOND_MESSAGE,
			onstart : function () {
				vr.stop();
			},
			onend : function () {
				vr.start();
				loadFirstImage();
			}
		});
	}
	
	
	function start() {
		icons.activate("tutorial");
		sayFirstMessage();
	}	
	
	return {
		start : function () {
			start();
		}
	}	
})();