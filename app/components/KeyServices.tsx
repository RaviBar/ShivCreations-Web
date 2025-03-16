'use client';
import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import Link from 'next/link';

const KeyServices = () => {
  const services = [
    {
      title: 'Pre-Wedding Photography',
      description:
        'At Shiv Photography, we understand that your pre-wedding shoot sets the tone for your entire wedding journey. Our expert team specializes in creating magical pre-wedding moments that tell your unique love story.',
      imageUrl: '/images/Pre-Wedding Photography.webp',
    },
    {
      title: 'Wedding Photography',
      description:
        'Your wedding day deserves nothing less than extraordinary documentation. Our experienced team combines traditional expertise with contemporary techniques to capture every meaningful moment of your special day.',
      imageUrl: '/images/Wedding Photography.webp',
    },
    {
      title: 'Post-Wedding Photography',
      description:
        'Extend the magic of your wedding celebrations with our post-wedding photography services. Whether it\'s an intimate couple\'s session or a grand reception, we create stunning visual narratives that complement your wedding album.',
      imageUrl: '/images/Post-Wedding Photography.webp',
    },
    {
      title: 'Baptism Photography',
      description:
        'We approach baptism photography with the reverence and sensitivity this sacred occasion deserves. Our experienced photographers understand the religious significance and cultural traditions involved.',
      imageUrl: '/images/Baptism Photography.webp',
    },
    {
      title: 'Funeral Service Coverage',
      description:
        'With utmost respect and discretion, we provide memorial photography services that help families preserve memories of their loved ones. Our experienced team understands the sensitive nature of these occasions.',
      imageUrl: '/images/Funeral Service Photography.webp',
    },
    {
      title: 'Watch Live',
      description:
        'Witness live photography events! Stream workshops, exhibitions, and shoots in real-time on our site. Join us for real-time events, tutorials, exclusive photo sessions, and connect with fellow photographers.',
      imageUrl: '/images/LIVE _20250307_125532_0000.webp',
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
        <motion.h2
          className="text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Key Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => {
            const slug = titleToSlug(service.title);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: index * 0 }}
                viewport={{ once: true }}
              >
                <Link href={`/services/${slug}`}>
                  <ServiceCard
                    title={service.title}
                    description={service.description}
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

export default KeyServices;
