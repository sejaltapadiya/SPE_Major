import React from 'react';
import { Container, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <Container fluid>
     
     <Button variant="contained" style={{display:'flex', justifyContent: 'center',textTransform: 'uppercase', backgroundColor: '#000', color: 'white', width:'160px',borderRadius: '5px', position:'relative', margin:'8px 0px', transition: 'background-color 0.3s ease' ,
            ':hover': { '&:before': { opacity: '0', transform: 'translateY(50%)'}, '&:after' :{ opacity: '1', transform: 'translateY(0) rotateX(0)'} }}}>New Post</Button>
    </Container>
  );
}

export default Sidebar;
