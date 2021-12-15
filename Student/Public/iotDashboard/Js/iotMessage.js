import { time } from "console";

export class IotMessage {
  constructor(applicationId, deviceId, gatewayId, rawPayload, timestamp) {
    this.applicationId = applicationId;
    this.deviceId = deviceId;
    this.gatewayId = gatewayId;
    this.rawPayload = rawPayload;
    this.decodedPayload = "No data";
    this.timestamp = timestamp;
  }
}
