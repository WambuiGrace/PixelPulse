const Post = require('../models/Post');
const User = require('../models/User');

const getPosts = async (req, res) => {
  const posts = await Post.find({}).populate('user', 'name');
  res.json(posts);
};

const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('user', 'name').populate('comments.user', 'name');
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

const createPost = async (req, res) => {
  const { title, content, image } = req.body;

  const post = new Post({
    title,
    content,
    image,
    user: req.user._id,
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
};

const updatePost = async (req, res) => {
  const { title, content } = req.body;

  const post = await Post.findById(req.params.id);

  if (post) {
    post.title = title;
    post.content = content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await post.remove();
    res.json({ message: 'Post removed' });
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

const likePost = async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
        if (post.likes.includes(req.user._id)) {
            post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
        } else {
            post.likes.push(req.user._id);
        }
        await post.save();
        res.json(post.likes);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};

const commentOnPost = async (req, res) => {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);

    if (post) {
        const comment = {
            text,
            user: req.user._id,
        };
        post.comments.push(comment);
        await post.save();
        res.status(201).json(post.comments);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};

const savePost = async (req, res) => {
    const user = await User.findById(req.user._id);
    const post = await Post.findById(req.params.id);

    if (user && post) {
        if (user.savedPosts.includes(post._id)) {
            user.savedPosts = user.savedPosts.filter(id => id.toString() !== post._id.toString());
        } else {
            user.savedPosts.push(post._id);
        }
        await user.save();
        res.json(user.savedPosts);
    } else {
        res.status(404).json({ message: 'User or Post not found' });
    }
};


module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentOnPost,
  savePost,
};