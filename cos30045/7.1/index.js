// Dimension and color constants.
const WIDTH = 800;
const HEIGHT = 400;
const PADDING = 64;

const HIGHLIGHT_COLOR = "rgb(255, 0, 77)";
const TOOLTIP_BG_COLOR = "rgb(250, 239, 93)";
const TOOLTIP_TEXT_COLOR = "rgb(29, 43, 83)";

// Two svg canvases for two types of chart.
const svgLineChart = d3.select("#canvas")
                        .append("svg")
                        .attr("width", WIDTH)
                        .attr("height", HEIGHT);

const svgAreaChart = d3.select("#canvas")
                        .append("svg")
                        .attr("width", WIDTH)
                        .attr("height", HEIGHT);

// Reads, processes, and draws the data as a line chart and an area chart.
d3.csv(
    "Unemployment_78-95.csv", 
    processDataItem
).then(data => {
    drawLineChart(svgLineChart, data);
    drawAreaChart(svgAreaChart, data);
});

// Data processing function, each data item is mapped to an object with properties date and number.
function processDataItem(dataItem) {
    return {
        date: new Date(+dataItem.year, +dataItem.month - 1),
        number: +dataItem.number
    }
}

// Draws the line chart of "data" on the given "svg".
function drawLineChart(svg, data) {
    // The x and y scales.
    const xScale = d3.scaleTime()
                        .domain(d3.extent(data, (d) => d.date))
                        .range([PADDING, WIDTH - PADDING]);
    const yScale = d3.scaleLinear()
                        .domain([0, d3.max(data, (d) => d.number)])
                        .range([HEIGHT - PADDING, PADDING]);

    // The reversed x and y scales, used for calculating the date and number values from x y coords.
    const reverseXScale = d3.scaleTime()
                            .domain(xScale.range())
                            .range(xScale.domain());
    const reverseYScale = d3.scaleTime()
                            .domain(yScale.range())
                            .range(yScale.domain());

    // The groups in which the axes will be drawn.
    const xAxisGroup = svg.append("g")
                            .attr("id", "xAxis")
                            .attr("transform", `translate(0, ${HEIGHT - PADDING})`);
    const yAxisGroup = svg.append("g")
                            .attr("id", "yAxis")
                            .attr("transform", `translate(${PADDING})`);

    // The x and y axes.
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Draws the axes.
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    // Generates the line from the data.
    const line = d3.line()
                    .x(d => xScale(d.date))
                    .y(d => yScale(d.number));

    // Draws the line.
    svg.append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", TOOLTIP_TEXT_COLOR)
        .attr("opacity", 0.5)
        .attr("stroke-width", 2)
        .on("mousemove", function (event) {
            // Makes the line pop out.
            d3.select(this).transition().attr("opacity", 1);

            // Creates SVG elements for the hover feature as needed if they do not already exist.
            if (svg.select("#horizontalLine").size() === 0) {
                svg.append("line")
                    .attr("id", "horizontalLine")                  
                    .attr("stroke", TOOLTIP_TEXT_COLOR)
                    .attr("stroke-dasharray", 4);
            }

            if (svg.select("#verticalLine").size() === 0) {
                svg.append("line")
                    .attr("id", "verticalLine")
                    .attr("stroke", TOOLTIP_TEXT_COLOR)
                    .attr("stroke-dasharray", 4);
            }

            if (svg.select("#point").size() === 0) {
                svg.append("circle")
                    .attr("id", "point")
                    .attr("r", 5)
                    .attr("fill", HIGHLIGHT_COLOR);
            }

            if (svg.select("#tooltipBackground").size() === 0) {
                svg.append("rect")
                    .attr("id", "tooltipBackground")
                    .attr("fill", TOOLTIP_BG_COLOR);
            }

            if (svg.select("#tooltip").size() === 0) {
                svg.append("text")
                    .attr("id", "tooltip")
                    .attr("fill", TOOLTIP_TEXT_COLOR)
                    .attr("font-family", "Arial, sans-serif")
                    .attr("alignment-baseline", "hanging");
            }

            // The position of the user's mouse.
            const [x, y] = d3.pointer(event);

            // Positions the horizontal and vertical lines correctly based on the user's mouse.
            svg.select("#horizontalLine")
                .attr("x1", PADDING)  
                .attr("y1", y)
                .attr("x2", x)
                .attr("y2", y);

            svg.select("#verticalLine")
                .attr("x1", x)
                .attr("y1", y)
                .attr("x2", x)
                .attr("y2", HEIGHT - PADDING);

            // Positions a red point at the hover position.
            svg.select("#point")
                .attr("cx", x)
                .attr("cy", y);

            // Updates the text in the tooltip box.
            svg.select("#tooltip")
                .text(`${dateString(reverseXScale(x))} - ${Math.round(reverseYScale(y))} unemployed.`);
            
            // Calculates the dimensions of the tooltip text to correctly size the yellow background.
            const {
                width: textWidth, 
                height: textHeight
            } = document.querySelector("#tooltip").getBBox();

            const tooltipBoxX = Math.min(x + 24, WIDTH - PADDING - textWidth - 24);
            const tooltipBoxY = y + 24;

            // Positions the tooltip text.
            svg.select("#tooltip")
                .attr("x", tooltipBoxX + 12)
                .attr("y", tooltipBoxY + 12);

            // Positions the yellow background of the tooltip.
            svg.select("#tooltipBackground")
                .attr("x", tooltipBoxX)
                .attr("y", tooltipBoxY)
                .attr("width", textWidth + 24)
                .attr("height", textHeight + 24);

            // Blurs out the red threshold line to make the tooltip more readable.
            svg.select("#thresholdLine").transition().attr("opacity", 0.25);
            svg.select("#thresholdText").transition().attr("opacity", 0.25);
        })
        .on("mouseout", function () {
            // Resets everything back to normal when the user unhovers the line.
            d3.select(this).transition().attr("opacity", 0.5);

            svg.select("#thresholdLine").transition().attr("opacity", 1);
            svg.select("#thresholdText").transition().attr("opacity", 1);

            // ELements for the hover effect are removed.
            svg.select("#point").remove();
            svg.select("#horizontalLine").remove();
            svg.select("#verticalLine").remove();

            svg.select("#tooltip").remove();
            svg.select("#tooltipBackground").remove();
        })
    
    // Draws the threshold line and text.
    svg.append("line")
        .attr("id", "thresholdLine")
        .attr("x1", PADDING)
        .attr("y1", yScale(500000))
        .attr("x2", WIDTH - PADDING)
        .attr("y2", yScale(500000))
        .attr("stroke", HIGHLIGHT_COLOR)
        .attr("stroke-dasharray", 8);

    svg.append("text")
        .attr("id", "thresholdText")
        .attr("x", PADDING + 8)
        .attr("y", yScale(500000) - 8)
        .attr("fill", HIGHLIGHT_COLOR)
        .attr("font-family", "Arial, sans-serif")
        .attr("font-weight", "bold")
        .text("Half a million unemployed");
}

