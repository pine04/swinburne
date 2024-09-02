// Creates a randomized dataset consisting of 50 data points ranging from [0, 0] to [10, 5].
let dataset = [];
const dataItems = 50;

for (let i = 0; i < dataItems; i++) {
    let x = Math.random() * 10;
    let y = Math.random() * 5;

    dataset.push([x, y]);
}

// Constants for the scatterplot.
const w = 700, h = 400, padding = 60;

// Creates the x and y scale.
const xScale = d3.scaleLinear()
                .domain([d3.min(dataset, d => d[0]), d3.max(dataset, d => d[0])])
                .range([padding, w - padding]);
const yScale = d3.scaleLinear()
                .domain([d3.min(dataset, d => d[1]), d3.max(dataset, d => d[1])])
                .range([h - padding, padding]);

// Creates an SVG element inside the body element with the width and height attributes.
// Additionally creates a group element that translates all elements within by a small distance away from the canvas' borders.
let svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

// Adds a border that wraps around the drawing area (canvas minus all paddings).
// All point centers must lie inside this area.
// Hidden by default.
svg.append("rect")
    .attr("x", padding)
    .attr("y", padding)
    .attr("width", w - padding * 2)
    .attr("height", h - padding * 2)
    .attr("fill", "transparent")
    .attr("stroke", "red")
    .attr("id", "drawing-border")
    .attr("display", "none");

// Adds a border around the canvas.
// Hidden by default.
svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", w)
    .attr("height", h)
    .attr("fill", "transparent")
    .attr("stroke", "green")
    .attr("id", "canvas-border")
    .attr("display", "none");

// Drawing the dots.
svg.selectAll("circle") // Selects all circle elements in the SVG.
    .data(dataset) // Associates the dataset with the selection.
    .enter() // Gets the "enter" selection.
    .append("circle") // For each data item, add a "circle" to the SVG.
    .attr("cx", d => xScale(d[0]))
    .attr("cy", d => yScale(d[1]))
    .attr("r", 3)
    .attr("fill", "green")

// Creates a new format object.
const format = d3.format(".1f");

// Creates the x-axis from xScale.
const xAxis = d3.axisBottom()
                .tickFormat(format) // Use the new formatting object.
                .scale(xScale);

// Draws the x-axis.
svg.append("g")
    .attr("transform", `translate(0, ${h - padding})`) // Moves the axis to the correct position of the chart.
    .call(xAxis);

// Creates the y-axis from yScale.
const yAxis = d3.axisLeft()
                .tickFormat(format) // Use the new formatting object.
                .scale(yScale);

// Draws the y-axis.
svg.append("g")
    .attr("transform", `translate(${padding})`) // Moves the axis to the correct position of the chart.
    .call(yAxis);

// Adds event listeners to the checkboxes to toggle the visibility of the borders.
const canvasToggle = document.querySelector("#canvas");
const drawingToggle = document.querySelector("#drawing");
const canvasBorder = document.querySelector("#canvas-border");
const drawingBorder = document.querySelector("#drawing-border");

canvasToggle.addEventListener("click", (e) => {
    if (canvasBorder.getAttribute("display") === "inline") {
        canvasBorder.setAttribute("display", "none");
    } else {
        canvasBorder.setAttribute("display", "inline");
    }
});

drawingToggle.addEventListener("click", (e) => {
    if (drawingBorder.getAttribute("display") === "inline") {
        drawingBorder.setAttribute("display", "none");
    } else {
        drawingBorder.setAttribute("display", "inline");
    }
});