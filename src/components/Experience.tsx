"use client";

import { type Dictionary } from "../dictionaries";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function Experience({ dict }: { dict: Dictionary }) {
  return (
    <section className="max-w-7xl mx-auto px-8 mb-40" id="experiencia">
      <div className="flex flex-col md:flex-row gap-16">
        <div className="md:w-1/3">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-headline font-extrabold text-on-surface tracking-tight sticky top-32"
          >
            {dict.experience.title.split(" ").map((word, i, arr) => (
              <span key={i}>
                {i === arr.length - 1 ? (
                  <span className="text-primary">{word}</span>
                ) : (
                  <>{word} </>
                )}
                {i === 0 && <br/>}
              </span>
            ))}
          </motion.h2>
        </div>

        <div className="md:w-2/3">
          <div className="space-y-24">
            {dict.experience.jobs.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative pl-12 border-l-2 ${idx === 0 ? "border-primary/20" : "border-primary/5"}`}
              >
                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${idx === 0 ? "bg-primary" : "bg-outline-variant"}`}></div>
                <span className="text-sm font-label text-secondary mb-2 block tracking-widest uppercase">{job.period}</span>
                <h3 className="text-3xl font-bold text-on-surface mb-2">{job.company}</h3>
                <p className="text-lg font-medium text-primary mb-6">{job.role}</p>

                <div className="space-y-4 text-on-surface-variant leading-relaxed">
                  <ul className="space-y-3 font-body">
                    {job.description.map((desc, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-outline-variant/30 flex justify-center md:justify-start"
          >
            <a 
              href={dict.experience.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-container font-label font-bold tracking-widest uppercase text-sm border-b-2 border-primary/20 hover:border-primary transition-all pb-1"
            >
              {dict.experience.seeMore} →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
