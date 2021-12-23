import { IotMessage } from "./iotMessage.js";

// #region Functions
// ---------------------------------------
const getData = () => {
  fetch("http://essadji.be:1999/iot/all")
    .then((response) => response.json())
    .then((data) => {
      console.log("initial Data", data);
      createLocalData(data).then((x) => {
        updateHtml(x);
      });
    })
    .catch((error) => {
      console.error("There has been a problem with your fetch operation:", error);
    });
};

const createLocalData = async (data) => {
  let localData = [];

  for (let i = 0; i < data.length; i++) {
    let obj = data[i];
    if (obj.uplink_message && obj.uplink_message.frm_payload) {
      let appId = obj.end_device_ids.application_ids.application_id;
      let deviceId = obj.end_device_ids.device_id;
      let gatewayId = obj.uplink_message.rx_metadata[0].gateway_ids.gateway_id;
      let rawPayload = obj.uplink_message.frm_payload;
      let timestamp = obj.received_at;
      let message = new IotMessage(appId, deviceId, gatewayId, rawPayload, timestamp);
      let converted = await message.convertPayload();
      message.decodedPayload = converted.data;
      localData.push(message);
    }
  }
  return localData;
};

const updateHtml = (localData) => {
  const temp = [];
  const dat = [];
  localData.map((data, i) => {
    temp.push(parseInt(data.decodedPayload));
    dat.push(i);
  });
  console.log("t", temp);

  new Chart(document.getElementById("line-chart"), {
    type: "line",
    data: {
      labels: dat,
      datasets: [
        {
          data: temp,
          label: "Co2 (ppm)",
          borderColor: "#3e95cd",
          fill: true,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "World population per region (in millions)",
      },
    },
  });
};

// ---------------------------------------
// #endregion

getData();
