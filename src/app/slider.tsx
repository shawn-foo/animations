"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight } from "lucide-react";

const squares = [
  { id: "item-1", title: "Hi", color: "bg-purple-600" },
  { id: "item-2", title: "Bye", color: "bg-blue-700" },
  { id: "item-3", title: "hibye", color: "bg-indigo-500" },
];

const Slider = () => {
  const [selected, setSelected] = useState("item-1");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        setSelected(squares[1].id);
        setTimeout(() => setSelected(squares[2].id), 1000);
      }, 1000);
    }
  }, [inView]);

  const handlePrev = () => {
    const currentIndex = squares.findIndex((s) => s.id === selected);
    const prevIndex = (currentIndex - 1 + squares.length) % squares.length;
    setSelected(squares[prevIndex].id);
  };

  const handleNext = () => {
    const currentIndex = squares.findIndex((s) => s.id === selected);
    const nextIndex = (currentIndex + 1) % squares.length;
    setSelected(squares[nextIndex].id);
  };

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 transition-all duration-1000"
    >
      <div className="relative w-full max-w-xl h-96 flex justify-center items-center overflow-hidden">
        {/* Left Button */}
        <button
          className="absolute left-5 z-20 bg-white p-4 rounded-full shadow-lg hover:bg-gray-200 transition"
          onClick={handlePrev}
        >
          <ChevronLeft size={32} />
        </button>

        {squares.map((square, index) => (
          <motion.div
            key={square.id}
            animate={{
              scale: selected === square.id ? 1 : 0.85,
              x:
                index === squares.findIndex((s) => s.id === selected) - 1 ||
                (index === squares.length - 1 && selected === squares[0].id)
                  ? "-50%"
                  : index === squares.findIndex((s) => s.id === selected) + 1 ||
                    (index === 0 && selected === squares[squares.length - 1].id)
                  ? "50%"
                  : "0%",
            }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="absolute transition-transform cursor-pointer w-48 h-48 rounded-lg"
          >
            <div className={`w-full h-full ${square.color} rounded-lg shadow-2xl`}></div>
          </motion.div>
        ))}

        {/* Right Button */}
        <button
          className="absolute right-5 z-20 bg-white p-4 rounded-full shadow-lg hover:bg-gray-200 transition"
          onClick={handleNext}
        >
          <ChevronRight size={32} />
        </button>
      </div>

      <motion.div
        className="bg-white p-5 rounded-lg shadow-md w-80 mt-5"
        animate={{ y: 0 }}
        initial={{ y: 20 }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
      >
        <div className="text-gray-800 text-2xl font-bold text-center">
          {squares.find((s) => s.id === selected)?.title}
        </div>
      </motion.div>
    </div>
  );
};

export default Slider;

