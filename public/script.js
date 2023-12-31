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
        //setLocationData(data, place.formatted_address)
    })
})

// Call the main function


//refreshBtn.addEventListener("click", loadApi());





