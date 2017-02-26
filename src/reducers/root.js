import { routerReducer } from 'react-router-redux';
import allExperimentInfo from './allExperimentInfo';
import currentExperiment from './currentExperiment';
import newExperimentInfo from './newExperimentInfo';

const root = (state=
{
    allExperimentInfo: undefined,
    newExperimentInfo: undefined,
    currentExperiment: undefined,
    routing: undefined,
}
, action) => {
    return {
        ...state,
        allExperimentInfo: allExperimentInfo(state.allExperimentInfo, action),
        newExperimentInfo: newExperimentInfo(state.newExperimentInfo, action),
        currentExperiment: currentExperiment(state.currentExperiment, action),
        routing: routerReducer(state.routing, action),
    }
}

export default root;
