import { call, put, takeLatest, take, delay } from "redux-saga/effects";
import { fetchTasks, postTasks, updateTasks, deleteTasks } from "./api";
import {
  getTasksSuccess,
  getTasksFailure,
  createTasksSuccess,
  createTasksFailure,
  updateTasksSuccess,
  updateTasksFailure,
  deleteTasksSuccess,
  deleteTasksFailure,
} from "./action";

function* handleGetTasks() {
  try {
    const tasks = yield call(fetchTasks);
    yield put(getTasksSuccess(tasks));
  } catch (err) {
    yield put(getTasksFailure(err.message));
  }
}

export function* watcherTaskSaga() {
  yield takeLatest("GET_TASKS_REQUESTED", handleGetTasks);
}

function* handleTaskCreation({ payload }) {
  try {
    console.log("testing payload at Saga, ", payload);
    const response = yield call(postTasks, payload);
    console.log("checking response in saga.js", response);
    console.log("Got the data posted!");
    yield put(createTasksSuccess(response));
  } catch (err) {
    yield put(createTasksFailure(err.message));
  }
}

export function* watcherTaskCreationSaga() {
  yield takeLatest("CREATE_TASKS_START", handleTaskCreation);
}

function* handleTaskUpdate({ payload: { id, newUpdates } }) {
  try {
    console.log("testing payload at Saga, ", id, newUpdates);
    const response = yield call(updateTasks, id, newUpdates);
    console.log("checking response in saga.js", response);
    console.log("Got the data posted!");
    yield put(updateTasksSuccess(response));
  } catch (err) {
    yield put(updateTasksFailure(err.message));
  }
}

export function* watcherTaskUpdateSaga() {
  yield takeLatest("UPDATE_TASKS_START", handleTaskUpdate);
}

function* handleTaskDelete(taskID) {
  try {
    console.log('testing payload, ', taskID)
    const response = yield call(deleteTasks, taskID);
    console.log('testing response in saga2, ', response)
    yield put(deleteTasksSuccess(taskID));
  } catch (error) {
    console.log('error in saga, ', error)
    yield put(deleteTasksFailure(error));
  }
}

export function* watcherTaskDeleteSaga() {
  // yield takeLatest("DELETE_TASKS_START", handleTaskDelete);
  while (true) {
    const { payload: taskID } = yield take("DELETE_TASKS_START");
    console.log('testing taskID in saga', taskID)
    yield call(handleTaskDelete, taskID);
  }
}
