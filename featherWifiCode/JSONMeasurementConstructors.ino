/**
   Constructs the JSON object corresponding to a measurement
*/
aJsonObject* constructRGBCMeasurement(String R, String G, String B, String C, String ColorTemp, String lux) {

  aJsonObject *root = aJson.createObject();
  aJson.addStringToObject(root, "R", R.c_str());
  aJson.addStringToObject(root, "G", G.c_str());
  aJson.addStringToObject(root, "B", B.c_str());
  aJson.addStringToObject(root, "C", C.c_str());
  aJson.addStringToObject(root, "ColorTemp", ColorTemp.c_str());
  aJson.addStringToObject(root, "lux", lux.c_str());

  return root;
}

aJsonObject* constructElectrochemicalMeasurement(String Aluminum, String StainlessSteel, String Titanium) {

  aJsonObject *root = aJson.createObject();
  aJson.addStringToObject(root, "Aluminum", Aluminum.c_str());
  aJson.addStringToObject(root, "StainlessSteel", StainlessSteel.c_str());
  aJson.addStringToObject(root, "Titanium", Titanium.c_str());

  return root;
}

