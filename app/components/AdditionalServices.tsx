'use client';
import React from 'react';
import { useRouter } from 'next/navigation'; 

export const AdditionalServices = () => {
  const router = useRouter();

  const services = [
    {
      title: 'Corporate Event Photography',
      imageUrl: '/images/Corporate Event Photography.webp', 
      slug: 'corporate-event-photography',
    },
    {
      title: 'Family Portrait Sessions',
      imageUrl: '/images/Family Portrait Sessions.jpg',
      slug: 'family-portrait-sessions',
    },
    {
      title: 'Maternity Photography',
      imageUrl: '/images/Maternity Photography.jpg', 
      slug: 'maternity-photography',
    },
    {
      title: 'Newborn Photography',
      imageUrl: '/images/Newborn Photography.jpg', 
      slug: 'newborn-photography',
    },
    {
      title: 'Fashion and Portfolio Photography',
      imageUrl: '/images/Fashion and Portfolio Photography.webp',
      slug: 'fashion-portfolio-photography',
    },
    {
      title: 'Product Photography',
      imageUrl: '/images/Product Photography.jpeg.jpg', 
      slug: 'product-photography',
    },
    {
      title: 'Real Estate Photography',
      imageUrl: '/images/Real Estate Photography.jpg', 
      slug: 'real-estate-photography',
    },
    {
      title: 'School Event Photography',
      imageUrl: '/images/School Event Photography.jpeg.jpg', 
      slug: 'school-event-photography',
    },
    {
      title: 'Food Photography',
      imageUrl: '/images/Food Photography.jpeg.jpg', 
      slug: 'food-photography',
    },
    {
      title: 'Social Media Content Photography',
      imageUrl: '/images/Social Media Content Photography.jpg',
      slug: 'social-media-content-photography',
    },
    {
      title: 'Professional Equipment Highlight',
      imageUrl: '/images/professional-euipments.webp', 
      slug: 'professional-equipment-highlight',
    },
  ];

  const handleClick = (slug: string) => {
    router.push(`/AddtionalServices/${slug}`);
  };

  return (
    <section className="py-8 bg-black">
      <div className="container mx-auto px-5 text-[#E2A240]">
        <h2 className="text-4xl font-bold text-center mb-16">Additional Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-t-full text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden h-[30rem]"
              onClick={() => handleClick(service.slug)}
            >
              <div className="w-full h-[85%] overflow-hidden relative rounded-t-full">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4 h-[15%] flex items-center justify-center">
                <h3 className="text-xl font-semibold text-black">{service.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};