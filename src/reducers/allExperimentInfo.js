import ActionTypes from '../actions/actionTypes';

const measurement = (state, action) => {
    switch(action.type) {
        case ActionTypes.CREATE_NEW_MEASUREMENT:
            return action.measurement;
        default:
            return state;
    }
}

const measurements = (state={
    color: [],
    turbidity: [],
    electrochemical: [],
}, action) => {
    switch(action.type) {
        case ActionTypes.CREATE_NEW_MEASUREMENT:
            return {
                ...state,
                [action.measurementType]: [
                    ...state[action.measurementType],
                    measurement(undefined, action),
                ]
            }
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
            return {
                ...state,
                measurements: measurement(state.measurements, action)
            };
    }
}

const allExperiments = (state={}, action) => {
    switch(action.type) {
        case ActionTypes.CREATE_NEW_TRIAL:
        case ActionTypes.CREATE_NEW_MEASUREMENT:
            return {
                ...state,
                [action.name]: trialInfo(state[action.name], action), 
            }
        case ActionTypes.CLEAR_TRIALS:
            return {}
        default:
            return state;
    }
}

const allExperimentInfo = (state={
    allExperiments: undefined,
    filter: '',
}, action) => {
    switch(action.type) {
        case ActionTypes.CHANGE_FILTER:
            return {
                ...state,
                filter: action.filter,
            }
        default:
            return {
                ...state,
                allExperiments: allExperiments(state.allExperiments, action),
            }
    }
}

export default allExperimentInfo;
