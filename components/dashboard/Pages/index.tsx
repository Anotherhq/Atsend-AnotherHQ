"use client"
import { LandingPageProvider } from "@/contexts/PageContext";
import LandingPagePreview from "./Preview";
import LandingPageEditor from "./Editor";
import React from "react";


const CreateLandingPage: React.FC = () => {
  return (
    <LandingPageProvider>
      <div className="container mx-auto px-4 py-10 h-full">
        <div className="flex justify-center items-start gap-20 h-full w-full ">
          {/* Preview Side */}
          <div className="w-[50%] flex items-start justify-start flex-col h-full">
            <h3 className="text-xl font-semibold text-white mb-4 self-start">Preview</h3>
            <div className="flex items-center justify-center h-[80%] border border-zinc-800 rounded-lg w-full">
            <LandingPagePreview />
            </div>
          </div>

          {/* Editor Side */}
          <div className="h-[80%] w-[40%]">
            <LandingPageEditor />
          </div>
        </div>
      </div>
    </LandingPageProvider>
  );
};

export default CreateLandingPage;