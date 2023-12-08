//API KEY: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJSWDVoUkJJWFl0V2IwWVY0VDg0TFlRNWZjdUI2VnB6SXd1bWlNV3IycG9VIiwiaWF0IjoxNzAyMDA1NTIxfQ.JiY-tAeN64on8k_Tm-HW28qt-eWkgxx6SfCbzzgiOuU
const url = "https://api.transport.nsw.gov.au/v1/publictransport/timetables/complete/gtfs"
const apiKey = ""

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")

const headers = new Headers({
    "Authorization": 'apikey ${apiKey}'
})

fetch(url, {method: "GET", headers: headers})
    .then(response => {
        if (response.ok){
            return response.json();
        }
        else{
            throw new Error('Request failed with status: ${response.status}')
        }
    })
    .then(data => {
        console.log(data)
    })
    .catch(error =>{
        console.error(error);
    });