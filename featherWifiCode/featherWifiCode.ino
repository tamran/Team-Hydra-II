#include <Wire.h>
#include <aJSON.h>
#include "Adafruit_TCS34725.h"
#include <Adafruit_ADS1015.h>
#include <SPI.h>
#include <SD.h>

#define LED_ID 13
#define COLOR_SENSOR_ID_1 14
#define COLOR_SENSOR_ID_2 16
#define ADC_ID 12
#define SD_ID 4

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

  if (!SD.begin(SD_ID)) {
    Serial.println("Could not find SD card");
    return;
  }

  Serial.println("Setup complete");
}

void loop(void) {
    if (connectToWiFi() == -1) {
    return;
  }
    File file = SD.open("derp.txt", O_WRITE | O_CREAT | O_TRUNC);
    aJsonObject* experimentInfo = get("/api/newExperiment");
    file.println(aJson.print(experimentInfo));
    file.println("test");
    file.close();
//    Serial.println("Printing");
//    printFile("derp.txt");
    File f = SD.open("derp.txt");
    String s;
    s = f.readStringUntil('\n');
    Serial.println("first line");
    Serial.println(s);
    aJsonObject* json = getJson(s);
    Serial.println("printing saved object");
    Serial.println(aJson.print(json));
    Serial.println("printing field");
    Serial.println(getField(json,"experimentName"));
    f.close();

//  if (connectToWiFi() == -1) {
//    return;
//  }
//
//  aJsonObject* experimentInfo = get("/api/newExperiment");
//  String experiment = getField(experimentInfo, "experimentName");
//
//  if (experiment != "") {
//    int numExperiments = getField(experimentInfo, "numExperiments").toInt();
//
//    createTrial(experiment);
//    Serial.println("Trial created");
//    Serial.println("Pausing...");
//    //delay(10000);
//    Serial.println("Starting to collect data");
//    digitalWrite(LED_ID, HIGH);
//    delay(500);
//    collectData(experiment, numExperiments, tcs, ads);
//    digitalWrite(LED_ID, LOW);
//    get("/api/clearExperiment");
//  }
}
