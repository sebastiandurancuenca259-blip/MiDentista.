import React, { useState, useEffect, useRef } from 'react';
import { 
  Stethoscope, Sparkles, ShieldCheck, Smile, Award, Zap, Layers, Eye, 
  Anchor, Activity, Crown, HeartPulse, Shield, Grid, Lock, Scissors, 
  Flame, Moon, AlertCircle, ArrowRight, CheckCircle2, Search, X, Clock, Check
} from 'lucide-react';
import gsap from 'gsap';

export const ServiceCategories = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState(null);

  const containerRef = useRef(null);
  const gridRef = useRef(null);

  const categories = [
    'All',
    'General & Preventive',
    'Cosmetic Dentistry',
    'Restorative & Implants',
    'Orthodontics',
    'Specialty & Surgical',
  ];

  const services = [
    // General & Preventive
    {
      id: 1,
      category: 'General & Preventive',
      title: 'Comprehensive Exams & 3D Diagnostics',
      icon: Stethoscope,
      badge: '45 Mins',
      tag: 'Foundation',
      description: 'Thorough digital evaluation of teeth, gums, jaw joint, and surrounding structures using low-radiation 3D imaging.',
      features: ['Full 360° Oral Assessment', 'Low-Radiation Digital Scans', 'Early Cavity & Cancer Screening'],
      fullDetails: 'Our comprehensive examinations use advanced 3D CBCT digital imaging to spot underlying issues before they cause pain. Includes gum health charting, bite evaluation, and personalized preventive care guidance.',
    },
    {
      id: 2,
      category: 'General & Preventive',
      title: 'Professional Hygienic Cleaning & Polishing',
      icon: Sparkles,
      badge: '45 Mins',
      tag: 'Essential',
      description: 'Gentle removal of stubborn plaque, calculus (tartar), and stain buildup to preserve healthy gums and fresh breath.',
      features: ['Ultrasonic Scaling Tech', 'Air-Flow Stain Removal', 'Fluoride Shield Coating'],
      fullDetails: 'Conducted by experienced dental hygienists using gentle ultrasonic scalers and air-polishing technology. Leaves your mouth feeling completely refreshed and free of bacterial biofilm.',
    },
    {
      id: 3,
      category: 'General & Preventive',
      title: 'Tooth-Colored Composite Fillings',
      icon: ShieldCheck,
      badge: 'Same Day',
      tag: 'Biocompatible',
      description: 'Biocompatible, non-toxic resin fillings that match your natural tooth shade while restoring structural integrity.',
      features: ['Seamless Color Matching', 'Mercury-Free & Non-Toxic', 'Single Visit Restoration'],
      fullDetails: 'We use high-grade nano-composite materials that physically bond to the tooth structure. Completely invisible to the naked eye and mercury-free for safe, long-lasting decay repair.',
    },
    {
      id: 4,
      category: 'General & Preventive',
      title: 'Pediatric Dentistry & Protective Sealants',
      icon: Smile,
      badge: 'Child Special',
      tag: 'Family',
      description: 'Gentle, stress-free dental care designed specifically for children to build lifelong healthy oral habits.',
      features: ['Kid-Friendly Pain-Free Care', 'Painless Fissure Sealants', 'Custom Growth Monitoring'],
      fullDetails: 'Our pediatric suite is designed to make children feel safe and excited. We provide cavity-prevention sealants, fluoride treatments, and gentle habit guidance with a warm, caring touch.',
    },

    // Cosmetic Dentistry
    {
      id: 5,
      category: 'Cosmetic Dentistry',
      title: 'Custom Porcelain Veneers & Lumineers',
      icon: Award,
      badge: 'Premium',
      tag: 'Popular',
      description: 'Ultra-thin, hand-crafted ceramic shells bonded to front teeth for a red-carpet flawless smile transformation.',
      features: ['Stain-Resistant Porcelain', 'Custom Shade & Shape Matching', 'Minimal Tooth Preparation'],
      fullDetails: 'Custom crafted by master ceramists to match your facial proportions, skin tone, and personal aesthetic goals. Corrects discoloration, gaps, chips, and minor misalignment permanently.',
    },
    {
      id: 6,
      category: 'Cosmetic Dentistry',
      title: 'Laser & Zoom™ Teeth Whitening',
      icon: Zap,
      badge: '60 Mins',
      tag: 'Fast Results',
      description: 'In-office clinical whitening system capable of brightening your smile up to 8 shades in under one hour.',
      features: ['Up to 8 Shades Whiter', 'Enamel-Safe Formulation', 'Includes Take-Home Touch-up'],
      fullDetails: 'Uses light-activated hydrogen peroxide gel with low sensitivity protocols. Includes custom take-home whitening trays to maintain your brilliant white smile indefinitely.',
    },
    {
      id: 7,
      category: 'Cosmetic Dentistry',
      title: 'Architectural Composite Bonding',
      icon: Layers,
      badge: 'Express',
      tag: '1-Visit',
      description: 'Artistic direct resin application to repair chipped, gapped, or slightly misaligned teeth in a single visit.',
      features: ['Immediate Single Visit', 'Reversible & Non-Invasive', 'Affordable Aesthetic Upgrade'],
      fullDetails: 'Ideal for minor cosmetic touch-ups. Our cosmetic dentists sculpt micro-layered resin directly onto the tooth surface, hardening it with specialized ultraviolet light for instant perfection.',
    },
    {
      id: 8,
      category: 'Cosmetic Dentistry',
      title: 'Digital Smile Design (DSD) Makeover',
      icon: Eye,
      badge: 'Signature',
      tag: 'AI-Powered',
      description: 'Preview your transformed smile in 3D photorealistic visualization before starting any clinical treatment.',
      features: ['3D Digital Preview', 'Personalized Facial Harmony', 'Multi-Disciplinary Plan'],
      fullDetails: 'Combines digital photography, intraoral scanning, and facial aesthetic software. Allows you to co-design your final smile with our doctors before commitment.',
    },

    // Restorative & Implants
    {
      id: 9,
      category: 'Restorative & Implants',
      title: 'Titanium & Zirconia Dental Implants',
      icon: Anchor,
      badge: 'Lifetime Guarantee',
      tag: 'Gold Standard',
      description: 'Permanent replacement roots for missing teeth that look, feel, and function exactly like natural teeth.',
      features: ['Lifetime Structural Durability', 'Prevents Jawbone Atrophy', '99.2% Clinical Success Rate'],
      fullDetails: 'Implanted into the jawbone using 3D surgical guides for millimeter precision. Integrates seamlessly with your bone (osseointegration) to support custom porcelain crowns.',
    },
    {
      id: 10,
      category: 'Restorative & Implants',
      title: 'All-on-4 / All-on-6 Full Arch Restorations',
      icon: Activity,
      badge: 'Same Day Teeth',
      tag: 'Transformative',
      description: 'Complete fixed full-mouth restoration supported by strategically angled implants in a single day.',
      features: ['Full Arch Fixed Teeth', 'Immediate Functionality', 'Bone Grafting Often Avoided'],
      fullDetails: 'Replaces a full arch of missing or failing teeth with a non-removable bridge anchored to 4 or 6 implants. Walk out on the same day with a complete set of functional, beautiful teeth.',
    },
    {
      id: 11,
      category: 'Restorative & Implants',
      title: 'Porcelain & Ceramic Crowns & Bridges',
      icon: Crown,
      badge: 'CAD/CAM',
      tag: 'High Strength',
      description: 'Precision-milled tooth caps and bridges that restore structural strength, chewing force, and natural look.',
      features: ['High-Strength Ceramic', 'Custom Shading & Texture', 'Digital Scanner CAD/CAM'],
      fullDetails: 'Made from high-grade monolithic zirconia or e.max porcelain. Restores severely decayed or cracked teeth with high fracture resistance and natural light translucency.',
    },
    {
      id: 12,
      category: 'Restorative & Implants',
      title: 'Microscopic Root Canal Therapy',
      icon: HeartPulse,
      badge: 'Tooth Saver',
      tag: 'Painless',
      description: 'High-precision root canal treatment to eliminate nerve infection and preserve your natural tooth.',
      features: ['Painless Local Anesthesia', '3D Microscopic Precision', 'Saves Natural Tooth Root'],
      fullDetails: 'Conducted under surgical operating microscopes to ensure every microscopic canal is thoroughly disinfected, sealed, and saved from extraction.',
    },

    // Orthodontics
    {
      id: 13,
      category: 'Orthodontics',
      title: 'Invisalign® Clear Aligners',
      icon: Shield,
      badge: 'Popular',
      tag: 'Discreet',
      description: 'Virtually invisible, removable aligner trays that gently shift your teeth without metal wires or brackets.',
      features: ['100% Removable & Clear', 'No Dietary Restrictions', '3D Digital Outcome Tracking'],
      fullDetails: 'Custom-made SmartTrack aligner trays changed every 1-2 weeks. Enjoy eating your favorite foods and brushing normally while straightening your smile discreetly.',
    },
    {
      id: 14,
      category: 'Orthodontics',
      title: 'Ceramic & Aesthetic Braces',
      icon: Grid,
      badge: 'Precision',
      tag: 'High Torque',
      description: 'Tooth-colored ceramic bracket systems offering high force control for complex alignment needs.',
      features: ['Discreet Translucent Brackets', 'Handles Severe Misalignments', 'Accelerated Movement'],
      fullDetails: 'Combines the high mechanical strength of traditional orthodontic braces with translucent ceramic brackets that blend in with natural tooth enamel color.',
    },
    {
      id: 15,
      category: 'Orthodontics',
      title: 'Custom Retainers & Bruxism Guards',
      icon: Lock,
      badge: 'Protection',
      tag: 'Comfort Fit',
      description: 'Custom-molded appliances to protect teeth against night grinding and maintain post-ortho results.',
      features: ['3D Digital Impression', 'BPA-Free Durable Material', 'Jaw Joint Pressure Relief'],
      fullDetails: 'Custom fabricated from 3D intraoral digital scans for a snug, comfortable fit. Relieves TMJ strain, protects enamel against wear, and keeps aligner results locked in place.',
    },

    // Specialty & Surgical
    {
      id: 16,
      category: 'Specialty & Surgical',
      title: 'Wisdom Teeth & Surgical Extractions',
      icon: Scissors,
      badge: 'Specialized',
      tag: 'Piezo Tech',
      description: 'Gentle surgical removal of impacted or problematic wisdom teeth with rapid recovery protocols.',
      features: ['Piezo Ultrasonic Surgery', 'Minimal Post-Op Swelling', 'IV Sedation Available'],
      fullDetails: 'Utilizes ultrasonic piezosurgery instruments that cut bone cleanly while preserving soft nerve tissue. Reduces recovery time, swelling, and discomfort significantly.',
    },
    {
      id: 17,
      category: 'Specialty & Surgical',
      title: 'Laser Periodontal Gum Therapy',
      icon: Flame,
      badge: 'Laser Tech',
      tag: 'Scalpel-Free',
      description: 'Targeted laser treatment for gum disease and periodontitis without scalpels or invasive sutures.',
      features: ['Suture-Free Gum Healing', 'Eliminates 99.9% Bacteria', 'Stimulates Tissue Regeneration'],
      fullDetails: 'LANAP-inspired dental laser treatment targets diseased tissue while leaving healthy tissue intact. Eliminates deep pocket bacteria and encourages natural bone regrowth.',
    },
    {
      id: 18,
      category: 'Specialty & Surgical',
      title: 'Sedation Dentistry (Sleep Dentistry)',
      icon: Moon,
      badge: 'Anxiety-Free',
      tag: 'Maximum Comfort',
      description: 'Relaxing oral or intravenous (IV) sedation allowing anxious patients to sleep through complex procedures.',
      features: ['Board-Certified Specialist', 'Zero Memory of Pain', 'Ideal for Complex Surgeries'],
      fullDetails: 'Monitored continuously by certified dental anesthetists. Feel completely relaxed or gently fall asleep, allowing multiple treatments to be completed in a single session.',
    },
    {
      id: 19,
      category: 'Specialty & Surgical',
      title: '24/7 Emergency Dental Care',
      icon: AlertCircle,
      badge: '24/7 Priority',
      tag: 'Immediate Care',
      description: 'Same-day urgent appointments for severe toothaches, broken teeth, trauma, or unexpected dental emergencies.',
      features: ['Immediate Pain Relief', 'On-Call Dental Specialists', 'Same-Day Treatment Slot'],
      fullDetails: 'If you experience severe pain, bleeding, or trauma, our emergency team is ready. We prioritize immediate pain relief and fast tooth preservation.',
    },
  ];

  // Filter services by category & search query
  const filteredServices = services.filter((service) => {
    const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
    const matchesSearch = 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Re-animate grid when active category or search changes
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
        }
      );
    }
  }, [activeCategory, searchQuery]);

  return (
    <section id="categories" ref={containerRef} className="py-16 lg:py-24 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-8 h-px bg-[#0ea5e9]"></span>
          <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9]">Our Clinical Offerings</span>
          <span className="w-8 h-px bg-[#0ea5e9]"></span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0f172a] mb-4">
          Explore Our Treatments
        </h2>
        <p className="text-base sm:text-lg font-light text-[#64748b] leading-relaxed">
          From preventive hygiene to advanced oral reconstructive surgery, explore our full spectrum of specialized care.
        </p>
      </div>

      {/* Search & Category Filter Control Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 mb-12 bg-slate-50 p-3 sm:p-4 rounded-3xl border border-slate-200">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto flex-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0f172a] text-white shadow-md'
                  : 'bg-white text-[#64748b] hover:bg-slate-200 hover:text-[#0f172a] border border-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full md:w-64 lg:w-72 shrink-0">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]" />
          <input
            type="text"
            placeholder="Search service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-[#0f172a] focus:outline-none focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/20 transition-all placeholder:text-[#94a3b8]"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
          <p className="text-lg font-medium text-[#64748b]">No services found matching "{searchQuery}"</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            className="mt-4 text-sm font-bold text-[#0ea5e9] underline hover:text-[#003852]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="group rounded-3xl p-6 sm:p-8 bg-white border border-[#e2e8f0] shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] smooth-hover hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300"
              >
                {/* Accent Top Line */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0f172a] via-[#0ea5e9] to-[#004666] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>

                <div>
                  {/* Icon & Category Tag Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-[#0f172a]/5 text-[#0f172a] flex items-center justify-center group-hover:bg-[#0f172a] group-hover:text-white smooth-hover shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-[#0f172a]">
                        {service.tag}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#0ea5e9]/10 text-[#0ea5e9]">
                        {service.badge}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-serif font-semibold text-[#0f172a] mb-3 group-hover:text-[#0ea5e9] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm font-light text-[#64748b] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Bullet Checklist */}
                  <ul className="space-y-2 mb-8 border-t border-slate-100 pt-4">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-[#0f172a] font-medium">
                        <Check className="w-3.5 h-3.5 text-[#0ea5e9] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Link */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#0ea5e9]">
                  <span>View Details & Procedure</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Service Detail Modal Overlay */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#0f172a] text-white flex items-center justify-center shrink-0">
                {React.createElement(selectedService.icon, { className: 'w-7 h-7' })}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#0ea5e9]">
                  {selectedService.category}
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#0f172a]">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="space-y-6 text-[#64748b] text-sm leading-relaxed border-t border-slate-100 pt-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-2">Overview</h4>
                <p>{selectedService.fullDetails}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f172a] mb-3">Key Patient Benefits</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-[#0ea5e9] shrink-0" />
                      <span className="text-xs font-semibold text-[#0f172a]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0ea5e9]/5 border border-[#0ea5e9]/20 text-[#0f172a]">
                <Clock className="w-5 h-5 text-[#0ea5e9] shrink-0" />
                <div>
                  <span className="text-xs font-bold block text-[#0ea5e9]">Expected Duration & Option</span>
                  <span className="text-xs">{selectedService.badge} • Comfort anesthesia protocols available</span>
                </div>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-4">
              <button
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 text-[#0f172a] text-xs font-bold uppercase tracking-wider hover:bg-slate-200"
              >
                Close
              </button>
              <a
                href="#booking"
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0f172a] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0ea5e9] transition-colors text-center"
              >
                Book This Treatment
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default ServiceCategories;
