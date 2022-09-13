var baseFrequencySlider = document.getElementById("baseFrequency");
var frequencyIncreaseSlider = document.getElementById("frequencySlider");
var frequencyReadout = document.getElementById("baseFreq");
var customFrequency = document.getElementById("customFrequency");

var context = new AudioContext();
var osc = context.createOscillator();
var gain = context.createGain();

var baseFrequency = 100;

osc.connect(gain);
gain.connect(context.destination);

baseFrequencySlider.oninput = function () {
  osc.frequency.value = baseFrequencySlider.value;
  //   sliderGain = baseFrequencySlider.value / 10;
  frequencyReadout.innerHTML = baseFrequencySlider.value;
  baseFrequency = baseFrequencySlider.value;
};

frequencyIncreaseSlider.oninput = function () {
  customFrequency.innerHTML = frequencyIncreaseSlider.value;
};

function playOsc() {
  stopOsc();

  osc.frequency.value = baseFrequency;
  osc.start(0);
}

function stopOsc() {
  try {
    osc.stop();
  } catch (error) {}

  osc = context.createOscillator();
  osc.connect(gain);
  gain.connect(context.destination);
}

function increaseFrequency(frequency) {
  osc.frequency.value = Math.pow(10, frequency / 20) * baseFrequency;
  console.log(Math.pow(10, frequency / 20) * baseFrequency);
}
