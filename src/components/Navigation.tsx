"use client";

import { useState, useEffect } from "react";
import { HeaderControls } from "./HeaderControls";
import { Menu, X } from "lucide-react";
import { type Dictionary } from "../dictionaries";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation({ dict }: { dict: Dictionary }) {
  const [activeSection, setActiveSection] = useState("sobre");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: dict.nav.about, id: "sobre" },
    { label: dict.nav.skills, id: "skills" },
    { label: dict.nav.experience, id: "experiencia" },
    { label: dict.nav.contact, id: "contato" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-150px 0px -50% 0px",
        threshold: 0,
      }
    );

    const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean);
    sections.forEach((section) => observer.observe(section!));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 shadow-lg" : "bg-transparent"}`}>
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <div className="text-xl font-bold tracking-tighter text-on-surface flex items-center gap-2">
           Renato Lins
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <div key={item.id} className="relative">
              <button
                onClick={() => scrollToSection(item.id)}
                className={`py-1 font-headline font-medium tracking-tight transition-all duration-300 ${
                  activeSection === item.id ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {item.label}
              </button>
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <HeaderControls />
          </div>
          
          {/* Hamburger Button */}
          <button 
            className="md:hidden p-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-t border-outline-variant/10 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-2xl font-headline font-bold ${
                    activeSection === item.id ? "text-primary" : "text-on-surface-variant"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-6 border-t border-outline-variant/10 flex justify-between items-center">
                 <HeaderControls />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
