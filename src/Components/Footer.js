import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between mx-4">
          <div className="w-full md:w-1/4 px-12 mb-8 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">Company</h2>
            <ul>
            <li>
                <Link to="/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 px-12 mb-8 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">Support</h2>
            <ul>
              <li>
                <Link to="/help" className="hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:underline">
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 px-12 mb-8 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">Legal</h2>
            <ul>
              <li>
                <Link to="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 px-12">
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
            <Link to="/linkedin" className="hover:text-blue-500">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </Link>
              <Link to="/facebook" className="hover:text-blue-500">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </Link>
              {/* <Link to="/twitter" className="hover:text-blue-400">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </Link> */}
              <Link to="/instagram" className="hover:text-pink-500">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm">
            &copy; 2024 Assignments. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
