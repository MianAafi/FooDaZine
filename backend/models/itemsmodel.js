const mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;
const Items = new mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, required: true },
    Name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Object, default: null },
    description: { type: String, required: false },
    category_id: { type: mongoose.Types.ObjectId, ref: 'Category' },
    ingredients: {
      type: Array,
      required: false,
    },

    gallery: [
      {
        type: Array,
        required: false,
      },
    ],
  },
  { timestamps: true }
);

const model = mongoose.model('Items', Items);

module.exports = model;
