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
aJsonObject* takeMeasurement() {
  // get all sensor data, and construct the POST string
  return constructMeasurement("1", "1", "2", "3", "5", "8");
  //  postMeasurement(experiment, meas);
  //  return "";
}

/**
   Collects the requested number of measurements
*/
void collectData(String experiment, int numExperiments) {
  aJsonObject* buf[numExperiments];
  int bufTOS = -1;
  for (int i = 0; i < numExperiments; ++i) {
    aJsonObject* meas = takeMeasurement();
    buf[++bufTOS] = meas;
    while (bufTOS > 0) {
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
  while (bufTOS > 0) {
    int httpCode = postMeasurement(experiment, buf[bufTOS]);
    if (httpCode != 200) {
      // keep trying to post this measurement until we find WiFi
      connectToWiFi();
    } else {
      // pop off the stack
      buf[bufTOS--] = nullptr;
    }
  }
  delete [] buf;
}

