import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

export default {
  middleware: [sagaMiddleware],
};
