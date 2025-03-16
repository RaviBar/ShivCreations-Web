'use client'; 
import React, { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Contact from '@/app/components/Contact';
import { notFound } from 'next/navigation';
import HeaderOnSlider from '@/app/components/HeaderOnSlider';
import ClientSlider from '@/app/components/ClientSlider';
import { supabase } from "@/lib/supabase";
import Image from 'next/image';

interface ServiceDetailProps {
  slug: string; 
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ slug }) => {
  const [liveUrl, setLiveUrl] = useState("");

  useEffect(() => {
    const fetchLiveUrl = async () => {
      try {
        const { data, error } = await supabase
          .from("live_url")
          .select("url")
          .eq("id", 1) // Use integer ID
          .single();

        if (error) throw error;
        setLiveUrl(data?.url || "");
      } catch (error) {
        console.error("Error fetching live URL:", error);
      }
    };

    fetchLiveUrl();
  }, []);

  const handleLive = () => {
    if (liveUrl) {
      window.open(liveUrl, "_blank");
    } else {
      alert("Live stream URL is not available.");
    }
  };

  const services = [
    {
      slug: 'pre-wedding-photography',
      title: 'Pre-Wedding Photography',
      image: '/images/Pre-Wedding Photography.webp',
      description:
        'At Shiv Photography, we understand that your pre-wedding shoot sets the tone for your entire wedding journey. Our expert team specializes in creating magical pre-wedding moments that tell your unique love story.',
      details: [
        'Customized pre-wedding themes',
        'Outdoor and indoor shoots',
        'Professional editing and retouching',
      ],
      carouselImages: [
        '/images/Pre-Wedding/Pre-Wedding-01.jpg',
        '/images/Pre-Wedding/Pre-Wedding-02.jpg',
        '/images/Pre-Wedding/Pre-Wedding-03.jpg',
        '/images/Pre-Wedding/Pre-Wedding-04.jpg',
        '/images/Pre-Wedding/Pre-Wedding-05.jpg',
        '/images/Pre-Wedding/Pre-Wedding-06.jpg',
        '/images/Pre-Wedding/Pre-Wedding-07.jpg',
      ],
    },
    {
      slug: 'wedding-photography',
      title: 'Wedding Photography',
      image: '/images/Wedding Photography.webp',
      description:
        'Your wedding day deserves nothing less than extraordinary documentation. Our experienced team combines traditional expertise with contemporary techniques to capture every meaningful moment of your special day.',
      details: [
        'Full-day coverage',
        'Candid and traditional shots',
        'High-resolution images',
      ],
      carouselImages: [
        '/images/wedding/Wedding-01.jpg',
        '/images/wedding/Wedding-02.jpg',
        '/images/wedding/Wedding-03.jpg',
        '/images/wedding/Wedding-04.jpg',
        '/images/wedding/Wedding-05.jpg',
        '/images/wedding/Wedding-06.jpg',
        '/images/wedding/Wedding-07.jpg',
      ],
    },
    {
      slug: 'post-wedding-photography',
      title: 'Post-Wedding Photography',
      image: '/images/Post-Wedding Photography.webp',
      description:
        "Extend the magic of your wedding celebrations with our post-wedding photography services. Whether it's an intimate couple's session or a grand reception, we create stunning visual narratives that complement your wedding album.",
      details: [
        'Couple sessions',
        'Reception coverage',
        'Custom photo albums',
      ],
      carouselImages: [
        '/images/Post-Wedding/Post-Wedding-01.jpg',
        '/images/Post-Wedding/Post-Wedding-02.jpg',
        '/images/Post-Wedding/Post-Wedding-03.jpg',
        '/images/Post-Wedding/Post-Wedding-04.jpg',
        '/images/Post-Wedding/Post-Wedding-05.jpg',
        '/images/Post-Wedding/Post-Wedding-06.jpg',
        '/images/Post-Wedding/Post-Wedding-07.jpg',
      ],
    },
    {
      slug: 'baptism-photography',
      title: 'Baptism Photography',
      image: '/images/Baptism Photography.webp',
      description:
        'We approach baptism photography with the reverence and sensitivity this sacred occasion deserves. Our experienced photographers understand the religious significance and cultural traditions involved.',
      details: [
        'Ceremony coverage',
        'Family portraits',
        'Customized packages',
      ],
      carouselImages: [
        '/images/Baptism/Baptism-01.webp',
        '/images/Baptism/Baptism-02.webp',
        '/images/Baptism/Baptism-03.webp',
        '/images/Baptism/Baptism-04.webp',
        '/images/Baptism/Baptism-05.webp',
        '/images/Baptism/Baptism-06.webp',
        '/images/Baptism/Baptism-07.webp',
      ],
    },
    {
      slug: 'funeral-service-coverage',
      title: 'Funeral Service Coverage',
      image: '/images/Funeral Service Photography.webp',
      description:
        'With utmost respect and discretion, we provide memorial photography services that help families preserve memories of their loved ones. Our experienced team understands the sensitive nature of these occasions.',
      details: [
        'Discreet coverage',
        'Memorial slideshows',
        'Customized packages',
      ],
      carouselImages: [
        '/images/Funeral Service/Funeral Service-01.jpg',
        '/images/Funeral Service/Funeral Service-02.jpg',
        '/images/Funeral Service/Funeral Service-03.jpg',
        '/images/Funeral Service/Funeral Service-04.jpg',
        '/images/Funeral Service/Funeral Service-05.jpg',
        '/images/Funeral Service/Funeral Service-06.jpg',
        '/images/Funeral Service/Funeral Service-07.jpg',
      ],
    },
    {
      slug: 'watch-live',
      title: 'Watch live',
      image: '/images/LIVE _20250307_125532_0000.webp',
      description:
        'At Shiv Photography, we bring your special moments to the global stage through our professional live streaming services. Under the expert guidance of Shiv bhaiya, we utilize cutting-edge technology to broadcast your cherished events in real-time, allowing loved ones from across the world to participate virtually in your significant occasions. Our dedicated team ensures high-quality, uninterrupted streaming with professional-grade equipment and reliable connectivity solutions, delivering a seamless viewing experience that captures the emotion and atmosphere of your event.',
      carouselImages: [
        '/images/LIVE/Live-01.jpg',
        '/images/LIVE/Live-02.jpg',
        '/images/LIVE/Live-03.jpg',
        '/images/LIVE/Live-04.jpg',
        '/images/LIVE/Live-05.jpg',
        '/images/LIVE/Live-06.jpg',
        '/images/LIVE/Live-07.jpg',
      ],
      keyServices: [ 
        'Wedding Ceremonies - Share your sacred vows and celebrations with family and friends who cannot attend in person, complete with multiple camera angles and professional audio capture',
        'Corporate Events & Conferences - Broadcast keynote speeches, product launches, and company milestones to stakeholders, clients, and team members worldwide',
        'Religious Ceremonies - Enable distant relatives to participate in important religious events including baptisms, funerals, and other sacred traditions',
        'Family Celebrations - Connect extended family across continents for birthdays, anniversaries, and reunion gatherings',
        'Educational Sessions & Workshops - Facilitate knowledge sharing and learning experiences beyond geographical limitations',
        'Cultural Performances - Showcase traditional arts, music, and dance performances to global audiences with high-fidelity audio and visual quality',
      ],
      equip: 
        "Our live streaming packages include pre-event technical setup, multi-camera coverage, professional audio integration, custom branded overlays, and secure viewing links accessible from any device. With Shiv Photography's live streaming services, distance is no longer a barrier to sharing in life's most meaningful moments."
    }
  ];

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return notFound(); 
  }

  return (
    <div className="bg-black text-[#E2A240] min-h-screen py-8 md:py-16 px-4 md:px-12">
  <HeaderOnSlider />
  <div className="max-w-6xl mx-auto bg-gray-900 p-4 md:p-8 lg:p-16 rounded-lg shadow-lg">
    {/* Image and Title Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="rounded-lg shadow-md object-cover"
        />
      </div>
      <div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-cursive mb-4 text-[#E2A240]">
          {service.title}
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-white font-serif tracking-wide leading-relaxed">
          {service.description}
        </p>
        {/* Add Watch Live Button */}
        {slug === 'watch-live' && (
          <button
            onClick={handleLive}
            className="mt-4 md:mt-6 bg-yellow-500 text-black px-4 md:px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300"
          >
            Watch Live
          </button>
        )}
      </div>
    </div>


    {/* Key Services or Details Section */}
    {slug === 'watch-live' ? (
      <div className="mt-6 md:mt-10">
        <h2 className="text-2xl md:text-3xl underline font-cursive mb-4 text-start text-[#E2A240]">
          Key Live Streaming Services
        </h2>
        <ul className="list-disc list-inside font-serif mb-8 md:mb-16 text-base md:text-lg lg:text-xl space-y-2 md:space-y-3 text-white">
          {service.keyServices?.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>
    ) : (
      <div className="mt-6 md:mt-8">
        <h2 className="text-2xl md:text-3xl font-cursive mb-4 text-start text-[#E2A240]">
          Details
        </h2>
        <ul className="list-disc list-inside font-serif text-base md:text-lg lg:text-xl space-y-2 md:space-y-3 text-white">
          {service.details?.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
    )}

    {/* Equipment Description */}
    {service.equip && (
      <p className="text-base md:text-lg lg:text-xl text-white font-serif tracking-wide leading-relaxed mt-6 md:mt-8">
        {service.equip}
      </p>
    )}
  </div>

  {/* Carousel Section */}
  <div className="max-w-6xl mx-auto mt-8">
    <ClientSlider images={service.carouselImages} title={service.title} />
  </div>

  {/* Contact Section */}
  <section id="contact" className="min-h-screen p-4 md:p-8">
    <Contact />
  </section>
</div>
  );
};

export default ServiceDetail;