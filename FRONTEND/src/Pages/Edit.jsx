import React, { useState, useEffect } from 'react';
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate , useParams } from 'react-router-dom';

export default function NewPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageName, setImageName] = useState('');
  const token = localStorage.getItem('authToken');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { postId } = useParams();


  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] }
      ],
      [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size",
  ];

  useEffect(() => {
    // Fetch post data when component mounts
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9595/api/posts/user/${postId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        const post = response.data;
        console.log(post);
        setTitle(post.title);
        setContent(post.content);
        setImageName(post.imageName);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId, token]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };


  const handleContentChange = (content) => {
    setContent(content);
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        title: title,
        content: content,
        imageName: imageName
      }
      console.log(formData);
      const response = await axios.put(
        `http://localhost:9595/api/posts/user/update/${postId}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            
          },
        }
      );
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error submitting blog post:', error);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/mainpage'); // Navigate back to the main page
  };

  return (
    <div>
      <Container>
        <h3 style={{ margin: '15px 0px' }}>Create your Blog:</h3>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter Title"
            />
          </Form.Group>
        </Form>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={content}
          onChange={handleContentChange}
          style={{ height: "555px", marginBottom: '50px' }}
        />
        <div className="button-container">
          <Button
            variant="contained"
            onClick={handleSubmit}
            style={{
              display: 'flex',
              justifyContent: 'center',
              textTransform: 'uppercase',
              backgroundColor: '#000',
              color: 'white',
              width: '160px',
              borderRadius: '5px',
              position: 'relative',
              margin: '8px 0px',
              transition: 'background-color 0.3s ease',
            }}
          >
            Submit
          </Button>
        </div>
        <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your post has been added successfully.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
    </div>
  );
}
