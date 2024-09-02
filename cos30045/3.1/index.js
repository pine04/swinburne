const dataset = [
    [5, 20],
    [500, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88]
];

// Constants for the scatterplot.
const w = 600, h = 250, padding = 60;

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
    .attr("fill", "grey")

// Drawing the labels.
svg.selectAll("text") // Selects all text elements in the SVG.
    .data(dataset) // Associates the dataset with the selection.
    .enter() // Gets the "enter" selection.
    .append("text") // For each data item, add a "text" to the SVG.
    .text(d => `${d[0]}, ${d[1]}`)
    .attr("x", d => xScale(d[0] + 4))
    .attr("y", d => yScale(d[1] + 4))
    .attr("fill", (d, i) => i === 1 ? "red" : "limegreen") // If the data item has index 2, make it red.
    .attr("font-family", "Arial, sans-serif")
    .attr("font-weight", "bold");

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