#include <aJSON.h>

aJsonObject* takeRGBCMeasurement(Adafruit_TCS34725 tcs, Adafruit_ADS1115 ads, int sensorID) {
  // turn on sensor sensorID
  //digitalWrite(sensorID, HIGH);
  //delay(1000)
  uint16_t r, g, b, c, colorTemp, lux;

  tcs.getRawData(&r, &g, &b, &c);
  colorTemp = tcs.calculateColorTemperature(r, g, b);
  lux = tcs.calculateLux(r, g, b);
  //turn off sensor sensorID
  //digitalWrite(sensorID, HIGH);
  //delay(1000)
  return constructRGBCMeasurement(String(r), String(g), String(b), String(c), String(colorTemp), String(lux));
}
/**
   Takes a measurement from the sensor
*/
aJsonObject* takeColorMeasurement(Adafruit_TCS34725 tcs, Adafruit_ADS1115 ads) {
  return takeRGBCMeasurement(tcs, ads, /*SENSOR_ID_1*/0);
}

aJsonObject* takeTurbidityMeasurement(Adafruit_TCS34725 tcs, Adafruit_ADS1115 ads) {
  return takeRGBCMeasurement(tcs, ads, /*SENSOR_ID_2*/1);
}

aJsonObject* takeElectrochemicalMeasurement(Adafruit_TCS34725 tcs, Adafruit_ADS1115 ads) {
  //TODO
  return constructElectrochemicalMeasurement(String(1), String(2), String(3));
}

