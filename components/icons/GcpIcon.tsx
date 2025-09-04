
import React from 'react';

const GcpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.2,35.4c-6.5,0-11.8-5.3-11.8-11.8S16.7,11.8,23.2,11.8c3.9,0,7.3,1.9,9.5,4.8l-3.2,2.8 c-1.4-1.7-3.6-2.9-6.3-2.9c-5.2,0-9.5,4.2-9.5,9.5s4.2,9.5,9.5,9.5c3.5,0,6.5-1.9,8.1-4.7h-8.1v-4.1h12.9 c0.1,0.7,0.2,1.3,0.2,2.1C36.1,30.9,30.3,35.4,23.2,35.4z" fill="#4285F4"/>
    <path d="M41,24H39c0-8.3-6.7-15-15-15v-2C32.9,7,41,14.7,41,24z" fill="#34A853"/>
    <path d="M24,41c8.3,0,15-6.7,15-15h2c0,9.4-7.6,17-17,17V41z" fill="#FBBC05"/>
    <path d="M9,24c0,8.3,6.7,15,15,15v2C14.7,41,7,32.9,7,24H9z" fill="#EA4335"/>
  </svg>
);

export default GcpIcon;
