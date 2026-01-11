import React, { useState } from "react";
import { Link } from "react-router-dom";
import petLogo from "../assets/pawmart_logo.png";

// Icons
import { FaFacebookF, FaInstagram, FaYoutube, FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const year = new Date().getFullYear();

  // Newsletter (simple + realistic)
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | success

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    // No dummy backend call. Just UI feedback (safe).
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 2200);
  };

  return (
    <footer className="bg-base-100 text-base-content border-t border-base-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <img
              src={petLogo}
              className="w-16 h-16 object-contain"
              alt="PawMart Logo"
            />
            <h2 className="text-2xl font-extrabold mt-3">PawMart</h2>
            <p className="text-sm text-base-content/70 mt-2 leading-relaxed max-w-sm">
              PawMart connects pet lovers for adoption, food, accessories, and
              trusted pet care services.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="hover:text-primary transition">
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary" />
                <a
                  href="tel:+8801234567890"
                  className="hover:text-primary transition"
                >
                  +880 1234 567 890
                </a>
              </li>

              <li className="flex items-center gap-3">
                <MdEmail className="text-primary text-lg" />
                <a
                  href="mailto:support@pawmart.com"
                  className="hover:text-primary transition"
                >
                  support@pawmart.com
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-5">
              <h4 className="text-sm font-semibold text-base-content/70 mb-3">
                Follow us
              </h4>
              <div className="flex gap-3">
                <SocialIcon href="https://facebook.com" label="Facebook">
                  <FaFacebookF />
                </SocialIcon>
                <SocialIcon href="https://twitter.com" label="Twitter">
                  <FaXTwitter />
                </SocialIcon>
                <SocialIcon href="https://instagram.com" label="Instagram">
                  <FaInstagram />
                </SocialIcon>
                <SocialIcon href="https://youtube.com" label="YouTube">
                  <FaYoutube />
                </SocialIcon>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Get new listings and pet care updates. No spam.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4 space-y-3">
              <label className="form-control">
                <span className="label-text text-sm font-semibold text-base-content/70">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered rounded-xl w-full"
                  placeholder="your@email.com"
                  required
                />
              </label>

              <button type="submit" className="btn btn-primary rounded-xl w-full">
                Subscribe
              </button>

              {status === "success" && (
                <div className="alert alert-success rounded-2xl py-3">
                  <span className="text-sm">
                    Subscribed successfully. Thank you!
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-base-300 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-base-content/60">
            © {year} PawMart. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link to="/terms" className="text-base-content/70 hover:text-primary transition">
              Terms
            </Link>
            <span className="text-base-content/40">•</span>
            <Link to="/privacy" className="text-base-content/70 hover:text-primary transition">
              Privacy
            </Link>
            <span className="text-base-content/40">•</span>
            <Link to="/contact" className="text-base-content/70 hover:text-primary transition">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, children, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="
      p-3 rounded-full bg-base-200
      text-base-content
      hover:bg-primary hover:text-white
      transition-all duration-200
      shadow-sm hover:shadow-md
      focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
    "
  >
    {children}
  </a>
);

export default Footer;
