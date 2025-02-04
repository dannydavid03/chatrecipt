import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SignUp from './signup.jsx';
import Home from './home.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true); // User logs in
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // User logs out
  };

  return (
    <BrowserRouter>
      <Routes>
      <Route
      path="/"
      element={isLoggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />}
      />
        <Route
          path="/home"
          element={isLoggedIn ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<SignUp onLogin={handleLogin} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
