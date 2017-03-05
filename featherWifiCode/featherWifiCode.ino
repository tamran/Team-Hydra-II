#include <ESP8266WiFi.h>
#include <Wire.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <aJSON.h>
#include "Adafruit_TCS34725.h"

const char* ssid     = "TeamHydraII";
const char* password = "ecedesign449";
const char* host = "team-hydra-ii.herokuapp.com";
const int httpPort = 80;

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
   Returns the string at the field of JSON object, or "" if field doesn't exist
*/
String getField(aJsonObject* json, const char* aField) {
  aJsonObject* field = aJson.getObjectItem(json, aField);
  if (field != nullptr) {
    return field->valuestring;
  } else {
    return "";
  }
}

/**
  returns 1 if Feather is connected to WiFi, 0 otherwise
*/
char isConnectedToWiFi(void) {
  return WiFi.status() == WL_CONNECTED;
}

/**
  Connects Feather to a WiFi network.  Loops until the device is connected
*/
void connectToWiFi(void) {

  // We start by connecting to a WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    //  while (!isConnectedToWiFi()) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

}

/**
  Connects the client to the server, and returns the connected client so that we can send and receive
  data with the server
*/
//WiFiClient connectToServer(void) {
//  //Connect to Host
//  Serial.print("connecting to ");
//  Serial.println(host);
//  // Use WiFiClient class to create TCP connections
//  WiFiClient client;
//  while (!client.connect(host, httpPort)) {
//    Serial.println("connection failed");
//    //TODO: add this back
//    //    Serial.println("attempting to connect to WiFi again");
//    //    connectToWiFi();
//    //    Serial.println("Connected to WiFi, now trying server again");
//  }
//
//  return client;
//}

void connect() {
  connectToWiFi();
  //  WiFiClient client = connectToServer();
  //  return client;
}

/**
  Gets a new valid experiment.
*/
aJsonObject* get(String endpoint) {
  // make a get request to /api/newExperiment
  // return the response

  HTTPClient http;
  http.begin("http://team-hydra-ii.herokuapp.com" + endpoint);
  int httpCode = http.GET();
  Serial.print("HTTP response code ");
  Serial.println(httpCode);
  aJsonObject* jsonObject;
  if (httpCode == HTTP_CODE_OK)
  {
    String response = http.getString();
    //convert to char array
    int len = response.length() + 1;
    char charBuff[len];
    response.toCharArray(charBuff, len);
    Serial.println(charBuff);
    //convert to json object
    jsonObject = aJson.parse(charBuff);
  }
  else
  {
    Serial.println("Error in HTTP request");
  }

  http.end();
  return jsonObject;
}

String takeMeasurement() {
  // get all sensor data, and construct the POST string
  return "";
}

String* collectMeasurements(String experimentInfo) {
  // each measurement will be a string (ie what we send to the server)
  int SIZE = 5;
  String* experimentData = new String[SIZE];

  //    for the specified amount of measurements {
  //        experientData[i] = takeMeasurement();
  //    }

  return experimentData;
}

void createTrial(String trial) {
  // send post request to database
  HTTPClient http;
  http.begin("http://team-hydra-ii.herokuapp.com/api/trial/" + trial);
  aJsonObject *root;
  root = aJson.createObject();
  //  aJson.addStringToObject(root, "message", "Hello from ESP8266");
  char *payload = aJson.print(root);
  int httpCode = http.POST((uint8_t *)payload, strlen(payload));
  if (httpCode == HTTP_CODE_OK)
  {
    Serial.print("HTTP response code ");
    Serial.println(httpCode);
    String response = http.getString();
  }
  else
  {
    Serial.println("Error in HTTP request");
  }
  return;
}

aJsonObject* constructMeasurement(const char* R, const char* G, const char* B, const char* C, const char* ColorTemp, const char* lux) {

  aJsonObject *root = aJson.createObject();
  aJson.addStringToObject(root, "R", R);
  aJson.addStringToObject(root, "G", G);
  aJson.addStringToObject(root, "B", B);
  aJson.addStringToObject(root, "C", C);
  aJson.addStringToObject(root, "ColorTemp", ColorTemp);
  aJson.addStringToObject(root, "lux", lux);

  return root;
}

void postMeasurement(String trial, aJsonObject* json) {
  // send post request to database
  HTTPClient http;
  http.begin("http://team-hydra-ii.herokuapp.com/api/measurement/" + trial);
  http.addHeader("Content-Type", "application/json");
  char *payload = aJson.print(json);
  Serial.println(payload);
  int httpCode = http.POST((uint8_t *)payload, strlen(payload));
  if (httpCode == HTTP_CODE_OK)
  {
    Serial.print("HTTP response code ");
    Serial.println(httpCode);
    String response = http.getString();
  }
  else
  {
    Serial.println("Error in HTTP request");
  }
  return;
}

void clearExperimentInfo() {
  //make a get request to /api/clearExperiment
  HTTPClient http;
  http.begin("http://team-hydra-ii.herokuapp.com/api/clearExperiment");
  int httpCode = http.GET();
  Serial.print("HTTP response code ");
  Serial.println(httpCode);
  aJsonObject* jsonObject;
  if (httpCode == HTTP_CODE_OK)
  {
    String response = http.getString();
    //convert to char array
    int len = response.length() + 1;
    char charBuff[len];
    response.toCharArray(charBuff, len);
    Serial.println(charBuff);
    //convert to json object
    jsonObject = aJson.parse(charBuff);
  }
  else
  {
    Serial.println("Error in HTTP request");
  }

  http.end();
  return;
}

void recordMeasurements(String** experimentDataPtr, int numExperiments) {
  //  WiFiClient client = connect();
  //    for each i in numExperiments {
  //        String measurement = *experimentDataPtr[i];
  //        postMeasurement(measurement)
  //    }
  // should add a check to make sure the post request actually goes through
  //  clearExperimentInfo(client);
}

int count = 0;
void loop(void) {
  if (count == 0) {
    connect();
    aJsonObject* experimentInfo = get("/api/newExperiment");
    //an example of how to parse the json object
    if (getField(experimentInfo, "experimentName") != "") {
      String experiment = getField(experimentInfo, "experimentName");
      Serial.print(experiment);
      createTrial(experiment);
      aJsonObject* meas = constructMeasurement("1","1","2","3","5","8");
      postMeasurement(experiment,meas);
      clearExperimentInfo();
    }
    count = 1;

    // wait for some amount of time before the sensor gets into the water
    //    delay(...)
    //    String* experimentData = collectMeasurements(experimentInfo);
    //    recordMeasurements(&experimentData);
    //    delete [] experimentData;
  }
}
