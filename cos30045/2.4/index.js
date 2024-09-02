// Reads the data from the CSV file.
// When the data is ready, create the bar chart from it.
d3.csv("Lab2.4.csv").then((data) => {
    console.log(data);
    barChart(data);
});

// Constants for the bar chart.
const w = 500, h = 120, barPadding = 5;

function barChart(dataset) {
    // Creates an SVG element with the specified width and height attributes in the div with id #chart above the footer.
    let svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

    // Drawing the bars.
    svg.selectAll("rect") // Selects all rect elements in the SVG.
        .data(dataset) // Associates the dataset with the selection.
        .enter() // Gets the "enter" selection.
        .append("rect") // For each data item, add a "rect" to the SVG.
        .attr("x", (d, i) => (w / dataset.length) * i)
        .attr("y", d => h - d["wombats"] * 4)
        .attr("width", w / dataset.length - barPadding)
        .attr("height", d => d["wombats"] * 4)
        .attr("fill", d => d["wombats"] > 12 ? "rgb(255, 0, 77)" : "rgb(29, 43, 83)"); // If the data is greater than 10, make it red.
    
    // Drawing the labels.
    svg.selectAll("text") // Selects all text elements in the SVG.
        .data(dataset) // Associates the dataset with the selection.
        .enter() // Gets the "enter" selection.
        .append("text") // For each data item, add a "text" to the SVG.
        .text(d => d["wombats"])
        .attr("x", (d, i) => (w / dataset.length) * i + (w / dataset.length - barPadding) / 2)
        .attr("y", d => h - d["wombats"] * 4 + 16)
        .attr("width", w / dataset.length - barPadding)
        .attr("fill", "white")
        .attr("font-family", "Arial, sans-serif")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle");
}