// src/pages/Home.jsx
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Truck,
  Handshake,
  ShoppingBag,
  Feather,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import heroVideo from "../assets/hero.mp4";

export default function Home() {
  const navigate = useNavigate();

 const roles = [
    {
      icon: <Building2 className="w-10 h-10 text-[#16a34a]" />,
      title: "Hotel Partner",
      desc: "List surplus food, set pickup times, and track instant CSR metrics and tax savings.",
      color: "#d1fae5",
    },
    {
      icon: <Feather className="w-10 h-10 text-[#0ea5e9]" />,
      title: "Night Robin",
      desc: "Accept optimized delivery routes to pick up surplus food and drop it off at designated points.",
      color: "#cffafe",
    },
    {
      icon: <Truck className="w-10 h-10 text-[#f59e0b]" />,
      title: "Night Worker",
      desc: "Request and receive warm meals directly. Confirm delivery and provide quality feedback.",
      color: "#fef9c3",
    },
    {
      icon: <ShoppingBag className="w-10 h-10 text-[#8b5cf6]" />,
      title: "Customer (User)",
      desc: "Purchase discounted, high-quality surplus meals through flash deals before they're redistributed.",
      color: "#ede9fe",
    },
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
   const [visible, setVisible] = useState([]);
  const itemsRef = useRef([]);
  const countersRef = useRef([]);

  const animateCount = (index, target) => {
    const startTime = performance.now();
    const duration = 1200;
    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      if (countersRef.current[index])
        countersRef.current[index].textContent = `${value}${milestones[index].unit}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <div className="bg-[var(--bg-color)] text-[var(--text-color)] min-h-screen overflow-hidden font-sans">
      {/* Navbar */}
      <header className="fixed w-full z-50 flex justify-between items-center px-6 md:px-12 py-4 backdrop-blur-md ">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--green-primary)]">
          
        </h1>
        <div className="flex items-center gap-4 md:gap-6">
          <button className="bg-[var(--green-primary)] text-[var(--bg-color)] font-semibold px-5 py-2 rounded-lg hover:bg-[var(--green-primary)]/80 transition-all shadow-md shadow-[var(--green-primary)]/20" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="border border-[var(--green-primary)] text-[var(--green-primary)] font-semibold px-5 py-2 rounded-lg hover:bg-[var(--green-primary)]/10 transition-all" onClick={() => navigate("/register")}>
            
            Register
          </button>
           <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center text-center pt-24">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover "
          src={heroVideo}
        />
       
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-20 bg-[var(--bg-secondary)]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center"
        >
          <h3 className="text-sm font-semibold tracking-widest uppercase text-[var(--green-primary)] mb-3">
            The Smart Redistribution Engine
          </h3>
          <h4 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--text-color)]">
            We Connect Surplus to <span className="text-[var(--green-primary)]">Need</span>.
          </h4>
          <p className="text-lg leading-relaxed text-[var(--muted-text)] max-w-3xl mx-auto">
            Our platform uses an advanced AI Agent to analyze food shelf life, location
            logistics, and real-time demand from both discounted customers and Night Workers,
            ensuring every meal is utilized before its expiry.
          </p>
        </motion.div>
      </section>

      {/* Roles Section */}
      {/* Roles Section */}
<section className="relative py-20 bg-[var(--bg-color)] overflow-hidden">
  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--text-color)] text-center">
    What can your Role be at Zarfo
  </h2>

  {/* Timeline vertical line starts after heading */}
  <div className="absolute left-1/2 top-40 h-[calc(100%-7rem)] w-1 bg-gradient-to-b from-[var(--green-primary)]/40 via-[var(--green-primary)]/20 to-transparent transform -translate-x-1/2" />

  <div className="relative flex flex-col gap-20 max-w-4xl mx-auto">
    {roles.map((role, index) => {
      const isLeft = index % 2 === 0;
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: index * 0.2 }}
          viewport={{ once: true }}
          className={`relative flex items-center justify-between ${
            isLeft ? "flex-row" : "flex-row-reverse"
          }`}
        >
          {/* Role Card */}
          <div
            className={`w-[45%] p-6 rounded-2xl shadow-md backdrop-blur-md border border-[var(--green-primary)]/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-2 rounded-full bg-white/20 hover:scale-110 transition-transform">
                {role.icon}
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-color)]">
                {role.title}
              </h3>
            </div>
            <p className="text-[var(--muted-text)] leading-relaxed">{role.desc}</p>
          </div>

          {/* Horizontal connector */}
          <div
            className={`absolute top-1/2 w-8 h-1 bg-[var(--green-primary)] ${
              isLeft ? "left-[50%] -translate-x-full" : "right-[50%] -translate-x-0"
            } hidden md:block`}
          />

          {/* Center dot */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[var(--green-primary)] rounded-full w-5 h-5 border-4 border-[var(--bg-color)] shadow-lg animate-pulse" />
        </motion.div>
      );
    })}
  </div>
</section>


      {/* CTA Section */}
      <section className="py-20 text-center bg-[var(--green-primary)] text-[var(--bg-color)]">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-8"
        >
          Ready to make your surplus count?
        </motion.h3>
        <div className="flex justify-center gap-6">
          <button className="bg-[var(--bg-color)] text-[var(--green-primary)] font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg" onClick={() => navigate("/register")}>
            
            Register Your Role
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm bg-[var(--bg-secondary)] text-[var(--muted-text)] border-t border-[var(--green-primary)]/10">
        © {new Date().getFullYear()} Zarfo. AI-Powered Food Logistics.
      </footer>
    </div>
  );
}
