#include <Wire.h>
#include <SPI.h>
#include <SD.h>
#include "Adafruit_TCS34725.h"


/* Example code for the Adafruit TCS34725 breakout library */

/* Connect SCL    to analog 5
   Connect SDA    to analog 4
   Connect VDD    to 3.3V DC
   Connect GROUND to common ground */
   
/* Initialise with default values (int time = 2.4ms, gain = 1x) */
// Adafruit_TCS34725 tcs = Adafruit_TCS34725();

/* Initialise with specific int time and gain values */
Adafruit_TCS34725 tcs = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_700MS, TCS34725_GAIN_1X);

File myFile;
int numberPoints = 1000;

void setup(void) {
  Serial.begin(9600);
  
  if (tcs.begin()) {
    Serial.println("Found sensor");
  } else {
    Serial.println("No TCS34725 found ... check your connections");
    while (1);
  }

  // open text file to save data to
  myFile = SD.open("colorSensorData.txt", FILE_WRITE);

  if (!myFile) {  // if the file didn't open properly
    Serial.println("error opening text file");
    return;
  } 

 for (int i = 0; i<1000; i++){
    uint16_t r, g, b, c, colorTemp, lux;
  
    tcs.getRawData(&r, &g, &b, &c);
    colorTemp = tcs.calculateColorTemperature(r, g, b);
    lux = tcs.calculateLux(r, g, b);
  
    myFile.print(colorTemp, DEC); Serial.print(" ");
    myFile.print(lux, DEC); Serial.print(" ");
    myFile.print(r, DEC); Serial.print(" ");
    myFile.print(g, DEC); Serial.print(" ");
    myFile.print(b, DEC); Serial.print(" ");
    myFile.print(c, DEC); Serial.print(" ");
    myFile.println(" ");
  
  }

}

void loop(void) {
  
  uint16_t r, g, b, c, colorTemp, lux;
  
  tcs.getRawData(&r, &g, &b, &c);
  colorTemp = tcs.calculateColorTemperature(r, g, b);
  lux = tcs.calculateLux(r, g, b);
  
  Serial.print("Color Temp: "); Serial.print(colorTemp, DEC); Serial.print(" K - ");
  Serial.print("Lux: "); Serial.print(lux, DEC); Serial.print(" - ");
  Serial.print("R: "); Serial.print(r, DEC); Serial.print(" ");
  Serial.print("G: "); Serial.print(g, DEC); Serial.print(" ");
  Serial.print("B: "); Serial.print(b, DEC); Serial.print(" ");
  Serial.print("C: "); Serial.print(c, DEC); Serial.print(" ");
  Serial.println(" ");

  
}
