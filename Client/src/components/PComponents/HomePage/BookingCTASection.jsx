import React from 'react';

export const BookingCTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="booking">
      <div className="absolute inset-0 bg-[#0f172a] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.2)_0%,transparent_70%)] z-0"></div>
      
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 xl:px-40 relative z-10 text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight text-white mb-8 max-w-3xl">
          Ready to Experience the Pinnacle of Dental Care?
        </h2>
        <p className="text-xl font-light text-white/80 mb-12 max-w-2xl">
          Schedule your private consultation today and take the first step towards your perfect smile.
        </p>
        <div className="flex flex-wrap gap-6 justify-center">
          <button 
            type="button"
            onClick={() => window.__navigateToContact && window.__navigateToContact()}
            className="flex items-center justify-center rounded-full h-16 px-12 bg-white text-[#0f172a] text-base font-medium tracking-widest uppercase smooth-hover hover:bg-[#f8fafc] shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <span>Request Consultation</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookingCTASection;
