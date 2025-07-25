import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaRocket, FaChartLine, FaUsers, FaCog,
  FaCalendarCheck, FaArrowRight
} from 'react-icons/fa';
import Announcements from '../components/announcements';
import CarouselDisplay from '../components/CarouselDisplay';
import './Home.css';
import api from '../services/api';

const Home = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/announcements");
        setAnnouncements(res.data.map((a) => a.message));
      } catch (err) {
        console.error("Failed to fetch announcements", err);
      }
    };
    fetchData();
  }, []);

  const testimonials = [
  {
    name: "Dr. R. K. Sharma",
    role: "Professor, Dept. of CSE, NIT Silchar",
    content: "The conference fostered rich academic dialogue and provided a platform for groundbreaking research discussions.",
    image: "https://randomuser.me/api/portraits/men/28.jpg"
  },
  {
    name: "Sneha Reddy",
    role: "Final Year B.Tech Student, NIT Silchar",
    content: "An unforgettable experience! Interacting with industry experts and presenting our work boosted my confidence immensely.",
    image: "https://randomuser.me/api/portraits/women/53.jpg"
  },
  {
    name: "Aditya Malhotra",
    role: "Software Engineer, Conference Alumni '22",
    content: "Attending this conference during my time at NIT Silchar opened doors for my career in tech. It’s truly a game-changer.",
    image: "https://randomuser.me/api/portraits/men/44.jpg"
  }
];

  return (
    <div className="home-page">
      {/* Announcements Banner */}
      <Announcements messages={announcements} />

      {/* Hero Section */}
      <section className="hero-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="hero-content">
              <h1 className="hero-title mb-4">
                Join the Future of Innovation at Our Annual Conference
              </h1>
              <p className="hero-subtitle mb-4">
                Connect with industry leaders, discover cutting-edge technologies, and grow your professional network.
              </p>
              <div className="hero-buttons">
                <Button as={Link} to="/register" variant="light" size="lg" className="me-3 hero-btn">
                  Register Now
                </Button>
                <Button as={Link} to="/agenda" variant="outline-light" size="lg" className="hero-btn-outline">
                  View Agenda <FaArrowRight className="ms-2" />
                </Button>
              </div>
            </Col>
            <Col lg={6} className="d-none d-lg-block text-center">
              <img
                src="/conference-hero.svg"
                alt="Conference Banner"
                className="img-fluid hero-image"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Dynamic Carousel Section */}
      <CarouselDisplay />

      {/* Conference Highlights Section */}
<section className="highlights-section py-5">
  <Container>
    <div className="text-center mb-5">
      <h2 className="section-title">Conference Highlights</h2>
      <p className="section-subtitle">
        Experience the fusion of academia, research, and cutting-edge tech at NIT Silchar
      </p>
    </div>
    <Row className="g-4">
      <Col md={6} lg={3}>
        <Card className="highlight-card">
          <Card.Body>
            <div className="highlight-icon"><FaRocket /></div>
            <Card.Title className="highlight-title">Distinguished Keynotes</Card.Title>
            <Card.Text>
              Engage with national and international experts driving future-ready innovations.
            </Card.Text>
            <Link to="/keynotes" className="highlight-link">Learn more <FaArrowRight /></Link>
          </Card.Body>
        </Card>
      </Col>

      <Col md={6} lg={3}>
        <Card className="highlight-card">
          <Card.Body>
            <div className="highlight-icon"><FaChartLine /></div>
            <Card.Title className="highlight-title">Technical Workshops</Card.Title>
            <Card.Text>
              Gain hands-on exposure to tools and technologies shaping tomorrow’s world.
            </Card.Text>
            <Link to="/workshops" className="highlight-link">Learn more <FaArrowRight /></Link>
          </Card.Body>
        </Card>
      </Col>

      <Col md={6} lg={3}>
        <Card className="highlight-card">
          <Card.Body>
            <div className="highlight-icon"><FaUsers /></div>
            <Card.Title className="highlight-title">Academic Networking</Card.Title>
            <Card.Text>
              Collaborate with researchers, scholars, and professionals from across the globe.
            </Card.Text>
            <Link to="/networking" className="highlight-link">Learn more <FaArrowRight /></Link>
          </Card.Body>
        </Card>
      </Col>

      <Col md={6} lg={3}>
        <Card className="highlight-card">
          <Card.Body>
            <div className="highlight-icon"><FaCog /></div>
            <Card.Title className="highlight-title">Innovation Expo</Card.Title>
            <Card.Text>
              Discover student projects, research prototypes, and tech demos at our exhibition.
            </Card.Text>
            <Link to="/exhibitors" className="highlight-link">Learn more <FaArrowRight /></Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
