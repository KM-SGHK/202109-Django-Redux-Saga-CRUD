import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import {
  watcherTaskSaga,
  watcherTaskCreationSaga,
  watcherTaskUpdateSaga,
} from "./tasks/saga";
import taskReducer from "./tasks/reducer";

const reducers = combineReducers({
  tasks: taskReducer,
});

// Interface only for TS
// debugger
// declare global {
//   /* tslint:disable:interface-name */
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
//   }
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Redux Saga config
const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    watcherTaskSaga(),
    watcherTaskCreationSaga(),
    watcherTaskUpdateSaga(),
  ]);
}

// createStore
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

// remember: this must be placed here.

sagaMiddleware.run(rootSaga);
