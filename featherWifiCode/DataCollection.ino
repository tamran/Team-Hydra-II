#include <aJSON.h>

/**
   Creates the Trial requested
*/
int createTrial(String trial) {
  return post("/api/trial/" + trial, aJson.createObject());
}

/**
   Posts a new measurement corresponding to the trial
*/
int postMeasurement(String trial, aJsonObject* json) {
  return post("/api/measurement/" + trial, json);
}

/**
   Takes a measurement from the sensor
   TODO -- set up to talk to sensor
*/
aJsonObject* takeMeasurement(Adafruit_TCS34725 tcs) {
  // get all sensor data, and construct the POST string
  uint16_t r, g, b, c, colorTemp, lux;

  tcs.getRawData(&r, &g, &b, &c);
  colorTemp = tcs.calculateColorTemperature(r, g, b);
  lux = tcs.calculateLux(r, g, b);
  return constructMeasurement(String(r), String(g), String(b), String(c), String(colorTemp), String(lux));
  //  postMeasurement(experiment, meas);
  //  return "";
}

/**
   Collects the requested number of measurements
*/
void collectData(String experiment, int numExperiments, Adafruit_TCS34725 tcs) {
  aJsonObject* buf[numExperiments];
  int bufTOS = -1;
  for (int i = 0; i < numExperiments; ++i) {
    aJsonObject* meas = takeMeasurement(tcs);
    buf[++bufTOS] = meas;
    while (bufTOS >= 0) {
      int httpCode = postMeasurement(experiment, buf[bufTOS]);
      if (httpCode != 200) {
        // we can't post now, wait till later
        break;
      } else {
        // pop off the stack
        buf[bufTOS--] = nullptr;
      }
    }
  }
  Serial.println("Waiting to send data");
  while (bufTOS >= 0) {
    int httpCode = postMeasurement(experiment, buf[bufTOS]);
    if (httpCode != 200) {
      // keep trying to post this measurement until we find WiFi
      while (connectToWiFi() == -1) {
        //wait to connect
      }
    } else {
      // pop off the stack
      Serial.println("Beginning to send data");
      buf[bufTOS--] = nullptr;
    }
  }
}

