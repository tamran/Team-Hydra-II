import { routerReducer } from 'react-router-redux';
import newExperimentInfo from './newExperimentInfo';

const root = (state=
{
    newExperimentInfo: undefined,
    routing: undefined,
}
, action) => {
    return {
        ...state,
        newExperimentInfo: newExperimentInfo(state.newExperimentInfo, action),
        routing: routerReducer(state.routing, action),
    }
}

export default root;
