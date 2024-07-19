import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageSlider.css';

import { SampleNextArrow, SamplePrevArrow } from './CustomArrows';  

// Adjust these paths to where your images are stored
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import image3 from '../../assets/image3.jpg';
import image4 from '../../assets/image4.jpg';

const imageUrls = [image1, image2, image3, image4];

const ImageSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='slider'>
      <div className="slider-container">
        <Slider {...settings}>
          {imageUrls.map((url, index) => (
            <div key={index} className="image-slider">
              <img src={url} alt={`Slide ${index}`} className="slider-image" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageSlider;
