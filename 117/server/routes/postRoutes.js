const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const requireAuth = require('../middleware/requireAuth');

// Post-related routes
console.log("here-postroutes")
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', requireAuth, postController.createPost);
router.put('/:id', requireAuth, postController.updatePost);
router.delete('/:id', requireAuth, postController.deletePost);
router.post('/:id/comments', requireAuth, postController.addCommentToPost);
router.get('/:postId/comments',requireAuth,postController.getCommentsById);
module.exports = router;
