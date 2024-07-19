import React from 'react';

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: '#1869b0', borderRadius: '50%', zIndex:"1"  }}
      onClick={onClick}
    />
  );
}

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: '#1869b0', borderRadius: '50%', zIndex:"1"}}
      onClick={onClick}
    />
  );
}

export { SampleNextArrow, SamplePrevArrow };
