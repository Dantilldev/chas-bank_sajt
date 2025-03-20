"use client";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gray-100 py-16 px-4 md:px-8 ">
      <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto gap-8">
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-4xl font-bold text-blue-950 mb-4">
            Welcome to CHAS BANKS
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum
            sapiente labore at quasi omnis ex?
          </p>
          <Link
            href="/signup"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:opacity-80 transition"
            style={{textDecoration: "none"}}
          >
            Create Account
          </Link>
        </div>
        <div className="md:w-1/2 w-80">
          <img
            src="/hero-pik.jpg"
            alt="Bank illustration"
            className="w-full rounded-lg shadow-lg md:block"
          />
        </div>
      </div>
    </section>
  );
}
