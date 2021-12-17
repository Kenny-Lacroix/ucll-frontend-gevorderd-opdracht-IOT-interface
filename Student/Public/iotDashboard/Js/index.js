// #region Imports
// ---------------------------------------
import { IotMessage } from "./iotMessage.js";
// ---------------------------------------
// #endregion

// #region Variables
// ---------------------------------------
let localData = [];
// ---------------------------------------
// #endregion

// #region Functions
// ---------------------------------------
const getData = () => {
  fetch("http://essadji.be:1999/iot/all")
    .then((response) => response.json())
    .then(async (data) => {
      console.log(data);
      await createLocalData(data).then((x) => {
        updateHtml(x);
      });
    })
    .catch((error) => {
      console.error("There has been a problem with your fetch operation:", error);
    });
};

const postData = (obj) => {
  fetch("https://example.com/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const deleteData = (obj) => {
  fetch("https://example.com/delete-item/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("There has been a problem with your fetch operation:", error);
    });
};

const createLocalData = async (data) => {
  data.map(async (obj, i) => {
    let appId = obj.end_device_ids.application_ids.application_id;
    let deviceId = obj.end_device_ids.device_id;
    if (obj.hasOwnProperty("uplink_message")) {
      let gatewayId = obj.uplink_message.rx_metadata[0].gateway_ids.gateway_id;
      let rawPayload = obj.uplink_message.frm_payload;
      let timestamp = obj.received_at;
      let message = new IotMessage(appId, deviceId, gatewayId, rawPayload, timestamp);
      await message.convertPayload().then((x) => {
        // console.log(message);
        return x;
        // localData.push(message);
      });
    }
  });
  // console.log("data: ", localData);
};

const updateHtml = (x) => {
  console.log("t");
  console.log(localData);
  let tableHtml = "";
  x.map((data, i) => {
    tableHtml +=
      /* html */
      `<tr>
    <td>${data.applicationId}</td>
    <td>${data.deviceId}</td>
    <td>${data.gatewayId}</td>
    <td>${data.rawPayload}</td>
    <td>${data.decodedPayload}</td>
    <td>${data.timestamp}</td>
    <td><span id="delete${i}" class="bi bi-trash-fill"></span></td>
    </tr>`;
  });

  console.log(tableHtml);
  document.querySelector("#tableBody").innerHTML = tableHtml;
};

// ---------------------------------------
// #endregion CODE

// #region
// ---------------------------------------
getData();
// ---------------------------------------
// #endregion
