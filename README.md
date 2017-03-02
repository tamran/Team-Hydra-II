# Team-Hydra-II

## To access the currently live version of the app
[Click Here!](https://team-hydra-ii.herokuapp.com/)

## Currently available features on live version:

- From the _web client_
  - Request for a new trial to be started with a given turbidity, concentration, and number of trials
  - View when the last posted measurement was taken
    - __NOTE__ that when the client is first opened, the last posted measurement will be N/A.  When the next measurement is posted to the database, the time will be updated accordingly
  - Clicking the `Experiment Status` navigation item takes you to a page where you can view the new experiment data as it's being added to the database.  This is our equivalent of a "serial monitor"
  - Clicking the `Trial Data` navigation item displays a list of all conducted Trials.  You can click on the trial name to see all measurements associated with the selected trial. __NOTE__ that the data on this page only updates when you re-select the `Trial Data` navigation item.
- The server accepts the following API
  - /
    - `GET` Get the HTML associated with the website
  - /api/newExperiment
    - `GET` Get the information necessary to start running the experiment
      - This is the signal for the sensor to start taking data.  The string will be empty if no experiment is to be run
    - `POST` Inform the server of the information necessary to start running the experiment
      - This API endpoint is intended to be used by the web client
  - /api/clearExperiment
    - `GET` The signal for the sensor to send to the server that it has started to take measurement for the trial specified by /newExperiment
  - /api/trials
    - `GET` Returns a string list of the names of all trials stored in the database
  - /api/trial/:trialName
    - `GET` Returns the measurements associated with the trial :trialName
    - `POST` Creates a trial in the database named :trialName
  - /api/measurement/:trialName
    - `POST` Saves the data stored in the request body to a new measurement in the specified :trialName
      - When the measurement has been posted to the database, the server notifies the web client that a new measurement has been placed in the database

## To setup the Feather communication in Arduino

- host = team-hydra-ii.herokuapp.com
- httpPort = 80
- Check for a new measurement
  - Make a GET request to /api/newMeasurement
  - If the response has a body (i.e. is not {})
    - Make a POST request to /api/trial/:trialName (where :trialName is the `experimentName` field in the response body of the previous GET request) to create a new trial called :trialName in the database
    - The number of times to run the experiment is specified in the response body of the GET request, in the field `numExperiments`
    - For each measurement that you take, make a POST request to /api/measurement/:trialName, where the body of the post request contains all of the measurement information
    - Once the requested number of measurements have been taken, make a GET request to /api/clearExperiment to clear the requested experiment that you just completed
    
## To communicate with the API over command line:

- To create a new experiment:
  - Go to the website, fill out the form, and press enter
- To view the new experiment that is created by the form on the website:
  - `curl team-hydra-ii.herokuapp.com/api/newExperiment`
- To create a new trial in the database:
  - `curl --data "" team-hydra-ii.herokuapp.com/api/trial/TRIALNAME`
- To add a measurement to this trial name:
  - `curl --data "R=2&G=3&B=4&C=5&ColorTemp=6&lux=7" team-hydra-ii.herokuapp.com/api/measurement/TRIALNAME`
- To clear the new experiment flag once the experiment has completed:
  - `curl team-hydra-ii.herokuapp.com/api/clearExperiment`

## To setup the Express Server on a local machine

- First, you'll need to install [NodeJS](https://nodejs.org/en/)
- Navigate to the base directory of the Team-Hydra-II project
- Type `npm install` to install all dependencies listed in `package.json`

## To start the app locally

- Run `npm run watch` to transpile the client-side code into a form that can be rendered in a browser
- Run `npm run serve` to start the development server
  - **Important** this command will __fail__ unless you have initialized the MONGODB_URI environment variable
  - I have intentionally hidden this, as keeping this under version control is *very* bad practice (for obvious reasons).
  - If you need to run this server in development, let me know, and I'll give you access to this URI
- To open the app locally, go to a browser and visit `localhost:3000`.
- The setup allows continuous development without re-running code!
  - __Note__ that when you make changes to files in the `server/` directory, the server will automatically be restarted with nodemon.   When you change code in the `src/` directory, the code will be re-transpiled with watchify and babelify

## To prepare the app for production
- Run `npm run build`
  - This builds a production-ready, transpiled server and client code that can be run on Heroku. 
  - This is necessary, as I'm using new JavaScript syntax, and node does not currently support all of its features
- Commit/push all changes, then upload to Heroku using `git push heroku master`
- You can then visit the live website by typing `heroku open` in terminal
