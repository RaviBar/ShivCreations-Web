'use client';
import React from 'react';
import { motion } from 'framer-motion';
import AdditionalServiceCard from './AdditionalServiceCard';
import Link from 'next/link';

export const AdditionalServices = () => {

  const services = [
    {
      title: 'Corporate Event Photography',
      imageUrl: '/images/Corporate Event Photography.webp', 
    },
    {
      title: 'Family Portrait Sessions',
      imageUrl: '/images/Family Portrait Sessions.jpg',
    },
    {
      title: 'Maternity Photography',
      imageUrl: '/images/Maternity Photography.jpg', 
    },
    {
      title: 'Newborn Photography',
      imageUrl: '/images/Newborn Photography.jpg', 
    },
    {
      title: 'Fashion Portfolio Photography',
      imageUrl: '/images/Fashion and Portfolio Photography.webp',
    },
    {
      title: 'Product Photography',
      imageUrl: '/images/Product Photography.jpeg.jpg', 
    },
    {
      title: 'Real Estate Photography',
      imageUrl: '/images/Real Estate Photography.jpg', 
    },
    {
      title: 'School Event Photography',
      imageUrl: '/images/School Event Photography.jpeg.jpg', 
    },
    {
      title: 'Food Photography',
      imageUrl: '/images/Food Photography.jpeg.jpg', 
    },
    {
      title: 'Social Media Content Photography',
      imageUrl: '/images/Social Media Content Photography.jpg',
    },
    {
      title: 'Professional Equipment Highlight',
      imageUrl: '/images/professional-euipments.webp', 
    },
  ];
  const titleToSlug = (title:string) => {
    return title
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  return (
    <section className="py-8 bg-black">
      <div className="container mx-auto px-4 text-[#E2A240]">
      <h2 className="text-4xl font-bold text-center mb-16">Additional Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => {
            const slug = titleToSlug(service.title);
            console.log(slug)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: index * 0 }}
                viewport={{ once: true }}
              >
                <Link href={`/AddtionalServices/${slug}`}>
                  <AdditionalServiceCard
                    title={service.title}
                    imageUrl={service.imageUrl}
                  />
                </Link>

            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
