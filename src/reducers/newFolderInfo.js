import ActionTypes from '../actions/actionTypes'

const updateEntry = (state={
    label: "",
    text: "",
}, action, labelName) => {
    switch(action.type) {
        case ActionTypes.LOCATION_CHANGE:
            return state;
        case ActionTypes.CHANGE_NEW_FOLDER_TEXT:
            return {
                label: action.id,
                text: action.text,
            }
        case ActionTypes.CREATE_FOLDER_SUCCESS:
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
        case ActionTypes.CHANGE_NEW_FOLDER_TEXT:
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


const newFolderInfo = (state={
    byId: {
        'New Folder Name': undefined,
    },
    allIds: ['New Folder Name'],
}, action) => ({
    ...state,
    byId: updateById(state.byId, action),
    allIds: updateAllIds(state.allIds, action),
})

export default newFolderInfo;
