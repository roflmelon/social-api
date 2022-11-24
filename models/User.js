const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      //trims user input's whitespace in the beginning and end of the string
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      //validate using regex
      validate: {
        validator: function (e) {
          return e.match(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/);
        },
        message: 'Please enter valid email.',
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});
const User = model('user', userSchema);

module.exports = User;
