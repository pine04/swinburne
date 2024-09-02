// The maximum value of a data item.
const MAX_VALUE = 25;
// The number of data items that will be generated.
const ITEM_COUNT = 25;

// Constants for drawing the bar chart.
const w = 800, h = 300;

// Colors for drawing the chart.
const gradient = d3.interpolate("rgb(29, 43, 83)", "rgb(255, 0, 77)");

// Creates an SVG element inside "body" with the specified width and height attributes.
const svg = d3.select("#canvas")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Generates a random array of data items.
function generateData() {
    let dataArray = [];
    let val;

    for (let i = 0; i < ITEM_COUNT; i++) {
        val = Math.round(Math.random() * MAX_VALUE);
        dataArray.push(val);
    }

    return dataArray;
}

// Draws the data items as a bar chart.
function drawData(svg, data) {
    // Regenerate the X scale based on the new data.
    xScale = d3.scaleBand()
                .domain(data.map((d, i) => i))
                .rangeRound([0, w])
                .paddingInner(0.1);
    
    // Regenerate the Y scale based on the new data.
    yScale = d3.scaleLinear()
                .domain([0, d3.max(data) + 3])
                .range([h, 0]);
    
    // Drawing the bars.
    let bars = svg.selectAll("rect") // Selects all rect elements in the SVG.
                    .data(data); // Associates the dataset with the selection.

    // The "update" selection.
    bars.transition() // Adds a smooth transition to y and height.
        .attr("y", d => yScale(d))        
        .attr("height", d => h - yScale(d));
        
    bars.enter() // Gets the "enter" selection.
        .append("rect") // For each data item, add a "rect" to the SVG.
        .attr("x", (d, i) => xScale(i))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => h - yScale(d))
        .attr("fill", (d, i) => gradient(i / ITEM_COUNT));
    
    // Drawing the labels.
    let labels = svg.selectAll("text") // Selects all text elements in the SVG.
                    .data(data); // Associates the dataset with the selection.

    // The "update" selection.
    labels.text(d => d)
        .transition() // Adds a smooth transition to y.
        .attr("y", d => yScale(d) - 8);

    labels.enter() // Gets the "enter" selection.
        .append("text") // For each data item, add a "text" to the SVG.
        .text(d => d)
        .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d) - 8)
        .attr("width", xScale.bandwidth())
        .attr("fill", "rgb(29, 43, 83)")
        .attr("font-family", "Arial, sans-serif")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle");
}

// The event handler for the button.
d3.select("#update").on("click", () => {
    drawData(svg, generateData());
});

// Initial data generation and drawing.
drawData(svg, generateData());