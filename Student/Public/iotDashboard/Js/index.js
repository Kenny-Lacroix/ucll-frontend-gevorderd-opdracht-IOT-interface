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
    .then((data) => {
      console.log(data);
      createLocalData(data);
      //   updateHtml();
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

const createLocalData = (data) => {
  data.map((obj) => {
    let appId = obj.end_device_ids.application_ids.application_id;
    let deviceId = obj.end_device_ids.device_id;
    if (obj.hasOwnProperty("uplink_message")) {
      let gatewayId = obj.uplink_message.rx_metadata[0].gateway_ids.gateway_id;
      let rawPayload = obj.uplink_message.frm_payload;
      let timestamp = obj.uplink_message.rx_metadata[0].timestamp;
      localData.push(new IotMessage(appId, deviceId, gatewayId, rawPayload, timestamp));
    }
  });
  console.log("data: ", localData);
};

const updateHtml = (uploadMessages) => {
  let tableHtml = "";
  uploadMessages.map((uploadMessage, i) => {
    tableHtml +=
      /* html */
      `<tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Germany</td>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Germany</td>
        <td><span class="bi bi-trash-fill"></span></td>
     </tr>`;
  });
  document.querySelector("#customers").innerHTML = tableHtml;
};

// ---------------------------------------
// #endregion CODE

// #region
// ---------------------------------------
getData();
// ---------------------------------------
// #endregion
