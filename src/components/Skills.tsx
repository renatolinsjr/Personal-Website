"use client";

import { type Dictionary } from "../dictionaries";
import { motion } from "framer-motion";
import { SearchCheck } from "lucide-react";

export function Skills({ dict }: { dict: Dictionary }) {
  return (
    <section className="max-w-7xl mx-auto px-8 mb-40" id="skills">
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-4">{dict.skills.title}</h2>
          <div className="w-20 h-1 bg-primary"></div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Frontend */}
        <motion.div
          className="md:col-span-2 lg:col-span-3 bg-surface-container-low p-8 rounded-xl hover:bg-surface-container-lowest transition-all group border border-outline-variant/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <i className="devicon-vscode-plain colored text-2xl" />
          </div>
          <h3 className="text-xl font-bold mb-4">{dict.skills.frontend}</h3>
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest shadow-sm rounded-full text-xs font-semibold text-on-surface-variant border border-outline-variant/10">
              <i className="devicon-typescript-plain colored text-xl" /> TypeScript
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest shadow-sm rounded-full text-xs font-semibold text-on-surface-variant border border-outline-variant/10">
              <i className="devicon-react-original colored text-xl" /> React
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest shadow-sm rounded-full text-xs font-semibold text-on-surface-variant border border-outline-variant/10">
              <i className="devicon-nextjs-plain text-xl" /> Next.js
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest shadow-sm rounded-full text-xs font-semibold text-on-surface-variant border border-outline-variant/10">
              <i className="devicon-webpack-plain colored text-xl" /> Microfrontends
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest shadow-sm rounded-full text-xs font-semibold text-on-surface-variant border border-outline-variant/10">
              <i className="devicon-figma-plain colored text-xl" /> Design Systems
            </span>
          </div>
        </motion.div>

        {/* Backend */}
        <motion.div
          className="md:col-span-2 lg:col-span-3 bg-surface-container-low p-8 rounded-xl hover:bg-surface-container-lowest transition-all group border border-outline-variant/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <i className="devicon-nodejs-plain colored text-2xl" />
          </div>
          <h3 className="text-xl font-bold mb-4">{dict.skills.backend}</h3>
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest shadow-sm rounded-full text-xs font-semibold text-on-surface-variant border border-outline-variant/10">
              <i className="devicon-nodejs-plain colored text-xl" /> Node.js
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest shadow-sm rounded-full text-xs font-semibold text-on-surface-variant border border-outline-variant/10">
              <i className="devicon-go-original-wordmark colored text-xl" /> Golang
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest shadow-sm rounded-full text-xs font-semibold text-on-surface-variant border border-outline-variant/10">
              <i className="devicon-python-plain colored text-xl" /> Python
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest shadow-sm rounded-full text-xs font-semibold text-on-surface-variant border border-outline-variant/10">
              <i className="devicon-postgresql-plain colored text-xl" /> SQL/NoSQL
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest shadow-sm rounded-full text-xs font-semibold text-on-surface-variant border border-outline-variant/10">
              <i className="devicon-graphql-plain colored text-xl" /> GraphQL
            </span>
          </div>
        </motion.div>

        {/* DevOps */}
        <motion.div
          className="md:col-span-2 lg:col-span-2 bg-surface-container-low p-8 rounded-xl hover:bg-surface-container-lowest transition-all group border border-outline-variant/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <i className="devicon-docker-plain colored text-2xl" />
          </div>
          <h3 className="text-xl font-bold mb-4">{dict.skills.devops}</h3>
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest shadow-sm rounded-full text-xs font-semibold text-on-surface-variant border border-outline-variant/10">
              <i className="devicon-docker-plain colored text-xl" /> <i className="devicon-kubernetes-plain colored text-xl" /> Docker & K8s
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest shadow-sm rounded-full text-xs font-semibold text-on-surface-variant border border-outline-variant/10">
              <i className="devicon-github-original text-xl" /> CI/CD Pipelines
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest shadow-sm rounded-full text-xs font-semibold text-on-surface-variant border border-outline-variant/10">
              <i className="devicon-amazonwebservices-original colored text-xl" /> <i className="devicon-googlecloud-plain colored text-xl" /> AWS / GCP
            </span>
          </div>
        </motion.div>

        {/* Differential */}
        <motion.div
          className="md:col-span-2 xl:col-span-4 bg-primary text-on-primary p-8 rounded-xl ambient-shadow flex flex-col justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <SearchCheck className="w-10 h-10" />
            <h3 className="text-2xl font-extrabold tracking-tight">{dict.skills.differentials}</h3>
          </div>
          <p className="text-on-primary mb-6 text-md tracking-wide">{dict.skills.differentialsDetails.join(" ")}</p>
          <div className="flex flex-wrap gap-2">
            {dict.skills.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold border border-white/10">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
