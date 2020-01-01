import {createStore, combineReducers, compose, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import magazineReducer from './Reducers/MagazineReducer';

const rootReducer = combineReducers({
    magazinesStore: magazineReducer,
});

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk, logger),
    // other store enhancers if any
);

const configureStore = () => {
    return createStore(rootReducer, enhancer);
};

export default configureStore;
