import React from 'react';
import ImageSlider from './components/ImageSlider';
import HeaderOnSlider from './components/HeaderOnSlider';
import Header from './components/Header';
import About from './components/About';
import styles from "../styles/Home.module.css";
import KeyServices from "./components/KeyServices";
import { AdditionalServices } from "./components/AdditionalServices";
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import config from '@/app/config';
// import ContactPopup from './components/ContactPopup';

export default async function Home() {
  return (
    <main className="p-0 bg-black overflow-x-hidden">
      <HeaderOnSlider />
      <ImageSlider />
      <section id="about" className="bg-black py-12"> {/* Removed min-h-screen */}
        <About />
      </section>

      <section id="wedding" className="bg-black p-8">
        <div className={styles.serviceGrid}>
          <KeyServices />
        </div>
      </section>

      <section id="services" className="bg-black-100 p-8">
        <AdditionalServices />
      </section>

      <section
        id="contact"
        className="p-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Contact us page background_20250306_000033_0000.png')" }}
      >
        <Contact />
      </section>

      <section id="blogs" className="bg-black-100">
        <Blogs />
      </section>
    </main>
  );
}