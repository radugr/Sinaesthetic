window.AudioContext = window.AudioContext ||
                      window.webkitAudioContext;

var context = new AudioContext();
var analyser;
var dataArray = new Uint8Array(128);

navigator.webkitGetUserMedia({audio: true}, function(stream) {
  var microphone = context.createMediaStreamSource(stream);
  analyser = context.createAnalyser();
  analyser.fftSize = 2048;
  microphone.connect(analyser);
}, function(event){console.log(event)});

function whatsInTheBuffer() {
	analyser.getByteFrequencyData(dataArray);
	setTimeout( whatsInTheBuffer, 100);
}

setTimeout( whatsInTheBuffer, 100);