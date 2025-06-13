'use client'
import { useRouter } from "next/navigation";
import Image from "next/image";

const Hero = () => {
  const router = useRouter();
  const changeRoute = () => {
    router.replace("/Parser");
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 bg-black">
      <div className="w-full max-w-6xl rounded-xl p-8  mt-10 ">
        
        <div className="text-center mb-12">
          <h1 className="lg:text-7xl md:text-6xl font-bold text-white">
            Resume Parser AI
          </h1>
          <p className="text-xl  md:text-xl text-white mt-4 max-w-2xl mx-auto">
            Streamline your hiring process with intelligent resume parsing — analyze, score, and find the best candidates in seconds using AI.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <Image
            src="/chat_bot.svg"
            alt="AI Chatbot"
            width={400}
            height={400}
            className="object-contain"
          />
          <div className="flex justify-center mt-6 md:mt-0">
            <button
              onClick={changeRoute}
              className="px-8 py-4 bg-white text-black font-bold text-lg  rounded-md hover:bg-gray-200 transition duration-300 cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