</section>

      {/* Testimonials */}
      <section className="testimonials-section py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">What Past Attendees Say</h2>
            <p className="section-subtitle">Don't just take our word for it - hear from our community</p>
          </div>
          <Row className="justify-content-center">
            {testimonials.map((testimonial, i) => (
              <Col key={i} md={4} className="mb-4">
                <Card className="testimonial-card">
                  <Card.Body>
                    <div className="testimonial-content"><p>"{testimonial.content}"</p></div>
                    <div className="testimonial-author">
                      <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                      <div>
                        <h5 className="mb-0">{testimonial.name}</h5>
                        <p className="text-muted">{testimonial.role}</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5">
        <Container>
          <Row className="text-center">
            <Col md={3}><div className="stat-item"><div className="stat-number">1,200+</div><div className="stat-label">Attendees</div></div></Col>
            <Col md={3}><div className="stat-item"><div className="stat-number">50+</div><div className="stat-label">Speakers</div></div></Col>
            <Col md={3}><div className="stat-item"><div className="stat-number">30+</div><div className="stat-label">Workshops</div></div></Col>
            <Col md={3}><div className="stat-item"><div className="stat-number">25+</div><div className="stat-label">Countries</div></div></Col>
          </Row>
        </Container>
      </section>

      {/* Calendar Section */}
      <section className="calendar-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={5} className="mb-4 mb-lg-0">
              <h2 className="section-title">Mark Your Calendar</h2>
              <p className="mb-4">
                The ConferenceHub Annual Tech Conference is scheduled for September 15–17, 2023 at the Grand Tech Center in San Francisco.
              </p>
              <div className="d-flex align-items-center mb-3">
                <FaCalendarCheck className="calendar-icon" />
                <div>
                  <h5 className="mb-0">Conference Dates</h5>
                  <p className="mb-0">September 15–17, 2023</p>
                </div>
              </div>
              <Button as={Link} to="/schedule" variant="outline-primary" className="mt-3">
                View Full Schedule <FaArrowRight className="ms-2" />
              </Button>
            </Col>
            <Col lg={7}>
              <div className="calendar-card">
                <div className="calendar-header"><h3>Conference Schedule Overview</h3></div>
                <div className="calendar-body">
                  <div className="calendar-day"><div className="day-header">Day 1: Sept 15</div><div className="day-content"><p>Opening Keynote</p><p>Technology Panels</p><p>Welcome Reception</p></div></div>
                  <div className="calendar-day"><div className="day-header">Day 2: Sept 16</div><div className="day-content"><p>Workshops & Training</p><p>Networking Lunch</p><p>Industry Roundtables</p></div></div>
                  <div className="calendar-day"><div className="day-header">Day 3: Sept 17</div><div className="day-content"><p>Expert Panels</p><p>Closing Keynote</p><p>Farewell Party</p></div></div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <div className="cta-content">
                <h2 className="cta-title">Ready to Elevate Your Career?</h2>
                <p className="cta-text">Register today and join thousands of professionals shaping the future.</p>
                <Button as={Link} to="/register" variant="primary" size="lg" className="cta-button">
                  Register Now <FaArrowRight className="ms-2" />
                </Button>
                <p className="cta-note mt-3">Early bird pricing ends on June 30th, 2023</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
