export const setProjects = (projects) => {
  return {
    type: "SET_PROJECTS",
    payload: projects,
  };
};

export const setTasks = (tasks) => {
  return {
    type: "SET_TASKS",
    payload: tasks,
  };
};
