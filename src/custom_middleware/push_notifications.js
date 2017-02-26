import ActionTypes from '../actions/actionTypes';
import { updateLastMeasurement } from '../actions/actions';
import io from 'socket.io-client';

var socket = null;

//TODO: Remove this method--I don't think it's necessary anymore
export const pushNotificationsMiddleware = store => next => action => {
    const result = next(action);

    //if (socket && action.type === ActionTypes.CHANGE_NEW_EXPERIMENT_TEXT) {
        //console.log('socket: sending ', action)
        //socket.emit('message', action);
    //}

    return result;
};

export default function(store) {
    socket = io.connect();

    socket.on('measurement', measurementTime => {
        store.dispatch(updateLastMeasurement(measurementTime))
    })
}
