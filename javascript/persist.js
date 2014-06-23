/**
* Saves the canvas to local storage
* 
* We can save only five items in a circular storage
*
* Based on: 
* 	http://stackoverflow.com/questions/20507534/how-to-save-and-load-html5-canvas-to-from-localstorage
* 		and 
*   http://www.html5canvastutorials.com/advanced/html5-canvas-transform-scale-tutorial/
*/

var persist = (function () {
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var keys = [ "save1","save2","save3","save4","save5" ];
	var items = {  };	
	var isVisible = false;
	
	function loadFromLocalStorage() {
		// load existing items from local storage
		for(var i=0;i<keys.length;i++){
			items[keys[i]] = getFromLocalStorage(keys[i]);
			setPreview(keys[i],items[keys[i]]);
			var previewCanvas = document.getElementById(keys[i]);
			previewCanvas.addEventListener("click", createPreviewClickHandler(keys[i]));
		}
	}	
	
	function setPreview (key,imageDataURL) {
		if(!imageDataURL){
			return;
		}
		var factor = canvas.height / canvas.width;
		var previewCanvas = document.getElementById(key);
		previewCanvas.width = previewCanvas.parentElement.getBoundingClientRect().width;
		previewCanvas.height = previewCanvas.width * factor;
		var previewContext = previewCanvas.getContext("2d"); 
		var img = new Image();
		img.src = imageDataURL;
		img.onload = function () {
			previewContext.scale(0.1*factor,0.1*factor);
			previewContext.drawImage(img, 0, 0);
		};
	}
	
	function getFromLocalStorage(key) {
		var itemInStorage = localStorage.getItem(key);
		if (typeof itemInStorage !== "undefined") {
			return JSON.parse(itemInStorage);
		}
	}
	
	function putToLocalStorage(key,object) {
		localStorage.setItem(key, JSON.stringify(object));
	}
	
	// We can save only five items in a circular storage
	// This method returns the first empty key or the first key if storage is full
	//TODO: refactore code to be more DRY
	function getNextKey () {
		for(var i=0;i<keys.length;i++){
			if(!items[keys[i]]){
				return keys[i];
			}
		}
		for(var i=0;i<keys.length;i++){
			items[keys[i]] = items[keys[i+1]];
			putToLocalStorage(keys[i],items[keys[i]]);
			setPreview(keys[i],items[keys[i]]);
		}
		return keys[keys.length-1];
	}
	
	function save () {
		var canvasData =  canvas.toDataURL();
		var key = getNextKey();
		putToLocalStorage(getNextKey(),canvasData);
		items[key] = canvasData;
		setTimeout( function () {
			setPreview(key,canvasData);
		}, 2000);
	}
	
	function load (key) {
		// first clear the painting area
		draw.refresh();
		var data = items[key];		
		var img = new Image();
		img.src = data;
		img.onload = function () {
			context.drawImage(img, 0, 0);
		};
	}
	
	function createPreviewClickHandler (key) {
		return function () {
			load(key);
		}
	}
	 
	document.getElementById("savebutton").addEventListener("click", function() {
		save();
		icons.activate("save");
		setTimeout(function(){
			icons.deactivate("save");
		},200);				
	});
	
	document.getElementById("loadbutton").addEventListener("click", function() {
		if(!isVisible){
			icons.activate("load");
			drawingSettings.hide();
			show();
			isVisible = true;
		} else {
			isVisible = false;
			icons.deactivate("load");
			hide();
		}
	});	
	
	function show() {
		document.getElementById("previews").style.display = "block";
		loadFromLocalStorage();
	}
	
	function hide() {
		document.getElementById("previews").style.display = "none";
	}
	
	loadFromLocalStorage();
	
	return {
		save : function () {
			save();
		}, 
		load : function (key) {
			console.log(key);
			load(key);
		},
		show : function () {
			if(!isVisible){
				icons.activate("load");
				drawingSettings.hide();
				show();
				isVisible = true;
			} else {
				isVisible = false;
				icons.deactivate("load");
				hide();
			}
		},
		hide : function () {
			hide();
		}
	}
})();