import ActionTypes from '../actions/actionTypes';

const measurement = (state, action) => {
    switch(action.type) {
        case ActionTypes.CREATE_NEW_MEASUREMENT:
            return action.measurement;
        default:
            return state;
    }
}

const measurements = (state=[], action) => {
    switch(action.type) {
        case ActionTypes.CREATE_NEW_MEASUREMENT:
            return [
                ...state,
                measurement(undefined, action),
            ]
        default:
            return state;
    }
}

const trialInfo = (state={
    name: "",
    measurements: undefined,
}, action) => {
    switch(action.type) {
        case ActionTypes.CREATE_NEW_TRIAL:
            return {
                name: action.name,
                measurements: measurements(undefined, action),
            }
        case ActionTypes.CREATE_NEW_MEASUREMENT:
            return {
                ...state,
                measurements: measurements(state.measurements, action),
            }
        default:
            return state;
    }
}

const allExperimentInfo = (state={}, action) => {
    switch(action.type) {
        case ActionTypes.CREATE_NEW_TRIAL:
        case ActionTypes.CREATE_NEW_MEASUREMENT:
            return {
                ...state,
                [action.name]: trialInfo(state[action.name], action), 
            }
        default:
            return state;
    }
}

export default allExperimentInfo;
