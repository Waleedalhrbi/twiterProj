import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Profile from './components/Profile'; 

function App() {
  const isLoggedIn = localStorage.getItem('loggedIn');

  return (
    <Router>
      <Routes>
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
