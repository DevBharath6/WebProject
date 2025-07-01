import React, { useEffect, useState } from "react";
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from "../services/api";
import { useAuth } from '../context/AuthContext.js';

const Navbar = () => {
  const [items, setItems] = useState([]);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/navbar")
      .then(res => {
        const visibleItems = res.data.filter(item => item.visible);
        visibleItems.forEach(item => {
          item.children = item.children?.filter(child => child.visible) || [];
        });
        setItems(visibleItems);
      })
      .catch(err => console.error("Failed to fetch navbar:", err));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Nav className="ms-auto align-items-center">
      {items.map((item, idx) => (
        Array.isArray(item.children) && item.children.length > 0 ? (
          <NavDropdown 
            key={idx} 
            title={
              <Link 
                to={item.url} 
                className="text-decoration-none text-dark fw-medium px-2"
                onClick={(e) => e.stopPropagation()}
              >
                {item.title}
              </Link>
            } 
            id={`nav-dropdown-${idx}`}
            className="nav-item-custom"
          >
            {item.children.map((child, cidx) => (
              <NavDropdown.Item 
                key={cidx} 
                as={Link} 
                to={child.url}
                className="py-2"
              >
                {child.title}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        ) : (
          <Nav.Link 
            key={idx} 
            as={Link} 
            to={item.url}
            className="text-dark fw-medium px-3"
          >
            {item.title}
          </Nav.Link>
        )
      ))}

      {isAuthenticated ? (
        <NavDropdown 
          title="Profile" 
          id="profile-nav-dropdown"
          className="nav-item-custom ms-3"
        >
          <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      ) : (
        <Nav.Link 
          as={Link} 
          to="/login"
          className="btn btn-primary ms-3 px-4 py-2 rounded-pill"
        >
          Login
        </Nav.Link>
      )}

      {!isAuthenticated && (
        <Nav.Link 
          as={Link} 
          to="/register"
          className="btn btn-outline-primary ms-2 px-4 py-2 rounded-pill"
        >
          Get Started
        </Nav.Link>
      )}
    </Nav>
  );
};

export default Navbar;
