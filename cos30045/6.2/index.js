// The maximum value of a data item.
const MAX_VALUE = 25;
// The number of data items that will be generated.
const ITEM_COUNT = 25;
const CANVAS_PADDING = 32

// Initially, the dataset is an array of 25 random integers.
let dataset = [];
for (let i = 0; i < ITEM_COUNT; i++) {
    val = Math.round(Math.random() * MAX_VALUE);
    dataset.push(val);
}

// Constants for drawing the bar chart.
const w = 800 + CANVAS_PADDING * 2;
const h = 300 + CANVAS_PADDING * 2;

// Colors for drawing the chart.
const baseBarColor = "rgb(255, 0, 77)";
const highlightColor = "rgb(250, 239, 93)";
const labelColor = "rgb(29, 43, 83)";

// Creates an SVG element inside "body" with the specified width and height attributes.
const svg = d3.select("#canvas")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

const xScale = d3.scaleBand()
                .domain(dataset.map((d, i) => i))
                .rangeRound([CANVAS_PADDING, w - CANVAS_PADDING])
                .paddingInner(0.1);

const yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset)])
                .range([0, h - CANVAS_PADDING * 2]);
   
const xAxisGroup = svg.append("g").attr("transform", `translate(0, ${h - CANVAS_PADDING})`);
const xAxis = d3.axisBottom(xScale);
xAxisGroup.call(xAxis);
                
const yAxisScale = yScale.copy().range([h - CANVAS_PADDING, CANVAS_PADDING])
const yAxisGroup = svg.append("g").attr("transform", `translate(${CANVAS_PADDING})`);
const yAxis = d3.axisLeft(yAxisScale);
yAxisGroup.call(yAxis);

