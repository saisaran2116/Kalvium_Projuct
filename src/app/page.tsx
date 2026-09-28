"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ScanLine, ShieldCheck, UploadCloud, Zap, Sparkles } from "lucide-react";
import ShapeGrid from "@/components/ShapeGrid";
import { useTheme } from "@/context/ThemeContext";

const headlineLines = ["FIND WHAT'S", "ACTUALLY HAPPENING", "ON CAMPUS."];

const pipeline = [
  {
    icon: UploadCloud,
    title: "1. ORGANIZER UPLOADS POSTER",
    detail: "No forms to fill in twice. The flyer they made is the only input.",
    color: "bg-[#E5391F]",
  },
  {
    icon: ScanLine,
    title: "2. AI EXTRACTS DATA",
    detail: "Time, venue, and category are parsed instantly with field-level confidence.",
    color: "bg-black",
  },
  {
    icon: ShieldCheck,
    title: "3. HUMAN VERIFICATION",
    detail: "A real person on the manager team checks the AI's read before it goes live.",
    color: "bg-[#E5391F]",
  },
  {
    icon: Zap,
    title: "4. CLASH PREVENTION",
    detail: "The system checks against what you've already saved, preventing double bookings.",
    color: "bg-black",
  },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <div className="relative overflow-hidden bg-white dark:bg-[#111111]">
      {/* ---------------------------------------------------------------- */}
      {/* Hero Section (Constructivist)                                    */}
      {/* ---------------------------------------------------------------- */}
      <section ref={heroRef} className="relative overflow-hidden px-6 pt-10 pb-24 sm:px-10 border-b-4 border-black bg-white dark:bg-[#111111]">
        {/* Interactive ShapeGrid Canvas from React Bits */}
        <div className="absolute inset-0 z-0">
          <ShapeGrid
            speed={0.5}
            squareSize={40}
            direction="diagonal"
            borderColor={isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)"}
            hoverFillColor={isDark ? "rgba(229, 57, 31, 0.35)" : "rgba(229, 57, 31, 0.2)"}
            shape="square"
            hoverTrailAmount={5}
          />
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 items-center relative z-10 pointer-events-none">
          <motion.div style={{ y: headlineY }} className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 inline-flex items-center gap-3 border-4 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_0px_#E5391F] pointer-events-auto select-none"
            >
              <div className="w-3 h-3 bg-[#E5391F] border-2 border-black animate-pulse" />
              <span className="font-black text-black uppercase tracking-widest text-xs">
                Verified Campus Hub
              </span>
            </motion.div>

            <h1 className="font-display text-[clamp(3rem,6vw,6rem)] font-black text-black dark:text-white tracking-tight leading-[0.92]">
              {headlineLines.map((line, i) => (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="block cursor-default"
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 max-w-md text-base font-bold text-black dark:text-gray-200 uppercase tracking-widest leading-relaxed border-l-4 border-[#E5391F] pl-4"
            >
              Every listing is parsed by AI, certified by campus leadership, and matched against your personal schedule. Form follows function.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-6 pointer-events-auto"
            >
              <Link href="/events" className="px-10 py-4 bg-[#FDECEB] text-[#E5391F] font-black text-sm tracking-widest uppercase hover:bg-[#FADBD8] transition-colors duration-300 border-2 border-[#F8C4BE] rounded-full flex items-center justify-center">
                EXPLORE EVENTS
              </Link>
              <Link href="/events/create" className="px-10 py-4 bg-[#FDECEB] text-[#E5391F] font-black text-sm tracking-widest uppercase hover:bg-[#FADBD8] transition-colors duration-300 border-2 border-[#F8C4BE] rounded-full flex items-center justify-center">
                POST AN EVENT
              </Link>
            </motion.div>
          </motion.div>

          {/* Constructivist Hero Graphic */}
          <motion.div style={{ y: cardsY }} className="relative h-[400px] lg:h-[600px] w-full hidden sm:block group">
            <div className="absolute inset-0 flex items-center justify-center p-8 z-10 transition-transform duration-500 group-hover:scale-105 pointer-events-none">
              <Image
                src="/images/image.png"
                alt="Illustration of students"
                fill
                className="object-contain filter grayscale contrast-125"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Pipeline Sequence                                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative px-6 py-24 sm:px-10 border-b-4 border-black bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 border-b-4 border-black pb-8 flex items-center justify-between">
            <h2 className="font-display text-4xl sm:text-6xl font-black text-black tracking-tighter uppercase cursor-default">
              From Poster to Verified Event.
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pipeline.map((step, i) => {
              const rotation = i % 2 === 0 ? (i % 4 === 0 ? '-rotate-2' : '-rotate-1') : (i % 3 === 0 ? 'rotate-2' : 'rotate-1');
              return (
                <div
                  key={step.title}
                  className={`p-6 bg-white border-4 border-black shadow-[8px_8px_0px_0px_black] hover:shadow-[4px_4px_0px_0px_black] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group rounded-2xl ${rotation}`}
                >
                  <div className={`w-16 h-16 ${step.color} border-4 border-black flex items-center justify-center mb-6 transition-colors rounded-xl`}>
                    <step.icon size={32} className="text-white" strokeWidth={3} />
                  </div>
                  <h3 className="font-display text-xl font-black text-black uppercase mb-4 leading-tight transition-colors">{step.title}</h3>
                  <p className="text-sm font-bold uppercase tracking-widest text-gray-700 leading-relaxed mt-auto">
                    {step.detail}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>


      {/* ---------------------------------------------------------------- */}
      {/* Campus Pulse (Bento Box)                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative px-6 py-24 sm:px-10 bg-white border-b-4 border-black">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FDECEB] text-[#E5391F] font-black text-[10px] tracking-widest uppercase rounded-full border border-[#F8C4BE] mb-6 shadow-sm">
                <Sparkles size={12} strokeWidth={3} /> CAMPUS PULSE
              </div>
              <h2 className="font-display text-5xl sm:text-7xl font-black text-black tracking-tighter uppercase leading-[0.9]">
                BUILT FOR EVERY RHYTHM OF <br /><span className="text-[#E5391F]">STUDENT LIFE.</span>
              </h2>
            </div>
            <div className="flex items-end">
              <p className="text-base font-bold text-gray-700 uppercase tracking-widest leading-relaxed border-l-4 border-[#E5391F] pl-4 max-w-lg">
                From packed keynote amphitheaters to late-night hackathons and open-air club sessions — discover the real gatherings that shape your university years.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto">
            {/* Large Card */}
            <div className="lg:col-span-7 rounded-[2rem] overflow-hidden group border-4 border-black shadow-[8px_8px_0px_0px_black] hover:shadow-[4px_4px_0px_0px_black] hover:-translate-y-1 transition-all duration-300 bg-black flex items-center justify-center">
              <img
                src="/images/bento-keynotes.png"
                alt="Tech Horizons Annual Showcase - Keynotes & Tech Symposiums"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Right Column Stack */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              {/* Top Right Card */}
              <div className="rounded-[2rem] overflow-hidden group border-4 border-black shadow-[8px_8px_0px_0px_black] hover:shadow-[4px_4px_0px_0px_black] hover:-translate-y-1 transition-all duration-300 bg-black flex items-center justify-center">
                <img
                  src="/images/bento-amphitheater.png"
                  alt="Campus Amphitheater Live - Cultural & Arts"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Bottom Right Card */}
              <div className="rounded-[2rem] overflow-hidden group border-4 border-black shadow-[8px_8px_0px_0px_black] hover:shadow-[4px_4px_0px_0px_black] hover:-translate-y-1 transition-all duration-300 bg-black flex items-center justify-center">
                <img
                  src="/images/bento-communities.png"
                  alt="Outdoor Club Fairs & Societies - Student Communities"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
