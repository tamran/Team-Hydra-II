import ActionTypes from '../actions/actionTypes';

const measurement= (state, action) => {
    switch(action.type) {
        case ActionTypes.UPDATE_LATEST_MEASUREMENT:
            return {
                ...action.measurement,
            }
        default:
            return state;
    }
}

const updateMeasurements = (state, action) => {
    switch(action.type) {
        case ActionTypes.UPDATE_LATEST_MEASUREMENT:
            return [
                ...state,
                measurement(undefined, action)
            ]
        default:
            return state;
    }
}

const currentExperiment = (state={
    message: 'Last measurement',
    lastReadingTime: 'N/A',
    measurements: [],
}, action) => {
    switch(action.type) {
        case ActionTypes.UPDATE_LATEST_MEASUREMENT:
            return {
                ...state,
                lastReadingTime: action.measurement.time,
                measurements: updateMeasurements(state.measurements, action)
            }
        default:
            return state;
    }
}

export default currentExperiment;
