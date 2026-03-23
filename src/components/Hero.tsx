"use client";

import Image from "next/image";
import renatoImg from "../../public/renato.jpg";
import { type Dictionary } from "../dictionaries";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { GithubIcon, LinkedInIcon } from "./icons/SocialIcons";

import { useState, useEffect } from "react";
import { useOptimizedTask } from "../hooks/useOptimizedTask";

export function Hero({ dict }: { dict: Dictionary }) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { runTask } = useOptimizedTask();

  useEffect(() => {
    // Yield to the main thread before starting the animation
    runTask(() => setShouldAnimate(true));
  }, [runTask]);

  return (
    <section className="max-w-7xl mx-auto px-8 mb-32 pt-20" id="sobre">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <motion.div
          className="lg:col-span-8"
          initial={false}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm font-label tracking-[0.2em] text-secondary uppercase mb-6 block">{dict.hero.location}</span>

          <h1 className="text-6xl md:text-8xl font-headline font-extrabold text-primary tracking-[-0.04em] leading-[0.9] mb-8">
            {dict.hero.title}
          </h1>

          <p className="text-2xl md:text-3xl text-on-surface font-headline font-semibold max-w-2xl leading-tight">
            {dict.hero.subtitle}
          </p>

          <p className="mt-8 text-on-surface-variant text-lg max-w-xl leading-relaxed font-body">
            {dict.hero.description}
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <a href={dict.hero.cvLink} target="_blank" rel="noopener noreferrer" className="kinetic-gradient text-on-primary px-8 py-4 rounded-md font-bold ambient-shadow hover:opacity-90 transition-all flex items-center gap-2">
              {dict.hero.link}
              <Download className="w-5 h-5 ml-2" />
            </a>
            <a href={dict.experience.github} target="_blank" rel="noreferrer" className="bg-surface-container-highest text-primary px-8 py-4 rounded-md font-bold hover:bg-surface-container-high transition-all">
              {dict.hero.code}
            </a>

            <div className="flex items-center gap-4 ml-0 md:ml-4">
              <a
                className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-low hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-all cursor-pointer"
                href={dict.experience.linkedIn}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>

              <a
                className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-low hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-all cursor-pointer"
                href={dict.experience.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
              >
                <GithubIcon className="w-6 h-6" />
              </a>
            </div>
          </div>

        </motion.div>

        <div className="lg:col-span-4 hidden lg:block">
          <div className="aspect-[4/5] bg-surface-container-low rounded-xl overflow-hidden ambient-shadow relative group">
            <Image
              src={renatoImg}
              alt="Renato Lins"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-all duration-700"
              priority
              fetchPriority="high"
            />

            <div className="absolute bottom-6 left-6 right-6 p-6 bg-surface/80 backdrop-blur-md rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs font-label text-secondary uppercase tracking-widest">{dict.hero.experienceLabel}</p>
                  <p className="text-xl font-bold text-on-surface">{dict.hero.years}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-label text-secondary uppercase tracking-widest">{dict.hero.stack}</p>
                  <p className="text-xl font-bold text-on-surface">{dict.hero.frontendLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
