import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import BurgerBuilder from "../BurgerBuilder/BurgerBuilder";
import PageNotFound from "../PageNotFound/PageNotFound";
import { getToken, logout } from "../../utils/auth";
import "./App.css";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = getToken();

    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);

      const expirationTime = parseInt(
        localStorage.getItem("tokenExpiration") || "0",
        10,
      );
      const remainingTime = expirationTime - new Date().getTime();

      if (remainingTime > 0) {
        const timer = setTimeout(() => {
          handleLogout();
        }, remainingTime);

        return () => clearTimeout(timer);
      } else {
        handleLogout();
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogin = (token: string) => {
    setIsAuthenticated(true);
    setToken(token);
    navigate("/builder");
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setToken(null);
    navigate("/login");
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route
          path="/builder"
          element={
            isAuthenticated && token ? (
              <BurgerBuilder token={token} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/builder" : "/login"} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {isAuthenticated && (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      )}
    </div>
  );
};

export default App;
