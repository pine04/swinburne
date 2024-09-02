// The maximum value of a data item.
const MAX_VALUE = 25;
// The number of data items that will be generated.
const ITEM_COUNT = 25;

// Initially, the dataset is an array of 25 random integers.
let dataset = [];
for (let i = 0; i < ITEM_COUNT; i++) {
    val = Math.round(Math.random() * MAX_VALUE);
    dataset.push(val);
}

// Constants for drawing the bar chart.
const w = 800, h = 300;

// Colors for drawing the chart.
const gradient = d3.interpolate("rgb(29, 43, 83)", "rgb(255, 0, 77)");

// Creates an SVG element inside "body" with the specified width and height attributes.
const svg = d3.select("#canvas")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

const xScale = d3.scaleBand()
                .domain(dataset.map((d, i) => i))
                .rangeRound([0, w])
                .paddingInner(0.1);

const yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset) + 3])
                .range([0, h]);

// Draws the initial bar chart.
svg.selectAll("rect")
    .data(dataset)
    .enter() // Gets the "enter" selection.
    .append("rect") // For each data item, add a "rect" to the SVG.
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => h - yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", d => yScale(d))
    .attr("fill", (d, i) => gradient(i / dataset.length));

svg.selectAll("text") // Selects all text elements in the SVG.
    .data(dataset) // Associates the dataset with the selection.
    .enter() // Gets the "enter" selection.
    .append("text") // For each data item, add a "text" to the SVG.
    .text(d => d)
    .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr("y", d => h - yScale(d) - 8)
    .attr("width", xScale.bandwidth())
    .attr("fill", "rgb(29, 43, 83)")
    .attr("font-family", "Arial, sans-serif")
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle");

d3.select("#add").on("click", () => {
    // Adds a data item.
    dataset.push(Math.round(Math.random() * MAX_VALUE));

    // Updates the X and Y scales to match the new data.
    xScale.domain(dataset.map((d, i) => i));
    yScale.domain([0, d3.max(dataset) + 3]);

    const bars = svg.selectAll("rect").data(dataset);

    bars.enter() // Gets the "enter" selection.
        .append("rect") // For each new data item, add a "rect" to the SVG.
        .attr("x", w) // Adds some attributes upfront for the new elements.
        .attr("y", d => h - yScale(d))
        .attr("height", d => yScale(d))
        .merge(bars) // After merging, we have to update the attributes of elements in both enter and update.
        .transition()
        .attr("x", (d, i) => xScale(i))
        .attr("y", d => h - yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => yScale(d))
        .attr("fill", (d, i) => gradient(i / dataset.length));

    const labels = svg.selectAll("text").data(dataset);

    labels.enter() // Gets the "enter" selection.
        .append("text") // For each new data item, add a "text" to the SVG.
        .text(d => d)
        .attr("x", w) // Adds some attributes upfront for the new elements.
        .attr("y", d => h - yScale(d) - 8)
        .attr("fill", "rgb(29, 43, 83)")
        .attr("font-family", "Arial, sans-serif")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .merge(labels)
        .transition() // After merging, we have to update the attributes of elements in both enter and update.
        .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr("y", d => h - yScale(d) - 8)
        .attr("width", xScale.bandwidth());
});

d3.select("#remove").on("click", () => {
    // Removes a data item.
    dataset.shift();

    // Updates the X and Y scales to match the new data.
    xScale.domain(dataset.map((d, i) => i));
    yScale.domain([0, d3.max(dataset) + 3]);

    const bars = svg.selectAll("rect").data(dataset);

    bars.exit() // Gets the "exit" selection.
        .transition() // Smoothly pushes the bar to the right of the canvas.
        .attr("x", w)
        .remove(); // The removes the bar.

    // Updates the position, width, and color of the remaining bars.
    bars.transition()
        .attr("x", (d, i) => xScale(i))
        .attr("y", d => h - yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => yScale(d))
        .attr("fill", (d, i) => gradient(i / dataset.length));

    const labels = svg.selectAll("text").data(dataset);
 
    labels.exit() // Gets the "exit" selection.
        .transition() // Smoothly pushes the text to the right of the canvas.
        .attr("x", w)
        .remove(); // The removes the bar.

    // Updates the position and width of the remaining text elements.
    labels.transition()
        .text(d => d)
        .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr("y", d => h - yScale(d) - 8)
        .attr("width", xScale.bandwidth());
});
