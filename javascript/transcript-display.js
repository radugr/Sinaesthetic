var transcriptDisplay = (function() {
	
	var textarea = document.getElementById("transcripttext");
	var DEFAULT_TEXT = "Listening ...";
	
	var last_text_set = + new Date();
	var DEFAULT_TEXT_SHOWS_AFTER = 10000;
	
	
	function getCurrentText() {
		return textarea.textContent;
	}
	
	function append (text) {
		var currentText = getCurrentText();
		if (currentText === DEFAULT_TEXT) {
			currentText = ": ";
		}
		setText(currentText + " " + text);
	}	
	
	function setText (text) {
		textarea.textContent = text;
		last_text_set = + new Date();
	}
	
	function resetToDefaultText() {
		
		if(+new Date() - last_text_set > DEFAULT_TEXT_SHOWS_AFTER) {
			setText( DEFAULT_TEXT );
		}
		
		setTimeout(resetToDefaultText,1000);
	}
	
	resetToDefaultText();
	
	
	return {
		show : function () {
			textarea.hidden = false;
		},
		hide : function () {
			textarea.hidden = true;
		},
		append : function (text) {
			append(text);
		},
		setText : function (text) {
			setText(text);
		} 
	}	
	
})();