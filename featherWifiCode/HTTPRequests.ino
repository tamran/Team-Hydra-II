#include <ESP8266HTTPClient.h>
#include <aJSON.h>

String HOST = "http://team-hydra-ii.herokuapp.com";
const int httpPort = 80;
HTTPClient http;

/**
 * A helper method to print info about the HTTP code, and to get the 
 * response of the HTTP request
 * returns the JSON response, or an empty JSON object if there is an error
 */
aJsonObject* handleHttpStatus(int httpCode) {
  aJsonObject* jsonObject;
  
  Serial.print("HTTP response code ");
  Serial.println(httpCode);
  
  if (httpCode == HTTP_CODE_OK)
  {
    String response = http.getString();
    jsonObject = getJson(response);
  }
  else
  {
    Serial.println("Error in HTTP request");
    jsonObject = getJson("");
  }

  return jsonObject;
}

/**
  Gets a new valid experiment.
  returns the response JSON object
  e.g. endpoint: "/api/trial/derp"
*/
aJsonObject* get(String endpoint) {
  // make a get request to /api/newExperiment
  // return the response

  http.begin(HOST + endpoint);
  int httpCode = http.GET();
  aJsonObject* jsonObject = handleHttpStatus(httpCode);
  http.end();
  return jsonObject;
}

/**
 * Makes a POST request using the input JSON object to the specified endpoint
 * e.g. endpoint: "/api/trial/derp"
 */
int post(String endpoint, aJsonObject* json) {
  // send post request to database
  http.begin(HOST + endpoint);
  http.addHeader("Content-Type", "application/json");
  char *payload = aJson.print(json);
  Serial.println(payload);
  int httpCode = http.POST((uint8_t *)payload, strlen(payload));
  handleHttpStatus(httpCode);
  http.end();
  return httpCode;
}
