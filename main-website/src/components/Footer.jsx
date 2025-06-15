import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaCalendarAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const footerSections = [
    {
      title: 'Company',
      links: [
        { text: 'About Us', path: '/about' },
        { text: 'Services', path: '/services' },
        { text: 'Contact', path: '/contact' },
        { text: 'Careers', path: '/careers' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Blog', path: '/blog' },
        { text: 'Documentation', path: '/docs' },
        { text: 'Support', path: '/support' },
        { text: 'FAQ', path: '/faq' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', path: '/privacy' },
        { text: 'Terms of Service', path: '/terms' },
        { text: 'Cookie Policy', path: '/cookies' },
      ],
    },
  ];

  return (
    <footer className="footer">
      <Container fluid>
        <Row className="footer-content">
          {/* Company Info */}
          <Col lg={4} md={4} className="mb-4 mb-md-0">
            <div className="logo-container">
              <div className="logo-icon">
                <FaCalendarAlt />
              </div>
              <div className="logo-text">
                <span className="logo-conference">Conference</span>
                <span className="logo-hub">Hub</span>
              </div>
            </div>
            <p className="company-description">
              Making conferences accessible to everyone. We provide innovative solutions
              to help businesses organize and manage successful events in the digital age.
            </p>
            <div className="social-icons">
              <Link to="#" className="social-icon">
                <FaFacebook />
              </Link>
              <Link to="#" className="social-icon">
                <FaTwitter />
              </Link>
              <Link to="#" className="social-icon">
                <FaLinkedin />
              </Link>
              <Link to="#" className="social-icon">
                <FaInstagram />
              </Link>
            </div>
          </Col>
          
          {/* Footer Links */}
          {footerSections.map((section) => (
            <Col key={section.title} xs={6} md={2} lg={2} className="mb-4 mb-md-0">
              <h5 className="footer-heading">{section.title}</h5>
              <ul className="footer-links">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <Link to={link.path} className="footer-link">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
          ))}
          
          {/* Newsletter */}
          <Col lg={2} md={4} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Stay Updated</h5>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email" className="form-control mb-2" />
              <button className="btn btn-light btn-sm w-100">Subscribe</button>
            </div>
          </Col>
        </Row>
        
        {/* Copyright */}
        <Row className="copyright-row">
          <Col>
            <p className="copyright">
              © {new Date().getFullYear()} ConferenceHub. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;