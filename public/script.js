//const url = "https://api.transport.nsw.gov.au/v1/publictransport/timetables/complete/gtfs"
//var apiKey = ""
console.log('Hello from script.js!');

const refreshBtn = document.getElementById("refresh-button")
const searchBtn = document.getElementById("search-button")
const startSearch = document.getElementById("start-search")
const endSearch = document.getElementById("end-search")

const readCsv = require('/gtfs-utils/read-csv');
const readStops = require('/gtfs-utils/read-stops');

const readFile = name => readCsv('gtfs/' + name + '.txt');

async function main() {
    const stops = await readStops(readFile, {
        stop: s => s.stop_id[0] === 'a',
    });

    for await (const stop of stops.values()) {
        console.log(stop);
        break;
    }
}

// Call the main function
main();

//refreshBtn.addEventListener("click", loadApi());



