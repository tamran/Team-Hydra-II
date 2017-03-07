#include <ESP8266WiFi.h>

const char* ssid     = "TeamHydraII";
const char* password = "ecedesign449";

/**
  Connects Feather to a WiFi network.  Loops until the device is connected
*/
int connectToWiFi() {
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  int counter = 0;
  WiFi.persistent(false);
  WiFi.mode(WIFI_OFF);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    if (counter == 10) {
      Serial.println("Failed to connect");
      return -1;
    }
    counter++;
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  return 1;
}
