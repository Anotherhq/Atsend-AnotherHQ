"use client"
import React from "react";

const page = () => {
  return (
    <div className="h-screen w-full bg-[#F78E69] text-[#0D1321] relative overflow-hidden selection:bg-[#0D1321] selection:text-[#F78E69]">


      <nav className="h-24 w-full flex items-center justify-center absolute top-0">
        <div className="MAXWIDTH items-center justify-start">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-bold antialiased">ATSend</h1>
          </div>
        </div>
      </nav>

      <div className="MAXWIDTH items-start justify-center h-[calc(100vh-4rem)] flex flex-col gap-20">
        <div className="w-full flex items-start justify-center flex-col gap-4">
          <p className="text-5xl font-bold antialiased tracking-wide opacity-90">
            Your Newsletter Revolution is Almost Here
          </p>
          <h1 className="text-7xl font-bold antialiased tracking-wide opacity-90">
            COMING SOON
          </h1>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <p className="text-2xl font-bold antialiased tracking-wide opacity-90">
            Join the Waitlist – Be the First to Know!
          </p>
          <div className="flex flex-col gap-2 w-full">
            <input
              type="text"
              placeholder="Enter your email"
              className="border border-[#0D1321] rounded-md h-10 w-[50%] "
            />
            <button className="bg-[#0D1321] text-[#F78E69] font-semibold text-lg w-[20%] h-10 rounded-md">
              Join Waitlist
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-24">
        <div className="MAXWIDTH flex items-center justify-start">
          <div className="flex items-center gap-2 underline">
            By{" "}
            <a
              href="https://github.com/Anotherhq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D1321] font-semibold antialiased"
            >
              AnotherHQ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

