#include <aJSON.h>

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
 * Returns the JSON object corresponding to the input string
 * Used for converting the HTTP response string to JSON
 */
aJsonObject* getJson(String response) {
  //convert to char array
  int len = response.length() + 1;
  char charBuff[len];
  response.toCharArray(charBuff, len);
  Serial.println(charBuff);
  
  //convert to json object
  return aJson.parse(charBuff);
}

/**
   Constructs the JSON object corresponding to a measurement
*/
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

