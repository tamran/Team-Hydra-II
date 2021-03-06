import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root';
import App from './components/App';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import startPushNotifications, { pushNotificationsMiddleware } from './custom_middleware/push_notifications'
import { customRoutingMiddleware } from './custom_middleware/custom_routing';

import WelcomePage from './components/WecomePage';
import ExperimentStatusPage from './components/ExperimentStatusPage';
import TrialDataPage from './components/TrialDataPage';
import FolderPage from './components/FolderPage';
import { changeLocation } from './actions/actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const navMiddleware = routerMiddleware(browserHistory);
const enhancers = composeEnhancers(applyMiddleware(thunk, navMiddleware, pushNotificationsMiddleware, customRoutingMiddleware));
let store = createStore(rootReducer, enhancers);

const history = syncHistoryWithStore(browserHistory, store);

startPushNotifications(store);
history.listen(location => store.dispatch(changeLocation(location)))

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={WelcomePage} />
                <Route path="experiment" component={ExperimentStatusPage} />
                <Route path="data" component={TrialDataPage} />
                <Route path="organization" component={FolderPage} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
