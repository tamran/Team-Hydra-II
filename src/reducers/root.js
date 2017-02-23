import { routerReducer } from 'react-router-redux';

const root = (state=
{
    routing: undefined,
}
, action) => {
    return {
        ...state,
        routing: routerReducer(state.routing, action),
    }
}

export default root;
