import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'

import { connectMiddleware } from './server_middleware_setup'
import { route } from './routes/routes'

const app = express()
const server = http.Server(app);
const DEV_PORT = 3000;
const PORT = process.env.PORT || DEV_PORT;

connectMiddleware(app);
route(app);

//Start server
server.listen(PORT, function () {
  console.log(`Listening on port ${PORT}!`)
})
