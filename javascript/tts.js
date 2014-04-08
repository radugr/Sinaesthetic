/**
* Text to speech
*  
*  based on html5rocks http://updates.html5rocks.com/2014/01/Web-apps-that-talk---Introduction-to-the-Speech-Synthesis-API
*  
*    
*/

var tts = (function() {
	
	console.log("TTS loaded");
	
	var utterance = new SpeechSynthesisUtterance();
	var voicesHaveLoaded = false;
	var queue = []; // store all the texts until voices have loaded	
	
	var mute = false;
	
	function setup () {
		utterance.voice = speechSynthesis.getVoices()[2]; // uk female
		utterance.pitch = 0.5;
		utterance.rate = 1;
	}
	
	// this is needed because the voices are loaded a second or two after the page loads.. :( chrome bug
	function checkVoicesHaveLoaded() {
		if(speechSynthesis.getVoices().length == 0){
			console.log("voices still not loaded " + window.performance.now());
			setTimeout(checkVoicesHaveLoaded,100); // check again later
		} else {
			console.log("voices loaded" + window.performance.now());
			voicesHaveLoaded = true;
			setup();
			// replay the queue
			replayQueue();
		}
	}
	
	function replayQueue() {
		for(var i=0;i<queue.length;i++) {
			speak(queue[i]);
		}
	}
	
	function speak(options) {
		if (mute) {
			console.log("can't say a word");
			return;
		}
		if(!options || !options.message){
			throw new Error("a message must be transmitted");
		}
		
		//xor :)
		if (!options.onstart ^ !options.onend) {
			throw new Error("if at least one callback is defined, both need to be");
		}
		
		utterance.onstart = function () {
			icons.activate("speaker");
			options.onstart();			
		} 
		utterance.onend = function () {
			icons.deactivate("speaker");
			options.onend();
		}
		utterance.text = options.message;
		
		speechSynthesis.speak(utterance);
	}
	
	checkVoicesHaveLoaded();
	
	return {
		speak : function(options) {
			
			if(!voicesHaveLoaded) {
				queue.push(options);
			} else {
				speak(options);
			}
			
		}, 
		mute : function () {
			mute = true;
		},
		unmute : function () {
			mute = false;
		}
	};
})();