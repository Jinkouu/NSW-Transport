if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const APIKEY = process.env.APIKEY
const apiEndpoint = "https://api.transport.nsw.gov.au/v1/tp/"

const axios = require('axios')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.post('/stopFinder', (req, res) => {
    //console.log(req.body)
    const url = `${apiEndpoint}stop_finder?${req.body.queryString}`
    axios({
        method: 'GET',
        url: url,
        responseType: 'json',
        headers: {
            'Authorization': `apikey ${APIKEY}`
        },
    }).then(data => res.json(data.data.locations))
})

app.post('/tripFinder', (req, res) => {
    const url = `${apiEndpoint}trip?${req.body.queryString}`
    axios({
        method: 'GET',
        url: url,
        responseType: 'json',
        headers: {
            'Authorization': `apikey ${APIKEY}`
        },
    }).then(data => res.json(data.data.journeys))
})

app.listen(3000, () => {
    console.log('Server started')
})