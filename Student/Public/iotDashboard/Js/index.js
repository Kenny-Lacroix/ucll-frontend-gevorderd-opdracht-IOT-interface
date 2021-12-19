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
    let appId = obj.end_device_ids.application_ids.application_id;
    let deviceId = obj.end_device_ids.device_id;
    if (obj.uplink_message && obj.uplink_message.frm_payload) {
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

const updateHtml = (x) => {
  let tableHtml = "";
  x.map((data, i) => {
    tableHtml +=
      /* html */
      `<tr>
      <td>${i}</td>
      <td>${data.applicationId}</td>
      <td>${data.deviceId}</td>
      <td>${data.gatewayId}</td>
      <td>${data.rawPayload}</td>
      <td>${data.decodedPayload}</td>
      <td>${data.timestamp}</td>
      <td><span id="delete${i}" class="bi bi-trash-fill"></span></td>
      </tr>`;
  });
  document.querySelector("#tableBody").innerHTML = tableHtml;
  addListeners(x);
};

const addListeners = (x) => {
  x.map((element, i) => {
    document.querySelector(`#delete${i}`).addEventListener("click", () => {
      console.log(`clicked button ${i}`);
      x.splice(i, 1);
      updateHtml(x);
    });
  });
};

// ---------------------------------------
// #endregion

getData();
