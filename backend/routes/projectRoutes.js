const express = require('express');
const Project = require('../models/Project');
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

module.exports = router;