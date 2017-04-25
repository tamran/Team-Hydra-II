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

const updateMeasurements = (state={
        color: [],
        turbidity: [],
        electrochemical: [],
    }, action) => {
    switch(action.type) {
        case ActionTypes.UPDATE_LATEST_MEASUREMENT:
            return {
                ...state,
                [action.measurementType]: 
                    [
                        ...state[action.measurementType],
                        measurement(undefined, action),
                    ]
            }        
        default:
            return state;
    }
}

const updateIsAlive = (state={
    time: 'N/A',
}, action) => {
    switch(action.type) {
        case ActionTypes.UPDATE_IS_ALIVE:
            return {
                ...state,
                time: action.time
            }
        default:
            return state;
    }
}

const currentExperiment = (state={
    message: 'Last measurement',
    lastReadingTime: 'N/A',
    measurements: undefined,
    isAlive: undefined,
}, action) => {
    switch(action.type) {
        case ActionTypes.UPDATE_LATEST_MEASUREMENT:
            return {
                ...state,
                lastReadingTime: action.measurement.time,
                measurements: updateMeasurements(state.measurements, action)
            }
        case ActionTypes.UPDATE_IS_ALIVE:
            return {
                ...state,
                isAlive: updateIsAlive(state.isAlive, action)
            }
        default:
            return {
                ...state,
                measurements: updateMeasurements(state.measurements, action),
                isAlive: updateIsAlive(state.isAlive, action)
            }
    }
}

export default currentExperiment;
