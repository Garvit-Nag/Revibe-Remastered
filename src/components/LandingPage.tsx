"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { AudioLines } from "lucide-react";
import { useState } from "react";
import Preloader from "./Preloader";
import router from "next/router";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isLoading) {
      timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 5000); // 5 second timeout
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLoading]);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await router.push("/recommendations");
    } catch (error) {
      console.error("Navigation error:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <HeroHighlight className="">
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto flex flex-col items-center gap-4"
      >
        <div>
          Get in the groove with <br />
          <Highlight className="text-black dark:text-white">Revibe</Highlight>
          <br />
          where your next favorite track awaits.
        </div>
        <Button
  className="flex items-center gap-2 bg-white hover:bg-gray-200 text-black text-sm px-4 py-1.5 rounded-xl transition-transform hover:scale-110 backface-visibility-hidden transform-gpu"
  href="/recommendations"
  as={Link}
  onClick={handleClick}
>
  <div className="bg-black rounded-full p-1">
    <AudioLines className="w-4 h-4 text-white" />
  </div>
  Find Your Vibe
</Button>
      </motion.h1>
    </HeroHighlight>
  );
};


export default LandingPage;