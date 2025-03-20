"use client";
import HeroSection from "./components/Hero";
import CardSection from "./components/CardSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <CardSection />
    </div>
  );
}
// <div className="flex flex-col items-center justify-center h-screen gap-10">
//   <Link href="/login">
//     <button className="bg-blue-500 p-2 rounded-2xl w-56 text-white">
//       Login
//     </button>
//   </Link>
//   <Link href="/signup">
//     <button className="bg-blue-500 p-2 rounded-2xl w-56 text-white">
//       Create Account
//     </button>{" "}
//   </Link>
// </div>
