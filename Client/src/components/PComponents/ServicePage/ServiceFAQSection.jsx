import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

export const ServiceFAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'Are treatments at DentaPremium pain-free?',
      answer: 'Yes! Patient comfort is our highest priority. We use targeted needleless micro-anesthesia, computerized delivery systems, laser dentistry, and nitrous or IV sedation for anxious patients, ensuring a calm, painless experience.',
    },
    {
      question: 'How long do porcelain veneers and dental implants last?',
      answer: 'With proper oral hygiene and regular check-ups, dental implants can last a lifetime, holding a 99%+ success rate. High-grade custom porcelain veneers typically last 15 to 20+ years.',
    },
    {
      question: 'What sedation dentistry options do you offer for anxious patients?',
      answer: 'We provide nitrous oxide (laughing gas), oral conscious sedation pills, and full Intravenous (IV) sleep sedation administered by board-certified dental anesthetists so you can sleep comfortably throughout your care.',
    },
    {
      question: 'How does Digital Smile Design (DSD) work?',
      answer: 'DSD uses high-resolution digital intraoral 3D scanners and facial aesthetic software to simulate your new smile on screen before treatment begins, allowing you to preview and approve your results.',
    },
    {
      question: 'Do you offer emergency dental appointments?',
      answer: 'Yes, we maintain priority emergency slots daily for severe toothaches, knocked-out teeth, trauma, or broken restorations. Call our emergency helpline for immediate same-day relief.',
    },
    {
      question: 'What payment and financing options are available?',
      answer: 'We accept major health insurance plans and offer flexible, 0% interest monthly payment plans so you can receive world-class care comfortably within your budget.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto bg-slate-50/60">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-[#0ea5e9]"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9]">Common Inquiries</span>
            <span className="w-8 h-px bg-[#0ea5e9]"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f172a] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg font-light text-[#64748b]">
            Everything you need to know about our specialized clinical procedures and patient care.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 shadow-xs hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif font-semibold text-lg text-[#0f172a] hover:text-[#0ea5e9] transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#0ea5e9] shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#64748b] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#0ea5e9]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-sm font-light text-[#64748b] leading-relaxed border-t border-slate-100 mt-1 animate-fade-in">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need More Assistance Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#0f172a]">Have additional questions?</h4>
              <p className="text-xs text-[#64748b]">Our patient care team is available to assist you 24/7.</p>
            </div>
          </div>
          <div
            className="px-6 py-3 rounded-xl bg-[#0f172a] text-white text-xs font-bold uppercase tracking-wider cursor-default select-none shrink-0"
          >
            Call (800) 555-DENTA
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServiceFAQSection;
