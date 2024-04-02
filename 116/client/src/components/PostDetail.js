import React from 'react';

const PostDetail = ({ post }) => {
  return (
    <div>
      <h2>Post Detail</h2>
      <div>
        <h3>Title: {post.title}</h3>
        <p>Content: {post.content}</p>
        <p>Author: {post.author}</p>
        <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
        <p>Updated At: {post.updatedAt ? new Date(post.updatedAt).toLocaleString() : 'Not updated'}</p>
      </div>
    </div>
  );
};

export default PostDetail;
