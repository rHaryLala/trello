import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProject = ({ project, onProjectUpdated }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);

  useEffect(() => {
    setName(project.name);
    setDescription(project.description);
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, user is not logged in');
      return;
    }

    try {
      console.log('Updating project with ID:', project._id);
      console.log('API URL:', `/api/projects/${project._id}`);
      const response = await axios.put(`/api/projects/${project._id}`, { name, description }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      onProjectUpdated(response.data);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Nom du projet
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Modifier
        </button>
      </div>
    </form>
  );
};

export default EditProject;