var learn = (function () {
	
	//canvas width 300, height 150
	
	var WELCOME_MESSAGE = "Welcome to Draw by Sound! My name is April! "
		+ "I will teach you how to use this application."
		+ "When you are ready, say ready and we'll start the tutorial!";
	
	vr.start();
	
	tts.speak({
		message : WELCOME_MESSAGE,
		onstart : function () {
			vr.stop();
		},
		onend : function () {
			vr.start();
		}
	});
	
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
	
	vr.addCallback(function(result) {
		learnControls();
	}, {
		transcript : "ready"
	});
	
	vr.addCallback(function(result) {
		learnColors();
	}, {
		transcript : "next"
	});
	
	// teaches the user to draw a square
	function learnControls() {
	
		var TUTORIAL_MESSAGE = "Learning the controls tutorial. To position the brush on the canvas say go!";
		
		tts.speak({
			message : TUTORIAL_MESSAGE,
			onstart : function () {
				vr.stop();
			},
			onend : function () {
				vr.start();
			}
		});
		
		vr.addCallback(function(result) {
			draw.gotoposition(120,45);
			draw.stroketo(125,45);
			icons.activate("drawing");
			var MESSAGE = "Great! Now say right to move the brush to the right!";
			tts.speak({
				message : MESSAGE,
				onstart : function () {
					vr.stop();
				},
				onend : function () {
					vr.start();
				}
			});
		}, {
			transcript : "go"
		});
				
		
        vr.addCallback(function(result) {
        	draw.stroketo(150,45);
        	var MESSAGE = "Great! Now say down to move the brush down!";
			tts.speak({
				message : MESSAGE,
				onstart : function () {
					vr.stop();
				},
				onend : function () {
					vr.start();
				}
			});
		}, {
			transcript : "right"
		});
		
        vr.addCallback(function(result) {
        	draw.stroketo(150,75);
        	var MESSAGE = "Great! Now say left to move the brush left!";
			tts.speak({
				message : MESSAGE,
				onstart : function () {
					vr.stop();
				},
				onend : function () {
					vr.start();
				}
			});
		}, {
			transcript : "down"
		});
		
        vr.addCallback(function(result) {
        	draw.stroketo(120,75);
        	var MESSAGE = "Great! Now say up to move the brush up!";
			tts.speak({
				message : MESSAGE,
				onstart : function () {
					vr.stop();
				},
				onend : function () {
					vr.start();
				}
			});
		}, {
			transcript : "left"
		});
        
        vr.addCallback(function(result) {
        	draw.stroketo(120,45);
        	var MESSAGE = "Congratulations! You have drawn your first sound rectangle! Say next to move to the next tutorial";
			tts.speak({
				message : MESSAGE,
				onstart : function () {
					vr.stop();
				},
				onend : function () {
					vr.start();
				}
			});
        	clearCallbacks();
        	icons.deactivate("drawing");
		}, {
			transcript : "up"
		});

        function clearCallbacks() {
    		//Clear callbacks
    		vr.clearCallback("go");
    		vr.clearCallback("left");
    		vr.clearCallback("right");
    		vr.clearCallback("down");
    		vr.clearCallback("up");
        }
	}
	
	function learnColors() {
		var TUTORIAL_MESSAGE = "Learning the colors tutorial. " +
				"First, let's clear the previous work! " +
				"Say empty to clear the canvas and reposition the brush";
		
		var COLORS = [ "blue", "red", "green", "orange" ];
		
		COLORS.map(function(color) {
			// for each color add a callback
			vr.addCallback(function(result) {
				draw.color(color);
				tts.speak({
					message : "Great, now draw a rectangle!",
					onstart : function () {
						vr.stop();
					},
					onend : function () {
						vr.start();
					}
				});
			}, {
				transcript : color
			});
		});
		
		tts.speak({
			message : TUTORIAL_MESSAGE,
			onstart : function () {
				vr.stop();
			},
			onend : function () {
				vr.start();
			}
		});
		
		vr.addCallback(function(result) {
			draw.refresh();
			draw.gotoposition(120,45);
			draw.stroketo(125,45);
			icons.activate("drawing");
			
			tts.speak({
				message : "Great, now, pick one of the following colors: " + COLORS.join(","),
				onstart : function () {
					vr.stop();
				},
				onend : function () {
					vr.start();
				}
			});
		}, {
			transcript : "empty"
		});
		
        vr.addCallback(function(result) {
        	draw.stroketo(150,45);
		}, {
			transcript : "right"
		});
		
        vr.addCallback(function(result) {
        	draw.stroketo(150,75);
		}, {
			transcript : "down"
		});
		
        vr.addCallback(function(result) {
        	draw.stroketo(120,75);
		}, {
			transcript : "left"
		});
        
        vr.addCallback(function(result) {
        	draw.stroketo(120,45);
        	var MESSAGE = "Congratulations! You have drawn your first coloured rectangle! Say ok to start free drawing!";
			tts.speak({
				message : MESSAGE,
				onstart : function () {
					vr.stop();
				},
				onend : function () {
					vr.start();
				}
			});
        	clearCallbacks();
        	icons.deactivate("drawing");
		}, {
			transcript : "up"
		});

        function clearCallbacks() {
    		//Clear callbacks
    		vr.clearCallback("go");
    		vr.clearCallback("left");
    		vr.clearCallback("right");
    		vr.clearCallback("down");
    		vr.clearCallback("up");
        }
	}
	
	return {
		controls : function () {
			learnControls();
		},
		colors : function () {
			learnToUseColors();
		}	
	};
	
})();