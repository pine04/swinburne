// Constants related to the size of the canvas.
const WIDTH = 750;
const HEIGHT = 450;

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
                        .scale(3675);

// Creates a path generator using the projector above.
// This path generator will take in the data associated with each path element
// and generate the SVG path data for them.
const path = d3.geoPath().projection(projection);

// Creates the color scale which will be used to color the map. At the moment
// its domain is not yet defined.
const colorScale = d3.scaleQuantize().range(['#fef0d9','#fdcc8a','#fc8d59','#e34a33','#b30000']);

// Async function to load the data from files and draw the choropleth map.
async function drawChoropleth() {
    try {
        // Loads the data from 3 files.
        const geoJSONData = await d3.json("LGA_VIC.json");
        const unemploymentData = await d3.csv("VIC_LGA_unemployment.csv");
        const cityData = await d3.csv("VIC_city.csv");

        console.log(geoJSONData)

        // Associates the unemployment data with each region of the geoJSON file.
        // Some regions do not have any data.
        geoJSONData.features.forEach(element => {
            const unemploymentOfLGA = unemploymentData.find((e) => e["LGA"] === element.properties["LGA_name"]);

            if (unemploymentOfLGA !== undefined) {
                element["unemployed"] = unemploymentOfLGA["unemployed"];
            }
        });

        // Defines the domain of the color scale.
        //colorScale.domain([0, d3.max(geoJSONData.features, (d) => d["unemployed"])]);
        colorScale.domain(d3.extent(geoJSONData.features, (d) => d["unemployed"]));

        // Draws the color legend.
        legend({
            color: colorScale,
            title: "Number of unemployed"
        });

        // Draws the filled paths, which will be colored based on the number of unemployed people.
        // Regions without data will be colored light gray.
        // Hovering on a region displays its name and number of unemployed.
        svg.selectAll("path.filled")
            .data(geoJSONData.features)
            .enter()
            .append("path")
            .attr("id", (d) => d.properties["LGA_name"])
            .attr("class", "filled")
            .attr("d", path)
            .attr("fill", (d) => d["unemployed"] !== undefined ? colorScale(d["unemployed"]) : "lightgray")
            .append("title")
            .text((d) => `${d.properties["LGA_name"]}\n${d["unemployed"] !== undefined ? d["unemployed"] : "No data"}`);

        // Draws the outline for the regions.
        svg.selectAll("path.outline")
            .data(geoJSONData.features)
            .enter()
            .append("path")
            .attr("class", "outline")
            .attr("d", path)
            .attr("fill", "none")
            .attr("stroke", "gray")
            .attr("stroke-width", "0.5");

        // Draws the circles representing the selected cities.
        svg.selectAll("circle")
            .data(cityData)
            .enter()
            .append("circle")
            .attr("cx", d => projection([d.lon, d.lat])[0])
            .attr("cy", d => projection([d.lon, d.lat])[1])
            .attr("r", 3)
            .attr("fill", "blue");

    } catch (error) {
        console.log(error.message);
    }
}

drawChoropleth();