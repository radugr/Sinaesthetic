var icons = (function () {
	
	var mic = document.getElementById("micbutton");
	var speaker = document.getElementById("speakerbutton");
	var drawing = document.getElementById("drawingbutton");
	
	function activate(name) {
		switch (name) {
		  case "mic":
			  mic.className = mic.className.replace(/\bdeactivated\b/,'activated');
			break;
		  case "speaker":
			  speaker.className = speaker.className.replace(/\bdeactivated\b/,'activated');
			break;
	      case "drawing":
	    	  drawing.className = drawing.className.replace(/\bdeactivated\b/,'activated');
			break;
		}
	}
	
	function deactivate(name) {
		switch (name) {
		  case "mic":
			  mic.className = mic.className.replace(/\bactivated\b/,'deactivated');
			break;
		  case "speaker":
			  speaker.className = speaker.className.replace(/\bactivated\b/,'deactivated');
			break;
	      case "drawing":
	    	  drawing.className = drawing.className.replace(/\bactivated\b/,'deactivated');
			break;
		}
	}
	
	return {
		activate : function (name) {
			activate(name);
		},
		deactivate : function (name) {
			deactivate(name);
		}
	};
	
})();