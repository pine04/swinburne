// Constants related to the size of the canvas.
const WIDTH = 500;
const HEIGHT = 300;

// Creates the SVG element.
const svg = d3.select("#canvas")
                .append("svg")
                .attr("width", WIDTH)
                .attr("height", HEIGHT);

// Creates a projector which projects points in GeoJSON onto the canvas.
// Sets the center of projection to [145, -36.5].
// The center of the projection is drawn in the center of the canvas.
// The projection is scaled up by a factor of 2450 to make the map visible.
const projection = d3.geoMercator()
                        .center([145, -36.5])
                        .translate([WIDTH / 2, HEIGHT / 2])
                        .scale(2450);

// Creates a path generator using the projector above.
// This path generator will take in the data associated with each path element
// and generate the SVG path data for them.
const path = d3.geoPath().projection(projection);

// Reads data from the GeoJSON file and draws the paths using that data.
d3.json("LGA_VIC.json").then(json => {
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("fill", "gray")
        .attr("d", path);
});