import ActionTypes from '../actions/actionTypes';

const statusBox = (state={
    text: '',
    time: '',
}, action) => {
    switch(action.type) {
        case ActionTypes.UPDATE_LATEST_MEASUREMENT:
            return {
                ...state,
                lastReadingTime: action.time,
            }
        default:
            return {
                ...state,
                message: 'Last measurement',
                lastReadingTime: 'N/A',
            }
    }
}

export default statusBox;
