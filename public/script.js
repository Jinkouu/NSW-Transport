const refreshBtn = document.getElementById("refresh-button");
const searchBtn = document.getElementById("search-button");

//api call to find valid locations - calls server.js /stopFinder
function fetchData(location) {
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
        fetchData(location)
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
        fetchData(location)
            .then(data => {
                data.forEach((entry) => stations.push(entry.name));
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
function displayStartResult(result){
    const content = result.map((list) => {
        return "<li onclick=selectStartInput(this)>" + list + "</li>";
    });

    startResultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}
//selects the corresponding input
function selectStartInput(list){
    startSearch.value = list.innerHTML;
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
        fetchData(location)
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
        fetchData(location)
            .then(data => {
                data.forEach((entry) => stations.push(entry.name));
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
function displayEndResult(result){
    const content = result.map((list) => {
        return "<li onclick=selectEndInput(this)>" + list + "</li>";
    });

    endResultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}
//selects the corresponding input
function selectEndInput(list){
    endSearch.value = list.innerHTML;
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

searchBtn.addEventListener("click", ()=>{
    
})







