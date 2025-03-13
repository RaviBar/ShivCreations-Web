'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; 
import ContactPopup from './ContactPopup'; 
import { FaBars, FaTimes } from 'react-icons/fa';

const HeaderOnSlider = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const [liveUrl, setLiveUrl] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const router = useRouter(); 
  const pathname = usePathname();
  useEffect(() => {
    // const fetchLiveUrl = async () => {
    //   try {
    //     const { data, error } = await supabase
    //       .from("live_url")
    //       .select("url")
    //       .eq("id", 1) 
    //       .single();
  
    //     if (error) throw error;
    //     setLiveUrl(data?.url || "");
    //   } catch (error) {
    //     console.error("Error fetching live URL:", error);
    //   }
    // };
    const hasPopupBeenShown = localStorage.getItem('popupShown');
    if (!hasPopupBeenShown) {
      setIsPopupOpen(true);
      localStorage.setItem('popupShown', 'true');
    }
    // fetchLiveUrl();
  }, []);
  
  const handleLive = () => {
    router.push('/services/watch-live'); 
  };
  
  const handleLogoClick = () => {
    if (pathname !== '/') {
      router.push('/');
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleNavigation = (sectionId: string) => {
    if (pathname !== '/') {
      router.push('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false); 
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-black fixed top-0 left-0 z-50 shadow-md">
      <nav className="flex items-center justify-between px-4 py-2 md:px-14">
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Logo */}
        <div
          onClick={handleLogoClick} 
          className="w-36 h-12 overflow-hidden cursor-pointer"
        >
          <img
            src="/images/Screenshot_2025-03-06_234331-removebg-preview.png"
            alt="Logo"
            className="w-full h-full object-contain object-center"
          />
        </div>

        <ul className={`md:flex space-x-6 ${isMenuOpen ? 'block' : 'hidden'} absolute md:static top-16 left-0 w-full bg-black md:bg-transparent z-40 md:z-auto md:w-auto md:transform-none md:flex md:items-center md:justify-center`}>
          <li>
            <button
              onClick={() => handleNavigation('about')}
              className="text-white hover:text-yellow-400 cursor-pointer block w-full text-left px-4 py-2 md:px-0 md:py-0 md:text-center"
            >
              ABOUT
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('wedding')}
              className="text-white hover:text-yellow-400 cursor-pointer block w-full text-left px-4 py-2 md:px-0 md:py-0 md:text-center"
            >
              WEDDINGS
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('services')}
              className="text-white hover:text-yellow-400 cursor-pointer block w-full text-left px-4 py-2 md:px-0 md:py-0 md:text-center"
            >
              SERVICES
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('blogs')}
              className="text-white hover:text-yellow-400 cursor-pointer block w-full text-left px-4 py-2 md:px-0 md:py-0 md:text-center"
            >
              BLOGS
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation('contact')}
              className="text-white hover:text-yellow-400 cursor-pointer block w-full text-left px-4 py-2 md:px-0 md:py-0 md:text-center"
            >
              CONTACT
            </button>
          </li>
        </ul>

        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={handleLive} 
            className="bg-yellow-500 text-black px-4 py-1.5 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300 whitespace-nowrap"
          >
            Watch Live
          </button>
          <button
            onClick={openPopup} // Open the popup on click
            className="bg-yellow-500 text-black px-4 py-1.5 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300 whitespace-nowrap"
          >
            ENQUIRY
          </button>
        </div>
      </nav>

      {/* Render the ContactPopup if isPopupOpen is true */}
      {isPopupOpen && <ContactPopup onClose={closePopup} />}
    </header>
  );
};

export default HeaderOnSlider;