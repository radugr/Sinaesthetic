
//TODO: refactor application - do upper case to modules, etc;
//TODO: create a navigation menu 
//TODO: create a lock between text to speech, sound recording and voice recognition
//TODO: add last visit checks so we don't put the user at rest
//TODO: make the same guide appear on screen for users that don't what the TTS guide
//TODO: add rotate / restore method to be able to paint in more axis

var dbs = (function() {

	var COLORS = [ "blue", "red", "green", "black", "orange", "none", "white" ];

	// for moving the pencil
	var DIRECTIONS = [ "up", "down", "left", "right" ];
	
	// for starting to draw
	var START = "go";
	
	// for stopping
	var STOP = "stop";
	
	// for refreshing 
	var REFRESH = "refresh";
	
	function playWelcomeMessage() {
		
		var WELCOME_MESSAGE = "Welcome to Draw by Sound! My name is April! "
			+ "I will teach you how to use this application."
			+ "When you are ready, say next and we'll start the tutorial!";
		
		tts.speak({
			message : WELCOME_MESSAGE,
			onstart : function () {
				vr.stop();
			},
			onend : function () {
				vr.start();
			}
		});
	}
	
	// tutorial to draw a red square
	function playTutorial () {
		
		var FIRST_TUTORIAL_MESSAGE = "Choosing the color tutorial: " +
		"You can say one of the following colors to pick the color to draw with: " + 
		+ COLORS.join(",");

		var DIRECTION_TUTORIAL_MESSAGE = "Choosing the direction tutorial: " +
				+"You can control the direction by saying one of the directions: "
				+DIRECTIONS.join(",");
		
		var START_STOP_REFRESH_MESSAGE = "To start painting say go. " +
				"To stop painting say stop. " +
				"To clean the canvas say refresh. ";
		
	}
	
	// start the actual application
	function playApplication() {
		
	}
	
	// mutes text to speech
	var SHUT_UP = "shut up";
	
	// unmutes text to speech
	var SPEAK = "speak";
		
	function okCommand () {
		tts.speak({message:"You said ok!"});
		vr.stop();
	}
	
	// register command callbacks
	vr.addCallback(function(result) {
		okCommand();
	}, {
		transcript : "ok"
	});
	
	function chooseColor() {
		// todo: make the chose color tutorial
	}
	
	vr.addCallback(function(result){
		chooseColor();
	}, {
		transcript : "color" 
	});
	

	COLORS.map(function(color) {
		// for each color add a callback
		vr.addCallback(function(result) {
			console.log("color callback called " + color);
			draw.color(color);
		}, {
			transcript : color
		});
	});

	DIRECTIONS.map(function(direction) {
		vr.addCallback(function(result) {
			console.log("direction callback called " + direction);
			draw.move(direction);
		}, {
			transcript : direction
		});
	});
	

	vr.addCallback(function(result) {
		draw.start();
		console.log("start called");
	}, {
		transcript : START
	});

	vr.addCallback(function(result) {
		draw.stop();
		console.log("stop called");
	}, {
		transcript : STOP
	});
	
	vr.addCallback(function(result) { 
		draw.refresh();
		draw.start();
	}, {
		transcript : REFRESH
	});
	
	
	// mute text to speech
	vr.addCallback(function() {
		tts.speak({
			message : "Alright, just say speak to unmute me!",
			onstart : function () {
				vr.stop();
			},
			onend : function () {
				vr.start();
			}
		});
		tts.mute();
	}, {
		transcript : SHUT_UP
	});
	
	// unmute text to speech
	vr.addCallback(function() {
		tts.unmute();
		tts.speak({
			message : "Finally, I can speak!",
			onstart : function () {
				vr.stop();
			},
			onend : function () {
				vr.start();
			}
		});
	}, { transcript : SPEAK});
	
	
	// default callback
	vr.addCallback(function(result) {
		tts.speak({
			//TODO: after a few sorry's, change the message to say, let's go back to the tutorials
			message : "Sorry, I did not get that!",
			onstart : function () {
				vr.stop();
			},
			onend : function () {
				vr.start();
			}
		});
	});
	
	vr.start();
})();