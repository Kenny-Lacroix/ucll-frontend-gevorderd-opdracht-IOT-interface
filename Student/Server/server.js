/* ---EXPRESS RELATED SETUP--- */
const X = require("express");
const APP = X();
const PORT = 1999;
const PATH = require("path");

/* ---EXPRESS RELATED CODE--- */
APP.use("/iotDashboard", X.static(PATH.join(__dirname, "../Public/iotDashboard")));
APP.use(X.json());

/* ---ENDPOINTS--- */
APP.post("/data/base64conversion", (req, res) => {
  const { data } = req.body;
  console.log(data);
  let decodedInfo = Buffer.from(data, "base64").toString("ascii");
  // let decodedInfo = atob(data);
  let response = { status: "OK", data: decodedInfo };

  return res.send(JSON.stringify(response));
});

/* ---START SERVER--- */
APP.listen(PORT, () => {
  console.log(`Webshop running at http://localhost:${PORT}`);
});
