// Setting up the slider to control the demo

var slider = document.getElementById("myRange");
var output = document.getElementById("outval");

var sliderGain = 0;
output.innerHTML = sliderGain.toFixed(1);

var audio = new Audio("pink.mp3");

slider.oninput = function () {
  sliderGain = slider.value / 10;
  output.innerHTML = sliderGain.toFixed(1);
};

function playSound() {
  audio.volume = 0.2;
  console.log("Volume set to 0.2");
  audio.play();
}

function stopSound() {
  audio.pause();
  audio.currentTime = 0;
}

function increaseSound(amount) {
  audio.volume = Math.pow(10, amount / 20) * 0.2;
  console.log("Volume set to " + Math.pow(10, amount / 20) * 0.2);
}

function sliderChange() {
  audio.volume = Math.pow(10, sliderGain / 20) * 0.2;
  console.log("Volume set to " + Math.pow(10, sliderGain / 20) * 0.2);
}
