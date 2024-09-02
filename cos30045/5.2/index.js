// The maximum value of a data item.
const MAX_VALUE = 25;
// The number of data items that will be generated.
const MAX_ITEM_COUNT = 25;
// The duration of the transition, in milliseconds.
const TRANSITION_DURATION = 750;

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
    let item_count = Math.round((Math.random() / 2 + 0.5) * MAX_ITEM_COUNT)
    let val;    

    for (let i = 0; i < item_count; i++) {
        val = Math.round(Math.random() * MAX_VALUE);
        dataArray.push(val);
    }

    return dataArray;
}

// Draws the data items as a bar chart.
function drawData(svg, data, easeType) {
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

    // The removed bars slide to the right before disappearing.
    bars.exit()
        .transition()
        .duration(TRANSITION_DURATION)
        .attr("x", w)
        .remove();

    // Before the transition, new bars have 0 height and are positioned at the
    // bottom of the canvas. After the transition, they grow to the correct
    // size. Existing bars are also updated to match the dataset.
    bars.enter()
        .append("rect")
        .attr("x", (d, i) => xScale(i))
        .attr("y", h)        
        .attr("width", xScale.bandwidth())
        .merge(bars)
        .attr("fill", (d, i) => gradient(i / data.length))
        .transition()
        .delay((d, i) => (i / data.length) * TRANSITION_DURATION)
        .ease(easeType)
        .attr("x", (d, i) => xScale(i))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => h - yScale(d));

    // Drawing the labels.
    let labels = svg.selectAll("text") // Selects all text elements in the SVG.
                    .data(data); // Associates the dataset with the selection.

    // The removed labels slide to the right before disappearing.
    labels.exit()
        .transition()
        .duration(TRANSITION_DURATION)
        .attr("x", w + xScale.bandwidth() / 2)
        .remove();

    // Before the transition, new labels are positioned below the canvas.
    // After the transition, they move to the correct position. 
    // Existing labels are also updated to match the dataset.
    labels.enter()
        .append("text")
        .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr("y", h + 16)
        .attr("fill", "rgb(29, 43, 83)")
        .attr("font-family", "Arial, sans-serif")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .merge(labels)
        .text(d => d)
        .attr("width", xScale.bandwidth())
        .transition()
        .delay((d, i) => (i / data.length) * TRANSITION_DURATION)
        .ease(easeType)
        .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d) - 8);
}

// The event handler for the button.
d3.select("#update").on("click", () => {
    drawData(svg, generateData(), d3.easeCubic);
});

d3.select("#updateExp").on("click", () => {
    drawData(svg, generateData(), d3.easeExp);
});

d3.select("#updateBounce").on("click", () => {
    drawData(svg, generateData(), d3.easeBounce);
});

// Initial data generation and drawing.
drawData(svg, generateData(), d3.easeCubic);