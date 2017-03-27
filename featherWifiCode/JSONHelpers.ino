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
aJsonObject* constructMeasurement(String R, String G, String B, String C, String ColorTemp, String lux) {

  aJsonObject *root = aJson.createObject();
  aJson.addStringToObject(root, "R", R.c_str());
  aJson.addStringToObject(root, "G", G.c_str());
  aJson.addStringToObject(root, "B", B.c_str());
  aJson.addStringToObject(root, "C", C.c_str());
  aJson.addStringToObject(root, "ColorTemp", ColorTemp.c_str());
  aJson.addStringToObject(root, "lux", lux.c_str());

  return root;
}

