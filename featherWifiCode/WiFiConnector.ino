#include <ESP8266WiFi.h>

const char* ssid     = "TeamHydraII";
const char* password = "ecedesign449";

/**
  Connects Feather to a WiFi network.  Loops until the device is connected
*/
void connectToWiFi() {
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}
