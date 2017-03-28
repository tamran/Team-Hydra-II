#include <Wire.h>
#include <aJSON.h>
#include "Adafruit_TCS34725.h"


/* Initialise with default values (int time = 2.4ms, gain = 1x) */
/* Adafruit_TCS34725 tcs = Adafruit_TCS34725();
  /* Initialise with specific int time and gain values */
Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_700MS, TCS34725_GAIN_1X);

void setup(void) {
  Serial.begin(115200);
  delay(100);
  if (tcs.begin()) {
    Serial.println("Found sensor");
  } else {
    Serial.println("No TCS34725 found ... check your connections");
    while (1);
  }
}

int count = 0;
void loop(void) {
  if (count == 0) {
    if (connectToWiFi()==-1) {
      return;
    }
    
    aJsonObject* experimentInfo = get("/api/newExperiment");
    String experiment = getField(experimentInfo, "experimentName");
    
    if (experiment != "") {
      int numExperiments = getField(experimentInfo, "numExperiments").toInt();
      
      createTrial(experiment);
      Serial.println("Trial created");
      Serial.println("Pausing...");
      //delay(10000);
      Serial.println("Starting to collect data");
      collectData(experiment, numExperiments, tcs);
      get("/api/clearExperiment");
    }
    count = 1;
  }
}