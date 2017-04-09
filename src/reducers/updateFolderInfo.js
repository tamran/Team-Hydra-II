import ActionTypes from '../actions/actionTypes'

const updateEntry = (state={
    label: "",
    text: "",
}, action, labelName) => {
    switch(action.type) {
        case ActionTypes.LOCATION_CHANGE:
            return state;
        case ActionTypes.CHANGE_UPDATE_FOLDER_TEXT:
            return {
                label: action.id,
                text: action.text,
            }
        case ActionTypes.UPDATE_FOLDER_SUCCESS:
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
        case ActionTypes.CHANGE_UPDATE_FOLDER_TEXT:
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


const updateFolderInfo = (state={
    byId: {
        'Folder Name': undefined,
        'Trial Name': undefined,
    },
    allIds: ['Folder Name, Trial Name'],
}, action) => ({
    ...state,
    byId: updateById(state.byId, action),
    allIds: updateAllIds(state.allIds, action),
})

export default updateFolderInfo;
