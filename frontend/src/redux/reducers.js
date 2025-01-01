import { combineReducers } from 'redux';

const projectsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return action.payload;
    default:
      return state;
  }
};

const tasksReducer = (state = { todo: [], inProgress: [], done: [] }, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer
});