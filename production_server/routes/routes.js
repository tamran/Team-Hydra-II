'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.route = undefined;

var _homeRoutes = require('./homeRoutes');

var _homeRoutes2 = _interopRequireDefault(_homeRoutes);

var _experimentCreationRoutes = require('./experimentCreationRoutes');

var _experimentCreationRoutes2 = _interopRequireDefault(_experimentCreationRoutes);

var _dataCollectionRoutes = require('./dataCollectionRoutes');

var _dataCollectionRoutes2 = _interopRequireDefault(_dataCollectionRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var route = exports.route = function route(app) {
    (0, _homeRoutes2.default)(app);
    (0, _experimentCreationRoutes2.default)(app);
    (0, _dataCollectionRoutes2.default)(app);
};