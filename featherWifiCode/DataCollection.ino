#include <aJSON.h>

#define MAX_ARRAY_SIZE 30

void dispatchDataCollection(String experiment, aJsonObject * (&colorBuf)[MAX_ARRAY_SIZE], aJsonObject * (&turbidityBuf)[MAX_ARRAY_SIZE], aJsonObject * (&electrochemBuf)[MAX_ARRAY_SIZE], int numExperiments, Adafruit_TCS34725 tcs, Adafruit_ADS1115 ads) {
  //Collect the data, and post if WiFi is available
  int timeToWait = ceil(float(TOTAL_EXPERIMENT_TIME) / numExperiments);

  for (int i = 0; i < numExperiments; ++i) {
    Serial.println("color");
    performMainDataCollection(experiment, "color", colorBuf, i, tcs, ads, takeColorMeasurement);
    Serial.println("turbidity");
    performMainDataCollection(experiment, "turbidity", turbidityBuf, i, tcs, ads, takeTurbidityMeasurement);
    Serial.println("electrochemical");
    performMainDataCollection(experiment, "electrochemical", electrochemBuf, i, tcs, ads, takeElectrochemicalMeasurement);
    delay(timeToWait);
  }
}

void performMainDataCollection(String experiment, String type, aJsonObject * (&buf)[MAX_ARRAY_SIZE], int experimentIndex, Adafruit_TCS34725 tcs, Adafruit_ADS1115 ads, aJsonObject * (*collect)(Adafruit_TCS34725, Adafruit_ADS1115)) {
  int bufFRONT = 0;
  int bufEND = -1;

  aJsonObject* meas = collect(tcs, ads);
  buf[experimentIndex] = meas;
//  attemptToPostUnsavedMeasurements(experiment, type, buf, bufFRONT, bufEND, false);
}

void resetIndices(int& front, int fval, int& back, int bval) {
  front = fval;
  back = bval;
}

/**
   Collects the requested number of measurements
*/
void collectData(String experiment, int numExperiments, Adafruit_TCS34725 tcs, Adafruit_ADS1115 ads) {
  aJsonObject* colorBuf[MAX_ARRAY_SIZE];
  aJsonObject* turbidityBuf[MAX_ARRAY_SIZE];
  aJsonObject* electrochemBuf[MAX_ARRAY_SIZE];

  numExperiments = min(numExperiments, MAX_ARRAY_SIZE);

  dispatchDataCollection(experiment, colorBuf, turbidityBuf, electrochemBuf, numExperiments, tcs, ads);

  Serial.println("Waiting to send data");
  int beginOfArray, endOfArray;

  //Keep trying to post till everything is gone
  //For simplicity, we'll just look at the entire array instead of keeping track of the beginning and end of it
  Serial.println("color");
  resetIndices(beginOfArray, 0, endOfArray, numExperiments - 1);
  attemptToPostUnsavedMeasurements(experiment, "color", colorBuf, beginOfArray, endOfArray, true);
  Serial.println("turbidity");
  resetIndices(beginOfArray, 0, endOfArray, numExperiments - 1);
  attemptToPostUnsavedMeasurements(experiment, "turbidity", turbidityBuf, beginOfArray, endOfArray, true);
  Serial.println("electrochemical");
  resetIndices(beginOfArray, 0, endOfArray, numExperiments - 1);
  attemptToPostUnsavedMeasurements(experiment, "electrochemical", electrochemBuf, beginOfArray, endOfArray, true);
}

