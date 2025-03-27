"use client"
import React, { useEffect } from "react";
import axios from "axios";

const Page = () => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [isJoined, setIsJoined] = React.useState(false);
  
  useEffect(() => {
    const localEmail = localStorage.getItem("email");
    if (localEmail) {
      setEmail(localEmail);
      setIsJoined(true);
    }
  }, []);

  const HandleSubmit = async () =>{
     if(isJoined || !email) return;
     setLoading(true);
     try {
      const res = await axios.post("/api/waitlist", {email})
      console.log(res);
      
      if(res.status == 409){
        setMessage("Email already in waitlist");
        return;
      }
      if(res.status === 200){
        localStorage.setItem("email", email);
      }
      setLoading(false);
      setMessage(res.data.message);
     } catch (error) {
      setLoading(false);
      console.log(error);
      setMessage("Internal Server Error");
     }
  }
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
          <p className="md:text-5xl text-3xl font-bold antialiased tracking-wide opacity-90">
            Your Newsletter Revolution is Almost Here
          </p>
          <h1 className="md:text-7xl text-5xl font-bold antialiased tracking-wide opacity-90">
            COMING SOON
          </h1>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <p className="md:text-2xl text-lg font-bold antialiased tracking-wide opacity-90">
            Join the Waitlist – Be the First to Know!
          </p>
          <div className="flex flex-col gap-2 w-full">
            <input
              type="text"
              disabled={isJoined} 
              placeholder="Enter your email"
              className="border border-[#0D1321] rounded-md h-10 md:w-[50%] w-[85%] "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center gap-2">
            <button className="bg-[#0D1321] text-[#F78E69] font-semibold text-lg md:w-[20%] w-[50%] h-10 rounded-md cursor-pointer" onClick={HandleSubmit}>
              {loading ? "Adding..." : email && isJoined ? "Joined" : "Join Waitlist"}
            </button>
            {message && <p className="text-lg text-[#0D1321] font-bold antialiased tracking-wide opacity-90">{message}</p>}
            </div>

          </div>  
        </div>
      </div>

      <div className="absolute bottom-0 w-full  h-24">
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

export default Page;

