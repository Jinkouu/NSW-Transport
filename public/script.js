const refreshBtn = document.getElementById("refresh-button");
const searchBtn = document.getElementById("search-button");

var startLocationId = "";
var endLocationId = "";

//api call to find valid locations - calls server.js /stopFinder
function fetchLocations(location) {
    return new Promise((resolve, reject) => {
        const params = {
            outputFormat: 'rapidJSON',
            type_sf: 'any',
            name_sf: `${location}`,
            coordOutputFormat: 'EPSG:4326',
            anyMaxSizeHitList: 5
        };
        const queryString = new URLSearchParams(params).toString();
        fetch('/stopFinder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                queryString: `${queryString}`
            })
        })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
}
//api call to find valid locations

//----------start search related--------------
const startSearch = document.getElementById("start-search");
const startDropdownSearch = document.getElementById("start-search-dropdown");
const startSearchBox = document.getElementById("start-search-dropdown-search");
function completeStartSearch(){ //matches new input box values
    startSearch.blur();
    startDropdownSearch.style.display = "flex";
    startSearchBox.focus();
    var val = startSearch.value;
    startSearchBox.value = '';
    startSearchBox.value = val;
}
startSearch.addEventListener("click", ()=>{ //start search dropdown
    completeStartSearch()
    if (location.length) {
        fetchLocations(location)
            .then(data => {
                data.forEach((entry) => stations.push(entry.name));
                console.log(stations);
                displayStartResult(stations);
            })
            .catch(error => {
                console.error(error);
            });
    }
});
startSearchBox.addEventListener('keypress', (e) =>{ 
    if (e.key === 'Enter'){
        startDropdownSearch.style.display = "none";
    }
})
startSearchBox.addEventListener("keyup", ()=>{
    const location = startSearchBox.value;
    var stations = [];

    if (location.length) {
        fetchLocations(location)
            .then(data => {
                data.forEach((entry) => stations.push(entry));
                console.log(stations);
                displayStartResult(stations);
            })
            .catch(error => {
                console.error(error);
            });
    }
})
const startResultsBox = document.getElementById("start-result-box");
//updates the html to add location to the dropdown
function displayStartResult(stations){
    const content = stations.map((station) =>{
        const stationJSON = JSON.stringify(station);
        return "<li onclick='selectStartInput(" + stationJSON + ")'>" + station.name + "</li>";
    })

    startResultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}
//selects the corresponding input
function selectStartInput(station){
    console.log(station.disassembledName);
    startLocationId = station.id;
    startSearch.value = station.disassembledName;
    startDropdownSearch.style.display = "none";
}
//----------start search related--------------

//-------------------endsearch related-------------------
const endSearch = document.getElementById("end-search");
const endDropdownSearch = document.getElementById("end-search-dropdown");
const endSearchBox = document.getElementById("end-search-dropdown-search");
function completeEndSearch(){
    endSearch.blur();
    endDropdownSearch.style.display = "flex";
    endSearchBox.focus();
    var val = endSearch.value;
    endSearchBox.value = '';
    endSearchBox.value = val;
}
endSearch.addEventListener("click", ()=>{
    completeEndSearch()
    if (location.length) {
        fetchLocations(location)
            .then(data => {
                data.forEach((entry) => stations.push(entry.name));
                console.log(stations);
                displayEndResult(stations);
            })
            .catch(error => {
                console.error(error);
            });
    }
});
endSearchBox.addEventListener("keypress", (e) =>{
    if (e.key === "Enter"){
        endDropdownSearch.style.display = "none";
    }
})
endSearchBox.addEventListener("keyup", ()=>{
    const location = endSearchBox.value;
    var stations = [];

    if (location.length) {
        fetchLocations(location)
            .then(data => {
                data.forEach((entry) => stations.push(entry));
                console.log(stations);
                displayEndResult(stations);
            })
            .catch(error => {
                console.error(error);
            });
    }
})
const endResultsBox = document.getElementById("end-result-box");
//updates the html to add location to the dropdown
function displayEndResult(stations){
    const content = stations.map((station) =>{
        const stationJSON = JSON.stringify(station);
        return "<li onclick='selectEndInput(" + stationJSON + ")'>" + station.name + "</li>";
    })

    endResultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}
