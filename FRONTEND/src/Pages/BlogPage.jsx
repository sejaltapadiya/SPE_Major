import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavbarComponent from '../Components/NavbarComponent';
import Footer from '../Components/Footer';
import ReactHtmlParser from 'react-html-parser';

const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const token = localStorage.getItem('authToken');
  const [imageName, setImageName] = useState('');

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:9595/api/posts/user/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setPost(response.data);
      setImageName(response.data.imageName);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const contentStyle = {
    flexGrow: 1,
    padding: '20px',
  };

  const postImageStyle = {
    width: '100%',
    height: 'auto',
    marginBottom: '20px',
  };

  return (
    <div style={pageStyle}>
      <NavbarComponent />
      <div style={contentStyle}>
        {post ? (
          <div>
            <h2>{post.title}</h2>
            {post.imageName && (
              <img src={imageName} alt="Post" style={postImageStyle} />
            )}
            <div className="post-content">
              {ReactHtmlParser(post.content)}
            </div>
          </div>
        ) : (
          <p>Loading post...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PostDetailPage;
