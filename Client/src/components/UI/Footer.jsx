import React from 'react';

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.22V8.2a6.34 6.34 0 0 0-3.32.93 6.33 6.33 0 1 0 10.32 4.95V8.69a8.21 8.21 0 0 0 4.79 1.53V6.77a4.85 4.85 0 0 1-1.68-.08z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 stroke-round stroke-linejoin">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const Footer = () => {
  const socialLinks = [
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@dra_juanitacuenca',
      icon: TikTokIcon,
      color: 'hover:text-cyan-400',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/satelitenorte.dentista.odontologia.ortodoncia',
      icon: FacebookIcon,
      color: 'hover:text-blue-500',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/mi_dentista_clinica.dental/',
      icon: InstagramIcon,
      color: 'hover:text-pink-500',
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
          <span className="font-serif font-bold text-xl text-white">MI DENTISTA</span>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Síguenos en nuestras redes
          </span>
          <div className="flex items-center gap-4 pt-1">
            {socialLinks.map((link) => {
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
        © {new Date().getFullYear()} Clínica Dental MI DENTISTA. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;