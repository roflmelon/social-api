const { User, Thought, Reaction } = require('../models');

// route: api/users/

module.exports = {
  // Get all user
  // GET: api/users
  getUser(req, res) {
    User.find()
      .select('-__v')
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //Get a user by id
  // GET: api/users/:id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a course
  // POST: api/users
  createUser(req, res) {
    User.create(req.body)
      .then((user) => {
        res.json(user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
  // Update user
  // PUT: api/users/:id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : // $in operator allows to find all the associated id in thoughts that match the id
            Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: 'User and their thoughts has been deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // add new friend /:userId/friends/:friendId
  addNewFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete friend /:userId/friends/:friendId
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};
