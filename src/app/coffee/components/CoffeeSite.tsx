"use client";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Story from "./Story";
import ScrollShowcase from "./ScrollShowcase";
import Menu from "./Menu";
import Footer from "./Footer";

export default function CoffeeSite() {
  return (
    <main className="min-h-screen bg-cream-50 font-body text-espresso-900">
      <Navbar />
      <Hero />
      <Story />
      <ScrollShowcase />
      <Menu />
      <Footer />
    </main>
  );
}
