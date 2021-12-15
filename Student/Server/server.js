/* ---EXPRESS RELATED SETUP--- */
const X = require("express");
const APP = X();
const PORT = 1999;
const PATH = require("path");

/* ---EXPRESS RELATED CODE--- */
APP.use("/iotDashboard", X.static(PATH.join(__dirname, "../Public/iotDashboard")));

/* ---ENDPOINTS--- */
APP.post("/iotDashboard/sensorStatus", (req, res) => {
  return res.send("Received a POST HTTP method");
});

/* ---START SERVER--- */
APP.listen(PORT, () => {
  console.log(`Webshop running at http://localhost:${PORT}`);
});
