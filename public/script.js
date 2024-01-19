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
    

const refreshBtn = document.getElementById("refresh-button");
const searchBtn = document.getElementById("search-button");
const startSearch = document.getElementById("start-search");
const endSearch = document.getElementById("end-search");
const startDropdownSearch = document.getElementById("start-search-dropdown");
const startSearchBox = document.getElementById("start-search-dropdown-search");

//start search dropdown
startSearch.addEventListener("click", ()=>{
    startSearch.blur();
    startDropdownSearch.style.display = "flex";
    startSearchBox.focus();
    var val = startSearch.value;
    startSearchBox.value = '';
    startSearchBox.value = val;
});
startDropdownSearch.addEventListener("click", (e) =>{
    e.stopPropagation();
});
document.addEventListener("mouseup", (e)=> {
    if(e.target != startDropdownSearch && e.target.parentNode != startDropdownSearch){
        startDropdownSearch.style.display = "none";
    }
});

//start search dropdown
//api call to find valid locations
startSearchBox.addEventListener("keyup", ()=>{
    const location = startSearchBox.value;
    var stations = [];
    if(location.length){
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
        }).then(res => res.json()).then(data => {
            //console.log(data);
            data.forEach((entry) => stations.push(entry.name));
            console.log(stations);
            displayStartResult(stations);
        })
    }
})
const resultsBox = document.querySelector(".result-box");
//updates the html to add location to the dropdown
function displayStartResult(result){
    const content = result.map((list) => {
        return "<li onclick=selectInput(this)>" + list + "</li>";
    });

    resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}
//selects the corresponding input
function selectInput(list){
    startSearch.value = list.innerHTML;
    startDropdownSearch.style.display = "none";
}


searchBtn.addEventListener("click", ()=>{
    
})

// Call the main function


//refreshBtn.addEventListener("click", loadApi());





