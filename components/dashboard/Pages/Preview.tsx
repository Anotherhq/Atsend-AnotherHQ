"use client"
import React, { useState } from 'react';
import { useLandingPage } from '@/contexts/PageContext';
import { Camera, Mail, User, ArrowRight } from 'lucide-react';

const LandingPagePreview: React.FC = () => {
  const { config } = useLandingPage();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for newsletter signup logic
    console.log('Newsletter Signup', { name, email });
  };

  return (
    <div 
      className="w-[450px] bg-[#111111] rounded-2xl border border-zinc-800 overflow-hidden font-outfit"
      style={{ 
        backgroundColor: '#111111', 
        color: "#ffffff" 
      }}
    >
      {/* Header Section */}
      <div className="p-6 pb-0">
        {/* Logo Section */}
        {config.logoUrl ? (
          <div className="mb-4 flex justify-center ">
            <img 
              src={config.logoUrl} 
              alt="Logo" 
              className="max-h-16 max-w-full object-contain rounded-lg"
            />
          </div>
        ) : (
          <div className="mb-4 flex justify-center text-zinc-600">
            <Camera size={48} />
          </div>
        )}

        {/* Title and Description */}
        <div className="text-center">
          <h1 
            className="text-2xl font-bold mb-2 line-clamp-1 w-[80%] mx-auto"
            style={{ color: "#ffffff" }}
          >
            {config.header || 'Subscribe to Our Newsletter'}
          </h1>
          <p 
            className="text-zinc-400 mb-6 w-[90%] mx-auto line-clamp-3 h-fit"
            style={{ color: "#ffffff" }}
          >
            {config.description || 'Get the latest insights delivered straight to your inbox.'}
          </p>
        </div>
      </div>

      {/* Subscription Form */}
      <form 
        onSubmit={handleSubmit}
        className="px-6 pb-6 space-y-4"
      >
        {/* Name Input */}
        <div className="flex  border border-zinc-800 rounded-lg text-zinc-300 focus:outline-none focus:ring-2 focus:ring-antiflash-white">
          <div className=" inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User 
              size={18} 
              className="text-zinc-400" 
            />
          </div>
          <input 
            type="text" 
            placeholder="Your Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 pl-10 bg-[#111111] "
            required
          />
        </div>

        {/* Email Input */}
        <div className="flex  border border-zinc-800 rounded-lg text-zinc-300 focus:outline-none focus:ring-2 focus:ring-antiflash-white">
          <div className=" inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail 
              size={18} 
              className="text-zinc-400" 
            />
          </div>
          <input 
            type="email" 
            placeholder="Your Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 pl-10 bg-[#111111]"
            required
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full p-3 rounded-lg text-[#111111] font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-90"
          style={{ 
            backgroundColor: '#ffffff'
          }}
        >
          {config.title || 'Subscribe'}
          <ArrowRight size={20} />
        </button>
      </form>

      {/* Footer Note */}
      <div className="px-6 pb-6 text-center text-xs text-zinc-500">
        <p>We respect your inbox. No spam, ever.</p>
      </div>
    </div>
  );
};

export default LandingPagePreview;