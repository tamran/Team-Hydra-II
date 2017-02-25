'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var homeRoutes = function homeRoutes(app) {
    app.route('/').get(function (req, res) {
        if (process.env.NODE_ENV === 'production') {
            res.sendFile(_path2.default.resolve(__dirname, '../..', 'build', 'index.html'));
        } else {
            res.sendFile(_path2.default.resolve(__dirname, '../..', 'public-dev', 'index.dev.html'));
        }
    });
};

exports.default = homeRoutes;