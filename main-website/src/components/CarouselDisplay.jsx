import React, { useEffect, useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../services/api";

const CarouselDisplay = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const res = await api.get("/carousel");
        setItems(res.data);
      } catch (err) {
        console.error("Failed to load carousel items", err);
      }
    };
    fetchCarouselItems();
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="ad-carousel-section py-4">
      <div className="container">
        <Carousel interval={3000} pause="hover" fade>
          {items.map((item) => (
            <Carousel.Item key={item._id}>
              <div className="ad-item">
                <img className="ad-image" src={item.imageUrl} alt={item.title} />
                <div className="ad-content">
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                  {item.link && (
                    <Button
                      variant="primary"
                      size="sm"
                      as={Link}
                      to={item.link}
                    >
                      Learn More
                    </Button>
                  )}
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default CarouselDisplay;
