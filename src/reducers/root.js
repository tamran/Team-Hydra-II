import { routerReducer } from 'react-router-redux';
import currentExperiment from './currentExperiment';
import newExperimentInfo from './newExperimentInfo';

const root = (state=
{
    newExperimentInfo: undefined,
    currentExperiment: undefined,
    routing: undefined,
}
, action) => {
    return {
        ...state,
        newExperimentInfo: newExperimentInfo(state.newExperimentInfo, action),
        currentExperiment: currentExperiment(state.currentExperiment, action),
        routing: routerReducer(state.routing, action),
    }
}

export default root;
