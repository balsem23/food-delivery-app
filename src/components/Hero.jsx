import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function Hero() {
  const fullText = 'The Best Food for Your Taste';
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/48566ccd8b479a3ca52f3238ef8621a3.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0" />

      {/* Centered content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <motion.div
          className="text-center text-white max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className="text-5xl md:text-7xl font-bold whitespace-nowrap">
            {displayedText}
            <span className="border-r-2 border-yellow-400 animate-pulse ml-1" />
          </h1>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
