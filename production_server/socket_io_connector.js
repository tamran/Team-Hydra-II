'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connectIO = exports.isAlive = exports.emitter = undefined;

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { saveMessage } from './db/mongo_connector';

var connections = [];

var emitter = exports.emitter = function emitter(measurement, type) {
    connections.forEach(function (connectedSocket) {
        connectedSocket.emit('measurement', measurement, type);
    });
};

var isAlive = exports.isAlive = function isAlive() {
    connections.forEach(function (connectedSocket) {
        connectedSocket.emit('newTrialRequested');
    });
};

var connectIO = exports.connectIO = function connectIO(server) {
    var socketServer = (0, _socket2.default)(server);

    socketServer.on('connection', function (socket) {
        console.log('connected');
        connections.push(socket);

        //socket.on('message', action => {
        //console.log(action)
        ////saveMessage(action, emitter(connections))
        //});

        socket.on('disconnect', function () {
            console.log('disconnected');
            var index = connections.indexOf(socket);
            connections.splice(index, 1);
        });
    });
};