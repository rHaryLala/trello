import React, { useEffect, useState } from 'react';
import CustomNavbar from '../components/CustomNavbar';
import AddProject from '../components/AddProject';
import EditProject from '../components/EditProject';
import DeleteProjectModal from '../components/DeleteProject';
import AddCollaborator from '../components/AddCollaborator';
import axios from 'axios';
import { Modal, Button, Card } from 'flowbite-react';
import { PlusIcon, PencilIcon, TrashIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddCollaboratorModalOpen, setIsAddCollaboratorModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

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
    setIsAddModalOpen(false); 
  };

  const handleCollaboratorAdded = (newCollaborator) => {
    setProjects(projects.map(project => 
      project._id === selectedProject._id 
        ? { ...project, collaborators: [...project.collaborators, newCollaborator] } 
        : project
    ));
    setIsAddCollaboratorModalOpen(false);
  };
  
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  const handleProjectUpdated = (updatedProject) => {
    setProjects(projects.map(project => project._id === updatedProject._id ? updatedProject : project));
    setIsEditModalOpen(false);
  };

  const handleProjectDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, user is not logged in');
      return;
    }
  
    try {
      await axios.delete(`/api/projects/${selectedProject._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProjects(projects.filter(project => project._id !== selectedProject._id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-100'>
      {/* Sidebar
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div> */}
      <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CustomNavbar />
        <div className="container mx-auto p-6 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">Tableau</h1>
            <Button onClick={() => setIsAddModalOpen(true)} className="bg-white text-blue-500 hover:bg-gray-200 flex items-center justify-center">
              <PlusIcon className="h-5 w-6 mr-2" />
              Nouveau Projet
            </Button>
          </div>
          <Modal show={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
            <Modal.Header>Ajouter un Projet</Modal.Header>
            <Modal.Body>
              <AddProject onProjectAdded={handleProjectAdded} />
            </Modal.Body>
          </Modal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project._id} className="bg-white text-gray-800">
                <div className="flex justify-between items-center">
                  <div onClick={() => handleProjectClick(project)} className="cursor-pointer">
                    <h2 className="text-xl font-bold">{project.name}</h2>
                    <p>{project.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <PencilIcon className="h-6 w-6 text-blue-500 cursor-pointer" onClick={() => handleProjectClick(project)} />
                    <TrashIcon className="h-6 w-6 text-red-500 cursor-pointer" onClick={() => { setSelectedProject(project); setIsDeleteModalOpen(true); }} />
                    <UserPlusIcon className="h-6 w-6 text-green-500 cursor-pointer" onClick={() => { setSelectedProject(project); setIsAddCollaboratorModalOpen(true); }} />
                  </div>
                </div>
                <div className="mt-4 flex -space-x-2 overflow-hidden">
                  {project.collaborators.map((collaborator) => (
                    <img
                      key={collaborator._id}
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                      src={collaborator.profilePhoto}
                      alt={collaborator.lastName}
                    />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Modal show={isAddCollaboratorModalOpen} onClose={() => setIsAddCollaboratorModalOpen(false)}>
        <Modal.Header>Ajouter un Collaborateur</Modal.Header>
        <Modal.Body>
          <AddCollaborator 
            onCollaboratorAdded={handleCollaboratorAdded} 
            selectedProject={selectedProject} 
            token={localStorage.getItem('token')}
          />
        </Modal.Body>
      </Modal>

      {selectedProject && (
        <Modal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <Modal.Header>Edition Projet</Modal.Header>
          <Modal.Body>
            <EditProject project={selectedProject} onProjectUpdated={handleProjectUpdated} />
          </Modal.Body>
        </Modal>
      )}

      <DeleteProjectModal
        show={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleProjectDelete}
      />
    </div>
  );
};

export default Dashboard;