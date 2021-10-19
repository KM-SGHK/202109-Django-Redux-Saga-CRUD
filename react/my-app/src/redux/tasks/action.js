export const getTasks = () => {
    return {
      type: "GET_TASKS_REQUESTED",
    };
  };

export const getTasksSuccess = (tasks) => {
  return {
    type: "GET_TASKS_SUCCESS",
    tasks: tasks
  }
}

export const getTasksFailure = (message) => {
  return {
    type: "GET_TASKS_FAILED",
    message: message
  }
}

export const createTaskStart = (postData) => {
  return {
    type: "CREATE_TASKS_START",
    payload: postData
  }
}

export const createTasksSuccess = (latestPostData) => {
  console.log('testing in action 1', latestPostData)
  return {
    type: "CREATE_TASKS_SUCCESS",
    payload: latestPostData
  }
}

export const createTasksFailure = (message) => {
  console.log('testing in action2')
  return {
    type: "CREATE_TASKS_FAILED",
    message: message
  }
}

export const updateTaskStart = (postData) => {
  console.log('checking postData in action.js', postData)
  return {
    type: "UPDATE_TASKS_START",
    payload: postData
  }
}

export const updateTasksSuccess = (latestPostData) => {
  return {
    type: "UPDATE_TASKS_SUCCESS",
    payload: latestPostData
  }
}

export const updateTasksFailure = (message) => {
  return {
    type: "UPDATE_TASKS_FAILED",
    message: message
  }
}

export const deleteTaskStart = (taskID) => {
  console.log('checking taskID in action.js', taskID)
  return {
    type: "DELETE_TASKS_START",
    payload: taskID
  }
}

export const deleteTasksSuccess = (taskID) => {
  console.log('testing delete success')
  return {
    type: "DELETE_TASKS_SUCCESS",
    payload: taskID
  }
}

export const deleteTasksFailure = (message) => {
  return {
    type: "DELETE_TASKS_FAILED",
    message: message
  }
}


