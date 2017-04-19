
String getFilename(String experimentType, int experimentNumber) {
  return experimentType + String(experimentNumber) + ".txt";
}

void printFile(String filename) {
  File file = SD.open(filename);
  for (int i=0; i<MAX_ARRAY_SIZE; ++i) {
    String s = file.readStringUntil('\n');
    Serial.println(s);
    Serial.println(i);
  }
  file.close();
}

void getMeasurements(aJsonObject * (&buf)[MAX_ARRAY_SIZE], String filename) {
  File file = SD.open(filename);

  for (int i=0; i<MAX_ARRAY_SIZE; ++i) {
    String line = file.readStringUntil('\n');
    buf[i] = getJson(line);
  }

  file.close();
}

//TODO: what if an entry is null???
void saveBuffer(aJsonObject * (&buf)[MAX_ARRAY_SIZE], String filename) {
  File file = SD.open(filename, O_WRITE | O_CREAT | O_TRUNC);

  for (int i=0; i<MAX_ARRAY_SIZE; ++i) {
    char* jsonString = aJson.print(buf[i]);
    file.println(jsonString);
  }

  file.close();
}


void clearBuffer(aJsonObject * (&buf)[MAX_ARRAY_SIZE]) {
  for (int i = 0; i < MAX_ARRAY_SIZE; ++i) {
    delete buf[i];
  }
}

