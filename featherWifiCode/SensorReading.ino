const float PGA_VOLTS = 6144; // millivolts
const float NUM_BITS = 32767; // 2^15 - 1
const float mVOLTS_PER_BIT = PGA_VOLTS / NUM_BITS; // mV/bit

aJsonObject* takeRGBCMeasurement(Adafruit_TCS34725 tcs, Adafruit_ADS1115 ads, int sensorID) {
  // turn on sensor sensorID
  digitalWrite(sensorID, HIGH);
  delay(500);
  // Set up sensors
  Serial.print("Turning on RGB Sensor ");
  Serial.println(sensorID);
  if (tcs.begin()) {
    Serial.println("Found RGB sensor");
  } else {
    Serial.println("No TCS34725 found ... check your connections");
    while (1);
  }
  delay(500);
  uint16_t r, g, b, c, colorTemp, lux;
  // The first measurement is always all 0s, so we take 3 "warm-up" measurements
  for (int i = 0; i < 4; ++i) {
    tcs.getRawData(&r, &g, &b, &c);
    colorTemp = tcs.calculateColorTemperature(r, g, b);
    lux = tcs.calculateLux(r, g, b);
  }
  //turn off sensor sensorID
  digitalWrite(sensorID, LOW);
  return constructRGBCMeasurement(String(r), String(g), String(b), String(c), String(colorTemp), String(lux));
}
/**
   Takes a measurement from the sensor
*/
aJsonObject* takeColorMeasurement(Adafruit_TCS34725 tcs, Adafruit_ADS1115 ads) {
  return takeRGBCMeasurement(tcs, ads, COLOR_SENSOR_ID_1);
}

aJsonObject* takeTurbidityMeasurement(Adafruit_TCS34725 tcs, Adafruit_ADS1115 ads) {
  return takeRGBCMeasurement(tcs, ads, COLOR_SENSOR_ID_2);
}

aJsonObject* takeElectrochemicalMeasurement(Adafruit_TCS34725 tcs, Adafruit_ADS1115 ads) {
  Serial.println("Enabling ADS1115 sensor");
  digitalWrite(ADC_ID, HIGH);
  delay(500);
  ads.begin();

  int16_t adc0 = ads.readADC_SingleEnded(0);
  int16_t adc1 = ads.readADC_SingleEnded(1);
  int16_t adc2 = ads.readADC_SingleEnded(3);
  float aluminumVolatge = (adc0 * mVOLTS_PER_BIT) / 1000;
  float stainlessSteelVolatge = (adc1 * mVOLTS_PER_BIT) / 1000;
  float titaniumVolatge = (adc2 * mVOLTS_PER_BIT) / 1000;

  digitalWrite(ADC_ID, LOW);
  return constructElectrochemicalMeasurement(String(aluminumVolatge), String(stainlessSteelVolatge), String(titaniumVolatge));
//  return constructElectrochemicalMeasurement(String(0), String(1), String(3));
}

