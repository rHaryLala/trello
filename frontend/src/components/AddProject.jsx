import React, { useState } from 'react';
import axios from 'axios';

const AddProject = ({ onProjectAdded }) => {
  const [project, setProject] = useState({
    name: '',
    description: '',
    status: 'Actif',
    tickets: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTicketChange = (index, e) => {
    const { name, value } = e.target;
    const newTickets = [...project.tickets];
    newTickets[index] = {
      ...newTickets[index],
      [name]: value
    };
    setProject(prevState => ({
      ...prevState,
      tickets: newTickets
    }));
  };

  const handleAddTicket = () => {
    setProject(prevState => ({
      ...prevState,
      tickets: [...prevState.tickets, { name: '', description: '', status: 'À faire', estimationDate: '', assignees: [], comments: [] }]
    }));
  };

  const handleAddComment = (ticketIndex) => {
    const newTickets = [...project.tickets];
    newTickets[ticketIndex].comments.push({ content: '', author: '' });
    setProject(prevState => ({
      ...prevState,
      tickets: newTickets
    }));
  };

  const handleCommentChange = (ticketIndex, commentIndex, e) => {
    const { name, value } = e.target;
    const newTickets = [...project.tickets];
    newTickets[ticketIndex].comments[commentIndex] = {
      ...newTickets[ticketIndex].comments[commentIndex],
      [name]: value
    };
    setProject(prevState => ({
      ...prevState,
      tickets: newTickets
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, user is not logged in');
      return;
    }

    try {
      const response = await axios.post('/api/projects', project, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Project added successfully:', response.data);
      onProjectAdded(response.data);
    } catch (error) {
      console.error('Error adding project:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
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
          name="name"
          value={project.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          name="description"
          value={project.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
          Statut
        </label>
        <select
          name="status"
          value={project.status}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="Actif">Actif</option>
          <option value="Inactif">Inactif</option>
          <option value="Archiver">Archiver</option>
        </select>
      </div>
      <div className="mb-4">
        <button type="button" onClick={handleAddTicket} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Ticket
        </button>
      </div>
      {project.tickets.map((ticket, ticketIndex) => (
        <div key={ticketIndex} className="mb-4 border p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Ticket {ticketIndex + 1}</h3>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`ticket-name-${ticketIndex}`}>
              Ticket Name
            </label>
            <input
              type="text"
              name="name"
              value={ticket.name}
              onChange={(e) => handleTicketChange(ticketIndex, e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`ticket-description-${ticketIndex}`}>
              Description
            </label>
            <textarea
              name="description"
              value={ticket.description}
              onChange={(e) => handleTicketChange(ticketIndex, e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`ticket-status-${ticketIndex}`}>
              Status
            </label>
            <select
              name="status"
              value={ticket.status}
              onChange={(e) => handleTicketChange(ticketIndex, e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="À faire">À faire</option>
              <option value="En cours">En cours</option>
              <option value="En validation">En validation</option>
              <option value="Terminé">Terminé</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`ticket-estimationDate-${ticketIndex}`}>
              Estimation Date
            </label>
            <input
              type="date"
              name="estimationDate"
              value={ticket.estimationDate}
              onChange={(e) => handleTicketChange(ticketIndex, e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <button type="button" onClick={() => handleAddComment(ticketIndex)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add Comment
            </button>
          </div>
          {ticket.comments.map((comment, commentIndex) => (
            <div key={commentIndex} className="mb-4 border p-4 rounded">
              <h4 className="text-md font-semibold mb-2">Comment {commentIndex + 1}</h4>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`comment-content-${ticketIndex}-${commentIndex}`}>
                  Content
                </label>
                <textarea
                  name="content"
                  value={comment.content}
                  onChange={(e) => handleCommentChange(ticketIndex, commentIndex, e)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`comment-author-${ticketIndex}-${commentIndex}`}>
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={comment.author}
                  onChange={(e) => handleCommentChange(ticketIndex, commentIndex, e)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          ))}
        </div>
      ))}
      <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Save Project
      </button>
    </form>
  );
};

export default AddProject;