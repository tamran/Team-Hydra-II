#include <ESP8266WiFi.h>
#include <Wire.h>
#include "Adafruit_TCS34725.h"

const char* ssid     = "TeamHydraII";
const char* password = "ecedesign449";
const char* host = "team-hydra-ii.herokuapp.com";
const char* httpPort = "80";

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

/**
* returns 1 if Feather is connected to WiFi, 0 otherwise 
*/
char isConnectedToWiFi(void) {
    return WiFi.status() == WL_CONNECTED;
}

/**
* Connects Feather to a WiFi network.  Loops until the device is connected
*/
void connectToWifi(void) {

  // We start by connecting to a WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (!isConnectedToWiFi()) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

}

/**
* Connects the client to the server, and returns the connected client so that we can send and receive
* data with the server
*/
WiFiClient connectToServer(void) {
   //Connect to Host
  Serial.print("connecting to ");
  Serial.println(host);
  // Use WiFiClient class to create TCP connections
  WiFiClient client;
  const int httpPort = 3000;
  while (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    Serial.println("attempting to connect to WiFi again");
    connectToWiFi();
    Serial.println("Connected to WiFi, now trying server again");
  }

  return client;
}

WiFiClient connect() {
    connectToWiFi();
    WiFiClient client = connectToServer();
    return client;
}

/**
* Gets a new valid experiment.  
*/
String getNewExperiment(WiFiClient client) {
    // make a get request to /api/newExperiment
    // return the response
}

String* collectMeasurements(String experimentInfo) {
    // each measurement will be a string (ie what we send to the server)
    String* experimentData = new String[SIZE];

    for the specified amount of measurements {
        experimentData[i] = takeMeasurement();
    }

    return experimentData;
}

void postMeasurement(String measurementToPost) {
    // send post request to database
}

void clearExperimentInfo(client) {
    //make a get request to /api/clearExperiment
}

void recordMeasurements(String** experimentDataPtr, int numExperiments) {
    WiFiClient client = connect();
    for each i in numExperiments {
        String measurement = *experimentDataPtr[i];
        postMeasurement(measurement)
    }
    // should add a check to make sure the post request actually goes through
    clearExperimentInfo();
}

void loop(void) {
    String experimentInfo = getNewExperiment(connect());
    // wait for some amount of time before the sensor gets into the water
    delay(...)
    String* experimentData = collectMeasurements(experimentInfo);
    recordMeasurements(&experimentData);
    delete [] experimentData;
}
