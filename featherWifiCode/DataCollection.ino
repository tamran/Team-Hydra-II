#include <aJSON.h>

#define MAX_ARRAY_SIZE 5000

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

/**
   Takes a measurement from the sensor
   TODO -- set up to talk to sensor
*/
aJsonObject* takeColorMeasurement(Adafruit_TCS34725 tcs) {
  // get all sensor data, and construct the POST string
  uint16_t r, g, b, c, colorTemp, lux;

  tcs.getRawData(&r, &g, &b, &c);
  colorTemp = tcs.calculateColorTemperature(r, g, b);
  lux = tcs.calculateLux(r, g, b);
  return constructMeasurement(String(r), String(g), String(b), String(c), String(colorTemp), String(lux));
}

void attemptToPostUnsavedMeasurements(String experiment, aJsonObject * (&buf)[MAX_ARRAY_SIZE], int& bufFRONT, int& bufEND, bool waitToConnect) {
  while (bufFRONT <= bufEND) {
    int httpCode = postMeasurement(experiment, "color", buf[bufFRONT]);
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

/**
   Collects the requested number of measurements
*/
void collectData(String experiment, int numExperiments, Adafruit_TCS34725 tcs) {
  aJsonObject* buf[MAX_ARRAY_SIZE];
  int bufFRONT = 0;
  int bufEND = -1;
  
  for (int i = 0; i < min(numExperiments, MAX_ARRAY_SIZE); ++i) {
    aJsonObject* colorMeas = takeColorMeasurement(tcs);
    buf[++bufEND] = colorMeas;
    attemptToPostUnsavedMeasurements(experiment, buf, bufFRONT, bufEND, false);
  }
  Serial.println("Waiting to send data");
  attemptToPostUnsavedMeasurements(experiment, buf, bufFRONT, bufEND, true);
}

