import React, { useState } from 'react';
import { Container, Row, Col, Nav, Card, Badge, Button, Tabs, Tab } from 'react-bootstrap';
import { FaClock, FaMapMarkerAlt, FaUser, FaCalendarAlt, FaDownload, FaFilter } from 'react-icons/fa';

const Schedules = () => {
  // State to track active track filter
  const [activeTrack, setActiveTrack] = useState('all');

  // Conference days
  const days = [
    { id: 'day1', label: 'Day 1', date: 'September 15, 2023' },
    { id: 'day2', label: 'Day 2', date: 'September 16, 2023' },
    { id: 'day3', label: 'Day 3', date: 'September 17, 2023' },
  ];

  // Tracks for filtering
  const tracks = [
    { id: 'all', label: 'All Tracks', color: 'primary' },
    { id: 'tech', label: 'Technology', color: 'info' },
    { id: 'business', label: 'Business', color: 'success' },
    { id: 'design', label: 'Design', color: 'warning' },
    { id: 'data', label: 'Data Science', color: 'danger' },
  ];

  // Schedule data
  const scheduleData = {
    day1: [
      {
        id: 1,
        time: '08:00 - 09:00',
        title: 'Registration & Breakfast',
        location: 'Main Lobby',
        track: null,
        type: 'break',
        description: 'Pick up your conference badge and enjoy a complimentary breakfast while networking with other attendees.',
      },
      {
        id: 2,
        time: '09:00 - 10:00',
        title: 'Opening Keynote: The Future of Technology',
        speaker: 'Dr. Jane Smith, CTO of FutureTech',
        location: 'Grand Ballroom',
        track: 'tech',
        type: 'keynote',
        description: 'An inspiring look at how emerging technologies will shape our world in the coming decade, with insights from one of the industry\'s leading visionaries.',
      },
      {
        id: 3,
        time: '10:15 - 11:15',
        title: 'Building Scalable Cloud Solutions',
        speaker: 'Michael Johnson, Lead Architect at CloudCorp',
        location: 'Room 101',
        track: 'tech',
        type: 'session',
        description: 'Learn best practices for designing and implementing cloud-based systems that can scale to millions of users.',
      },
      {
        id: 4,
        time: '10:15 - 11:15',
        title: 'Design Systems for Enterprise',
        speaker: 'Sarah Lee, UX Director',
        location: 'Room 102',
        track: 'design',
        type: 'session',
        description: 'How to create and maintain effective design systems that improve consistency and efficiency across large organizations.',
      },
      {
        id: 5,
        time: '10:15 - 11:15',
        title: 'AI-Driven Business Insights',
        speaker: 'Robert Chen, AI Consultant',
        location: 'Room 103',
        track: 'data',
        type: 'session',
        description: 'Practical applications of artificial intelligence for extracting actionable business intelligence from your data.',
      },
      {
        id: 6,
        time: '11:30 - 12:30',
        title: 'Modern Frontend Frameworks',
        speaker: 'Emily Rodriguez, Senior Developer',
        location: 'Room 101',
        track: 'tech',
        type: 'session',
        description: 'A comparison of React, Vue, and Angular with guidance on choosing the right framework for your project.',
      },
      {
        id: 7,
        time: '11:30 - 12:30',
        title: 'Venture Capital Strategies',
        speaker: 'David Park, Managing Partner at TechFund',
        location: 'Room 102',
        track: 'business',
        type: 'session',
        description: 'Insights into how VCs evaluate startups and what founders should know when seeking investment.',
      },
      {
        id: 8,
        time: '12:30 - 14:00',
        title: 'Networking Lunch',
        location: 'Garden Terrace',
        track: null,
        type: 'break',
        description: 'Enjoy a delicious lunch while networking with speakers and fellow attendees.',
      },
      {
        id: 9,
        time: '14:00 - 15:00',
        title: 'Workshop: Hands-on Machine Learning',
        speaker: 'Dr. Alex Turner, Data Scientist',
        location: 'Computer Lab A',
        track: 'data',
        type: 'workshop',
        description: 'A practical workshop on building and training machine learning models using Python and TensorFlow.',
        capacity: 'Limited to 30 participants',
      },
      {
        id: 10,
        time: '14:00 - 15:00',
        title: 'Digital Transformation Success Stories',
        speaker: 'Lisa Wong, Digital Strategy Director',
        location: 'Room 102',
        track: 'business',
        type: 'session',
        description: 'Case studies of companies that have successfully navigated digital transformation with lessons for your organization.',
      },
      {
        id: 11,
        time: '15:15 - 16:15',
        title: 'Security Best Practices for 2023',
        speaker: 'James Wilson, Cybersecurity Expert',
        location: 'Room 101',
        track: 'tech',
        type: 'session',
        description: 'The latest approaches to protecting your systems and data from increasingly sophisticated threats.',
      },
      {
        id: 12,
        time: '16:30 - 17:30',
        title: 'Panel: The Future of Work',
        speaker: 'Industry Leaders Panel',
        location: 'Grand Ballroom',
        track: 'business',
        type: 'panel',
        description: 'A diverse panel discusses how technology is reshaping workplaces and what skills will be most valuable in the coming years.',
      },
      {
        id: 13,
        time: '18:00 - 20:00',
        title: 'Welcome Reception',
        location: 'Skyview Lounge',
        track: null,
        type: 'social',
        description: 'Join fellow attendees for drinks, hors d\'oeuvres, and conversation with a spectacular city view.',
      },
    ],
    day2: [
      {
        id: 14,
        time: '08:30 - 09:30',
        title: 'Breakfast & Morning Networking',
        location: 'Main Lobby',
        track: null,
        type: 'break',
        description: 'Start your day with breakfast and casual networking opportunities.',
      },
      {
        id: 15,
        time: '09:30 - 10:30',
        title: 'Keynote: Ethical Technology Development',
        speaker: 'Prof. Maria Garcia, Ethics Researcher',
        location: 'Grand Ballroom',
        track: 'tech',
        type: 'keynote',
        description: 'An exploration of the ethical considerations in developing new technologies and how to build with responsibility.',
      },
      // Add more sessions for day 2...
    ],
    day3: [
      {
        id: 30,
        time: '08:30 - 09:30',
        title: 'Breakfast & Morning Networking',
        location: 'Main Lobby',
        track: null,
        type: 'break',
        description: 'Final day networking breakfast.',
      },
      {
        id: 31,
        time: '09:30 - 10:30',
        title: 'Closing Keynote: Technology Trends 2024 and Beyond',
        speaker: 'Thomas Wright, Industry Analyst',
        location: 'Grand Ballroom',
        track: 'tech',
        type: 'keynote',
        description: 'A forward-looking analysis of the technologies that will drive innovation in the coming years.',
      },
      // Add more sessions for day 3...
    ],
  };

  // Function to filter schedule by track
  const getFilteredSchedule = (day) => {
    const daySchedule = scheduleData[day] || [];
    
    if (activeTrack === 'all') {
      return daySchedule;
    }
    
    return daySchedule.filter(item => 
      item.track === activeTrack || item.track === null
    );
  };

  // Get badge style based on track
  const getTrackBadge = (track) => {
    if (!track) return null;
    
    const trackInfo = tracks.find(t => t.id === track) || tracks[0];
    return <Badge bg={trackInfo.color} className="ms-2">{trackInfo.label}</Badge>;
  };

  // Get class based on session type
  const getSessionClass = (type) => {
    switch(type) {
      case 'keynote': return 'border-primary';
      case 'workshop': return 'border-info';
      case 'break': return 'border-secondary bg-light';
      case 'social': return 'border-success';
      case 'panel': return 'border-warning';
      default: return 'border-dark';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={7} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold">Conference Schedule</h1>
              <p className="lead">
                Plan your conference experience with our comprehensive schedule of keynotes, sessions, workshops, and networking events.
              </p>
              <Button variant="outline-light" className="d-inline-flex align-items-center gap-2 mt-2">
                <FaDownload /> Download PDF Schedule
              </Button>
            </Col>
            <Col lg={5}>
              <Card className="bg-white bg-opacity-10 text-white border-0">
                <Card.Body>
                  <Row className="g-3">
                    <Col sm={12}>
                      <div className="d-flex align-items-center">
                        <FaCalendarAlt className="me-3 fs-4" />
                        <div>
                          <h5 className="mb-0">Dates</h5>
                          <p className="mb-0">September 15-17, 2023</p>
                        </div>
                      </div>
                    </Col>
                    <Col sm={12}>
                      <div className="d-flex align-items-center">
                        <FaMapMarkerAlt className="me-3 fs-4" />
                        <div>
                          <h5 className="mb-0">Location</h5>
                          <p className="mb-0">Grand Tech Center, San Francisco</p>
                        </div>
                      </div>
                    </Col>
                    <Col sm={12}>
                      <div className="d-flex align-items-center">
                        <FaClock className="me-3 fs-4" />
                        <div>
                          <h5 className="mb-0">Daily Hours</h5>
                          <p className="mb-0">8:00 AM - 8:00 PM</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        {/* Track Filter */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <div className="d-flex align-items-center mb-3">
              <FaFilter className="me-2 text-primary" />
              <h5 className="mb-0">Filter by Track:</h5>
            </div>
            <div className="d-flex flex-wrap gap-2">
              {tracks.map(track => (
                <Button
                  key={track.id}
                  variant={activeTrack === track.id ? track.color : 'outline-secondary'}
                  className="rounded-pill"
                  onClick={() => setActiveTrack(track.id)}
                >
                  {track.label}
                </Button>
              ))}
            </div>
          </Card.Body>
        </Card>

        {/* Schedule Tabs */}
        <Tabs defaultActiveKey="day1" id="schedule-tabs" className="mb-4">
          {days.map(day => (
            <Tab 
              key={day.id} 
              eventKey={day.id} 
              title={
                <div className="text-center">
                  <div className="fw-bold">{day.label}</div>
                  <small>{day.date}</small>
                </div>
              }
            >
              <div className="py-3">
                {getFilteredSchedule(day.id).map((session) => (
                  <Card 
                    key={session.id}
                    className={`mb-3 shadow-sm border-start ${getSessionClass(session.type)} border-start-4`}
                  >
                    <Card.Body>
                      <Row>
                        <Col md={3} className="mb-3 mb-md-0">
                          <div className="d-flex align-items-center mb-2">
                            <FaClock className="text-secondary me-2" />
                            <span className="fw-bold">{session.time}</span>
                            {session.track && getTrackBadge(session.track)}
                          </div>
                          <div className="d-flex align-items-center text-muted">
                            <FaMapMarkerAlt className="me-2" />
                            <small>{session.location}</small>
                          </div>
                        </Col>
                        <Col md={9}>
                          <h5>{session.title}</h5>
                          {session.speaker && (
                            <div className="d-flex align-items-center mb-2 text-muted">
                              <FaUser className="me-2" />
                              <span>{session.speaker}</span>
                            </div>
                          )}
                          <p className="mb-2">{session.description}</p>
                          {session.capacity && (
                            <Badge bg="secondary" className="me-2">{session.capacity}</Badge>
                          )}
                          {session.type === 'workshop' && (
                            <Button size="sm" variant="outline-primary" className="mt-2">
                              Register for Workshop
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Tab>
          ))}
        </Tabs>
      </Container>
    </div>
  );
};

export default Schedules;