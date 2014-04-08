/**
 * Voice recognition
 * 
 *   based on http://stiltsoft.com/blog/2013/05/google-chrome-how-to-use-the-web-speech-api/
 *   
 *   https://dvcs.w3.org/hg/speech-api/raw-file/9a0075d25326/speechapi.html
 * 
 */

//TODO: Restart voice recognition so it always works ( when not drawing )
var vr = (function() {

	var specificCallbacks = {};
	var defaultCallback;
	var autorestart = 1; // used for restarting the recognition engine after 60 sec
 
	var recognition = new webkitSpeechRecognition(); // todo, make it work cross browser - future compatibility
	recognition.continuous = true;
	recognition.lang = "en";
	recognition.maxAlternatives = 10;

	recognition.onaudiostart = function(event) {
		console.log("Speak!");
		//TODO: // tell the user that he can start speaking
	}
	recognition.onaudiostop = function(event) {
		console.log("Stop!");
	}

	recognition.onstart = function(event) {
		console.log("Started");
	}

	recognition.onend = function(event) {
		console.log("Ended");
		autorestart && recognition.start();
	}

	recognition.onnomatch = function(event) {
		console.log("No match, sorry!");
		//TODO: //tell the user that we did not understand what he was saying
	}

	recognition.onspeechstart = function(event) {
		console.log("on speech start");

	}

	recognition.onspeechend = function(event) {
		console.log("on speech end");
		// TODO: // tell the user that we are processing
	}

	recognition.onerror = function(event) {
		console.log("error");
		console.log(event);
		//TODO: // handle various errors
	}

	recognition.onresult = function(event) {
		var results = event.results;
		console.log("Results :" + results);
		
		var result;
		for ( var i = 0; i < results.length; i++) {
			result = results[i];
			if (result.isFinal) {
				console.log("Final result : " + JSON.stringify(result));
				var found = false;
				var transcripts = ": ";
				for(var j=0; j< result.length; j++) {
					var transcript = result[j].transcript.trim();
					transcripts+= transcript + " : ";
					if (specificCallbacks[transcript]) {
						// TODO: 
						// do partial matches with callbacks 
						// - users may do minor variations in commands
						// - call all handlers from result alternatives
						// transmit only transcripts and confidence
						specificCallbacks[transcript](result);
						found = true;
						// clear all past results
						recognition.stop();
					}
				}
				transcriptDisplay.setText(transcripts);
				if(!found && defaultCallback){
					defaultCallback(result);
					recognition.stop();
					return;
				} else {
					return;
				}				
			} else {
				console.log("Partial result : " + JSON.stringify(result));
			}
		}
	};

	return {
		start : function() {
			autorestart = 1;
			recognition.start();
			icons.activate("mic");
		},
		stop : function() {
			autorestart = 0;
			recognition.stop();
			icons.deactivate("mic");
		},
		addCallback : function(callback, options) {
			
			if ( !callback || typeof callback !== "function" ) {
				throw new Error("callback must be defined!");
			}
			
			if (options && options.transcript) {
				specificCallbacks[options.transcript] = callback;
				console.log("adding callback " + options.transcript);
			} else {
				defaultCallback = callback;
			}
		},
		clearCallback : function (transcript) {
			specificCallbacks[transcript] = 0;
		} 
	};

})();