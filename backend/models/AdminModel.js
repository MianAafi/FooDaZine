const mongoose = require('mongoose');

const Admin = new mongoose.Schema(
  {
    name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
  },
  { timestamps: true }
);

const model = mongoose.model('Admin', Admin);

module.exports = model;
