// Ícono de diente usado en la navbar, el footer y el favicon.
export default function BrandLogo({ className = 'w-9 h-9' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M22 14c-6 0-10 4.5-10 11 0 5 2 8 3.5 12.5C17 42 17.5 50 21.5 50c3.5 0 3.5-9 7-9h7c3.5 0 3.5 9 7 9 4 0 4.5-8 6-12.5C50 33 52 30 52 25c0-6.5-4-11-10-11-4 0-6 2-10 2s-6-2-10-2z"
      />
    </svg>
  );
}
