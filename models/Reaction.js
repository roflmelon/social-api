const { Schema, Types } = require('mongoose');
const format = require('date-format');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //for personal reference: https://mongoosejs.com/docs/schematypes.html#getters
      get: (date) => format.asString('yyyy/MM/dd hh:mm:ss', date),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    _id: false,
  }
);
//only exporting the schema for 'thought' model to use and not creating a reaction model of its own.
module.exports = reactionSchema;
