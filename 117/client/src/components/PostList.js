// PostList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './PostList.css';
// import PostDetail from './PostDetail'; // Import PostDetail component

const PostList = ({ loggedIn }) => {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      console.log("Received data from server:", data);
      if (data != null) {
        console.log("Received posts:", data.posts);
        setPosts(data);
      } else {
        console.log("No posts received from server");
        setPosts([]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const createPost = async () => {
    const postData = {
      title: newPostTitle,
      content: newPostContent
    };

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
      if (!response.ok) {
        throw new Error('Failed to create post');
      }
      const data = await response.json();
      console.log('New post created:', data);
      fetchPosts();
      setNewPostTitle('');
      setNewPostContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="post-list-container">
      <h2 className="post-list-title">Post List</h2>
      {loggedIn && (
        <div className="new-post-form">
          <input
            className="post-input"
            type="text"
            placeholder="Enter title"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <textarea
            className="post-input"
            placeholder="Enter content"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <button className="post-button" onClick={createPost}>Create New Post</button>
        </div>
      )}

      <ul className="post-ul">
        {posts.length > 0 ? (
          posts.map(post => (
            <li className="post-li" key={post._id}>
              <Link to={`/post/${post._id}`}> {/* Link to PostDetail component */}
                <h3 className="post-title">{post.title}</h3>
              </Link>
              <p className="post-content">{post.content}</p>
            </li>
          ))
        ) : (
          <li className="no-posts">No posts available</li>
        )}
      </ul>
    </div>
  );
};

export default PostList;
