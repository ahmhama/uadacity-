const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js')

const app = express()

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static('dist'))


const URL = 'https://api.meaningcloud.com/sentiment-2.1?'
const KEY = process.env.API_KEY
console.log(`Your API Key is ${process.env.API_KEY}`);
let userInput = [] 
app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/api', async function (req, res) {
    userInput = req.body.url;
    const apiURL = `${URL}key=${KEY}&url=${userInput}&lang=en`

    const response = await fetch(apiURL)
    const mcData = await response.json()
    res.send(mcData)
    const projectData = {
        score_tag: mcData.score_tag,
        agreement: mcData.agreement,
        subjectivity: mcData.subjectivity,
        confidence: mcData.confidence,
        irony: mcData.irony
    }
    res.send(projectData);
})

app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})