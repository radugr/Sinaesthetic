var dbs = (function() {
	
	// for chosing a color
	var COLORS = [ "blue", "red", "green", "black", "orange", "none", "white", "light grey","pink"];
	COLORS.map(function(color) {
		// for each color add a callback
		vr.addCallback(function(result) {
			console.log("color callback called " + color);
			drawingSettings.setBrushColor(color);
		}, {
			transcript : color
		});
	});
	
	// for moving the pencil
	var DIRECTIONS = [ "up", "down", "left", "right" ];
	DIRECTIONS.map(function(direction) {
		vr.addCallback(function(result) {
			console.log("direction callback called " + direction);
			draw.move(direction);
		}, {
			transcript : direction
		});
	});
	
	// for selecting a type of brush
	var BRUSHES = ["small round","small square", "big round", "big square"];
	BRUSHES.map(function(brush){
		vr.addCallback(function(result) {
			drawingSettings.setBrushType(brush);
		},{
			transcript : brush
		});
	});
		
	// for replaying the canvas into a sound
	var PLAY = "play";
	vr.addCallback(function(result) {
		sound.start(2000);
		console.log("play called");
	}, {
		transcript : PLAY
	});
	
	// for starting to draw
	var START = "go";
	vr.addCallback(function(result) {
		draw.start();
		console.log("start called");
	}, {
		transcript : START
	});
	
	// for stopping
	var STOP = "stop";
	vr.addCallback(function(result) {
		sound.stop();
		console.log("stop called");
	}, {
		transcript : STOP
	});
	
	// for saving 
	var SAVE = "save";
	vr.addCallback(function(result) {
		persist.save();
		console.log("save called");
	}, {
		transcript : SAVE
	});
	
	// for loading
	var SAVES = [ {
		name : "first",
		value : "save1"
	}, {
		name : "second",
		value : "save2"
	}, {
		name : "third",
		value : "save3"
	}, {
		name : "forth",
		value : "save4"
	}, {
		name : "fifth",
		value : "save5"
	} ];
	
	SAVES.map(function(save){
		vr.addCallback(function() {
			persist.load(save.value);
		},{
			transcript : save.name
		});
	});
	
	var LOAD = "load";
	vr.addCallback(function(result) {
		persist.show();
		console.log("load called");
	}, {
		transcript : LOAD
	});
	
	// for refreshing 
	var REFRESH = "clear";
	vr.addCallback(function(result) {
		draw.refresh();
		console.log("refresh called");
	}, {
		transcript : REFRESH
	});
	
	
	// for putting the brush on the canvas
	var STROKE = "stroke";
	vr.addCallback(function(result) {
		draw.stroke();
		console.log("stroke called");
	}, {
		transcript : STROKE
	});
	
	
	// mutes text to speech
	var SHUT_UP = "shut up";
	
	// unmutes text to speech
	var SPEAK = "speak";
		
	function okCommand () {
		console.log("ok command");
		tts.speak({message:"You said ok!"});
		vr.stop();
	}
	
	// register command callbacks
	vr.addCallback(function(result) {
		okCommand();
	}, {
		transcript : "ok"
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
	
	
	function playWelcomeMessage() {
		var WELCOME_MESSAGE = "Welcome to Sinaestetiq! Enjoy!"
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
	
	// check if we are on a tutorial page
	if(window.tutorial && window.tutorial.start){
		tutorial.start();
	} else {
	   playWelcomeMessage();		
	}
	
	
	
})();