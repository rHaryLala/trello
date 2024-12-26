import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CustomNavbar from '../components/CustomNavbar';

const sampleTasks = {
  todo: [
    { id: '1', content: 'Task 1', description: 'Description for Task 1', priority: 'High' },
    { id: '2', content: 'Task 2', description: 'Description for Task 2', priority: 'Medium' },
  ],
  inProgress: [
    { id: '3', content: 'Task 3', description: 'Description for Task 3', priority: 'Low' },
    { id: '4', content: 'Task 4', description: 'Description for Task 4', priority: 'High' },
  ],
  done: [
    { id: '5', content: 'Task 5', description: 'Description for Task 5', priority: 'Medium' },
    { id: '6', content: 'Task 6', description: 'Description for Task 6', priority: 'Low' },
  ],
};

const Dashboard = ({ tasks = sampleTasks, onDragEnd }) => {
  useEffect(() => {
    console.log('Tasks:', tasks);
  }, [tasks]);

  if (!tasks) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CustomNavbar />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-around p-8 bg-gray-100 min-h-screen gap-8">
          {Object.keys(tasks).map((columnId) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  className="bg-white rounded-lg shadow-lg p-4 w-1/4"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className="text-center text-xl font-semibold text-gray-700 mb-4">
                    {columnId.charAt(0).toUpperCase() + columnId.slice(1)}
                  </h2>
                  {tasks[columnId].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-gray-200 rounded p-3 mb-3 shadow"
                        >
                          <p>{task.content}</p>
                          <p>{task.description}</p>
                          <p>{task.priority}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;