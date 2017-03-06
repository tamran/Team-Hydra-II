#include <aJSON.h>

/**
 * Creates the Trial requested
 */
void createTrial(String trial) {
  post("/api/trial/" + trial, aJson.createObject());
}

/**
 * Posts a new measurement corresponding to the trial
 */
void postMeasurement(String trial, aJsonObject* json) {
  post("/api/measurement/" + trial, json);
}

/**
 * Takes a measurement from the sensor
 * TODO
 */
String takeMeasurement(String experiment) {
  // get all sensor data, and construct the POST string
  aJsonObject* meas = constructMeasurement("1", "1", "2", "3", "5", "8");
  postMeasurement(experiment, meas);
  return "";
}

/**
 * Collects the requested number of measurements
 */
void collectData(String experiment, int numExperiments) {
  for (int i = 0; i < numExperiments; ++i) {
    takeMeasurement(experiment);
  }
}

