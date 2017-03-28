#include <Wire.h>
#include <Adafruit_ADS1015.h>

/* PH TO ADC CONNECTIONS
 *  
 *  ADC GND --> ZINC
 *  ADC ANALOG INPUT 0 --> ALUMINUM 
 *  ADC ANALOG INPUT 1 --> STAINLESS STEEL
 *  ADC ANALOG INPUT 2 --> TITANIUM
 */


/* The ADC input range (or gain) can be changed via the following
  // functions, but be careful never to exceed VDD +0.3V max, or to
  // exceed the upper and lower limits if you adjust the input range!
  // Setting these values incorrectly may destroy your ADC!
  //                                                                ADS1015  ADS1115 (mV per bit)
  //                                                                -------   -------
  // ads.setGain(GAIN_TWOTHIRDS);  // 2/3x gain +/- 6.144V  1 bit = 3mV      0.1875mV (default)
  // ads.setGain(GAIN_ONE);        // 1x gain   +/- 4.096V  1 bit = 2mV      0.125mV
  // ads.setGain(GAIN_TWO);        // 2x gain   +/- 2.048V  1 bit = 1mV      0.0625mV
  // ads.setGain(GAIN_FOUR);       // 4x gain   +/- 1.024V  1 bit = 0.5mV    0.03125mV
  // ads.setGain(GAIN_EIGHT);      // 8x gain   +/- 0.512V  1 bit = 0.25mV   0.015625mV
  // ads.setGain(GAIN_SIXTEEN);    // 16x gain  +/- 0.256V  1 bit = 0.125mV  0.0078125mV
 */


// INITIALIZE ADC AND INPUTS
Adafruit_ADS1115 ads;
int AL_PIN = 0;
int SS_PIN = 1;
int TI_PIN = 2;


// Function to get pH readings
void getPHReadings(int n){
  
  float Ti, SS, Al;
 
  for (int i = 0; i<n; i++){
    Al = (ads.readADC_SingleEnded(AL_PIN)* 0.1875)/1000;
    SS = (ads.readADC_SingleEnded(SS_PIN)* 0.1875)/1000;
    Ti = (ads.readADC_SingleEnded(TI_PIN)* 0.1875)/1000;
    Serial.print("Al: "); Serial.println(Al);
    Serial.print("SS: "); Serial.println(SS);
    Serial.print("Ti: "); Serial.println(Ti);
    Serial.println(" ");
    delay(1000);
 
  }     
 
}


void setup(void) {
  // set up ADC
  ads.begin();

  // take pH voltage readings
  getPHReadings(500);

}



void loop(void){

}

