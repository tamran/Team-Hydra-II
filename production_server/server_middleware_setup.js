'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connectMiddleware = undefined;

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectMiddleware = exports.connectMiddleware = function connectMiddleware(app) {
    app.use(_bodyParser2.default.urlencoded({ extended: false }));
    app.use(_bodyParser2.default.json());
};