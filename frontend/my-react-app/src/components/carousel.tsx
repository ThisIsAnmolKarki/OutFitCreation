import React, { useState, useEffect } from 'react';
import '../styles/carousel.css';

interface CarouselProps {
  images: string[]; // Array of image URLs
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Explicitly defining the state type is optional here since TypeScript can infer it

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex: number) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 1 second

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, [currentIndex, images.length]); // Restart the interval when currentIndex or images.length changes

  return (
    <div className="carousel-container">
      {images.map((image, index) => (
        <div
          key={index}
          className="carousel-image-container"
          style={{
            display: currentIndex === index ? 'block' : 'none',
          }}
        >
          <img src={image} alt={`Slide ${index}`} className="carousel-image" />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
