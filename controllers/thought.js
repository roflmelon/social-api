const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // GET:api/thoughts
  getThought(req, res) {
    Thought.find()
      .select('-__v')
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // GET: api/thoughts/:id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No user found!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // POST: api/thoughts/
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: thought._id } },
          { new: true }
        ).select('-__v');
      })
      .then((user) => {
        return user
          ? res.json({ user: user, message: 'Thought Created' })
          : res.status(404).json({
              message: 'Thought created, user not found.',
            });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  // PUT: api/thoughts/:id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((thought) => {
        thought
          ? res.json(thought)
          : res.status(404).json({ message: 'Failed to update' });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // DELETE: api/thoughts/:id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'Thought not found.' })
          : //disassociate the thought from the user
            User.findOneAndUpdate(
              { thoughts: req.params.id },
              { $pull: { thoughts: req.params.id } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Thought deleted but no user.' })
          : res.json({ message: 'Thought deleted.' })
      )
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  // POST: api/thoughts/:thoughtId/reactions
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      {
        new: true,
      }
    )
      .select('-__v')
      .then((thought) =>
        thought
          ? res.json(thought)
          : res.status(404).json({ message: 'Thought not found.' })
      )
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  // DELETE: api/thoughts/:thoughtId/reactions/:reactionId
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      {
        new: true,
      }
    )
      .select('-__v')
      .then((thought) =>
        thought
          ? res.json(thought)
          : res.status(404).json({ message: 'Thought not found.' })
      )
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
};
