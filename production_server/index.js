'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _server_middleware_setup = require('./server_middleware_setup');

var _routes = require('./routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.Server(app);
var DEV_PORT = 3000;
var PORT = process.env.PORT || DEV_PORT;

(0, _server_middleware_setup.connectMiddleware)(app);
(0, _routes.route)(app);

//Start server
server.listen(PORT, function () {
  console.log('Listening on port ' + PORT + '!');
});