'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

const Blogs = () => {
  const [blogs, setBlogs] = useState<any[]>([]); // State to store fetched blogs
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase.from('blogs').select('*');
        if (error) {
          throw new Error(error.message);
        }
        setBlogs(data || []); 
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to fetch blogs. Please try again later.');
      } finally {
        setLoading(false); 
      }
    };

    fetchBlogs();
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % blogs.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [blogs.length]);

  // Manual navigation
  const goToPrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? blogs.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % blogs.length);
  };

  // Go to a specific blog
  const goToBlog = (index: number) => {
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <section id="blogs" className="bg-black min-h-[500px] flex items-center justify-center">
        <p className="text-white text-xl">Loading blogs...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blogs" className="bg-black min-h-[500px] flex items-center justify-center">
        <p className="text-red-500 text-xl">{error}</p>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section id="blogs" className="bg-black min-h-[500px] flex items-center justify-center">
        <p className="text-white text-xl">No blogs found.</p>
      </section>
    );
  }

  return (
    <section id="blogs" className="bg-black py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#E2A240] mb-8 md:mb-16">
        Blogs
      </h2>

      <div className="flex justify-center items-center gap-8 relative h-96 overflow-hidden">
        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 md:left-14 z-20 p-2 rounded-full hover:bg-[#D18F36] transition-colors duration-300"
        >
          <FaChevronLeft size={24} className="text-white" />
        </button>

        {/* Blogs */}
        {blogs.map((blog, index) => {
          // Calculate position based on activeIndex
          let position = 'left';
          if (index === activeIndex) {
            position = 'middle';
          } else if (
            index === (activeIndex - 1 + blogs.length) % blogs.length
          ) {
            position = 'left';
          } else {
            position = 'right';
          }

          return (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              passHref
              className={`absolute transition-all duration-500 ease-in-out ${
                position === 'middle'
                  ? 'scale-110 z-10 transform translate-x-0' // Middle blog 
                  : position === 'left'
                  ? 'scale-90 opacity-80 z-0 transform -translate-x-24 md:-translate-x-48' // Left blog
                  : 'scale-90 opacity-80 z-0 transform translate-x-24 md:translate-x-48' // Right blog
              }`}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 w-72 md:w-96">
                <div className="border-4 border-[#E2A240] rounded-t-lg">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6 h-48 flex flex-col justify-between">
                  <h3 className="text-xl md:text-2xl text-[#E2A240] font-semibold line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3">{blog.excerpt}</p>
                </div>
              </div>
            </Link>
          );
        })}

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className="absolute right-4 md:right-14 z-20 p-2 rounded-full hover:bg-[#D18F36] transition-colors duration-300"
        >
          <FaChevronRight size={24} className="text-white" />
        </button>
      </div>

      <div className="flex justify-center mt-12 space-x-2">
        {blogs.map((_, index) => (
          <button
            key={index}
            onClick={() => goToBlog(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === activeIndex ? 'bg-[#E2A240]' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Link
          href="/blogs"
          className="bg-[#E2A240] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#D18F36] transition-colors duration-300"
        >
          View All Blogs
        </Link>
      </div>
    </section>
  );
};

export default Blogs;