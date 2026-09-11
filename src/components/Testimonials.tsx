import React from 'react';
import { Quote, Star } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  project: string;
  url: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'lovemytour',
    quote:
      "The RudraAiHub team designed our website beautifully — clean, fast, and error-free from day one. Love My Tour looks and works exactly the way we imagined, and their support after launch has been excellent.",
    author: 'Love My Tour',
    role: 'Travel & Tour Booking Platform',
    project: 'lovemytour.com',
    url: 'https://lovemytour.com',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-[#0A0F2C] text-white relative overflow-hidden border-t border-slate-800/60">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 space-y-3" delay={80}>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/80 border border-blue-800 px-3 py-1 rounded-full inline-block">
            Client Testimonials
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            What Our Clients Say
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-normal">
            Real feedback from businesses we've built and shipped AI-powered products for.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t, index) => (
            <ScrollReveal
              key={t.id}
              as="div"
              className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-900 transition-all duration-300 flex flex-col md:col-span-2 lg:col-span-3"
              delay={index * 90}
              variant="card"
            >
              <Quote className="w-8 h-8 text-blue-500/40 mb-4" />

              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>

              <div className="mt-auto pt-4 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="text-sm font-bold text-white">{t.author}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {t.project} ↗
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
