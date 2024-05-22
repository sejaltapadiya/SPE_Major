import React, { useState } from 'react';
import { BsFillPlusCircleFill, BsCardList, BsBookmarkFill } from 'react-icons/bs';
import './Sidebar.css'; // Ensure to create and import this CSS file

const Sidebar = ({ handleOptionClick }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const itemStyle = (item) => ({
    padding: '10px',
    borderRadius: '5px',
    fontSize: hoveredItem === item ? '18px' : '16px', // Decreased font size
    border: hoveredItem === item ? '2px solid black' : 'none',
    cursor: 'pointer',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif', // Replace with the font used in your navbar
    fontWeight: 'bold', // Adjust according to your navbar font weight
  });

  const iconStyle = {
    marginRight: '10px',
  };

  return (
    <div
      className="sidebar"
      style={{
        width: '300px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Slightly lighter shade of gray
        paddingTop: '20px',
        paddingLeft: '30px',
        textAlign: 'left',
        height: '75.5vh',
        fontFamily: 'Arial, sans-serif', // Ensure this matches your navbar font
      }}
    >
      <ul className="list-unstyled">
        <li
          style={itemStyle('New Post')}
          onClick={() => handleOptionClick('New Post')}
          onMouseEnter={() => handleMouseEnter('New Post')}
          onMouseLeave={handleMouseLeave}
        >
          <BsFillPlusCircleFill style={iconStyle} /> NEW POST
        </li>
        <li
          style={itemStyle('Posts')}
          onClick={() => handleOptionClick('Posts')}
          onMouseEnter={() => handleMouseEnter('Posts')}
          onMouseLeave={handleMouseLeave}
        >
          <BsCardList style={iconStyle} /> POSTS
        </li>
        <li
          style={itemStyle('Bookmarks')}
          onClick={() => handleOptionClick('Bookmarks')}
          onMouseEnter={() => handleMouseEnter('Bookmarks')}
          onMouseLeave={handleMouseLeave}
        >
          <BsBookmarkFill style={iconStyle} /> BOOKMARKS
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
