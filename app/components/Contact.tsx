'use client';
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    email: '',
    message: '',
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = [
    'Pre-Wedding',
    'Wedding',
    'Post-Wedding',
    'Baptism',
    'Funeral Service Coverage',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleServiceClick = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
    const servicesText = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service).join(', ')
      : [...selectedServices, service].join(', ');
    setFormData({
      ...formData,
      message: `Services Required: ${servicesText}`,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      console.log("Form Data:", formData);
  
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        console.log("API Response:", response); 
  
        if (!response.ok) {
          throw new Error("Failed to send message");
        }
  
        alert("Thank you for contacting us! We will get back to you soon.");
  
        setFormData({
          name: "",
          phone: "",
          location: "",
          email: "",
          message: "",
        });
        setSelectedServices([]);
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to send message. Please try again later.");
      }
    };

  return (
    <section
      id="contact"
      className="min-h-screen p-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/Contact-us-page.webp')" }}
    >
      <h2 className="text-4xl font-bold text-center text-[#E2A240] mb-12">Contact Us</h2>
      <div className="max-w-2xl mx-auto bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">
              Name <span className="text-red-500">*</span> {/* Asterisk */}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#E2A240] focus:border-[#E2A240]"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-lg font-medium text-gray-700">
              Phone Number <span className="text-red-500">*</span> 
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#E2A240] focus:border-[#E2A240]"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-lg font-medium text-gray-700">
              Location <span className="text-red-500">*</span> 
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#E2A240] focus:border-[#E2A240]"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email 
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#E2A240] focus:border-[#E2A240]"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">
              Message <span className="text-red-500">*</span> 
            </label>
            <div className="mt-1">
              <div className="flex flex-wrap gap-2 mb-2">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleServiceClick(service)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
                      selectedServices.includes(service)
                        ? 'bg-[#E2A240] text-white' // Selected style
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300' // Unselected style
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
              {/* Message Textarea */}
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-[#E2A240] focus:border-[#E2A240]"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#E2A240] text-white font-semibold rounded-lg hover:bg-[#D18F36] transition-colors duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;