const Post = require('../models/Post');

const postController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find();
      return res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  getPostById: async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  createPost: async (req, res) => {
    try {
      const { title, content, comments } = req.body;
      const newPost = await Post.create({ title, content, comments });
      return res.status(201).json(newPost);
    } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  updatePost: async (req, res) => {
    try {
      const postId = req.params.id;
      const { title, content } = req.body;
      const updatedPost = await Post.findByIdAndUpdate(postId, { title, content }, { new: true });
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Error updating post:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  deletePost: async (req, res) => {
    try {
      const postId = req.params.id;
      const deletedPost = await Post.findByIdAndDelete(postId);
      if (!deletedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return res.status(204).send(); // No content response
    } catch (error) {
      console.error('Error deleting post:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  addCommentToPost: async (req, res) => {
    try {
      const postId = req.params.id;
      const { comment } = req.body;

      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      post.comments.push(comment); // Add the comment to the post's comments array
      await post.save();

      return res.status(201).json({ message: 'Comment added successfully', post });
    } catch (error) {
      console.error('Error adding comment:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  getCommentsById: async (req, res) => {
    try {
      const postId = req.params.postId;
      // Retrieve the post by its ID
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      // Extract comments from the post
      const comments = post.comments;
      // Send comments as the response
      return res.status(200).json({ comments });
    } catch (error) {
      console.error('Error retrieving comments:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = postController;
