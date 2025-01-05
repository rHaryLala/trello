const express = require('express');
const Project = require('../models/Project');
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Create a new project with tickets and comments
router.post('/', verifyToken, async (req, res) => {
  const { name, description, status, tickets } = req.body;
  const owner = req.userId;

  try {
    const project = new Project({ name, description, status, owner });
    await project.save();

    if (tickets && tickets.length > 0) {
      for (const ticketData of tickets) {
        const { name, description, status, estimationDate, assignees, comments } = ticketData;
        const ticket = new Ticket({ name, description, status, estimationDate, project: project._id, assignees, creator: owner });
        await ticket.save();

        if (comments && comments.length > 0) {
          for (const commentData of comments) {
            const { content, author } = commentData;
            const comment = new Comment({ content, author, ticket: ticket._id });
            await comment.save();
            ticket.comments.push(comment._id);
          }
          await ticket.save();
        }

        project.tickets.push(ticket._id); 
      }
      await project.save();
    }

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get all projects
router.get('/', verifyToken, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.userId });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update a project
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    project.name = name || project.name;
    project.description = description || project.description;

    await project.save();

    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete a project
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Attempting to delete project with ID: ${id}`);
    const project = await Project.findById(id);

    if (!project) {
      console.log('Project not found');
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== req.userId) {
      console.log('Unauthorized attempt to delete project');
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Project.findByIdAndDelete(id);
    console.log('Project deleted successfully');

    res.json({ message: 'Project deleted' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add a collaborator to a project
router.post('/:id/collaborators', verifyToken, async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (project.collaborators.includes(user._id)) {
      return res.status(400).json({ message: 'User is already a collaborator' });
    }

    project.collaborators.push(user._id);
    await project.save();

    // Ajouter l'ID du projet dans l'attribut projects du collaborateur
    user.projects.push(project._id);
    await user.save();

    // Renvoyer les informations complètes du collaborateur
    const collaboratorInfo = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePhoto: user.profilePhoto
    };

    // Afficher les informations du collaborateur dans la console
    console.log('Collaborator added:', collaboratorInfo);

    res.status(200).json(collaboratorInfo);
  } catch (error) {
    console.error('Error adding collaborator:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;