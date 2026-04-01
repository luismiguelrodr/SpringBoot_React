import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserManagement from './components/UserManagement';
import ProductManagement from './components/ProductManagement';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">Microservices POC</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">Products</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/products" element={<ProductManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="jumbotron">
      <h1 className="display-4">Spring Boot Microservices with React</h1>
      <p className="lead">A Proof of Concept demonstrating microservices architecture with:</p>
      <ul>
        <li>Service Discovery (Eureka)</li>
        <li>API Gateway (Spring Cloud Gateway)</li>
        <li>Two Microservices (User & Product)</li>
        <li>React Frontend</li>
      </ul>
    </div>
  );
}

export default App;