/* ---EXPRESS RELATED SETUP--- */
const X = require('express')
const APP = X()
const PORT = 1999
const PATH = require('path');

/* ---DEMO DATA--- */
const iotData = require("./iotData")
// import { iotData } from './iotData.js';

/* ---EXPRESS RELATED CODE--- */
APP.use('/iotDashboard', X.static(PATH.join(__dirname, '../Client/Public/iotDashboard')));

/* ---ENDPOINTS--- */
APP.get('/iotDashboard/sensorData', (req, res) => {
    return res.send(JSON.stringify(testData));
});

APP.post('/iotDashboard/sensorStatus', (req, res) => {
    return res.send('Received a POST HTTP method');
});

/* ---START SERVER--- */
APP.listen(PORT, () => {
    console.log(`Webshop running at http://localhost:${PORT}`)
})

