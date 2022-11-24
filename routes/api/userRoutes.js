const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addNewFriend,
  deleteFriend,
} = require('../../controllers/user');

// /api/users
router.route('/').get(getUser).post(createUser);
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addNewFriend).put(deleteFriend);

module.exports = router;
