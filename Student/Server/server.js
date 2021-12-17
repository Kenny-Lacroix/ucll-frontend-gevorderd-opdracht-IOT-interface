/* ---EXPRESS RELATED SETUP--- */
const X = require("express");
const APP = X();
const PORT = 1999;
const PATH = require("path");

/* ---EXPRESS RELATED CODE--- */
APP.use("/iotDashboard", X.static(PATH.join(__dirname, "../Public/iotDashboard")));

/* ---ENDPOINTS--- */
APP.post("/data/base64conversion", (req, res) => {
  console.log(req.body);
  // const { data } = req.body;
  // console.log(dataToConvert);
  //let convertedData = btoa(rawPayload);, data: convertedData
  let response = { status: "OK" };

  return res.send(JSON.stringify(response));
});

/* ---START SERVER--- */
APP.listen(PORT, () => {
  console.log(`Webshop running at http://localhost:${PORT}`);
});
