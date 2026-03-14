import React, { useEffect, useState } from "react";
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);  // деректер массив ретінде сақталады

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then(res => setPosts(res.data))      // API-дан алынған деректерді state-ке қою
      .catch(err => console.error(err));   // қате болса console-ға шығару
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => (                    
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p><b>Anons:</b> {post.anons}</p>
          <p>{post.full_text}</p>
        </div>
      ))}
    </div>
  )
}

export default Posts;
