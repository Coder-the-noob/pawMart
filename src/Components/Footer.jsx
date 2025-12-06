import React from "react";
import petLogo from "../assets/pawmart_logo.png.png";

// React Icons
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 py-10 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {/* Brand Section */}
        <div>
          <img src={petLogo} className="w-20 h-20" alt="PawMart Logo" />
          
          <h2 className="text-2xl font-semibold mt-3 text-gray-900 dark:text-white">
            PawMart
          </h2>

          <p className="text-sm mt-2 max-w-xs opacity-80 leading-relaxed">
            PawMart connects local pet owners and buyers for adoption and pet
            care products. Your trusted platform for pet lovers.
          </p>

          <p className="text-sm mt-3 opacity-70">
            © {new Date().getFullYear()} PawMart — All rights reserved.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Useful Links
          </h3>

          <ul className="flex flex-col gap-2 text-sm">
            <li><a href="/" className="hover:text-primary transition">Home</a></li>
            <li><a href="/contact" className="hover:text-primary transition">Contact</a></li>
            <li><a href="/terms" className="hover:text-primary transition">Terms</a></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Social
          </h3>

          <div className="flex gap-4 text-xl">

            <IconCircle>
              <FaFacebookF />
            </IconCircle>

            <IconCircle>
              <FaXTwitter /> 
            </IconCircle>

            <IconCircle>
              <FaInstagram />
            </IconCircle>

            <IconCircle>
              <FaYoutube />
            </IconCircle>

          </div>
        </div>

      </div>
    </footer>
  );
};

const IconCircle = ({ children }) => (
  <div
    className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm 
               text-gray-700 dark:text-gray-300 hover:bg-primary 
               hover:text-white transition-colors cursor-pointer"
  >
    {children}
  </div>
);

export default Footer;
