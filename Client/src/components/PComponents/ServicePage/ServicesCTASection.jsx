import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';

export const ServicesCTASection = () => {
  return (
    <section className="py-16 lg:py-24 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto" id="booking">
      <div className="relative rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#003852] to-[#004666] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-white/10">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0ea5e9]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-cyan-300 text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
            <Award className="w-4 h-4 text-cyan-300" />
            <span>Ready for Your Transformation?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-6">
            Schedule Your Comprehensive Dental Consultation Today
          </h2>

          <p className="text-base sm:text-lg font-light text-slate-200 leading-relaxed mb-10 max-w-2xl">
            Experience gentle, personalized care backed by state-of-the-art 3D imaging technology. Book online in seconds or call our patient care specialists.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto">
            <button 
              type="button"
              onClick={() => {
                if (window.__navigateToContact) {
                  window.__navigateToContact();
                } else {
                  window.location.hash = '#contact';
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#0ea5e9] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#0284c7] transition-all duration-300 shadow-lg active:scale-95 cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md text-white font-semibold text-sm uppercase tracking-wider border border-white/20 cursor-default select-none"
            >
              <span>Call Helpline</span>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10 w-full text-xs text-slate-300 font-medium">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-300 shrink-0" />
              <span>0% Interest Payment Plans</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-cyan-300 shrink-0" />
              <span>Same-Day Emergency Slots</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Award className="w-4 h-4 text-cyan-300 shrink-0" />
              <span>100% Satisfaction Guarantee</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesCTASection;
