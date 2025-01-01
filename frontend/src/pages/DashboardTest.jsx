import React, { useEffect, useState } from 'react';
import CustomNavbar from '../components/CustomNavbar';
import AddProject from '../components/AddProject';
import axios from 'axios';
import { Modal, Button } from 'flowbite-react';
import { PlusIcon } from '@heroicons/react/24/solid';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
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

  const handleProjectAdded = (newProject) => {
    setProjects([...projects, newProject]);
    setIsModalOpen(false); 
  };

  return (
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <div className="w-64 hidden md:block">
        <Sidebar />
    </div>
      <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CustomNavbar />
        <div className="container mx-auto p-4 flex-1">
          <h1 className="text-4xl font-bold mb-4"></h1>
          <Button onClick={() => setIsModalOpen(true)} className="mb-4 bg-white text-blue-500 hover:bg-gray-200 flex items-center justify-center">
            <PlusIcon className="h-6 w-6" />
          </Button>
          <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Modal.Header>Nouveau projet</Modal.Header>
            <Modal.Body>
              <AddProject onProjectAdded={handleProjectAdded} />
            </Modal.Body>
          </Modal>
          <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
            <ul>
              {projects.map((project) => (
                <li key={project._id} className="mb-2 text-gray-800">
                  {project.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;