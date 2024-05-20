import React, { useState } from 'react';
import NavbarComponent from '../Components/NavbarComponent';
import Carousel from 'react-bootstrap/Carousel';
import { Container, Row, Col, Card } from 'react-bootstrap';
import slide from '../Images/Carousel/8.png'; // Import your image
import Footer from '../Components/Footer';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container fluid>
      <NavbarComponent />
      <Container fluid style={{ padding: 0 }}>
        <Carousel style={{ width: "100%", height: "65vh" }}>
          <Carousel.Item>
            <img src={slide} alt="img1" style={{ width: "100%", height: "65vh", objectFit: "cover" }} />
          </Carousel.Item>
          {/* Add more Carousel.Items if needed */}
        </Carousel>

        {/* Card Section */}
        <Container style={{ marginTop: '120px', marginBottom: '120px'}}>
          <Row xs={1} md={4} className="g-4">
            {Array.from({ length: 8 }).map((_, idx) => (
              <Col key={idx}>
                <Card style={{ height: '100%' }}>
                  <Card.Img variant="top" src={slide} alt={`Card ${idx + 1}`} />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto animi aperiam eos debitis voluptatum ipsam provident iure. Suscipit, minus? Quas vel sit provident nam odit itaque culpa nemo consectetur vero.
                    </Card.Text>
                    <button className="btn btn-link" onClick={toggleCard}>
                      {isOpen ? 'Close' : 'Read More'}
                    </button>
                    {isOpen && (
                      <div>
                        <Card.Text className="mt-3">
                          More content...
                        </Card.Text>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
      <Footer/>
    </Container>
  )
}

export default HomePage;
