'use client';
import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

const Header = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const imageSliderHeight = window.innerHeight;

      if (scrollPosition >= imageSliderHeight) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="bg-black   p-4 flex justify-center items-center">
        <ul className="flex space-x-6">
          <li>
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              className="text-white hover:text-gray-300 cursor-pointer"
            >
              ABOUT
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="wedding"
              smooth={true}
              duration={500}
              className="text-white hover:text-gray-300 cursor-pointer"
            >
              WEDDINGS
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="services"
              smooth={true}
              duration={500}
              className="text-white hover:text-gray-300 cursor-pointer"
            >
              SERVICES
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="services"
              smooth={true}
              duration={500}
              className="text-white hover:text-gray-300 cursor-pointer"
            >
              PORTRAITS
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              className="text-white hover:text-gray-300 cursor-pointer"
            >
              CONTACT
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="blogs"
              smooth={true}
              duration={500}
              className="text-white hover:text-gray-300 cursor-pointer"
            >
              BLOGS
            </ScrollLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;