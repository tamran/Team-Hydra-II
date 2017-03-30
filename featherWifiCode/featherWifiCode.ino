#include <Wire.h>
#include <aJSON.h>
#include "Adafruit_TCS34725.h"
#include <Adafruit_ADS1015.h>

#define LED_ID 13
#define SENSOR_ID_1 14
#define SENSOR_ID_2 15


/* Initialise with default values (int time = 2.4ms, gain = 1x) */
/* Adafruit_TCS34725 tcs = Adafruit_TCS34725();
  /* Initialise with specific int time and gain values */
Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_700MS, TCS34725_GAIN_1X);
Adafruit_ADS1115 ads(0x48);

void setup(void) {
  Serial.begin(115200);
  delay(100);
  // Set up digital write pins
  pinMode(SENSOR_ID_1, OUTPUT);
  pinMode(SENSOR_ID_2, OUTPUT);
  pinMode(LED_ID, OUTPUT);

  //  Serial.println("Enabling ADS1115 sensor");
  //  ads.begin();

  Serial.println("Setup complete");
}

int count = 0;
void loop(void) {
  if (count == 0) {
    if (connectToWiFi() == -1) {
      return;
    }

    digitalWrite(LED_ID, HIGH);

    aJsonObject* experimentInfo = get("/api/newExperiment");
    String experiment = getField(experimentInfo, "experimentName");

    if (experiment != "") {
      int numExperiments = getField(experimentInfo, "numExperiments").toInt();

      createTrial(experiment);
      Serial.println("Trial created");
      Serial.println("Pausing...");
      //delay(10000);
      Serial.println("Starting to collect data");
      collectData(experiment, numExperiments, tcs, ads);
      get("/api/clearExperiment");
    }

    digitalWrite(LED_ID, LOW);

    count = 1;
  }
}
