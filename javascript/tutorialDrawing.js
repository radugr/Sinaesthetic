var tutorial = (function () {
	
	var wasnext = 0;
	
	var FIRST_MESSAGE = "Welcome to the drawing tutorial. " +
		"You can position the brush on the canvas by saying up, down, left, right." +
		"To paint say stroke and then move the brush." +
		"To start drawing say go; the brush will be positioned in the middle of the canvas.";
	
	var SECOND_MESSAGE = "When you are ready for advanced controls say next!";
		
	var THIRD_MESSAGE = "You can change the style of the brush between round and square, small and big. " +
			"Name a color and the brush will change.";
	
	var FORTH_MESSAGE = "You can save your work and can reload it later. Just say save and your painting will be persisted. " +
			"You can then chose first, second and up to fifth paintings to load from storage and continue working."
	
	vr.addCallback(function(result) {
		if (wasnext) {
			sayForthMessage();
		} else {
			wasnext = 1;
			sayThirdMessage();
			setTimeout(saySecondMessage,40000);
		}
	}, {
		transcript : "next"
	});
	
	function sayFirstMessage() {
		tts.speak({
			message : FIRST_MESSAGE,
			onstart : function () {
				vr.stop();
			},
			onend : function () {
				vr.start();
				setTimeout(saySecondMessage,40000);
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
			}
		});
	}
	
	function sayThirdMessage() {
		tts.speak({
			message : THIRD_MESSAGE,
			onstart : function () {
				vr.stop();
			},
			onend : function () {
				vr.start();
			}
		});
	}
	
	function sayForthMessage(){ 
		tts.speak({
			message : FORTH_MESSAGE,
			onstart : function () {
				vr.stop();
			},
			onend : function () {
				vr.start();
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