//selects the corresponding input
function selectEndInput(station){
    endLocationId = station.id;
    endSearch.value = station.disassembledName;
    endDropdownSearch.style.display = "none";
}
//-------------------endsearch related-------------------

document.addEventListener("mouseup", (e)=> {
    if(e.target != startDropdownSearch && e.target.parentNode != startDropdownSearch){
        startDropdownSearch.style.display = "none";
    }
    if(e.target != endDropdownSearch && e.target.parentNode != endDropdownSearch){
        endDropdownSearch.style.display = "none";
    }
});

//----------------------date and time picker ----------------
const formatInitialDate = (date) => {
    return date.toISOString().slice(0, 10);
}
const formatInitialTime = (date) => {
    return date.toTimeString().slice(0, 5);
};
function updateDateAndTime(){
    const dateInput = document.getElementById("date");
    const timeInput = document.getElementById("time");
    const currentDate = new Date();

    dateInput.value = formatInitialDate(currentDate);
    timeInput.value = formatInitialTime(currentDate);
}
updateDateAndTime(); //runs on start and sets time and date to current local time and date
//-------------------api call for trip-------------------
// Format the date and time
function formatDate(date) {
    return date.slice(0, 10).replace(/-/g, '');
}
function formatTime(time) {
    return time.slice(0, 5).replace(':', '');
}
function fetchTrips(startLocation, endLocation, date, time) {
    return new Promise((resolve, reject) => {
        const params = {
            outputFormat: 'rapidJSON',
            coordOutputFormat: 'EPSG:4326',
            depArrMacro: 'dep',
            itdDate: formatDate(date),
            itdTime: formatTime(time),
            type_origin: 'stop',
            name_origin: `${startLocation}`,
            type_destination: 'stop',
            name_destination: `${endLocation}`,
            TfNSWTR: 'true'
        };
        const queryString = new URLSearchParams(params).toString();
        fetch('/tripFinder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                queryString: `${queryString}`
            })
        })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
}

searchBtn.addEventListener("click", ()=>{
    //console.log(startLocationId + " " + endLocationId);
    //use global startlocationId and endlocationID, get time/date from input
    //216620 cabramatta
    //central station 200060
    const dateInput = document.getElementById("date");
    const timeInput = document.getElementById("time");
    //console.log(formatDate(dateInput.value));
    //fetchTrips(startLocationId, endLocationId, dateInput.value, timeInput.value)
    fetchTrips(216620, 200060, dateInput.value, timeInput.value)
        .then(data =>{
            console.log(data);
            data.forEach(journey =>{
                const legs = journey.legs;
                var fares = journey.fares;
                var totalDuration = 0;
                var summary = [];
                var legNumber = 0;

                var depart = null;
                var arrive = null;

                legs.forEach(leg =>{
                    totalDuration += leg.duration;
                    const origin = leg.origin;
                    const destination = leg.destination;

                    // Determine the trip departure time.
                    // This is indicated by the departure time of the first leg.
                    if(legNumber == 0){
                        depart = new Date(origin.departureTimePlanned);
                    }

                    if(legNumber == legs.length - 1){
                        arrive = new Date(origin.departureTimePlanned);
                    }

                    const transportation = leg.transportation;
                    const routeType = transportation.product.class;

                    switch(routeType){
                        case 1: summary.push('Train'); break;
                        case 4: summary.push('Light Rail'); break;
                        case 5: summary.push('Bus'); break;
                        case 7: summary.push('Coach'); break;
                        case 9: summary.push('Ferry'); break;
                        case 11: summary.push('School Bus'); break;
                        case 99: summary.push('Walk'); break;
                        case 100: summary.push('Walk'); break;
                        case 107: summary.push('Cycle'); break;
                    }
                    legNumber += 1;
                });

                var minutes = totalDuration/60;
                // Output the departure, arrival, and duration
                console.log(`${new Date(depart).toString()} - ${new Date(arrive).toString()} (${minutes} mins)`);
                            
                // Output the summary of leg types used for the trip
                console.log(summary.join(' -> ') + '\n\n');
            });
        })
        .catch(error => {
            console.error(error);
        });
})








