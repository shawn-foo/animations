'use client'

import { motion } from 'framer-motion';
import { useMemo } from 'react';

const Intro = () => {
  const longText = useMemo(() => [
    { title: 'Welcome', content: 'Blorp zindle frizz quonk miffle torp...' },
    { title: 'Discover', content: 'Snorf blibble greep twazzle frumpt borkle...' },
    { title: 'Explore', content: 'Wizzle tromp dwoop flizzle blomp krindle...' },
  ], []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold mb-12 text-center"
      >
        Hello, I am Shawn
      </motion.h1>

      <div className="space-y-12 w-full max-w-5xl">
        {longText.map((d, i) => (
          <motion.div
            key={d.title} // Use stable key instead of index
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gray-800 rounded-2xl shadow-xl"
          >
            <div className="w-full md:w-1/3 h-48 bg-gray-700 rounded-xl flex items-center justify-center text-gray-400 text-lg">
              Placeholder
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <h2 className="text-3xl font-semibold mb-3 text-blue-400">{d.title}</h2>
              <p className="text-gray-300 leading-relaxed">{d.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Intro;

