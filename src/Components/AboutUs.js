import React from "react";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";

function Aboutus() {
  return (
    <div className="font-serif">
      <Header />
      <div className="container mx-auto my-10">
        <h1 className="text-5xl font-bold text-center text-blue-600 mb-6">
          About Us
        </h1>
        <p className="text-center text-xl text-gray-900 mb-8">
          Connecting Talent and Opportunity
        </p>
        {/* <div className="flex flex-col md:flex-row items-center justify-center mb-12">
          <img
            src="/path/to/your/image.png"
            alt="CEO"
            className="rounded-full w-32 h-32 md:w-48 md:h-48 mb-4 md:mb-0 md:mr-8"
          />
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">Alex Johnson</h2>
            <p className="text-xl text-gray-600">Founder & CEO</p>
          </div>
        </div> */}
        <div className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed">
          <p className="mb-4">
            Our company was founded with a vision to revolutionize the way businesses and professionals connect. We believe that by leveraging technology, we can create a platform where talent and opportunity find each other effortlessly.
          </p>
          <p className="mb-4 font-semibold text-blue-600">
            Our mission is to empower individuals and organizations by providing them with the tools and resources they need to succeed. Whether you're a freelancer looking for your next project or a business in need of skilled professionals, we're here to help you achieve your goals.
          </p>
          <p className="mb-4">
            Over the years, we've grown into a global community that thrives on innovation, collaboration, and excellence. Our platform is designed to make the process of finding work and hiring talent as seamless and efficient as possible.
          </p>
          <p className="mb-4 font-semibold text-black text-2xl">Our Values</p>
          <p className="mb-4">
            We are driven by our core values of integrity, innovation, and inclusivity. These principles guide everything we do, from the way we build our platform to the way we interact with our community.
          </p>
          <p className="mb-4">
            Integrity means being honest and transparent in all our dealings. Innovation means continuously improving and evolving to meet the changing needs of our users. Inclusivity means creating an environment where everyone feels welcome and valued.
          </p>
          <p className="mb-4 font-semibold text-black text-2xl">Our Commitment</p>
          <p className="mb-4">
            We are committed to providing the highest quality service to our users. Our team works tirelessly to ensure that our platform is reliable, user-friendly, and secure. We are here to support you every step of the way.
          </p>
          <p className="mb-4 font-semibold text-black text-2xl">Join Us</p>
          <p className="mb-4">
            Whether you are looking to hire talent or find your next opportunity, we invite you to join our community. Together, we can create a world where talent and opportunity are seamlessly connected.
          </p>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-blue-600 mb-4 mt-12">
              Start Your Journey with Us
            </h2>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-xl">
                Hire Talent
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-xl">
                Find Work
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Aboutus;
