const initialState = {
  tasks: [],
  loading: null,
  error: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TASKS_REQUESTED":
      return { ...state, loading: true };
    case "GET_TASKS_SUCCESS":
      return {
        ...state,
        loading: false,
        tasks: action.tasks.sort(function (a, b) {
          return a.id - b.id;
        }),
      };
    case "GET_TASKS_FAILED":
      return { ...state, loading: false, error: action.message };
    case "CREATE_TASKS_SUCCESS":
      console.log("testing action.payload in reducer, ", action.payload);
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.payload],
      };
    case "UPDATE_TASKS_SUCCESS":
      console.log(
        "testing action.payload from DELETE case in reducer, ",
        action.payload
      );
      return {
        ...state,
        loading: false,
        tasks: [
          ...state.tasks.map((e) => {
            if (e.id == action.payload.id) {
              return action.payload;
            }
            return e;
          }),
        ],
      };
      case "DELETE_TASKS_SUCCESS":
      console.log(
        "testing action.payload from PUT case in reducer, ",
        action.payload
      );
      return {
        ...state.tasks.slice(0,action.payload),
        ...state.tasks.slice(action.payload + 1)
      };
    default:
      return state;
  }
};

export default taskReducer;
