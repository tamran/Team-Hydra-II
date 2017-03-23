#include <aJSON.h>
#define MAX_ARRAY_SIZE 30

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

void performMainDataCollection(String experiment, String type, aJsonObject * (&buf)[MAX_ARRAY_SIZE], int numExperiments, Adafruit_TCS34725 tcs, aJsonObject * (*collect)(Adafruit_TCS34725)) {
  int bufFRONT = 0;
  int bufEND = -1;

  for (int i = 0; i < numExperiments; ++i) {
    aJsonObject* meas = collect(tcs);
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
void collectData(String experiment, int numExperiments, Adafruit_TCS34725 tcs) {
  aJsonObject* colorBuf[MAX_ARRAY_SIZE];
  aJsonObject* turbidityBuf[MAX_ARRAY_SIZE];
  aJsonObject* electrochemBuf[MAX_ARRAY_SIZE];

  numExperiments = min(numExperiments, MAX_ARRAY_SIZE);

  //Collect the data, and post if WiFi is available
  Serial.println("color");
  performMainDataCollection(experiment, "color", colorBuf, numExperiments, tcs, takeColorMeasurement);
  Serial.println("turbidity");
  performMainDataCollection(experiment, "turbidity", turbidityBuf, numExperiments, tcs, takeTurbidityMeasurement);
  Serial.println("electrochemical");
  performMainDataCollection(experiment, "electrochemical", electrochemBuf, numExperiments, tcs, takeElectrochemicalMeasurement);


  Serial.println("Waiting to send data");
  int beginOfArray, endOfArray;

  //Keep trying to post till everything is gone
  //For simplicity, we'll just look at the entire array instead of keeping track of the beginning and end of it
  Serial.println("color");
  resetIndices(beginOfArray,0,endOfArray,numExperiments-1);
  attemptToPostUnsavedMeasurements(experiment, "color", colorBuf, beginOfArray, endOfArray, true);
  Serial.println("turbidity");
  resetIndices(beginOfArray,0,endOfArray,numExperiments-1);
  attemptToPostUnsavedMeasurements(experiment, "turbidity", turbidityBuf, beginOfArray, endOfArray, true);
  Serial.println("electrochemical");
  resetIndices(beginOfArray,0,endOfArray,numExperiments-1);
  attemptToPostUnsavedMeasurements(experiment, "electrochemical", electrochemBuf, beginOfArray, endOfArray, true);
}

