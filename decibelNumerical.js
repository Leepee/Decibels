var dots = [];
var baseDots = 20;

var numericalSlider = document.getElementById("numericalSlider");
var numericalOutput = document.getElementById("numericalOutval");

// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

numericalSlider.oninput = function () {
  numericalSliderGain = numericalSlider.value / 10;
  numericalOutput.innerHTML = numericalSliderGain.toFixed(1);
};

numericalOutput.innerHTML = 0;

buildBeforeChart(baseDots);
buildAfterChart(baseDots);

function newData(dotNumber) {
  dots = [];
  for (var i = 0; i < dotNumber; i++) {
    var x = d3.randomUniform(0, 50)();
    var y = d3.randomUniform(0, 50)();
    dots.push({ x: x, y: y });
  }
  return dots;
}

function increaseDots(dBamount) {
  var newNumber = Math.round(Math.pow(10, dBamount / 20) * baseDots);
  console.log(
    "Dots set to " + Math.round(Math.pow(10, dBamount / 20) * baseDots)
  );

  clearCharts();
  buildBeforeChart(baseDots);
  buildAfterChart(newNumber);
}

function setInitialDots(numDots) {
  baseDots = numDots;

  clearCharts();
  buildBeforeChart(baseDots);
  buildAfterChart(baseDots);
}

function clearCharts() {
  d3.selectAll("svg").remove();
}

function buildBeforeChart(beforeDots) {
  // append the svg object to the body of the page
  const before_svg = d3
    .select("#d3_before")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //Generate the data
  dots = newData(beforeDots);

  // Add X axis
  const x = d3.scaleLinear().domain([0, 50]).range([0, width]);
  const xAxis = d3.axisBottom().scale(x).tickSize(0).tickValues([]);
  const xAxisTop = d3.axisTop().scale(x).tickSize(0).tickValues([]);

  before_svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);
  before_svg.append("g").call(xAxisTop);

  // Add Y axis
  const y = d3.scaleLinear().domain([0, 50]).range([height, 0]);
  const yr = d3.scaleLinear().domain([0, 50]).range([height, 0]);
  const yAxis = d3.axisLeft().scale(y).tickSize(0).tickValues([]);
  const yAxisRight = d3.axisRight().scale(yr).tickSize(0).tickValues([]);

  before_svg
    .append("g")
    .attr("transform", `translate(${width},0)`)
    .call(yAxisRight);
  before_svg.append("g").call(yAxis);

  // Add dots
  before_svg
    .append("g")
    .selectAll("dot")
    .data(dots)
    .join("circle")
    .attr("cx", function (d) {
      return x(d.x);
    })
    .attr("cy", function (d) {
      return y(d.y);
    })
    .attr("r", 2)
    .style("fill", "#000000");

  // Add label
  before_svg
    .append("text")
    .attr("class", "x label")
    .attr("x", width / 2)
    .attr("y", height + 30)
    .text(beforeDots);
}

function buildAfterChart(afterDots) {
  // append the svg object to the body of the page
  const after_svg = d3
    .select("#d3_before")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //Generate the data
  dots = newData(afterDots);

  // Add X axis
  const x = d3.scaleLinear().domain([0, 50]).range([0, width]);
  const xAxis = d3.axisBottom().scale(x).tickSize(0).tickValues([]);
  const xAxisTop = d3.axisTop().scale(x).tickSize(0).tickValues([]);

  after_svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);
  after_svg.append("g").call(xAxisTop);

  // Add Y axis
  const y = d3.scaleLinear().domain([0, 50]).range([height, 0]);
  const yr = d3.scaleLinear().domain([0, 50]).range([height, 0]);
  const yAxis = d3.axisLeft().scale(y).tickSize(0).tickValues([]);
  const yAxisRight = d3.axisRight().scale(yr).tickSize(0).tickValues([]);

  after_svg
    .append("g")
    .attr("transform", `translate(${width},0)`)
    .call(yAxisRight);
  after_svg.append("g").call(yAxis);

  // Add dots
  after_svg
    .append("g")
    .call(xAxisTop)
    .selectAll("dot")
    .data(dots)
    .join("circle")
    .attr("cx", function (d) {
      return x(d.x);
    })
    .attr("cy", function (d) {
      return y(d.y);
    })
    .attr("r", 2)
    .style("fill", "#000000");

  // Add label
  after_svg
    .append("text")
    .attr("class", "x label")
    //   .attr("text-anchor", "end")
    .attr("x", width / 2)
    .attr("y", height + 30)
    .text(afterDots);
}
