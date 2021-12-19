//#region // MASTER //
//////////////////////
const X = require("express");
const APP = X();
const PORT = 1999;
/////////////////////////
//#endregion // MASTER //

//#region // EXPRESS //
///////////////////////
// ROUTERS
APP.use("/iot", require("./iot.js"));
// STATIC
APP.use("/", X.static(__dirname + "../Public"));
// LAUNCH
APP.listen(PORT, () => {
  console.log(`about to set up a Node HTTP server on port ${PORT} ...`);
  console.log(">>> \x1b[32mserver up and running\x1b[0m\n");
  console.log(`\x1b[45m  =================  \x1b[0m\n`);
  console.log(`system messages ...`);
});
//////////////////////////
//#endregion // EXPRESS //

//#region // SPLASH //
//////////////////////
console.clear();
console.log(
  `\n\n\x1b[45m  =================  \x1b[0m\n\x1b[45m   1999 API portal   \x1b[0m\n\x1b[45m   ©2k21 (essadji)   \x1b[0m\n\x1b[45m  =================  \x1b[0m\n`
);
/////////////////////////
//#endregion // SPLASH //