function drawAreaChart(svg, data) {
    // The x and y scales.
    const xScale = d3.scaleTime()
                        .domain(d3.extent(data, (d) => d.date))
                        .range([PADDING, WIDTH - PADDING]);
    const yScale = d3.scaleLinear()
                        .domain([0, d3.max(data, (d) => d.number)])
                        .range([HEIGHT - PADDING, PADDING]);

    // The groups in which the axes will be drawn.
    const xAxisGroup = svg.append("g")
                            .attr("id", "xAxis")
                            .attr("transform", `translate(0, ${HEIGHT - PADDING})`);
    const yAxisGroup = svg.append("g")
                            .attr("id", "yAxis")
                            .attr("transform", `translate(${PADDING})`);

    // The x and y axes.
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Draws the axes.
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    // Generates the area from the data.
    const area = d3.area()
                    .x(d => xScale(d.date))
                    .y0(yScale(0))
                    .y1(d => yScale(d.number));

    // Draws the area.
    svg.append("path")
        .datum(data)
        .attr("d", area)
        .attr("fill", TOOLTIP_TEXT_COLOR)
        .attr("opacity", 0.25);

    // Draws the threshold line and text.
    svg.append("line")
        .attr("id", "thresholdLine")
        .attr("x1", PADDING)
        .attr("y1", yScale(500000))
        .attr("x2", WIDTH - PADDING)
        .attr("y2", yScale(500000))
        .attr("stroke", HIGHLIGHT_COLOR)
        .attr("stroke-dasharray", 8);

    svg.append("text")
        .attr("id", "thresholdText")
        .attr("x", PADDING + 8)
        .attr("y", yScale(500000) - 8)
        .attr("fill", HIGHLIGHT_COLOR)
        .attr("font-family", "Arial, sans-serif")
        .attr("font-weight", "bold")
        .text("Half a million unemployed");
}

// Returns a date string in the format "DD/MM/YYYY" from a Date object.
function dateString(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}