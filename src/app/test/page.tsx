"use client";

import { useState, useEffect } from "react";

const squares = [
  { id: "item-1", title: "Hi", color: "bg-red-500" },
  { id: "item-2", title: "Bye", color: "bg-green-500" },
  { id: "item-3", title: "hibye", color: "bg-yellow-500" },
];

const Slider = () => {
  const [selected, setSelected] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setSelected("item-1");
    setIsMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!isMounted) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen transition-colors duration-500 bg-blue-500">
      <div className="relative w-full max-w-xl h-96 flex justify-center items-center">
        {squares.map((square, index) => (
          <label
            key={square.id}
            className={`absolute transition-transform duration-500 cursor-pointer w-48 h-48 rounded-lg ${
              selected === square.id
                ? "transform scale-100 opacity-100 z-10"
                : index === squares.findIndex((s) => s.id === selected) - 1 ||
                  (index === squares.length - 1 && selected === squares[0].id)
                ? "transform translate-x-[-40%] scale-90 opacity-40"
                : "transform translate-x-[40%] scale-90 opacity-40"
            }`}
            onClick={() => setSelected(square.id)}
          >
            <div className={`w-full h-full ${square.color} rounded-lg`}></div>
          </label>
        ))}
      </div>

      {/* Title Display */}
      <div className="bg-white p-4 rounded-lg shadow-md w-80 mt-5">
        <div className="text-gray-800 text-2xl font-bold text-center">
          {squares.find((s) => s.id === selected)?.title}
        </div>
      </div>
    </div>
  );
}


export default Slider
