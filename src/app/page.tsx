'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Intro from './intro.tsx'
import Masonary from "./masonary.tsx"
import Slider from "./slider.tsx"


const App = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white items-center p-8">
      <Intro/>
      <Masonary />
      <Slider />
    </div>
  );
};

export default App;

