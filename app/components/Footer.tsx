'use client'; // Add this line to make the component client-side
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll'; // Import ScrollLink
import { supabase } from '@/lib/supabase';

export default function Footer() {
  const handleLogin = async () => {
    await supabase.auth.signOut();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        queryParams: {
          prompt: 'select_account',
        },
      },
    });

    if (error) {
      console.error('OAuth Login Error:', error);
    }
  };

  return (
    <footer className="bg-black text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-[#E2A240] mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li>
                  <ScrollLink
                    to="about"
                    smooth={true}
                    duration={500}
                    className="hover:text-[#E2A240] transition-colors duration-300 cursor-pointer text-sm md:text-base"
                  >
                    About
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="contact"
                    smooth={true}
                    duration={500}
                    className="hover:text-[#E2A240] transition-colors duration-300 cursor-pointer text-sm md:text-base"
                  >
                    Contact
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="wedding"
                    smooth={true}
                    duration={500}
                    className="hover:text-[#E2A240] transition-colors duration-300 cursor-pointer text-sm md:text-base"
                  >
                    Weddings
                  </ScrollLink>
                </li>
              </ul>
              <ul className="space-y-2">
                <li>
                  <ScrollLink
                    to="services"
                    smooth={true}
                    duration={500}
                    className="hover:text-[#E2A240] transition-colors duration-300 cursor-pointer text-sm md:text-base"
                  >
                    Services
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="blogs"
                    smooth={true}
                    duration={500}
                    className="hover:text-[#E2A240] transition-colors duration-300 cursor-pointer text-sm md:text-base"
                  >
                    Blogs
                  </ScrollLink>
                </li>
                <li>
                  <button
                    onClick={handleLogin}
                    className="hover:text-[#E2A240] transition-colors duration-300 text-sm md:text-base"
                  >
                    Login as Admin
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-[#E2A240] mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/12B5YUngnvC/"
                className="text-white hover:text-[#E2A240] transition-colors duration-300"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/shivcreationteam03?igsh=a3VzMGZ1dG83ejdt"
                className="text-white hover:text-[#E2A240] transition-colors duration-300"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://youtube.com/@shivcreation9556?si=chvQmH4WKN-vLF05"
                className="text-white hover:text-[#E2A240] transition-colors duration-300"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-[#E2A240] mb-4">
              Contact Info
            </h3>
            <p className="mb-2 text-sm md:text-base">
              Email: shivcreationteam@gmail.com
            </p>
            <p className="mb-2 text-sm md:text-base">
              Phone: +91 8871201243, +91 7987613175
            </p>
            <p className="mb-2 text-sm md:text-base">
              Address: H No 138 Nainagiri Ayodhya Bypass Bhopal
            </p>
          </div>
        </div>

        {/* Copyright Text */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm md:text-base">
            © 2023 Pankaj Photography. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}