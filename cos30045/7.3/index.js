// Constants related to the size of the canvas.
const WIDTH = 800;
const HEIGHT = 400;
const PADDING = 64;

// The dataset.
const dataset = [
    { date: new Date("2024-03-01 00:00:00"), apples: 5, oranges: 10, grapes: 22 },
    { date: new Date("2024-03-02 00:00:00"), apples: 4, oranges: 12, grapes: 28 },
    { date: new Date("2024-03-03 00:00:00"), apples: 2, oranges: 19, grapes: 32 },
    { date: new Date("2024-03-04 00:00:00"), apples: 7, oranges: 23, grapes: 35 },
    { date: new Date("2024-03-05 00:00:00"), apples: 23, oranges: 17, grapes: 43 }
];

// Creates the SVG element.
const svg = d3.select("#canvas")
                .append("svg")
                .attr("width", WIDTH)
                .attr("height", HEIGHT);

// Creates a stack generator with the specified keys.
const stack = d3.stack().keys(["apples", "oranges", "grapes"]);

// Generates the data stacks.
const series = stack(dataset);

// Creates the X scale.
const xScale = d3.scaleBand()
                .domain(d3.map(dataset, (d, i) => i))
                .range([PADDING, WIDTH - PADDING])
                .paddingInner(0.1)
                .paddingOuter(0.2);

// Creates the Y scale.
const yScale = d3.scaleLinear()
                .domain([0, d3.max(dataset, (d) => d["apples"] + d["oranges"] + d["grapes"])])
                .range([HEIGHT - PADDING, PADDING]);

// Creates the color scheme.
const colorScheme = d3.schemeCategory10;

// Creates a group for each fruit category.
const groups = svg.selectAll("g")
                .data(series)
                .enter()
                .append("g")
                .style("fill", (d, i) => colorScheme[i]);

// For each fruit group, draw the rectangles on the stack.
const rects = groups.selectAll("rect")
                    .data(d => d)
                    .enter()
                    .append("rect")
                    .attr("x", (d, i) => xScale(i))
                    .attr("y", (d) => yScale(d[1]))
                    .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
                    .attr("width", xScale.bandwidth());

// Creates and draws the X and Y axes.
const xAxis = d3.axisBottom(xScale);

svg.append("g")
    .attr("transform", `translate(0, ${HEIGHT - PADDING})`)
    .call(xAxis);

const yAxis = d3.axisLeft(yScale);

svg.append("g")
    .attr("transform", `translate(${PADDING})`)
    .call(yAxis);


// THE PART BELOW HERE IS FOR TESTING.
/*
const newDataset = [];

dataset.forEach(d => {
    newDataset.push(
        {
            date: d.date,
            fruit: "apples",
            number: d.apples
        },
        {
            date: d.date,
            fruit: "oranges",
            number: d.oranges
        },
        {
            date: d.date,
            fruit: "grapes",
            number: d.grapes
        }
    )
})

const testStack = d3.stack()
.keys(["apples", "oranges", "grapes"])
.value(([, D], key) => D.get(key).number)
(d3.index(newDataset, d => d.date, d => d.fruit));

console.log(testStack); */