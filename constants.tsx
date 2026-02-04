
import React from 'react';

export const COLORS = {
  lavender: '#F3E8FF',
  skyBlue: '#E0F2FE',
  blushPink: '#FDF2F8',
  deepLavender: '#D8B4FE',
};

export const Icons = {
  Flower: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 7.5V2M12 7.5C10.5 7.5 9 6.5 9 5C9 3.5 10.5 2 12 2C13.5 2 15 3.5 15 5C15 6.5 13.5 7.5 12 7.5ZM12 7.5C13.5 7.5 15 8.5 15 10C15 11.5 13.5 13 12 13C10.5 13 9 11.5 9 10C9 8.5 10.5 7.5 12 7.5ZM12 13V22M12 13C10.5 13 8 13.5 6.5 15C5 16.5 5 18 6.5 18C8 18 10.5 17 12 13ZM12 13C13.5 13 16 13.5 17.5 15C19 16.5 19 18 17.5 18C16 18 13.5 17 12 13Z" />
    </svg>
  ),
  Constellation: () => (
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-40">
      <circle cx="20" cy="30" r="1.5" fill="currentColor"/>
      <circle cx="40" cy="20" r="1.5" fill="currentColor"/>
      <circle cx="60" cy="25" r="1.5" fill="currentColor"/>
      <circle cx="80" cy="40" r="1.5" fill="currentColor"/>
      <circle cx="70" cy="60" r="1.5" fill="currentColor"/>
      <circle cx="50" cy="80" r="1.5" fill="currentColor"/>
      <line x1="20" y1="30" x2="40" y2="20" strokeDasharray="4 2"/>
      <line x1="40" y1="20" x2="60" y2="25" strokeDasharray="4 2"/>
      <line x1="60" y1="25" x2="80" y2="40" strokeDasharray="4 2"/>
      <line x1="80" y1="40" x2="70" y2="60" strokeDasharray="4 2"/>
      <line x1="70" y1="60" x2="50" y2="80" strokeDasharray="4 2"/>
    </svg>
  ),
  Star: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-200">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
};
