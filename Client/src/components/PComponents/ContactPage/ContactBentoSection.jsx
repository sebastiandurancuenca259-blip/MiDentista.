import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Video, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ContactBentoSection = () => {
  const sectionRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    interest: 'Aesthetic Consultation',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        interest: 'Aesthetic Consultation',
      });
    }, 4000);
  };

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* Concierge Inquiry Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f172a] mb-2">
              Begin Your Journey
            </h2>
            <p className="text-base font-normal text-slate-800 mb-8">
              Submit a concierge inquiry for tailored care.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl p-6 flex items-start gap-4 mb-6">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-base mb-1">Inquiry Received</h4>
                  <p className="text-sm">
                    Thank you for reaching out to DentaPremium. Our concierge care team will contact you within 24 hours to finalize your consultation.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-xs font-bold tracking-widest uppercase text-slate-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-base font-normal text-[#0f172a] focus:border-[#0ea5e9] focus:bg-white focus:ring-2 focus:ring-[#0ea5e9]/20 transition-all outline-none"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-bold tracking-widest uppercase text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-base font-normal text-[#0f172a] focus:border-[#0ea5e9] focus:bg-white focus:ring-2 focus:ring-[#0ea5e9]/20 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold tracking-widest uppercase text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-base font-normal text-[#0f172a] focus:border-[#0ea5e9] focus:bg-white focus:ring-2 focus:ring-[#0ea5e9]/20 transition-all outline-none"
                  />
                </div>

                {/* Select Field */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold tracking-widest uppercase text-slate-700 mb-2">
                    Area of Interest
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-base font-normal text-[#0f172a] focus:border-[#0ea5e9] focus:bg-white focus:ring-2 focus:ring-[#0ea5e9]/20 transition-all outline-none cursor-pointer"
                  >
                    <option value="Aesthetic Consultation">Aesthetic Consultation</option>
                    <option value="Restorative Care">Restorative Care</option>
                    <option value="Routine Wellness">Routine Wellness</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-[#0f172a] text-white w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#0ea5e9] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer mt-4"
                >
                  <span>Request Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Info Stack (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Sanctuary Location Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#0f172a]">
                  Visit the Sanctuary
                </h3>
              </div>

              {/* Location Image Banner */}
              <div className="mb-6 rounded-2xl overflow-hidden h-36 border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
                  alt="New York Metropolis Clinic Location"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800';
                  }}
                  className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <address className="not-italic text-base font-normal text-slate-800 leading-relaxed mb-6">
                1200 Serenity Boulevard <br />
                Suite 400 <br />
                Metropolis, NY 10001
              </address>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs font-bold tracking-widest uppercase text-[#0f172a] mb-1">
                Hours of Operation
              </p>
              <p className="text-sm font-normal text-slate-700">
                Mon - Fri: 8:00 AM – 6:00 PM <br />
                Sat - Sun: Closed
              </p>
            </div>
          </div>

          {/* Virtual Consultation Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#0f172a]">
                Virtual Consultation
              </h3>
            </div>

            <p className="text-base font-normal text-slate-800 leading-relaxed mb-4">
              Connect with our specialists from the comfort of your home. Ideal for preliminary aesthetic assessments.
            </p>

            <a
              href="#booking"
              className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#0ea5e9] hover:text-[#0f172a] transition-colors"
            >
              <span>Learn More</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactBentoSection;
