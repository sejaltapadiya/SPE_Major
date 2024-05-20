import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../Components/NavbarComponent';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';
import axios from 'axios';
import { Row, Col, Card, Button } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import './MainPage.css'; // Import custom CSS

const MainPage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (selectedOption === 'Posts') {
      fetchPosts();
    }
  }, [selectedOption]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:9595/api/posts/user/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === 'New Post') {
      navigate('/newpost');
    }
  };

  const handleUpdate = (postId) => {
    navigate(`/edit/${postId}`);
  };

  const handleView = (postId) => {
    navigate(`/view/${postId}`);
  };

  const truncateContent = (content, wordLimit) => {
    const words = content.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return content;
  };

  return (
    <div className='main-page'>
      <NavbarComponent />
      <div className='flex-container' style={{ height: '73.5vh', display: 'flex' }}>
        <Sidebar handleOptionClick={handleOptionClick} />
        <div className='content-box' style={{ flex: '1', padding: '20px', overflowY: 'auto' }}>
          {selectedOption === 'New Post' && <div>New Post Content</div>}
          {selectedOption === 'Posts' && (
            <div>
              <h2>Posts</h2>
              <Row xs={1} md={2} lg={4} className='g-4'>
                {posts.map((post) => (
                  <Col key={post.postId}>
                    <Card style={{ height: '100%' }}>
                      {post.imageName && (
                        <Card.Img variant="top" src={`${post.imageName}`} alt="Post Image" />
                      )}
                      <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>
                          {ReactHtmlParser(truncateContent(post.content, 20))}
                        </Card.Text>
                        <div className="button-container">
                          <Button onClick={() => handleView(post.postId)} className="custom-button">
                            View
                          </Button>
                          <Button onClick={() => handleUpdate(post.postId)} className="custom-button">
                            Edit
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
