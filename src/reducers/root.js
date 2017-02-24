import { routerReducer } from 'react-router-redux';
import statusBox from './statusBox';
import newExperimentInfo from './newExperimentInfo';

const root = (state=
{
    newExperimentInfo: undefined,
    statusBox: undefined,
    routing: undefined,
}
, action) => {
    return {
        ...state,
        newExperimentInfo: newExperimentInfo(state.newExperimentInfo, action),
        statusBox: statusBox(state.statusBox, action),
        routing: routerReducer(state.routing, action),
    }
}

export default root;
