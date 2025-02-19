"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const items = [
  { id: 1, text: "Item 1", description: "hello bye hellobye" },
  { id: 2, text: "Item 2", description: "hello bye hellobye" },
  { id: 3, text: "Item 3", description: "hello bye hellobye" },
  { id: 4, text: "Item 4", description: "hello bye hellobye" },
  { id: 5, text: "Item 5", description: "hello bye hellobye" },
  { id: 6, text: "Item 6", description: "hello bye hellobye" },
  { id: 7, text: "Item 7", description: "hello bye hellobye" },
  { id: 8, text: "Item 8", description: "hello bye hellobye" },
  { id: 9, text: "Item 9", description: "hello bye hellobye" },
];

export default function Slider() {
  const [selected, setSelected] = useState<number | null>(null);
  const [cyclingComplete, setCyclingComplete] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      let index = 0;
      let direction = 1;
      let cycles = 0;
      let intervalTime = 100;
      let interval: any;

      const updateSlider = () => {
        setSelected(items[index].id);
        index += direction;

        if (index === items.length - 1 || index === 0) {
          direction *= -1;
          cycles++;
          intervalTime *= 1.2;
        }

        if (cycles < 2) {
          interval = setTimeout(updateSlider, intervalTime);
        } else {
          setCyclingComplete(true);
        }
      };

      interval = setTimeout(updateSlider, intervalTime);
      return () => clearTimeout(interval);
    }
  }, [inView]);

  return (
    <div>
      <div
        ref={ref}
        className="flex flex-col items-center justify-center h-screen overflow-hidden"
      >
        <div className="relative flex space-x-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => cyclingComplete && setSelected(item.id)}
              initial={{ scale: 0.9, opacity: 0.7 }}
              animate={{
                scale: selected === item.id ? 1.2 : 0.9,
                opacity: selected === item.id ? 1 : 0.7,
                zIndex: selected === item.id ? 10 : 1,
                filter: selected === item.id ? "none" : "blur(2px)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-40 h-40 bg-blue-500 text-white flex items-center justify-center cursor-pointer rounded-lg shadow-lg"
            >
              {item.text}
            </motion.div>
          ))}
        </div>

        <div className="h-12 mt-5 flex items-center">
          {cyclingComplete && selected !== null && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-lg font-semibold text-gray-700 bg-white px-4 py-2 rounded-lg shadow-md"
            >
              {items.find((item) => item.id === selected)?.description}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
