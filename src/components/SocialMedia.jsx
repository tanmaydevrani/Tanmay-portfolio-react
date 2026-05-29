import React from "react";

const SOCIALS = [
  {
    label: "GitHub",
    link: "https://github.com/tanmaydevrani",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12,0.296c-6.627,0-12,5.372-12,12c0,5.302,3.438,9.8,8.206,11.387c0.6,0.111,0.82-0.26,0.82-0.577c0-0.286-0.011-1.231-0.016-2.234c-3.338,0.726-4.043-1.416-4.043-1.416C4.421,18.069,3.635,17.7,3.635,17.7c-1.089-0.745,0.082-0.729,0.082-0.729c1.205,0.085,1.839,1.237,1.839,1.237c1.07,1.834,2.807,1.304,3.492,0.997C9.156,18.429,9.467,17.9,9.81,17.6c-2.665-0.303-5.467-1.332-5.467-5.93c0-1.31,0.469-2.381,1.237-3.221C5.455,8.146,5.044,6.926,5.696,5.273c0,0,1.008-0.322,3.301,1.23C9.954,6.237,10.98,6.104,12,6.099c1.02,0.005,2.047,0.138,3.006,0.404c2.29-1.553,3.297-1.23,3.297-1.23c0.653,1.653,0.242,2.873,0.118,3.176c0.769,0.84,1.235,1.911,1.235,3.221c0,4.609-2.807,5.624-5.479,5.921c0.43,0.372,0.814,1.103,0.814,2.222c0,1.606-0.014,2.898-0.014,3.293c0,0.319,0.216,0.694,0.824,0.576c4.766-1.589,8.2-6.085,8.2-11.385C24,5.669,18.627,0.296,12,0.296z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    link: "https://in.linkedin.com/in/tanmaydevrani",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="16" fill="currentColor">
        <path d="M17.04,1.01H2.96C1.88,1.01,1,1.89,1,2.97v14.06C1,18.11,1.88,19,2.96,19h14.08C18.12,19,19,18.11,19,17.03V2.97C19,1.89,18.12,1.01,17.04,1.01z M7.01,15.99H4.52V7.99h2.49V15.99z M5.76,6.93c-0.8,0-1.44-0.65-1.44-1.44c0-0.8,0.65-1.44,1.44-1.44s1.44,0.65,1.44,1.44C7.2,6.28,6.56,6.93,5.76,6.93z M16.49,15.99h-2.49v-3.9c0-0.93-0.02-2.12-1.3-2.12c-1.3,0-1.49,1.01-1.49,2.06v3.96H8.72V7.99h2.39v1.09h0.03c0.49-0.82,1.39-1.3,2.36-1.27c2.52,0,2.99,1.66,2.99,3.82V15.99z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    link: "mailto:tanmaydevrani2@gmail.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" fill="currentColor">
        <path d="M23.954,5.542,15.536,13.96a5.007,5.007,0,0,1-7.072,0L.046,5.542C.032,5.7,0,5.843,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6C24,5.843,23.968,5.7,23.954,5.542Z"/>
        <path d="M14.122,12.546l9.134-9.135A4.986,4.986,0,0,0,19,1H5A4.986,4.986,0,0,0,.744,3.411l9.134,9.135A3.007,3.007,0,0,0,14.122,12.546Z"/>
      </svg>
    ),
  },
];

export default function SocialMedia({ className = "" }) {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          style={{ background: "var(--fill-tertiary)", color: "var(--label-secondary)" }}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}
