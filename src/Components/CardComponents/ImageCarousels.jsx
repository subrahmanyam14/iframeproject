import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Cards.css';

const ImageCarousels = () => {
  return (
    <div className='cardss'>
      <h3>Recently updated cards....</h3>
      <div className="cardss-container">
        {isLoading ? (
          <center>
            <p>Loading....</p>
          </center>
        ) : (
          <Slider {...settings}>
            {data.map((card, index) => (
              <div key={index} className="cardss" onClick={() => handleOnClick(card)}>
                <div className="cardss-body">
                  
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}

export default ImageCarousels
