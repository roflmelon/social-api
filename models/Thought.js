const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const format = require('date-format');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      //limits the length of string
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //format with an external library
      //for personal reference: https://mongoosejs.com/docs/schematypes.html#getters
      get: (date) => format.asString('yyyy/MM/dd hh:mm:ss', date),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
