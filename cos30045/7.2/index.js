// Constants related to the size of the canvas, position of the chart, and data set.
const WIDTH = 800;
const HEIGHT = 400;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;
const OUTER_RADIUS = 150;
const INNER_RADIUS = 0;
const DATA_ITEM_COUNT = 10;
const DATA_MAX = 50;

// Creates the SVG element.
const svg = d3.select("#canvas")
                .append("svg")
                .attr("width", WIDTH)
                .attr("height", HEIGHT);

// The group element in which the pie chart will be drawn.
const pieGroup = svg.append("g")
                    .attr("id", "pieGroup")
                    .attr("transform", `translate(${CENTER_X}, ${CENTER_Y})`);

// Creates the color scheme.
const colorScheme = d3.schemeCategory10;

// Creates an arc generator.
const arcGenerator = d3.arc()
                        .outerRadius(OUTER_RADIUS)
                        .innerRadius(INNER_RADIUS);

// Creates a pie generator.
const pieGenerator = d3.pie();

// Randomly generates the dataset.
function generateData() {
    let data = [];

    for (let i = 0; i < DATA_ITEM_COUNT; i++) {
        data.push(Math.ceil(Math.random() * DATA_MAX));
    }

    return data;
}

// Draws the pie chart using the given dataset.
function drawPieChart(data) {
    // Generates the arc data using the pie generator.
    const arcs = pieGenerator(data);

    // Associate each arc with a path.
    const pieSegments = pieGroup.selectAll("path")
                                .data(arcs, function (d, i) { return d ? i : this.id});

    // Draws the arcs as paths.
    pieSegments.enter()
                .append("path")
                .attr("id", (d, i) => i)
                .merge(pieSegments)
                .each(function () {
                    this.oldStartAngle = this.oldStartAngle || 0.0;
                    this.oldEndAngle = this.oldEndAngle || 0.0;
                })
                .attr("fill", function () { return colorScheme[this.id] })
                .transition()
                .duration(2000)
                // This tween is used for animating the arc when the data changes.
                // The arc will open up or narrow down like a fan.
                .attrTween("d", function (d) {
                    const startInterpolator = d3.interpolate(this.oldStartAngle, d.startAngle);
                    const endInterpolator = d3.interpolate(this.oldEndAngle, d.endAngle);

                    this.oldStartAngle = d.startAngle;
                    this.oldEndAngle = d.endAngle;

                    return function (t) {
                        d.startAngle = startInterpolator(t);
                        d.endAngle = endInterpolator(t);

                        return arcGenerator(d);
                    }
                });
    
    // Associates each arc with a text label.
    const labels = pieGroup.selectAll("text")
                            .data(arcs);
    
    // Draws the labels.
    labels.enter()
        .append("text")
        .attr("font-family", "Arial, sans-serif")
        .attr("font-weight", "bold")
        .attr("dominant-baseline", "middle")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .merge(labels)
        .attr("opacity", 0)
        .text((d) => d.data)
        // Moves the label outside the arc if it is too small.
        .attr("transform", (d) => {
            let position = arcGenerator.centroid(d);

            if (Math.abs(d.startAngle - d.endAngle) < 0.2) {
                position = position.map(c => c * 2.2);
            }

            return `translate(${position})`;
        })
        .transition()
        .delay(2000)
        .duration(0)
        .attr("opacity", 1);
}

// Event handler which redraws the pie chart with new data.
d3.select("#update").on("click", () => {
    drawPieChart(generateData());
});

drawPieChart(generateData());