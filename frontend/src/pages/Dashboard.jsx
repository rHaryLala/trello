import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CustomNavbar from '../components/CustomNavbar';
import AddProject from '../components/AddProject';
import axios from 'axios';
import Modal from 'react-modal';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, user is not logged in');
        return;
      }

      try {
        const response = await axios.get('/api/projects', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      const fetchTasks = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found, user is not logged in');
          return;
        }

        try {
          const response = await axios.get(`/api/tickets/project/${selectedProject._id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const tickets = response.data;
          const newTasks = { todo: [], inProgress: [], done: [] };
          tickets.forEach(ticket => {
            newTasks[ticket.status.toLowerCase().replace(' ', '')].push(ticket);
          });
          setTasks(newTasks);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };

      fetchTasks();
    }
  }, [selectedProject]);

  const handleProjectChange = (e) => {
    const projectId = e.target.value;
    const project = projects.find(p => p._id === projectId);
    setSelectedProject(project);
  };

  const handleProjectAdded = (newProject) => {
    setProjects([...projects, newProject]);
    setIsModalOpen(false); // Close the modal after adding a project
  };

  const onDragEnd = (result) => {
    // Handle drag and drop logic here
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <CustomNavbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Projet</h1>
        <button onClick={openModal} className="mb-4 p-2 bg-blue-500 rounded-xl text-white hover:bg-blue-600">
          Nouveau projet
        </button>
        <select onChange={handleProjectChange} className="mb-4 p-2 border rounded">
          <option value="">Select a project</option>
          {projects.map(project => (
            <option key={project._id} value={project._id}>{project.name}</option>
          ))}
        </select>
        {selectedProject && (
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
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div
                              className="bg-gray-200 p-4 mb-4 rounded"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <h3 className="text-lg font-semibold">{task.name}</h3>
                              <p>{task.description}</p>
                              <p>Estimation Date: {new Date(task.estimationDate).toLocaleDateString()}</p>
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
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Project"
        className="modal"
        overlayClassName="overlay"
      >
        <AddProject onProjectAdded={handleProjectAdded} />
        <button onClick={closeModal} className="mt-4 p-2 bg-red-500 rounded-xl text-white hover:bg-red-600">
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Dashboard;