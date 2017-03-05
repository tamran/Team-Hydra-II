#include <ESP8266WiFi.h>
#include <Wire.h>
#include "Adafruit_TCS34725.h"
#include <ArduinoJson.h>

const char* ssid     = "TeamHydraII";
const char* password = "ecedesign449";
const char* host = "team-hydra-ii.herokuapp.com";

String data = "";   // String with json data
float temp = 0.0;

WiFiClient client;

/*
  Initialize Adafruit color sensor with parameter values for integration time and gain
*/
Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_700MS, TCS34725_GAIN_1X);

/*
  Initialization of Device upon upload
*/
void setup() {
  Serial.begin(115200);
  delay(100);
  /*
    Verify Connection to Sensor
  */
  if (tcs.begin()) {
    Serial.println("Found sensor");
  } else {
    Serial.println("No TCS34725 found ... check your connections");
    while (1);
  }

  /*
    Connect to Wifi Network
  */
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  /*
    Connecting to Host
  */
  const int httpPort = 80;
  delay(5000);
  Serial.print("connecting to ");
  Serial.println(host);
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }

}



int value = 0;
void loop() {
  String getNewExp = "/api/newExperiment";
  String getTrials = "/api/clearExperiment";
  client.print(String("GET ") + getNewExp + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "Connection: close\r\n\r\n");

  char c[1024];
  // Read all the lines of the reply from server and print them to Serial
  while (client.available()) {
    c[0] = client.read();
    Serial.print(c);
  }
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject& root = jsonBuffer.parseObject(c);
  int data= root["R"];
  Serial.println();
  Serial.print(data);

  Serial.println();
  Serial.println("closing connection");
}



void parseJSON(char json[300])
{
  StaticJsonBuffer<10000> jsonBuffer;
  JsonObject& root = jsonBuffer.parseObject(json);
  if (!root.success())
  {
    Serial.print("ParseObject() failed");
    //return;
  }

  double temp = root["temp"];
  Serial.println(temp);
}
















