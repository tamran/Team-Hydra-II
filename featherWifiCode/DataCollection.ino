#include <aJSON.h>

#define MAX_ARRAY_SIZE 30

void performMainDataCollection(String experiment, String type, aJsonObject * (&buf)[MAX_ARRAY_SIZE], int numExperiments, Adafruit_TCS34725 tcs, Adafruit_ADS1115 ads, aJsonObject * (*collect)(Adafruit_TCS34725, Adafruit_ADS1115)) {
  int bufFRONT = 0;
  int bufEND = -1;

  for (int i = 0; i < numExperiments; ++i) {
    aJsonObject* meas = collect(tcs, ads);
    buf[++bufEND] = meas;
    attemptToPostUnsavedMeasurements(experiment, type, buf, bufFRONT, bufEND, false);
  }
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

  //Collect the data, and post if WiFi is available
  Serial.println("color");
  performMainDataCollection(experiment, "color", colorBuf, numExperiments, tcs, ads, takeColorMeasurement);
  Serial.println("turbidity");
  performMainDataCollection(experiment, "turbidity", turbidityBuf, numExperiments, tcs, ads, takeTurbidityMeasurement);
  Serial.println("electrochemical");
  performMainDataCollection(experiment, "electrochemical", electrochemBuf, numExperiments, tcs, ads, takeElectrochemicalMeasurement);


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

