const margins = { top: 20, right: 80, bottom: 20, left: 80 };
const width = 1700 - margins.left - margins.right;
const height = 500 - margins.top - margins.bottom;

function drawLineChart(root, data, color = "rgb(242, 142, 44)") {
    const rootElement = d3.select(root);

    const svg = rootElement.select("svg").node()
        ? rootElement.select("svg").select("g")
        : rootElement.append("svg")
            .attr("width", width + margins.left + margins.right)
            .attr("height", height + margins.top + margins.bottom)
            .append("g")
            .attr("transform", `translate(${margins.left}, ${margins.top})`);

    const time = data.map(d => d.time);

    const xScale = d3
        .scaleTime()
        .domain(d3.extent(time))
        .range([0, width]);

    const yScale = d3
        .scaleLinear()
        .domain([-10, 60])
        .range([height, 0]);

    const xGroup = svg.select("#xAxis").node()
        ? svg.select("#xAxis")
        : svg.append("g")
            .attr("id", "xAxis")
            .attr("font-weight", "bold")
            .attr("font-size", "16px")
            .attr("transform", "translate(0," + yScale(0) + ")");

    const yGroup = svg.select("#yAxis").node()
        ? svg.select("#yAxis")
        : svg.append("g")
            .attr("id", "yAxis")
            .attr("font-weight", "bold")
            .attr("font-size", "16px");

    const linePath = svg.select("#linePath").node()
        ? svg.select("#linePath")
        : svg.append("path")
            .attr("id", "linePath")
            .attr("stroke-width", "2")
            .style("fill", "none");

    xGroup.transition()
        .duration(300)
        .call(d3.axisBottom(xScale).ticks(d3.timeSecond.every(1)).tickFormat(d3.timeFormat("%H:%M:%S")));

    xGroup.selectAll("text")
        .attr("font-weight", "bold")
        .attr("font-size", "12px");

    yGroup.transition()
        .duration(300)
        .call(d3.axisLeft(yScale));

    yGroup.selectAll("text")
        .attr("font-weight", "bold")
        .attr("font-size", "14px");

    const line = d3.line()
        .x(d => xScale(d.time))
        .y(d => yScale(d.value));

    linePath.attr("stroke", color)
        .transition()
        .duration(300)
        .attr("d", line(data));

    svg.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("r", 4)
        .attr("stroke", color)
        .attr("fill", "white")
        .transition()
        .duration(300)
        .attr("cx", d => xScale(d.time))
        .attr("cy", d => yScale(d.value));
}