import React from 'react';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 stroke-round stroke-linejoin">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const FiverrIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M14.5 7.5h2v9h-2v-9zm-10 9h2.2v-4.2h3.2v-1.8h-3.2v-1.2c0-.6.4-1 1-1h2.2v-1.8h-2.7c-1.8 0-2.5 1.1-2.5 2.4v1.6h-1.5v1.8h1.5v4.4zm10-10.8c-.7 0-1.2.5-1.2 1.2s.5 1.2 1.2 1.2 1.2-.5 1.2-1.2-.5-1.2-1.2-1.2z" />
  </svg>
);

export const Footer = () => {
  const developerLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/_ashischetia_?igsh=MW1nZWFvczM1cXZvbw%3D%3D',
      icon: InstagramIcon,
      color: 'hover:text-pink-500',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/AshisChetia',
      icon: GithubIcon,
      color: 'hover:text-white',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ashis-chetia-a981b1351/',
      icon: LinkedinIcon,
      color: 'hover:text-sky-400',
    },
    {
      name: 'Fiverr',
      url: 'https://www.fiverr.com/users/ashis_chetia/',
      icon: FiverrIcon,
      color: 'hover:text-emerald-400',
    },
  ];

  return (
    <footer className="bg-[#0f172a] text-[#eceef0] py-12 border-t border-slate-800">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 text-white">
          <div className="w-8 h-8 text-[#0ea5e9]">
            <svg fill="none" viewBox="0 0 48 48" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"/>
              <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"/>
            </svg>
          </div>
          <span className="font-serif font-bold text-xl text-white">DentaPremium</span>
        </div>

        {/* Developer Contact Social Links */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Designed & Developed by <span className="text-[#0ea5e9]">Ashis Chetia</span>
          </span>
          <div className="flex items-center gap-4 pt-1">
            {developerLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.name}
                  className={`text-slate-400 ${link.color} transition-colors p-1.5 rounded-lg hover:bg-slate-800/60 flex items-center gap-1.5 text-xs font-medium`}
                >
                  <Icon />
                  <span className="hidden sm:inline">{link.name}</span>
                </a>
              );
            })}
          </div>
        </div>

      </div>

      {/* Copyright Line */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 mt-8 pt-6 border-t border-slate-800/60 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} DentaPremium Dental Clinic. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
