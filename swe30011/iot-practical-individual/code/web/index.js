drawLineChart("#chart", []);
const temperatureSummary = document.querySelector("#tempSummary");
const presenceEventList = document.querySelector("#presenceEventList");

setInterval(async () => {
    try {
        const response = await fetch("/assignment_2/temperature.php");
        const rawData = await response.json();

        let chartData = rawData.map(record => {
            return {
                time: new Date(record["Time"]),
                value: record["Value"]
            };
        });

        const latestReadingTime = d3.max(chartData, d => d.time);

        chartData = chartData.filter(record => latestReadingTime.getTime() - record.time.getTime() <= 20000);

        drawLineChart("#chart", chartData);

        const min = d3.min(chartData, d => d.value);
        const max = d3.max(chartData, d => d.value);
        const mean = d3.mean(chartData, d => d.value);
        temperatureSummary.textContent = `Min: ${min}; Max: ${max}; Mean: ${mean.toFixed(2)} (degrees Celcius)`;
    } catch (error) {
        console.log(error);
    }
}, 1000);

setInterval(async () => {
    try {
        const response = await fetch("/assignment_2/human_presence.php");
        const rawData = await response.json();

        presenceEventList.innerHTML = "";
        if (rawData.length === 0) {
            presenceEventList.innerHTML = "<li>No one has been in your house recently.</li>";
        } else {
            rawData.forEach(record => {
                const li = document.createElement("li");
                const from = new Date(record["FromTime"]);
                const to = new Date(record["ToTime"]);
                const durationMs = to.getTime() - from.getTime();
                li.textContent = `${msToHMS(durationMs)} from ${from.toLocaleString()} to ${to.toLocaleString()}.`;
                presenceEventList.appendChild(li);
            });
        }
    } catch (error) {
        console.log(error);
    }
}, 1000);

function msToHMS(ms) {
    let seconds = Math.floor(ms / 1000);
    let hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    return `${hours} hour(s), ${minutes} minute(s), ${seconds} second(s)`;
}
