"use client"
import React, { ChangeEvent, useState } from 'react';
import { useLandingPage } from '@/contexts/PageContext';

const LandingPageEditor: React.FC = () => {
  const { config, updateConfig, resetConfig } = useLandingPage();

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // if (file) {
    //   try {
    //     // const imageUrl = await uploadImage(file);
    //     // updateConfig({ logoUrl: imageUrl });
    //     // alert(`Image uploaded successfully! URL: ${imageUrl}`);
    //   } catch (error) {
    //     alert('Failed to upload image. Please try again.');
    //     console.error('Upload error:', error);
    //   }
    // }
  };



  return (
    <div className="w-full bg-[#111111] text-zinc-400 rounded-lg gap-4 flex flex-col h-full font-outfit py-10">
      <h2 className="text-xl font-bold  text-antiflash-white">Customize Your Landing Page</h2>

      {/* Page Title */}
      <div className='w-full'>
        <label className="block mb-2">Page Title</label>
        <input 
          type="text" 
          value={config.title}
          onChange={(e) => updateConfig({ title: e.target.value })}
          className="w-full p-2 border border-zinc-800 rounded bg-[#171717] text-zinc-300 focus:outline-none focus:ring-1 focus:ring-antiflash-white"
          placeholder="Give your page a name"
        />
      </div>

      {/* Header & Description */}
      <div>
        <label className="block mb-2">Header</label>
        <input 
          type="text" 
          value={config.header}
          onChange={(e) => updateConfig({ header: e.target.value })}
          className="w-full p-2 border border-zinc-800 rounded mb-2 bg-[#171717] text-zinc-300 focus:outline-none focus:ring-1 focus:ring-antiflash-white"
          placeholder="Enter header text"
        />
        <label className="block mb-2">Description</label>
        <textarea 
          value={config.description}
          onChange={(e) => updateConfig({ description: e.target.value })}
          className="w-full p-2 border border-zinc-800 resize-none rounded bg-[#171717] text-zinc-300 focus:outline-none focus:ring-1 focus:ring-antiflash-white"
          placeholder="Enter description"
          rows={3}
        />
      </div>

      {/* Logo Upload */}
      <div>
        <label className="block mb-2">Logo</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border border-zinc-800 rounded bg-[#171717] text-zinc-300 file:mr-4 file:rounded file:border-0 file:bg-antiflash-white file:text-[#111111] file:px-4 file:py-2"
        />
      </div>

      {/* Subscribe Button Text */}
      <div>
        <label className="block mb-2">Subscribe Button Text</label>
        <input 
          type="text" 
          value={config.title}
          onChange={(e) => updateConfig({ title: e.target.value })}
          className="w-full p-2 border border-zinc-800 rounded bg-[#171717] text-zinc-300 focus:outline-none focus:ring-1 focus:ring-antiflash-white"
          placeholder="Enter button text"
        />
      </div>

        <div className="flex items-center gap-4 justify-end mt-10">
                {/* Reset Button */}
                <button 
                onClick={resetConfig}
                className="w-fit p-2  text-red-400 rounded hover:text-red-700 cursor-pointer transition-colors duration-100"
            >
                Reset to Default
            </button>  
            <button 
                className="w-fit p-2 bg-zinc-100 text-black rounded px-4 hover:bg-zinc-300 cursor-pointer transition-colors duration-300 "
            >
                Save
            </button>
        </div>
    </div>
  );
};

export default LandingPageEditor;