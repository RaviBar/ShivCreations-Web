'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function ClientSlider({ images, title }: { images: string[] ; title: string }) {
  return (
    <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden"> 
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="px-2"> 
            <div className="w-full h-48 md:h-64 lg:h-80 overflow-hidden rounded-lg relative">
              <Image
                src={img}
                alt={`${title} Slide ${index + 1}`}
                fill
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        ))}
      </Slider>
      <style jsx global>{`
        .slick-dots {
          position: absolute;
          bottom: -40px;
          display: flex !important;
          justify-content: center;
          align-items: center;
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .slick-dots li {
          margin: 0 4px;
        }
        .slick-dots li button {
          width: 7px;
          height: 7px;
          padding: 0;
          border: none;
          border-radius: 50%;
          background-color: #ccc;
          opacity: 0.7;
          transition: background-color 0.3s ease;
        }
        .slick-dots li.slick-active button {
          background-color: #E2A240;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}