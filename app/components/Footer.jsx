import React from "react";
import Link from "next/link";
import {FaFacebook} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";
import {FaLinkedin} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-10 ">
      <div className=" px-6">
        <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact us</h3>
            <ul className="space-y-2">
              <li> Address: Bankvägen 6, 141 75 Kungens Kurva</li>
              <li> Phone: +46 332 432 111</li>
              <li> Email: contact@chasbanks.com</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Account
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Transfer
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow us</h3>
            <div className="flex space-x-4">
              <a href="/" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <FaXTwitter className="w-6 h-6" />
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-8 text-sm">
          <p>
            &copy; {new Date().getFullYear()} CHAS BANKS. All rights reserved.
          </p>
          <div className="mt-2">
            <Link href="/" className="text-sm">
              Privacy Policy
            </Link>{" "}
            |
            <Link href="/" className=" text-sm">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
