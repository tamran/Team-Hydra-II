# Team-Hydra-II

## To access the currently live version of the app:
[Click Here!](https://team-hydra-ii.herokuapp.com/)

## Testing *without* the Database
To collect and process colorimetry data **without** pulling from the database, one should run the script `runColorimeter.ino` (under \runColorimeter) in conjunction with the Matlab function `plotCalibData.m.` (under \matlabscripts). 

### Collecting Data
`runColorimeter.ino` allows the Feather to collect *n* data points for each of the color channels. *n* is set in the argument of the function `getColorReading(n)`. Currently *n* is set to 500 but may be modified in the Arduino script. The readings should then be copied from the serial monitor and saved into a text file with the following naming convention: **[type]**Test\_**[val][unit]**.txt where
* **[type]**: 'color' for testing various concentrations; 'turbidity' for testing various turbidities.
* **[val]**: the actual concentration or turbidity of the sample you're testing
* **[unit]**: ppm for concentration, ntu for turbidity
Example: 'colorTest_10ppm.txt'

### Processing in MATLAB
`plotCalibData.m` is a function that analyzes *either* the concentration or turbidity of a set of calibration samples. Given several text files using the naming convention above, it pulls data these text files, and plots the channel measurements against for all of the text files (i.e. samples), and plots the average readings as a function of either concentration or turbidity. The function may be called in the command window of Matlab as follows: `plotCalibData(typeOfTest, values, n)` where
* **typeOfTest**: 'color' if you are analyzing calibration samples of different concentrations; 'turbidity' if you are analyzing calibration samples of different turbidities.
* **values**: vector of concentrations or turbidities you would like to analyze. (e.g. [1, 10, 20, 30, 40] where each number represents the concentration in ppm)
* **n**: number of data points contained in each sample trial/text file.

## The simplified communication model of this application is:
![Application Architecture](https://raw.github.com/tamran/Team-Hydra-II/master/diagrams/AppArchitecture.png)

## Currently available features on live version:

- From the _web client_
  - Request for a new trial to be started with a given turbidity, concentration, and number of trials
    - __NOTE THAT THE CURRENT MAX NUMBER OF TRIALS IS 30.__ If this number is exceeded, only the first 30 measurements will be posted.
    - This number was chosen as the maximum buffer size that avoids out-of-memory errors
    - _We should run some experiments to see if reducing the measurement frequency will work for our experiments._ If not, we'll need to 1) try to remove any memory leaks in the Arduino code and/or 2) get a microSD for the Feather HUZZAH.
  - View when the last posted measurement was taken
    - __NOTE__ that when the client is first opened, the last posted measurement will be N/A.  When the next measurement is posted to the database, the time will be updated accordingly
  - Clicking the `Experiment Status` navigation item takes you to a page where you can view the new experiment data as it's being added to the database.  This is our equivalent of a "serial monitor." Currently, you can view the Color, Turbidity, and Electrochemical measurements, as they're being taken
  - Clicking the `Trial Data` navigation item displays a list of all conducted Trials.  
    - You can click on the trial name to see all measurements associated with the selected trial.
    - Typing a string into the Filter search box filters the experiments displayed on the screen by the query substring
    - __NOTE__ that the data on this page only updates when you re-select the `Trial Data` navigation item, or when you type a new string

## The server accepts the following API:
  - /
    - `GET` Get the HTML associated with the website
  - /api/newExperiment
    - `GET` Get the information necessary to start running the experiment
      - This is the signal for the sensor to start taking data.  The string will be empty if no experiment is to be run
    - `POST` Inform the server of the information necessary to start running the experiment
      - This API endpoint is intended to be used by the web client
  - /api/clearExperiment
    - `GET` The signal for the sensor to send to the server that it has started to take measurement for the trial specified by /newExperiment
  - /api/trials[?filter=FILTER_STRING]
    - `GET` Returns a string list of the names of all trials stored in the database
      - May optionally filter your request for trials matching a certain string
      - e.g. `/api/trials` returns all trial names
      - e.g. `/api/trials?filter=derp` returns all trials containing the word derp in the trialName
  - /api/trial/:trialName
    - `GET` Returns the measurements associated with the trial :trialName
    - `POST` Creates a trial in the database named :trialName
  - /api/measurement/:type/:trialName
    - `POST` Saves the data stored in the request body to a new measurement in the specified :trialName
      - :type must be one of
        - color
        - turbidity
        - electrochemical
      - When the measurement has been posted to the database, the server notifies the web client that a new measurement has been placed in the database

__NOTE__ that there are two different types of routes - ReactRouter routes, and routes that the server accepts.  For example, there are `/experiment` and `/data` ReactRouter routes that appear when navigating to different tabs on the website. However, reloading the webpage at these routes will result in a _Cannot GET /ROUTE_NAME_.  This is because these are client-side routes only, and thus do not exist on the server side.  I am currently working on a way around this, so that reloading the webpage at one of these routes does not result in the _Cannot GET_ message.

## The (intended) public API available to the Feather

- DataCollection.iso
  - `void collectData(String experiment, int numExperiments)`
    - Takes measurements using the color sensors and the metal rods, and posts the measurements to the database
      - When WiFi isn't available, these measurements are added to a buffer queue, and POSTed when WiFi becomes available again
      - Otherwise, the data is posted as it is collected
      - Note that, in the current setup, each type of measurement is _collected_, but not necessarily _posted_, atomically
        - all of color -> all of turbidity -> all of electrochemical
  - `int createTrial(String trial)`
    - Creates a new trial in the database
    - Returns the HTTP response code (success == 200)
- HTTPRequests.iso
  - `aJsonObject* get(String endpoint)`
    - Makes a GET request to the specified api endpoint
    - Returns the JSON response object
- JSONHelpers.iso
  - `String getField(aJsonObject* json, const char* aField)`
    - Returns the string value of the field in the JSON object
    - Returns "" if the field doesn't exist
  - `aJsonObject* getJson(String response)`
    - Returns the JSON object corresponding to the input string
    - Used to get the JSON object of an HTTP response
  - `aJsonObject* constructMeasurement(const char* R, const char* G, const char* B, const char* C, const char* ColorTemp, const char* lux)`
    - Constructs the JSON object to use as the request for posting a measurement
- WiFiConnector.iso
  - `int connectToWiFi()`
    - Establishes the WiFi connection with our router
    - This command times out after waiting for 5 seconds
    - Returns -1 if could not connect to WiFi, 1 otherwise
    
## Feather Dependencies

In order to run our code, the following packages must be available to the Arduino IDE

- `ESP8266WiFi.h`
- `aJSON.h`
- `ESP8266HTTPClient.h`
- `Adafruit_TCS34725.h`

## To setup the Feather communication in Arduino:

- host = team-hydra-ii.herokuapp.com
- httpPort = 80
- Check for a new measurement
  - Make a GET request to /api/newMeasurement
  - If the response has a body (i.e. is not {})
    - Make a POST request to /api/trial/:trialName (where :trialName is the `experimentName` field in the response body of the previous GET request) to create a new trial called :trialName in the database
    - The number of times to run the experiment is specified in the response body of the GET request, in the field `numExperiments`
    - For each measurement that you take, make a POST request to /api/measurement/color/:trialName, where the body of the post request contains all of the measurement information
    - Once the requested number of measurements have been taken, make a GET request to /api/clearExperiment to clear the requested experiment that you just completed
    
## To communicate with the API over command line:

- To create a new experiment:
  - Go to the website, fill out the form, and press enter
- To view the new experiment that is created by the form on the website:
  - `curl team-hydra-ii.herokuapp.com/api/newExperiment`
- To create a new trial in the database:
  - `curl --data "" team-hydra-ii.herokuapp.com/api/trial/TRIALNAME`
- To add a measurement to this trial name:
  - `curl --data "R=2&G=3&B=4&C=5&ColorTemp=6&lux=7" team-hydra-ii.herokuapp.com/api/measurement/color/TRIALNAME`
- To clear the new experiment flag once the experiment has completed:
  - `curl team-hydra-ii.herokuapp.com/api/clearExperiment`

## To setup the Express Server on a local machine:

- First, you'll need to install [NodeJS](https://nodejs.org/en/)
- Navigate to the base directory of the Team-Hydra-II project
- Type `npm install` to install all dependencies listed in `package.json`

## To start the app locally:

- Run `npm run watch` to transpile the client-side code into a form that can be rendered in a browser
- Run `npm run serve` to start the development server
  - **Important** this command will __fail__ unless you have initialized the MONGODB_URI environment variable
  - I have intentionally hidden this, as keeping this under version control is *very* bad practice (for obvious reasons).
  - If you need to run this server in development, let me know, and I'll give you access to this URI
- To open the app locally, go to a browser and visit `localhost:3000`.
- The setup allows continuous development without re-running code!
  - __Note__ that when you make changes to files in the `server/` directory, the server will automatically be restarted with nodemon.   When you change code in the `src/` directory, the code will be re-transpiled with watchify and babelify

## To prepare the app for production:
- Run `npm run build`
  - This builds a production-ready, transpiled server and client code that can be run on Heroku. 
  - This is necessary, as I'm using new JavaScript syntax, and node does not currently support all of its features
- Commit/push all changes, then upload to Heroku using `git push heroku master`
- You can then visit the live website by typing `heroku open` in terminal
