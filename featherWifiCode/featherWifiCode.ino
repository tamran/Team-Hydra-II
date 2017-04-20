#include <Wire.h>
#include <aJSON.h>
#include "Adafruit_TCS34725.h"
#include <Adafruit_ADS1015.h>

#define LED_ID 13
#define COLOR_SENSOR_ID_1 14
#define COLOR_SENSOR_ID_2 16
#define ADC_ID 12

//#define INITIAL_WAIT 2 * 60 * 1000
//#define TOTAL_EXPERIMENT_TIME 60 * 1000

/* Initialise with default values (int time = 2.4ms, gain = 1x) */
/* Adafruit_TCS34725 tcs = Adafruit_TCS34725();
  /* Initialise with specific int time and gain values */
Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_700MS, TCS34725_GAIN_1X);
Adafruit_ADS1115 ads(0x48);

void setup(void) {
  Serial.begin(115200);
  delay(100);
  // Set up digital write pins
  pinMode(LED_ID, OUTPUT);
  pinMode(COLOR_SENSOR_ID_1, OUTPUT);
  pinMode(COLOR_SENSOR_ID_2, OUTPUT);
  pinMode(ADC_ID, OUTPUT);

  Serial.println("Setup complete");
}

void loop(void) {
  if (connectToWiFi() == -1) {
    return;
  }

  aJsonObject* experimentInfo = get("/api/newExperiment");
  String experiment = getField(experimentInfo, "experimentName");

  if (experiment != "") {
    int numExperiments = getField(experimentInfo, "numExperiments").toInt();
    int initialWait = getField(experimentInfo, "initialWait").toInt();
    int totalExperimentTime = getField(experimentInfo, "totalExperimentTime").toInt();    

    createTrial(experiment);
    Serial.println("Trial created");
    Serial.println("Pausing...");
    delay(initialWait);
    Serial.println("Starting to collect data");
    digitalWrite(LED_ID, HIGH);
    delay(500);
    collectData(experiment, numExperiments, tcs, ads, totalExperimentTime);
    digitalWrite(LED_ID, LOW);
    get("/api/clearExperiment");
  }
}
