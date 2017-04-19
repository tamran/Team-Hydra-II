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

void attemptToPostUnsavedMeasurementsFromFile(String experiment, String type, int numFiles) {
  for (int i = 0; i < numFiles; ++i) {
    String filename = getFilename(type, i);
    Serial.print("Posting measurements from file: ");
    Serial.println(filename);
    aJsonObject* buf[MAX_ARRAY_SIZE];
    getMeasurements(buf, filename);
    attemptToPostUnsavedMeasurements(experiment, type, buf, 0, MAX_ARRAY_SIZE - 1, true);
  }
}

void attemptToPostUnsavedMeasurements(String experiment, String type, aJsonObject * (&buf)[MAX_ARRAY_SIZE], int bufFRONT, int bufEND, bool waitToConnect) {
  while (bufFRONT <= bufEND) {
    if (buf[bufFRONT] == nullptr) {
      bufFRONT++;
    } else {
      int httpCode = postMeasurement(experiment, type, buf[bufFRONT]);
      if (httpCode == 200) { // pop off the stack
        Serial.println("Send data was successful");
        delete buf[bufFRONT];
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
