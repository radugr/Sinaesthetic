var icons = (function () {
	
	var mic = document.getElementById("micbutton");
	var speaker = document.getElementById("speakerbutton");
	var drawing = document.getElementById("drawingbutton");
	var replay = document.getElementById("replaybutton");
	var save = document.getElementById("savebutton");
	var load = document.getElementById("loadbutton");
	var refresh = document.getElementById("refreshbutton");
	var tutorial = document.getElementById("tutorialbutton");
	
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
	      case "replay":
	    	  replay.className = replay.className.replace(/\bdeactivated\b/,'activated');
	    	break;
	      case "save":
	    	  save.className = save.className.replace(/\bdeactivated\b/,'activated');
	    	break;
	      case "load":
	    	  load.className = load.className.replace(/\bdeactivated\b/,'activated');
	    	break;
	      case "refresh":
	    	  refresh.className = refresh.className.replace(/\bdeactivated\b/,'activated');
	    	break;
	      case "tutorial":
	    	  tutorial.className = tutorial.className.replace(/\bdeactivated\b/,'activated');
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
	      case "replay":
	    	  replay.className = replay.className.replace(/\bactivated\b/,'deactivated');
	    	break;
	      case "save":
	    	  save.className = save.className.replace(/\bactivated\b/,'deactivated');
	    	break;
	      case "load":
	    	  load.className = load.className.replace(/\bactivated\b/,'deactivated');
	    	break;
	      case "refresh":
	    	  refresh.className = refresh.className.replace(/\bactivated\b/,'deactivated');
	    	break;
	      case "tutorial":
	    	  tutorial.className = tutorial.className.replace(/\bactivated\b/,'deactivated');
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