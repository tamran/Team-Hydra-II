import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root';
import App from './components/App';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import startPushNotifications, { pushNotificationsMiddleware } from './custom_middleware/push_notifications'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const navMiddleware = routerMiddleware(browserHistory);
const enhancers = composeEnhancers(applyMiddleware(thunk, navMiddleware, pushNotificationsMiddleware));
let store = createStore(rootReducer, enhancers);

const history = syncHistoryWithStore(browserHistory, store);

startPushNotifications(store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/(:filter)" component={App} />
        </Router>
    </Provider>,
    document.getElementById('root')
);
