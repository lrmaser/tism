import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import profiles from './profile';
import posts from './post';
import comments from './comment';
import specialInterests from './special_interest';
import stimAids from './stim_aid';
import faveStimAids from './favorite_stim_aid';

const rootReducer = combineReducers({
  session,
  profiles,
  posts,
  comments,
  specialInterests,
  stimAids,
  faveStimAids
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
