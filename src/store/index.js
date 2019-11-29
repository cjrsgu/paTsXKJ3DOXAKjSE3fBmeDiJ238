import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';

import rootSaga from './rootSaga';
import reduxLoggerInit from './init/loggerInit';
import reduxSagaInit, { sagaMiddleware } from './init/sagaInit';

import createMainReducer from './createMainReducer';

export default () => {
  const middleware = [
    ...reduxSagaInit.middleware,
    ...reduxLoggerInit.middleware,
  ];

  const combinedReducer = createMainReducer();
  const enhancer = compose(applyMiddleware(...middleware));
  const store = createStore(combinedReducer, null, enhancer);

  sagaMiddleware.run(rootSaga);

  return {
    store,
  };
};
