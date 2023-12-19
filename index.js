
//const url = "https://api.transport.nsw.gov.au/v1/publictransport/timetables/complete/gtfs"
//var apiKey = ""
const refreshBtn = document.getElementById("refresh-button")
const searchBtn = document.getElementById("search-button")
const startSearch = document.getElementById("start-search")
const endSearch = document.getElementById("end-search")

refreshBtn.addEventListener("click", loadApi());

function loadApi() {
    $.ajax({
        type: "POST",
        url: "/test.py",
    }).done(function(o){
        console.log("success")
    });
    //var headers;
    //fetch("key.txt")
    //    .then((response) => response.text())
    //    .then((text) => {
    //        apiKey = text
    //        headers = new Headers({
    //            "Authorization": 'apikey ${apiKey}'
    //        })
    //})
    //.catch((e) => console.error(e))
//
    //fetch(url, {method: "GET", headers: headers})
    //    .then(response => {
    //        if (response.ok){
    //            return response.json();
    //        }
    //        else{
    //            throw new Error('Request failed with status: ${response.status}')
    //        }
    //    })
    //    .then(data => {
    //        console.log(data)
    //    })
    //    .catch(error =>{
    //        console.error(error);
    //    });
    //console.log("yay!");
}