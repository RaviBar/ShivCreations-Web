"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function About() {
  const aboutRef = React.useRef(null);
  const aboutInView = useInView(aboutRef, { once: true });

  const meetShivRef = React.useRef(null);
  const meetShivInView = useInView(meetShivRef, { once: true });

  return (
    <section className="max-w-7xl mx-auto px-6 py-8 bg-black text-[#E2A240]">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-[#E2A240] mb-8 md:mb-16 uppercase tracking-wider">
        About Us
      </h1>

      <div
        ref={aboutRef}
        className="flex flex-col lg:flex-row items-start gap-8 md:gap-12"
      >
        <motion.div
          className="flex-1 space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed px-4 md:px-0 md:mt-0" // Added padding and negative margin for mobile
          initial={{ opacity: 0, x: -100 }}
          animate={aboutInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="text-justify">
            Led by the renowned{" "}
            <span className="font-semibold text-white">SHIV BHAIYA</span>, whose
            name has become synonymous with excellence in photography across{" "}
            <span className="font-semibold text-white">MADHYA PRADESH</span>,{" "}
            <span className="font-semibold text-white">SHIV PHOTOGRAPHY</span> has
            been a trusted name in professional photography across{" "}
            <span className="font-semibold text-white">BHOPAL</span>. Our journey
            began with a simple yet powerful vision: to transform life&apos;s fleeting
            moments into{" "}
            <span className="italic text-white">timeless memories</span>. Today,
            we continue this legacy while embracing the latest innovations in
            photographic technology and artistic techniques.
          </p>

          <p className="text-justify">
            Our philosophy centers on the belief that every moment deserves to be
            captured with{" "}
            <span className="font-semibold text-white">
              precision, creativity, and care
            </span>
            . As a family-owned business, we understand the significance of these
            precious instances—from the joy of weddings to the solemnity of
            important ceremonies. Our team of skilled photographers brings not
            just technical expertise but also the sensitivity needed to capture
            the{" "}
            <span className="italic text-white">emotion and essence</span> of
            each occasion.
          </p>

          <p className="text-justify">
            What sets us apart is our unwavering commitment to{" "}
            <span className="font-semibold text-white">
              CUSTOMER SATISFACTION
            </span>
            . We take pride in working closely with our clients, understanding
            their vision, and delivering results that exceed expectations. Under
            the guidance of{" "}
            <span className="font-semibold text-white">SHIV BHAIYA</span>, whose
            personal touch and artistic vision have shaped countless memorable
            moments, our studio has become a beacon of{" "}
            <span className="italic text-white">trust and excellence</span> in
            the photography industry.
          </p>

          <p className="text-justify">
            In an era of constant change, we remain dedicated to our core values
            of{" "}
            <span className="font-semibold text-white">
              EXCELLENCE, INTEGRITY, AND PERSONALIZED SERVICE
            </span>{" "}
            while continuously evolving to meet the dynamic needs of our clients.{" "}
            <span className="font-semibold text-white">
              SHIV BHAIYA’S MENTORSHIP
            </span>{" "}
            ensures that every member of our team maintains the highest standards
            of professional excellence while bringing fresh, innovative
            perspectives to each project.
          </p>
        </motion.div>

        <motion.div
          className="flex-1 w-full lg:w-auto flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 100 }}
          animate={aboutInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            src="/images/About us left side pic.webp"
            alt="About Us"
            width={400}
            height={500} 
            className="w-full max-w-md lg:max-w-lg rounded-lg shadow-lg"
            priority
          />
        </motion.div>
      </div>

      <div
        ref={meetShivRef}
        className="mt-12 md:mt-16 flex flex-col lg:flex-row items-center gap-8 md:gap-12"
      >
        <motion.div
          className="flex-1 p-6 md:p-8 bg-black border-2 border-[#E2A240] rounded-lg"
          initial={{ opacity: 0, x: -100 }}
          animate={meetShivInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6 uppercase tracking-wider">
            Meet Shiv Bhaiya
          </h2>
          <p className="text-base md:text-lg text-justify leading-relaxed">
            Known affectionately throughout{" "}
            <span className="font-semibold text-white">BHOPAL</span> as{" "}
            <span className="font-semibold text-white">SHIV BHAIYA</span>, our
            founder and lead photographer has spent decades perfecting the art of
            capturing life&apos;s most precious moments. His journey in photography
            began with a deep passion for preserving memories and has evolved
            into a masterful understanding of both{" "}
            <span className="italic text-white">
              traditional and contemporary photography techniques
            </span>
            .
          </p>

          <p className="text-base md:text-lg text-justify leading-relaxed mt-4 md:mt-6">
            Shiv Bhaiya&apos;s unique approach combines{" "}
            <span className="font-semibold text-white">
              TECHNICAL EXCELLENCE
            </span>{" "}
            with a warm, approachable personality that puts clients at ease. His
            ability to capture the perfect moment while making subjects feel
            comfortable has earned him a special place in the hearts of countless
            families across{" "}
            <span className="font-semibold text-white">MADHYA PRADESH</span>.
            From wedding ceremonies to corporate events, his signature style
            brings out the best in every occasion.
          </p>

          <p className="text-base md:text-lg text-justify leading-relaxed mt-4 md:mt-6">
            As a mentor and guide, Shiv Bhaiya has trained numerous
            photographers, creating a team that shares his vision for{" "}
            <span className="font-semibold text-white">
              EXCELLENCE AND CUSTOMER SERVICE
            </span>
            . His dedication to the craft and personal involvement in every major
            project ensures that{" "}
            <span className="font-semibold text-white">SHIV PHOTOGRAPHY</span>{" "}
            maintains its reputation for delivering{" "}
            <span className="italic text-white">
              exceptional quality and memorable experiences
            </span>
            .
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          className="flex-1 w-full lg:w-auto flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 100 }}
          animate={meetShivInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            src="/images/About us Right side pic.webp" 
            alt="Meet Shiv Bhaiya"
            width={400}
            height={500} 
            className="w-full max-w-md lg:max-w-lg rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}