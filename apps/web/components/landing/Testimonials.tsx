"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Indie Hacker",
    content: "Filloutly completely changed how I collect feedback. My users think I built a custom billion-dollar platform. The Cyberpunk theme is insane.",
    avatar: "https://i.pravatar.cc/150?u=alex"
  },
  {
    name: "Sarah Chen",
    role: "Startup Founder",
    content: "We switched from Typeform to Filloutly and our completion rate jumped by 40%. The cinematic glass UI builds instant trust.",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Marcus Wright",
    role: "Content Creator",
    content: "The Money Heist aesthetic is my absolute favorite. It creates so much tension and engagement when I run giveaways. 10/10.",
    avatar: "https://i.pravatar.cc/150?u=marcus"
  }
];

export function Testimonials() {
  return (
    <section className="py-32 relative bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Trusted by the <br/>
            <span className="text-neutral-500">elite</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl glass-card border border-white/10 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2h2V8h-2zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h2V8h-2z"/>
                </svg>
              </div>
              
              <div className="flex gap-1 text-red-500 mb-6">
                {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
              </div>
              
              <p className="text-neutral-300 text-lg mb-8 relative z-10">&quot;{t.content}&quot;</p>
              
              <div className="flex items-center gap-4 relative z-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-white/20" />
                <div>
                  <div className="text-white font-bold">{t.name}</div>
                  <div className="text-neutral-500 text-sm">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
