"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        toast.success("Message sent successfully");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white mt-16">

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">


        <div>
          <h2 className="text-2xl font-bold">Tiles Gallery</h2>
          <p className="text-gray-400 mt-3">
            Discover premium aesthetic tiles for modern and luxury interiors.
          </p>

        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2 text-gray-300">

            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link href="/all-tiles" className="hover:text-white">
                All Tiles
              </Link>
            </li>

            <li>
              <Link href="/wishlist" className="hover:text-white">
                Wishlist
              </Link>
            </li>

            <li>
              <Link href="/my-profile" className="hover:text-white">
                Profile
              </Link>
            </li>

          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400 mt-3">
            Email: tilesgallery@gmail.com
          </p>
          <p className="text-gray-400 mt-3">
            Phone: +8801234567890
          </p>
          <div className="flex gap-4 mt-5 text-xl">

            <a href="https://facebook.com" className="hover:text-blue-500">
              <FaFacebook />
            </a>

            <a href="https://instagram.com" className="hover:text-pink-500">
              <FaInstagram />
            </a>

            <a href="https://twitter.com" className="hover:text-sky-400">
              <FaTwitter />
            </a>

            <a href="https://github.com" className="hover:text-gray-300">
              <FaGithub />
            </a>

          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Send Message</h3>

          <form onSubmit={handleSubmit} className="space-y-3">

            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 rounded bg-gray-800"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded bg-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <textarea
              placeholder="Message"
              className="w-full p-2 rounded bg-gray-800"
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>
        </div>

      </div>

     
      <div className="text-center py-4 border-t border-gray-700 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Tiles Gallery. All rights reserved.
      </div>

    </footer>
  );
}