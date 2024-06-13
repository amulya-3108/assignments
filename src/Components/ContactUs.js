import React from "react";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";

function Contactus() {
  return (
    <div className="font-serif">
      <Header />
      <div className="container mx-auto mb-10 mt-5 p-5">
        <h1 className="text-5xl font-bold text-center text-blue-600 mb-6">
          Contact Us
        </h1>
        <div className="container mx-auto my-10 p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 p-5 mb-16">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Get in Touch
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Message</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-2"
                    rows="4"
                    placeholder="Your Message"></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-xl">
                  Send Message
                </button>
              </form>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Our Location
              </h2>
              <div className="mb-4">
                <p className="text-lg text-gray-600">
                  1234 Street Name, City, State, 56789
                </p>
                <p className="text-lg text-gray-600">Phone: (123) 456-7890</p>
                <p className="text-lg text-gray-600">
                  Email: contact@company.com
                </p>
              </div>
              <div className="w-full h-64 md:h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2895.8395533755834!2d-80.52493962435342!3d43.463946764651446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf412ee338bad%3A0xd8f15509f290352!2sWaterloo%20Public%20Square!5e0!3m2!1sen!2sca!4v1718303880685!5m2!1sen!2sca"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contactus;
