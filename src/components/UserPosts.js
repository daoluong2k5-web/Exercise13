import React, { useState, useEffect } from 'react';

function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setPosts([]);
      return;
    }

    let isCancelled = false;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!isCancelled) {
          setPosts(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [userId]);

  return (
    <div className="user-posts-container">
      <h3>Posts for User ID: {userId}</h3>
      {loading && <p className="loading-state">Loading posts...</p>}
      {error && <p className="error-message">Error fetching posts: {error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="empty-state">No posts found for this user.</p>
      )}
      <div className="posts-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPosts;
