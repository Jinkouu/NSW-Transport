//fetch(url, {
//    method: 'GET',
//    headers: {
//        'Authorization': 'Bearer ${apiKey}'
//    },
//})
//    .then(response => {
//        if (!response.ok) {
//            throw new Error(`Request failed with status: ${response.status}`)
//        }
//        return response.json();
//    })
//    .then(data => {
//        console.log(data);
//    })
//    .catch(error => {
//        console.error(error);
//    });
    

const refreshBtn = document.getElementById("refresh-button")
const searchBtn = document.getElementById("search-button")
const startSearch = document.getElementById("start-search")
const endSearch = document.getElementById("end-search")
const startDropdownSearch = document.getElementById("start-search-dropdown")

startDropdownSearch.addEventListener("input", ()=>{

})

startSearch.addEventListener("click", ()=>{
    startDropdownSearch.style.display = (startDropdownSearch.style.display === "none") ? "flex" : "none";
})

//async function check()

searchBtn.addEventListener("click", ()=>{
    const location = startSearch.value;
    const params = {
        outputFormat: 'rapidJSON',
        type_sf: 'any',
        name_sf: `${location}`,
        coordOutputFormat: 'EPSG:4326',
        anyMaxSizeHitList: 10
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
    }).then(res => res.json()).then(data => {
        console.log(data);
        var bestMatch = null; 
        var locations = data;
        //console.log(locations);
        bestMatch = locations.find(location => location.isBest === true);

        if (bestMatch){
            const locationId = bestMatch.id;
            const name = bestMatch.name;
            console.log(locationId);
            console.log(name);
        }
        setLocationData(data, place.formatted_address)
    })
})

// Call the main function


//refreshBtn.addEventListener("click", loadApi());





