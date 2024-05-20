import React from 'react';
import { BsFillPlusCircleFill, BsCardList, BsFillGrid3X3GapFill, BsBookmarkFill } from 'react-icons/bs';

const Sidebar = ({ handleOptionClick }) => {
  return (
    <div className="sidebar" style={{ width: '350px', color: 'black', backgroundColor: 'lightgrey', paddingTop: '20px', paddingLeft: '30px', textAlign: 'left', height: '73.5vh' }}>
      <ul className="list-unstyled">
        <li onClick={() => handleOptionClick('New Post')} className="mb-3">
          <BsFillPlusCircleFill /> New Post
        </li>
        <li onClick={() => handleOptionClick('Posts')} className="mb-3">
          <BsCardList /> Posts
        </li>
        <li onClick={() => handleOptionClick('Shorts')} className="mb-3">
          <BsFillGrid3X3GapFill /> Shorts
        </li>
        <li onClick={() => handleOptionClick('Bookmarks')} className="mb-3">
          <BsBookmarkFill /> Bookmarks
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
