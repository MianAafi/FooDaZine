const mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;
const Category = new mongoose.Schema(
  {
    Category_name: { type: String, required: true },
    disable: { type: Boolean, default: false },

    user_id: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model('Category', Category);

module.exports = model;
