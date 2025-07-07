const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentOnPost,
  savePost,
} = require('../controllers/postController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getPosts).post(protect, admin, createPost);
router.route('/:id').get(getPostById).put(protect, admin, updatePost).delete(protect, admin, deletePost);
router.route('/:id/like').post(protect, likePost);
router.route('/:id/comment').post(protect, commentOnPost);
router.route('/:id/save').post(protect, savePost);

module.exports = router;