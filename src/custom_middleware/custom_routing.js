import ActionTypes from '../actions/actionTypes';
import { loadAllTrialData } from '../actions/asyncActions';

export const customRoutingMiddleware = store => next => action => {
    const result = next(action);

    if (action.type === ActionTypes.LOCATION_CHANGE) {
        if (action.location.pathname === 'data') {
            store.dispatch(loadAllTrialData());
        }
    }

    return result;
}
