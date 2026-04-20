import React from 'react';
import img1 from '../../../assets/Package/packd1.webp';
import img2 from '../../../assets/Package/packd2.webp';
import img3 from '../../../assets/Package/packd3.webp';

const Scroll = () => {
  const images = [img1, img2, img3];

  const wrapperStyle = {
    display: 'flex',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    position: 'relative',
  };

  const trackStyle = {
    display: 'flex',
    animation: 'scroll 10s linear infinite',
  };

  const imageStyle = {
    flexShrink: 0,
    width: 'auto',
    height: '100%',
    marginRight: '10px',
  };

  const animationStyle = `
    @keyframes scroll {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-100%);
      }
    }
  `;

  return (
    <div className='max-w-[25rem] md:max-w-full lg:max-w-[25rem]'>
      <style>{animationStyle}</style>
      <div style={wrapperStyle}>
        <div style={trackStyle}>
          {/* Display images in a loop */}
          {images.concat(images).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`scroll-img-${index}`}
              style={imageStyle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scroll;
