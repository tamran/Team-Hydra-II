import ActionTypes from '../actions/actionTypes';

const updateEntry = (state={
    label: "",
    text: "",
}, action, labelName) => {
    switch(action.type) {
        case ActionTypes.LOCATION_CHANGE:
            console.log(action)
            return state;
        case ActionTypes.CHANGE_NEW_EXPERIMENT_TEXT:
            return {
                label: action.id,
                text: action.text,
            }
        case ActionTypes.CREATE_EXPERIMENT_SUCCESS:
            return {
                ...state,
                text: '',
            }
        default:
            return {
                ...state,
                label: labelName,
            }
    }
}

const updateById = (state, action) => {
    switch(action.type) {
        case ActionTypes.CHANGE_NEW_EXPERIMENT_TEXT:
            return {
                ...state,
                [action.id]: updateEntry(state[action.id], action),
            }
        default:
            let newState = {};
            for (const key of Object.keys(state)) {
                newState[key] = updateEntry(state[key], action, key);
            }
            return newState;
            //return state;
    }
}

const updateAllIds = (state, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

const newExperimentInfo = (state={
    byId: {
        'Turbidity': undefined,
        'Concentration': undefined,
        'Number of Measurements': undefined,
    },
    allIds: ['Turbidity', 'Concentration', 'Number of Measurements'],
}, action) => ({
    ...state,
    byId: updateById(state.byId, action),
    allIds: updateAllIds(state.allIds, action),
})

export default newExperimentInfo;
