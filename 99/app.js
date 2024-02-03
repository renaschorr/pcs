document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.getElementById("app");

  // Fetch users data
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
      // Display list of blogs/users
      displayUsers(users);
    })
    .catch(error => console.error('Error fetching users:', error));

  window.showPosts = function(userId) {
    // Fetch posts data for a specific user
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => response.json())
      .then(posts => {
        // Display posts
        displayPosts(posts, userId);
      })
      .catch(error => console.error('Error fetching posts:', error));
  };

  window.showNextPosts = function(userId, batchSize) {
    // Fetch posts data for a specific user
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => response.json())
      .then(posts => {
        // Display next batch of posts
        displayNextPosts(posts, userId, batchSize);
      })
      .catch(error => console.error('Error fetching posts:', error));
  };

  window.showComments = function(postId) {
    // Fetch comments data for a specific post
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then(response => response.json())
      .then(comments => {
        // Display comments
        displayComments(comments, postId);
      })
      .catch(error => console.error('Error fetching comments:', error));
  };

  window.hideComments = function(postId) {
    const commentContainers = document.querySelectorAll(`[data-post-id="${postId}"]`);
    commentContainers.forEach(container => {
      container.style.display = 'none';
    });
    // Remove the "Hide Comments" button
    const hideCommentsButton = document.querySelector(`#hideCommentsButton_${postId}`);
    hideCommentsButton.style.display = 'none';
  };
  
  function displayComments(comments, postId) {
    const commentsHTML = comments.map(comment => `
      <div class="comment" data-post-id="${postId}">
        <h4>${comment.name}</h4>
        <p>${comment.body}</p>
      </div>
    `).join('');
  
    const commentsContainer = `
      <div class="comments-container">
        ${commentsHTML}
      </div>
    `;
  
    const hideCommentsButton = `<button id="hideCommentsButton_${postId}" onclick="hideComments(${postId})">Hide Comments</button>`;
  
    appContainer.innerHTML += commentsContainer + hideCommentsButton;
  }

  window.showUsers = function() {
    // Fetch users data again
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        // Display list of blogs/users
        displayUsers(users);
      })
      .catch(error => console.error('Error fetching users:', error));
  };

  function displayUsers(users) {
    const userListHTML = users.map(user => `
      <div class="blog">
        <h2>${user.name}</h2>
        <p>Website: ${user.website}</p>
        <p>Company: ${user.company.name}</p>
        <button onclick="showPosts(${user.id})">Show Posts</button>
      </div>
    `).join('');

    appContainer.innerHTML = `<div class="container">${userListHTML}</div>`;
  }

  function displayPosts(posts, userId) {
    const postsHTML = posts.slice(0, 3).map(post => `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <button onclick="showComments(${post.id})">Show Comments</button>
      </div>
    `).join('');

    const nextButton = `<button onclick="showNextPosts(${userId}, 3)">Next</button>`;

    const backButton = `<button onclick="showUsers()">Back to Blogs</button>`;

    appContainer.innerHTML = `<div class="container">${backButton}${postsHTML}${nextButton}</div>`;
  }

  function displayNextPosts(posts, userId, batchSize) {
    const nextPostsHTML = posts.slice(batchSize, batchSize + 3).map(post => `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <button onclick="showComments(${post.id})">Show Comments</button>
      </div>
    `).join('');

    const nextButton = `<button onclick="showNextPosts(${userId}, ${batchSize + 3})">Next</button>`;

    const backButton = `<button onclick="showUsers()">Back to Blogs</button>`;

    appContainer.innerHTML = `<div class="container">${backButton}${nextPostsHTML}${nextButton}</div>`;
  }

});
