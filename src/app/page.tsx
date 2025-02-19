'use client';

import Intro from './intro'
import Masonary from "./masonary"
import Slider from "./slider"


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

