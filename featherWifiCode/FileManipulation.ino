
String getFilename(String experimentType, int experimentNumber) {
  return experimentType + String(experimentNumber) + ".txt";
}

void getMeasurements(aJsonObject * (&buf)[MAX_ARRAY_SIZE], String filename) {
  File file = SD.open(filename);

  for (int i=0; i<MAX_ARRAY_SIZE; ++i) {
    buf[i] = getJson(file.readStringUntil('\n'));
  }

  file.close();
}

//TODO: what if an entry is null???
void saveBuffer(aJsonObject * (&buf)[MAX_ARRAY_SIZE], String filename) {
  File file = SD.open(filename, FILE_WRITE);

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

