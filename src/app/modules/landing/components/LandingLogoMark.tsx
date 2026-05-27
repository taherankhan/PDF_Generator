import { FC } from 'react';

type Props = {
  className?: string;
};

const LandingLogoMark: FC<Props> = ({ className = '' }) => (
  <svg
    className={className}
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="lp-logo-grad" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6c63ff" />
        <stop offset="1" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="32" height="32" rx="9" fill="url(#lp-logo-grad)" opacity="0.15" />
    <rect x="2" y="2" width="32" height="32" rx="9" stroke="url(#lp-logo-grad)" strokeWidth="1.5" />
    <path
      d="M10 11h8M10 15h10M10 19h7"
      stroke="url(#lp-logo-grad)"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M22 12l5 3.5L22 19"
      stroke="#22d3ee"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 23h8v6H21z"
      stroke="url(#lp-logo-grad)"
      strokeWidth="1.5"
      fill="rgba(108,99,255,0.12)"
      strokeLinejoin="round"
    />
    <path d="M23 26h4M23 28.5h3" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export default LandingLogoMark;
