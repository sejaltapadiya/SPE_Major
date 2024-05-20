import './App.css';
import BlogPage from './Pages/BlogPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import ShotsPage from './Pages/ShotsPage';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import MainPage from './Pages/MainPage';
import HomePage from './Pages/HomePage';
import NewPost from './Pages/NewPost';
import Edit from './Pages/Edit';

function App() {
  
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route exact path='/login' element={<LoginPage/>} />
      <Route exact path='/homepage' element={<HomePage/>} />
      <Route exact path='/newpost' element={<NewPost/>} />
      <Route exact path='/view/:postId' element={<BlogPage/>} />
      <Route exact path='/signup' element={<SignUp/>} />
      <Route exact path='/mainpage' element={<MainPage/>} />
      <Route exact path='/shotspage' element={<ShotsPage/>} />
      <Route exact path='/profilepage' element={<ProfilePage/>} />
      <Route exact path='/updatepost/:postId' element={<Edit/>}/>
      </Routes>
      </Router>
      </div>
  );
}

export default App;
