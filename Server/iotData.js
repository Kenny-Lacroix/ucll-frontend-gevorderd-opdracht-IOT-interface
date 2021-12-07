class iotData {
    constructor(controllerType, controllerName, sensorType, sensorName, sensorStatus, sensorValue) {
        this.controllerType = controllerType;
        this.controllerName = controllerName;
        this.sensorType = sensorType;
        this.sensorName = sensorName;
        this.sensorStatus = sensorStatus;
        this.sensorValue = sensorValue;
        this.Timestamp = Date.now();
    }

}