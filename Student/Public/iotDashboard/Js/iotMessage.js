export class IotMessage {
  constructor(applicationId, deviceId, gatewayId, rawPayload, timestamp) {
    this.applicationId = applicationId;
    this.deviceId = deviceId;
    this.gatewayId = gatewayId;
    this.rawPayload = rawPayload;
    this.decodedPayload = "No data";
    this.timestamp = new Date(timestamp).toLocaleString();
  }
  async convertPayload() {
    let obj = {};
    obj.data = this.rawPayload;
    let res = await fetch("http://localhost:1999/data/base64conversion", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    let decodedData = await res.json();

    this.decodedPayload = decodedData;
    return decodedData;
  }
}
