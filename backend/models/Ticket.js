const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['À faire', 'En cours', 'En validation', 'Terminé'], required: true },
  estimationDate: { type: Date, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;