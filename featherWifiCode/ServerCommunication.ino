/**
   Creates the Trial requested
*/
int createTrial(String trial) {
  return post("/api/trial/" + trial, aJson.createObject());
}

/**
   Posts a new measurement of the requested type corresponding to the trial
*/
int postMeasurement(String trial, String type, aJsonObject* json) {
  return post("/api/measurement/" + type + "/" + trial, json);
}


void attemptToPostUnsavedMeasurements(String experiment, String type, aJsonObject * (&buf)[MAX_ARRAY_SIZE], int& bufFRONT, int& bufEND, bool waitToConnect) {
  while (bufFRONT <= bufEND) {
    if (buf[bufFRONT] == nullptr) {
      bufFRONT++;
    } else {
      int httpCode = postMeasurement(experiment, type, buf[bufFRONT]);
      if (httpCode == 200) { // pop off the stack
        Serial.println("Send data was successful");
        buf[bufFRONT++] = nullptr;
      } else {
        if (waitToConnect) { // keep trying to post this measurement until we find WiFi
          while (connectToWiFi() == -1) { //wait to connect
          }
        } else {  // we can't post now, wait till later
          break;
        }
      }
    }
  }
}
