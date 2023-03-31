const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    address1: { type: String, required: false, default: null },
    address2: { type: String, required: false, default: null },
    address3: { type: String, required: false, default: null },
    mobile: { type: Number, required: false, default: null },
    telephone: { type: Number, required: false, default: null },
    companyDescription: { type: String, default: null },
    slug: { type: 'String', slug: 'title', unique: true },
    disable: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const model = mongoose.model('UserData', User);

module.exports = model;
