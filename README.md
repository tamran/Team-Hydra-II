# Team-Hydra-II

## To access the currently live version of the server
[Click Here!](https://team-hydra-ii.herokuapp.com/)

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
