import React, { useState, useEffect } from 'react';

const BlogPage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [batchSize, setBatchSize] = useState(3);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showingPosts, setShowingPosts] = useState(false);
  const [comments, setComments] = useState({});

  useEffect(() => {
    // Fetch users data
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);
useEffect(() => {
    if (!showingPosts) {
      setBatchSize(3);
    }
  }, [showingPosts]);
  const showPosts = (userId) => {
    // Fetch posts data for a specific user
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setSelectedUserId(userId);
        setBatchSize(3);
        setDisplayedPosts(data.slice(0, batchSize));
        setShowingPosts(true); 
      })
      .catch(error => console.error('Error fetching posts:', error));
  };

  const showNextPosts = () => {
    setDisplayedPosts(posts.slice(batchSize, batchSize + 3));
    setBatchSize(prevBatchSize => prevBatchSize + 3);
  };

  const showPreviousPosts = () => {
    const previousBatchSize = batchSize - 6;
    setDisplayedPosts(posts.slice(previousBatchSize, batchSize - 3));
    setBatchSize(previousBatchSize);
  };

  const toggleComments = (postId) => {
    if (comments[postId]) {
      setComments(prevComments => ({
        ...prevComments,
        [postId]: null
      }));
    } else {
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => response.json())
        .then(data => {
          setComments(prevComments => ({
            ...prevComments,
            [postId]: data
          }));
        })
        .catch(error => console.error('Error fetching comments:', error));
    }
  };

  const canGoBack = batchSize > 3;
  const canGoNext = batchSize < posts.length;

  return (
    <div className="container">
      <h1 className="app-title">Blog App</h1>
      {!showingPosts && (
        <div className="user-list">
          {users.map(user => (
            <div className="blog" key={user.id}>
              <h2>{user.name}</h2>
              <p>Website: {user.website}</p>
              <p>Company: {user.company.name}</p>
              <button onClick={() => showPosts(user.id)}>Show Posts</button>
            </div>
          ))}
        </div>
      )}
      {showingPosts && selectedUserId && (
        <div className="post-list">
          <button className="back-button" onClick={() => setShowingPosts(false)}>Back to Blogs</button>
          {displayedPosts.map(post => (
            <div className="post" key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <button onClick={() => toggleComments(post.id)}>
                {comments[post.id] ? 'Hide Comments' : 'Show Comments'}
              </button>
              {comments[post.id] && (
                <div className="comments">
                  {comments[post.id].map(comment => (
                    <div className="comment" key={comment.id}>
                      <h4>{comment.name}</h4>
                      <p>{comment.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="button-container">
            <button onClick={showPreviousPosts} disabled={!canGoBack}>Previous</button>
            <button onClick={showNextPosts} disabled={!canGoNext}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
