#include <aJSON.h>

#define MAX_ARRAY_SIZE 30

void performMainDataCollectionWrapper(String experiment, String type, int numFiles, int numExperiments, Adafruit_TCS34725 tcs, Adafruit_ADS1115 ads, aJsonObject * (*collect)(Adafruit_TCS34725, Adafruit_ADS1115)) {
  aJsonObject* buf[MAX_ARRAY_SIZE];

  int numExperimentsLeft = numExperiments;
  for (int i = 0; i < numFiles; ++i) {
    Serial.print("Performing main data collection for: ");
    Serial.print(type);
    Serial.print("at iteration: ");
    Serial.println(i);
    Serial.print("num experiments left: ");
    Serial.println(numExperimentsLeft);
    
    performMainDataCollection(experiment, type, buf, min(MAX_ARRAY_SIZE, numExperimentsLeft), tcs, ads, collect);
    numExperimentsLeft -= MAX_ARRAY_SIZE;
    Serial.println("Saving the buffer");
    saveBuffer(buf, getFilename(type, i));
    Serial.println("Clearing buffer");
    clearBuffer(buf);
  }
}

void performMainDataCollection(String experiment, String type, aJsonObject * (&buf)[MAX_ARRAY_SIZE], int numExperiments, Adafruit_TCS34725 tcs, Adafruit_ADS1115 ads, aJsonObject * (*collect)(Adafruit_TCS34725, Adafruit_ADS1115)) {
  int bufFRONT = 0;
  int bufEND = -1;
  Serial.println("in main data collection");
  Serial.print("Running ");
  Serial.print(numExperiments);
  Serial.println(" experiments");
  for (int i = 0; i < numExperiments; ++i) {
    aJsonObject* meas = collect(tcs, ads);
    buf[++bufEND] = meas;
  }
}

/**
   Collects the requested number of measurements
*/
void collectData(String experiment, int numExperiments, Adafruit_TCS34725 tcs, Adafruit_ADS1115 ads) {
  int numFiles = ceil((float)numExperiments / MAX_ARRAY_SIZE);
  Serial.print("# experiments: ");
  Serial.println(numExperiments);
  Serial.print("max array size: ");
  Serial.println(MAX_ARRAY_SIZE);
  Serial.print("Number of files that will be produced: ");
  Serial.print(numFiles);

  Serial.println("Beginning data collection");

  //Collect the data, and post if WiFi is available
  Serial.println("color");
  performMainDataCollectionWrapper(experiment, "color", numFiles, numExperiments, tcs, ads, takeColorMeasurement);
  Serial.println("turbidity");
  performMainDataCollectionWrapper(experiment, "turbidity", numFiles, numExperiments, tcs, ads, takeTurbidityMeasurement);
  Serial.println("electrochemical");
  performMainDataCollectionWrapper(experiment, "electrochemical", numFiles, numExperiments, tcs, ads, takeElectrochemicalMeasurement);

  Serial.println("Beginning to attempt to post measurements");

  //Keep trying to post till everything is gone
  //For simplicity, we'll just look at the entire array instead of keeping track of the beginning and end of it
  Serial.println("color");
  attemptToPostUnsavedMeasurementsFromFile(experiment, "color", numFiles);
  Serial.println("turbidity");
  attemptToPostUnsavedMeasurementsFromFile(experiment, "turbidity", numFiles);
  Serial.println("electrochemical");
  attemptToPostUnsavedMeasurementsFromFile(experiment, "electrochemical", numFiles);
}

