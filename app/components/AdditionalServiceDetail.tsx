'use client'; 
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Contact from '@/app/components/Contact';
import { notFound } from 'next/navigation';
import HeaderOnSlider from '@/app/components/HeaderOnSlider';
import ClientSlider from '@/app/components/ClientSlider';

interface AdditionalServiceDetailProps {
    slug: string; 
  }

const AdditionalServiceDetail: React.FC<AdditionalServiceDetailProps> = ({ slug }) => {
  console.log("Slug in AdditionalServiceDetail:", slug);

  
const services = [
    {
      slug: 'corporate-event-photography',
      title: 'Corporate Event Photography',
      image: '/images/Corporate Event Photography.webp', 
      description:
        "Our corporate event photography service, led by Shiv bhaiya's expertise in formal documentation, delivers polished, professional coverage of business events, conferences, and corporate functions.",
      details: [
        'Conference and seminar documentation',
        'Corporate portraits and team photos',
        'Award ceremonies and formal dinners',
        'Product launches and press events',
        'Annual general meetings',
        'Corporate social responsibility events',
      ],
      carouselImages: [
        '/images/Corporate Event/Corporate Event-01.jpg',
        '/images/Corporate Event/Corporate Event-02.jpg',
        '/images/Corporate Event/Corporate Event-03.jpg',
        '/images/Corporate Event/Corporate Event-04.jpg',
        '/images/Corporate Event/Corporate Event-05.jpg',
        '/images/Corporate Event/Corporate Event-06.jpg',
        '/images/Corporate Event/Corporate Event-07.jpg',
      ],
    },
    {
      slug: 'family-portrait-sessions',
      title: 'Family Portrait Sessions',
      image: '/images/Family Portrait Sessions.jpg',
      description:
        "Building on Shiv bhaiya's renowned ability to capture genuine emotions, our family portrait sessions go beyond standard poses to tell your family's unique story.",
      details: [
        'Pre-session consultation to understand your vision',
        'Choice of studio or location settings',
        'Multiple pose and grouping options',
        'Professional lighting and composition',
        'Same-day preview of selected shots',
        'High-quality editing and retouching',
        'Premium printing options',
      ],
      carouselImages: [
        '/images/Family Portrait/Family Portrait-01.jpg',
        '/images/Family Portrait/Family Portrait-02.jpg',
        '/images/Family Portrait/Family Portrait-03.jpg',
        '/images/Family Portrait/Family Portrait-04.jpg',
        '/images/Family Portrait/Family Portrait-05.jpg',
        '/images/Family Portrait/Family Portrait-06.jpg',
        '/images/Family Portrait/Family Portrait-07.jpg',
      ],
    },
    {
      slug: 'maternity-photography',
      title: 'Maternity Photography',
      image: '/images/Maternity Photography.jpg',
      description:
        "Our maternity photography service celebrates the beauty and grace of motherhood. Under Shiv bhaiya's artistic direction, we create stunning portraits that capture this precious time in your life.",
      details: [
        'Indoor and outdoor session options',
        'Professional styling advice',
        'Multiple outfit changes',
        'Partner and family poses',
        'Specialized lighting techniques',
        'Pregnancy progression documentation',
        'Custom album design',
      ],
      carouselImages: [
        '/images/Maternity/Maternity-01.jpg',
        '/images/Maternity/Maternity-02.jpg',
        '/images/Maternity/Maternity-03.jpg',
        '/images/Maternity/Maternity-04.jpg',
        '/images/Maternity/Maternity-05.jpg',
        '/images/Maternity/Maternity-06.jpg',
        '/images/Maternity/Maternity-07.jpg',
      ],
    },
    {
      slug: 'newborn-photography',
      title: 'Newborn Photography',
      image: '/images/Newborn Photography.jpg',
      description:
        "Our newborn photography service combines Shiv bhaiya's gentle approach with specialized expertise in handling and photographing newborns.",
      details: [
        'Temperature-controlled studio environment',
        'Sanitized props and materials',
        'Flexible timing to accommodate feeding and napping',
        'Parent and sibling poses',
        'Various backdrop and prop options',
        'Safety-first handling procedures',
        'Detailed post-processing',
      ],
      carouselImages: [
        '/images/Newborn/Newborn-01.jpg',
        '/images/Newborn/Newborn-02.jpg',
        '/images/Newborn/Newborn-03.jpg',
        '/images/Newborn/Newborn-04.jpg',
        '/images/Newborn/Newborn-05.jpg',
        '/images/Newborn/Newborn-06.jpg',
        '/images/Newborn/Newborn-07.jpg',
      ],
    },
    {
      slug: 'fashion-portfolio-photography',
      title: 'Fashion and Portfolio Photography',
      image: '/images/Fashion and Portfolio Photography.webp',
      description:
        "Drawing on years of experience in commercial photography, our fashion and portfolio service delivers professional-grade images that help models and actors stand out.",
      details: [
        'Professional studio lighting setups',
        'Multiple background options',
        'Styling recommendations',
        'Both traditional and creative shots',
        'High-resolution images',
        'Advanced retouching',
        'Portfolio presentation advice',
      ],
      carouselImages: [
        '/images/Fashion and Portfolio/Fashion and Portfolio-01.jpg',
        '/images/Fashion and Portfolio/Fashion and Portfolio-02.jpg',
        '/images/Fashion and Portfolio/Fashion and Portfolio-03.jpg',
        '/images/Fashion and Portfolio/Fashion and Portfolio-04.jpg',
        '/images/Fashion and Portfolio/Fashion and Portfolio-05.jpg',
        '/images/Fashion and Portfolio/Fashion and Portfolio-06.jpg',
        '/images/Fashion and Portfolio/Fashion and Portfolio-07.jpg',
      ],
    },
    {
      slug: 'product-photography',
      title: 'Product Photography',
      image: '/images/Product Photography.jpeg.jpg',
      description:
        "Our product photography service showcases your products in their best light using professional-grade techniques to enhance your brand's visual appeal.",
      details: [
        'High-resolution macro photography',
        '360-degree product views',
        'Lifestyle product shots',
        'White background photography',
        'Creative composition',
        'Detailed retouching',
        'E-commerce-ready images',
      ],
      carouselImages: [
        '/images/Product/Product-01.jpg',
        '/images/Product/Product-02.jpg',
        '/images/Product/Product-03.jpg',
        '/images/Product/Product-04.jpg',
        '/images/Product/Product-05.jpg',
        '/images/Product/Product-06.jpg',
        '/images/Product/Product-07.jpg',
      ],
    },
    {
      slug: 'real-estate-photography',
      title: 'Real Estate Photography',
      image: '/images/Real Estate Photography.jpg',
      description:
        "Our product photography service showcases your products in their best light using professional-grade techniques to enhance your brand's visual appeal.",
      details: [
        'High-resolution macro photography',
        '360-degree product views',
        'Lifestyle product shots',
        'White background photography',
        'Creative composition',
        'Detailed retouching',
        'E-commerce-ready images',
      ],
      carouselImages: [
        '/images/real-estate/Real Estate-01.jpg',
        '/images/real-estate/Real Estate-02.jpg',
        '/images/real-estate/Real Estate-03.jpg',
        '/images/real-estate/Real Estate-04.jpg',
        '/images/real-estate/Real Estate-05.jpg',
        '/images/real-estate/Real Estate-06.jpg',
        '/images/real-estate/Real Estate-07.jpg',
      ],
    },
    {
      slug: 'school-event-photography',
      title: 'School Event Photography',
      image: '/images/School Event Photography.jpeg.jpg',
      description:
        "Our product photography service showcases your products in their best light using professional-grade techniques to enhance your brand's visual appeal.",
      details: [
        'High-resolution macro photography',
        '360-degree product views',
        'Lifestyle product shots',
        'White background photography',
        'Creative composition',
        'Detailed retouching',
        'E-commerce-ready images',
      ],
      carouselImages: [
        '/images/school-event/School Event-01.jpg',
        '/images/school-event/School Event-02.jpg',
        '/images/school-event/School Event-03.jpg',
        '/images/school-event/School Event-04.jpg',
        '/images/school-event/School Event-05.jpg',
        '/images/school-event/School Event-06.jpg',
        '/images/school-event/School Event-07.jpg',
      ],
    },
    {
      slug: 'food-photography',
      title: 'Food Photography',
      image: '/images/Food Photography.jpeg.jpg',
      description:
        "Our product photography service showcases your products in their best light using professional-grade techniques to enhance your brand's visual appeal.",
      details: [
        'High-resolution macro photography',
        '360-degree product views',
        'Lifestyle product shots',
        'White background photography',
        'Creative composition',
        'Detailed retouching',
        'E-commerce-ready images',
      ],
      carouselImages: [
        '/images/Food/Food-01.jpg',
        '/images/Food/Food-02.jpg',
        '/images/Food/Food-03.jpg',
        '/images/Food/Food-04.jpg',
        '/images/Food/Food-05.jpg',
        '/images/Food/Food-06.jpg',
        '/images/Food/Food-07.jpg',
      ],
    },
    {
      slug: 'social-media-content-photography',
      title: 'Social Media Content Photography',
      image: '/images/Social Media Content Photography.jpg',
      description:
        "Our product photography service showcases your products in their best light using professional-grade techniques to enhance your brand's visual appeal.",
      details: [
        'High-resolution macro photography',
        '360-degree product views',
        'Lifestyle product shots',
        'White background photography',
        'Creative composition',
        'Detailed retouching',
        'E-commerce-ready images',
      ],
      carouselImages: [
        '/images/social-media/Social Media Content-01.jpg',
        '/images/social-media/Social Media Content-02.jpg',
        '/images/social-media/Social Media Content-03.jpg',
        '/images/social-media/Social Media Content-04.jpg',
        '/images/social-media/Social Media Content-05.jpg',
        '/images/social-media/Social Media Content-06.jpg',
        '/images/social-media/Social Media Content-07.jpg',
      ],
    },
    {
      slug: 'professional-equipment-highlight',
      title: 'Professional Equipment Highlight',
      image: '/images/professional-euipments.webp',
      description:
        "Our commitment to excellence is reflected in our professional equipment arsenal: ",
      details: [
        'Professional-grade DSLR and mirrorless cameras',
        'Wide range of premium lenses for various photography needs',
        'Advanced lighting equipment including strobes & continuous lighting',
        'Professional backdrop systems and modifiers',
        'State-of-the-art editing workstations',
        'Backup equipment for all critical gear',
      ],
      equip: 
        "Our experienced team combines technical expertise with artistic vision, ensuring every project receives the highest quality treatment with appropriate equipment and techniques."
    },
  ];
  
  const service = services.find((s) => s.slug === slug);

if (!service) {
    return notFound(); 
}

return (
    <div className="bg-black text-[#E2A240] min-h-screen py-16 px-4 md:px-12">
    <HeaderOnSlider />
    <div className="max-w-6xl mx-auto bg-gray-900 p-16 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
            src={service.image}
            alt={service.title}
            className="w-full h-auto rounded-lg shadow-md"
        />
        <div>
            <h2 className="text-6xl font-cursive mb-4 text-[#E2A240]">{service.title}</h2>
            <p className="text-xl text-white font-serif tracking-wide leading-relaxed">
            {service.description}
            </p>
        </div>
        </div>

      
        <div className="mt-8">
            <h2 className="text-3xl font-cursive mb-4 text-center">Details</h2>
            <div className="flex justify-center mb-12"> 
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 list-none font-serif text-lg max-w-7xl">
            {service.details?.map((detail, index) => (
                <li key={index} className="text-white flex items-center text-center p-2">
                <span className="text-[#E2A240] mr-2">•</span> 
                {detail}
              </li>
            ))}
            </ul>
            </div>
        <p className="text-2xl text-white font-serif tracking-wide leading-relaxed">
        {service.equip}
        </p>
    </div>
    </div>

    <div className="max-w-6xl mx-auto mt-8">
        <ClientSlider images={service.carouselImages || []} title={service.title} />
    </div>

    <section id="contact" className="min-h-screen p-8">
        <Contact />
    </section>

    </div>
);
};
export default AdditionalServiceDetail;
