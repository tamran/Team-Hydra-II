import io from 'socket.io';
//import { saveMessage } from './db/mongo_connector';

let connections = [];

export const emitter = (measurement, type) => {
    connections.forEach( connectedSocket => {
        connectedSocket.emit('measurement', measurement, type);
    });
}


export const connectIO = (server) => {
    let socketServer = io(server)

    socketServer.on('connection', socket => {
        console.log('connected');
        connections.push(socket);

        //socket.on('message', action => {
            //console.log(action)
            ////saveMessage(action, emitter(connections))
        //});

        socket.on('disconnect', () => {
            console.log('disconnected');
            const index = connections.indexOf(socket);
            connections.splice(index, 1);
        });
    });
}