// Draws the initial bar chart.
svg.selectAll("rect")
    .data(dataset)
    .enter() // Gets the "enter" selection.
    .append("rect") // For each data item, add a "rect" to the SVG.
    .each(function (d, i) { this.index = i })
    .attr("x", (d, i) => xScale(i))
    .attr("y", d => h - CANVAS_PADDING - yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", d => yScale(d))
    .attr("fill", baseBarColor)
    .on("mouseover", function (e, d) { 
        d3.select(this)
            .transition("highlight")
            .duration(150)
            .attr("fill", highlightColor);

        svg.append("text") // For each data item, add a "text" to the SVG.
            .text(d)
            .attr("id", "label")
            .attr("x", xScale(this.index) + xScale.bandwidth() / 2)
            .attr("y", d === 1 ? h - CANVAS_PADDING - yScale(d) - 8 : h - CANVAS_PADDING - yScale(d) + 20)
            .attr("width", xScale.bandwidth())
            .attr("fill", "transparent")
            .attr("font-family", "Arial, sans-serif")
            .attr("font-weight", "bold")
            .attr("text-anchor", "middle")
            .transition()
            .duration(200)
            .attr("fill", labelColor);
    })
    .on("mouseout", function() { 
        d3.select(this)
            .transition("highlight")
            .duration(150)
            .attr("fill", baseBarColor)

        svg.select("#label")
            .remove();
    });

d3.select("#add").on("click", () => {
    // Adds a data item.
    dataset.push(Math.round(Math.random() * MAX_VALUE));

    // Updates the X and Y scales to match the new data.
    xScale.domain(dataset.map((d, i) => i));
    yScale.domain([0, d3.max(dataset)]);
    yAxisScale.domain([0, d3.max(dataset)]);

    const bars = svg.selectAll("rect").data(dataset);

    bars.enter() // Gets the "enter" selection.
        .append("rect") // For each new data item, add a "rect" to the SVG.
        .attr("x", w) // Adds some attributes upfront for the new elements.
        .attr("y", d => h - CANVAS_PADDING - yScale(d))
        .attr("height", d => yScale(d))
        .attr("fill", baseBarColor)
        .merge(bars) // After merging, we have to update the attributes of elements in both enter and update.
        .each(function (d, i) { this.index = i })
        .on("mouseover", function (e, d) { 
            d3.select(this)
                .transition("highlight")
                .duration(150)
                .attr("fill", highlightColor);
    
            svg.append("text") // For each data item, add a "text" to the SVG.
                .text(d)
                .attr("id", "label")
                .attr("x", xScale(this.index) + xScale.bandwidth() / 2)
                .attr("y", d === 1 ? h - CANVAS_PADDING - yScale(d) - 8 : h - CANVAS_PADDING - yScale(d) + 20)
                .attr("width", xScale.bandwidth())
                .attr("fill", "transparent")
                .attr("font-family", "Arial, sans-serif")
                .attr("font-weight", "bold")
                .attr("text-anchor", "middle")
                .transition()
                .duration(200)
                .attr("fill", labelColor);
        })
        .on("mouseout", function() { 
            d3.select(this)
                .transition("highlight")
                .duration(150)
                .attr("fill", baseBarColor)
    
            svg.select("#label")
                .remove();
        })
        .transition()
        .attr("x", (d, i) => xScale(i))
        .attr("y", d => h - CANVAS_PADDING - yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => yScale(d));
    
    xAxisGroup.transition().call(xAxis);
    yAxisGroup.transition().call(yAxis);
});

d3.select("#removeFirst").on("click", () => {
    svg.select("rect:first-of-type") // Gets the "exit" selection.
        .classed("removing", true)
        .transition() // Smoothly pushes the bar to the right of the canvas.
        .attr("x", -xScale.bandwidth())
        .remove(); // The removes the bar.

    // Removes a data item.
    dataset.shift();

    // Updates the X and Y scales to match the new data.
    xScale.domain(dataset.map((d, i) => i));
    yScale.domain([0, d3.max(dataset)]);
    yAxisScale.domain([0, d3.max(dataset)]);

    const bars = svg.selectAll("rect")
                    .filter(function () { return !this.classList.contains("removing") })
                    .data(dataset);

    // Updates the position, width, and color of the remaining bars.
    bars.each(function (d, i) { this.index = i })
        .transition()
        .attr("x", (d, i) => xScale(i))
        .attr("y", d => h - CANVAS_PADDING - yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => yScale(d));

    xAxisGroup.transition().call(xAxis);
    yAxisGroup.transition().call(yAxis);
});

d3.select("#removeLast").on("click", () => {
    // Removes a data item.
    dataset.pop();

    // Updates the X and Y scales to match the new data.
    xScale.domain(dataset.map((d, i) => i));
    yScale.domain([0, d3.max(dataset)]);
    yAxisScale.domain([0, d3.max(dataset)]);

    const bars = svg.selectAll("rect").data(dataset);

    bars.exit() // Gets the "exit" selection.
        .classed("removing", true)
        .transition() // Smoothly pushes the bar to the right of the canvas.
        .attr("x", w)
        .remove(); // The removes the bar.

    // Updates the position, width, and color of the remaining bars.
    bars.transition()
        .attr("x", (d, i) => xScale(i))
        .attr("y", d => h - CANVAS_PADDING - yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => yScale(d));

    xAxisGroup.transition().call(xAxis);
    yAxisGroup.transition().call(yAxis);
});

d3.select("#sortAsc").on("click", () => {
    dataset.sort(d3.ascending); // This ensures the old dataset is sorted even after a new data item is added/removed.

    svg.selectAll("rect")
        .filter(function () { return !this.classList.contains("removing") })
        .sort((a, b) => d3.ascending(a, b))
        .each(function (d, i) { this.index = i })
        .transition()
        .delay((d, i) => i / dataset.length * 1500)
        .attr("x", (d, i) => xScale(i));
});

d3.select("#sortDsc").on("click", () => {
    dataset.sort(d3.descending); // This ensures the old dataset is sorted even after a new data item is added/removed.

    svg.selectAll("rect")
        .filter(function () { return !this.classList.contains("removing") })
        .sort((a, b) => d3.descending(a, b))
        .each(function (d, i) { this.index = i })
        .transition()
        .delay((d, i) => i / dataset.length * 1500)
        .attr("x", (d, i) => xScale(i));
});