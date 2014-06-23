var loadImageToCanvas = (function () {
	
	function loadImage (url) {
		 var c = document.getElementById("canvas");
	     var ctx = c.getContext("2d");
	     var img = new Image ();
	     img.src = url;
	     ctx.scale(2,2);
	     ctx.drawImage(img, 0, 0);
	}
	
	return {
		load : function (url) {
			loadImage(url);
		}
	};
})();