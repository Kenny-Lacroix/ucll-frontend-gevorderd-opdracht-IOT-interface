/* ---MQTT RELATED SETUP--- */
const MQTT = require('mqtt')
const MQTT_HOST = 'eu1.cloud.thethings.network'
const MQTT_PORT = '1883'
const MQTT_clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${MQTT_HOST}:${MQTT_PORT}`
const client = MQTT.connect(connectUrl, {
    clientId: MQTT_clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'iot-sensor-frontend-gevorderd@ttn',
    password: 'NNSXS.UGJCMHGZ6FBZN5N3PU2ZDNF4N2BVU7OFA3QBD6Q.IYECKMGUM55OO6K5SHI3VURFRVMHKKAV36TIGATW2VFGLMRJJGZA',
    reconnectPeriod: 1000,
})

const TOPIC = 'v3/#'

/* ---EXPRESS RELATED SETUP--- */
const X = require('express')
const APP = X()
const PORT = 1998
const PATH = require('path')

/* ---VARIABLES--- */
const mqttData = []

/* ---MQTT RELATED CODE--- */
client.on('connect', () => {
    console.log('Connected')
    client.subscribe([TOPIC], () => {
        console.log(`Subscribe to TOPIC '${TOPIC}'`)
    })
})
client.on('message', (TOPIC, payload) => {
    mqttData.push(payload.toString());
    console.log('Received Message:', TOPIC, payload.toString())
})

/* ---EXPRESS RELATED CODE--- */
APP.get('/iotDashboard/sensorData', (req, res) => {
    return res.send(JSON.stringify(mqttData));
});

APP.listen(PORT, () => {
    console.log(`Webshop running at http://localhost:${PORT}`)
})

