/* ---EXPRESS RELATED SETUP--- */
const X = require('express')
const APP = X()
const PORT = 1999
const PATH = require('path');

/* ---EXPRESS RELATED CODE--- */
APP.use('/iotDashboard', X.static(PATH.join(__dirname, '../Client/Public/iotDashboard')));

APP.listen(PORT, () => {
    console.log(`Webshop running at http://localhost:${PORT}`)
})

