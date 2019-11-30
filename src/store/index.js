import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';

import reduxLoggerInit from './init/loggerInit';
import reduxSagaInit, { sagaMiddleware } from './init/sagaInit';

import rootSaga from './rootSaga';
import createMainReducer from './createMainReducer';

export default () => {
  const middleware = [
    ...reduxSagaInit.middleware,
    ...reduxLoggerInit.middleware,
  ];

  const combinedReducer = createMainReducer();
  const enhancer = compose(applyMiddleware(...middleware));

  const store = createStore(combinedReducer, enhancer);
  console.log(store);
  sagaMiddleware.run(rootSaga);

  return {
    store,
  };
};
