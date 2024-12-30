const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Actif', 'Inactif', 'Archiver'], required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;