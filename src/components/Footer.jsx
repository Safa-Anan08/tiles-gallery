"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { toast } from "sonner";

export default function Footer() {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const messageData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        form.reset();
      } else {
        toast.error("Failed to send message");
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <footer className="bg-[#1f1f1f] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-3xl font-bold">
            TilesGallery
          </h2>

          <p className="mt-4 text-gray-400 leading-7">
            Discover premium aesthetic tiles for modern
            and luxury interiors.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-gray-400">
            <Link href="/">Home</Link>
            <Link href="/all-tiles">All Tiles</Link>
            <Link href="/my-profile">My Profile</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact Us
          </h3>

          <p className="text-gray-400">
            Email: support@tilesgallery.com
          </p>

          <p className="text-gray-400 mt-2">
            Phone: +880 1234-567890
          </p>

          <div className="flex gap-4 mt-6">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <FaFacebookF size={18} />
            </Link>

            <Link
              href="https://instagram.com"
              target="_blank"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <FaInstagram size={18} />
            </Link>

            <Link
              href="https://twitter.com"
              target="_blank"
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <FaTwitter size={18} />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Send Message
          </h3>

          <form
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full text-black"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full text-black"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              className="textarea textarea-bordered w-full text-black"
              required
            />

            <button className="btn btn-primary w-full">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm text-gray-400">
        © 2026 TilesGallery. All Rights Reserved.
      </div>
    </footer>
  );
}