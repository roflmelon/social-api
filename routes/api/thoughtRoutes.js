const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thought');

// /api/thoughts
router.route('/').get(getThought).post(createThought);
router
  .route('/:id')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);
router.route('/:thoughtId/reactions').put(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
