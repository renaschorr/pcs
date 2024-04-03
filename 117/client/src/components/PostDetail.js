import React, { useState, useEffect } from 'react';

const PostDetail = ({ match }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postId = match.params.id;
        const response = await fetch(`http://localhost:5000/api/posts/${postId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const postData = await response.json();
        setPost(postData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [match.params.id]);

  useEffect(() => {
    if (post) {
      fetchComments(post._id, setComments);
    }
  }, [post]);
  

  const fetchComments = async (postId, setComments) => {
    try {
      console.log(`Fetching comments for post with ID ${postId}`);
      const response = await fetch(`http://localhost:5000/api/posts/${postId}/comments`);
      console.log('Response:', response);

      if (!response.ok) {
        throw new Error(`Failed to fetch comments: ${response.statusText}`);
      }
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${post._id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      // Clear the comment input field
      setComment('');
      // Fetch comments again to update the comments list
      fetchComments(post._id, setComments);
      console.log(post._id);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
 // console.log(comments);
  return (
    
    <div>
      <h2>Post Detail</h2>
      {loading ? (
        <p>Loading...</p>
      ) : post ? (
        <>
          <h3>{post.title}</h3>
          <p>{post.content}</p>

          {/* Comment form */}
          <form onSubmit={handleCommentSubmit}>
            <textarea
              placeholder="Enter your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <button type="submit">Add Comment</button>
          </form>

          {/* Display comments */}
          <h4>Comments</h4>
          <ul>
  {comments.map((comment, index) => (
    <li key={index}>{comment}</li>
  ))}
</ul>
        </>
      ) : (
        <p>Post not found</p>
      )}
    </div>
  );
};

export default PostDetail;
