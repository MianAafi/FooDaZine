const mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;
const Setting = new mongoose.Schema(
  {
    Coverimage: { type: Object, default: null },
    Logoimage: { type: Object, default: null },
    user_id: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model('Setting', Setting);

module.exports = model;
