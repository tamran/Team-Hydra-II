#include <aJSON.h>

/**
   Takes a measurement from the sensor
   TODO -- set up to talk to sensor
*/
aJsonObject* takeColorMeasurement(Adafruit_TCS34725 tcs) {
  // get all sensor data, and construct the POST string
  uint16_t r, g, b, c, colorTemp, lux;

  tcs.getRawData(&r, &g, &b, &c);
  colorTemp = tcs.calculateColorTemperature(r, g, b);
  lux = tcs.calculateLux(r, g, b);
  return constructMeasurement(String(r), String(g), String(b), String(c), String(colorTemp), String(lux));
}

aJsonObject* takeTurbidityMeasurement(Adafruit_TCS34725 tcs) {
  //TODO
  return aJson.createObject();
}

aJsonObject* takeElectrochemicalMeasurement(Adafruit_TCS34725 tcs) {
  //TODO
  return aJson.createObject(); 
}

