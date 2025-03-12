'use client';
import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ImageSlider = () => {
  const sliderRef = useRef<Slider>(null);
  const [sliderHeight, setSliderHeight] = useState('100vh'); 

  const images = [
    '/images/imageSlider/slide1.png',
    '/images/imageSlider/slide2.png',
    '/images/imageSlider/slide3.png',
    '/images/imageSlider/slide4.png',
    '/images/imageSlider/slide5.png',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: { dots: true },
      },
      {
        breakpoint: 768, // Mobile
        settings: { dots: true },
      },
    ],
  };

  const goToNext = () => sliderRef.current?.slickNext();
  const goToPrev = () => sliderRef.current?.slickPrev();

  // Function to calculate the height of the slider based on the image's aspect ratio
  useEffect(() => {
    const calculateSliderHeight = () => {
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        const img = new Image();
        img.src = images[0];

        img.onload = () => {
          const aspectRatio = img.width / img.height;
          const newHeight = window.innerWidth / aspectRatio;
          setSliderHeight(`${newHeight}px`);
        };
      } else {
        setSliderHeight("100vh");
      }
    };

    calculateSliderHeight();
    window.addEventListener("resize", calculateSliderHeight);

    return () => {
      window.removeEventListener("resize", calculateSliderHeight);
    };
  }, [images]);

  return (
    <div className="w-full">
      <div
        className="relative w-full"
        style={{ height: sliderHeight }} // Set dynamic height
      >
        <Slider ref={sliderRef} {...settings}>
          {images.map((image, index) => (
            <div key={index} className="w-full h-full">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover md:object-contain"
              />
            </div>
          ))}
        </Slider>

        {/* Custom Arrows */}
        <button
          onClick={goToPrev}
          className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 text-white text-xl md:text-2xl z-10 hover:text-gray-300 transition-colors"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 text-white text-xl md:text-2xl z-10 hover:text-gray-300 transition-colors"
        >
          <FaChevronRight />
        </button>
      </div> <br /><br />
      <div className="mt-6 md:mt-12 lg:mt-20"></div>
    </div>
  );
};

export default ImageSlider;