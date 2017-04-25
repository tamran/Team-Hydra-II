import ActionTypes from '../actions/actionTypes';
import { updateLastMeasurement, updateIsAlive } from '../actions/actions';
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
    socket.on('measurement', (measurement, type) => {
        console.log(measurement)
        console.log(type)
        store.dispatch(updateLastMeasurement(measurement, type))
    })
    socket.on('newTrialRequested', () => {
        console.log('new trial request')
        store.dispatch(updateIsAlive())
    })
}
