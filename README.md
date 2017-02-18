# Team-Hydra-II

## To access the currently live version of the server
[Click Here!](https://team-hydra-ii.herokuapp.com/)

## To setup the Express Server on a local machine

- First, you'll need to install [NodeJS](https://nodejs.org/en/)
- Navigate to the base directory of the Team-Hydra-II project
- Type `npm install` to install all dependencies listed in `package.json`

## To start the server

- Run `npm run serve`
  - **Important** this command will __fail__ unless you have initialized the MONGODB_URI environment variable
  - I have intentionally hidden this, as keeping this under version control is *very* bad practice (for obvious reasons).
  - If you need to run this server in development, let me know, and I'll give you access to this URI
- Note that when you make changes to files in the `server/` directory, the server will automatically be restarted with nodemon

## To prepare the server for production
- Run `npm run build`
  - This builds a production-ready, transpiled server code that can be run on Heroku. 
  - This is necessary, as I'm using new JavaScript syntax, and node does not currently support all of its features
