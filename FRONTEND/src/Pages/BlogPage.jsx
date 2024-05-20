import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarComponent from '../Components/NavbarComponent';
import Footer from '../Components/Footer';
import ReactHtmlParser from 'react-html-parser';
import './BlogPage.css';

const PostDetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const token = localStorage.getItem('authToken');
  const [imageName, setImageName] = useState('');

  useEffect(() => {
    fetchPost();
  }, []);

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

  return (
    <div className="post-detail-page">
      <NavbarComponent />
      <div className="post-container">
        {post ? (
          <div>
            <h2>{post.title}</h2>
            {post.imageName && (
              <img src={imageName} alt="Post" className="post-image" />
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
