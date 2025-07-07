const express = require('express');
const router = express.Router();
const {
  getSavedPosts,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/saved').get(protect, getSavedPosts);
router.route('/:id').get(protect, admin, getUserById).put(protect, admin, updateUser).delete(protect, admin, deleteUser);

module.exports = router;