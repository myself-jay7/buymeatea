'use client';

import { useState } from 'react';
import { faEnvelope, faPaperPlane, faPhone, faMapMarkerAlt, faClock, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean, message: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ success: true, message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({ success: false, message: data.message || 'Failed to send message.' });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:jayaramjr07@gmail.com?subject=Contact%20Request&body=Hello,%0D%0A%0D%0AMy name is ${formData.name}.%0D%0A%0D%0A${formData.message}%0D%0A%0D%0ARegards,%0D%0A${formData.name}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Main Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We&apos;re here to help and answer any questions you might have. 
          We look forward to hearing from you.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {/* Email Card */}
        <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-shadow duration-300">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faEnvelope} className="h-6 text-blue-600"/>
          </div>
          <h3 className="text-xl font-semibold mb-3">Email Us</h3>
          <p className="text-gray-600 mb-4">
            Send us an email and we&apos;ll get back to you within 24 hours.
          </p>
          <button
            onClick={handleEmailClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg inline-flex items-center transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2"/>
            Send Message
          </button>
        </div>

        {/* Address Card */}
        <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-shadow duration-300">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="h-6 text-green-600"/>
          </div>
          <h3 className="text-xl font-semibold mb-3">Our Location</h3>
          <p className="text-gray-600 mb-4">
            Near Three Temples<br />
            Sanghivalasa, Visakhapatnam <br />
            Andhra Pradesh 531162
          </p>
          <Link 
            href="https://maps.app.goo.gl/Dm4YAymbTxKEQeUDA" 
            target="_blank"
            className="text-blue-600 hover:underline inline-flex items-center"
          >
            View on Map
          </Link>
        </div>

        {/* Hours Card */}
        <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-shadow duration-300">
          <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faClock} className="h-6 text-yellow-600"/>
          </div>
          <h3 className="text-xl font-semibold mb-3">Support Hours</h3>
          <p className="text-gray-600 mb-2">
            <span className="font-medium">Monday-Friday:</span> 9am - 5pm PST
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Weekends:</span> Limited availability
          </p>
        </div>
      </div>

      {/* FAQ Preview */}
      <div className="bg-blue-50 rounded-xl p-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <FontAwesomeIcon icon={faHeadset} className="h-10 text-blue-500 mb-4 mx-auto"/>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need help right away?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Check out our FAQ section for quick answers to common questions.
          </p>
          <Link 
            href="/faq" 
            className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-medium py-2 px-6 rounded-lg border border-blue-200 transition-colors duration-200"
          >
            Visit Help Center
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Contact Form</h2>
        {submitStatus && (
          <div className={`mb-4 p-4 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {submitStatus.message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
            <textarea 
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Enter your message"
              required
            ></textarea>
          </div>
          <div className="pt-2">
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPaperPlane} className="mr-2"/>
                  Submit Form
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Final CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Don&apos;t hesitate to reach out directly to jayaramjr07@gmail.com
        </p>
        <button
          onClick={handleEmailClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg inline-flex items-center transition-colors duration-200"
        >
          <FontAwesomeIcon icon={faPaperPlane} className="mr-2"/>
          Contact Us Now
        </button>
      </div>
    </div>
  );
}