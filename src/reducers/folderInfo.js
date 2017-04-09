import ActionTypes from '../actions/actionTypes'

const trials = (state=[], action) => {
    switch(action.type) {
        case ActionTypes.ADD_TRIAL_TO_FOLDER:
            return [
                ...state,
                action.trialName,
            ]
        default:
            return state;
    }
}

const folder = (state={
    name: '',
    description: '',
    trials: undefined,
}, action) => {
    switch(action.type) {
        case ActionTypes.CREATE_NEW_FOLDER:
            return {
                name: action.name,
                description: action.description,
                trials: trials(undefined, action),
            }
        case ActionTypes.ADD_TRIAL_TO_FOLDER:
            return {
                ...state,
                trials: trials(state.trials, action)
            }
    }
}

const folders = (state={}, action) => {
    switch(action.type) {
        case ActionTypes.CREATE_NEW_FOLDER:
            return {
                ...state,
                [action.name]: folder(undefined, action),
            }
        case ActionTypes.ADD_TRIAL_TO_FOLDER:
            return {
                ...state,
                [action.folderName]: folder(state[action.folderName], action)
            }
        case ActionTypes.CLEAR_FOLDERS:
            return {}
        default:
            return state;
    }
}

const folderInfo = (state={
    folders: undefined,
    filter: '',
}, action) => {
    switch(action.type) {
        case ActionTypes.CHANGE_FOLDER_FILTER:
            return {
                ...state,
                filter: action.filter,
            }
        default: 
            return {
                ...state,
                folders: folders(state.folders, action)
            }
    }
}

export default folderInfo;
