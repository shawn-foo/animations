import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Masonary = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="columns-5 gap-4"
      >
        {Array(21)
          .fill(null)
          .map((_, index) => {
            // ens visible first row
            const isFirstRow = index < 5;
            const minHeight = isFirstRow ? 150 : 100; // Minimum height for first row
            const randomHeight = Math.floor(Math.random() * 100) + minHeight;

            return (
              <motion.div
                key={index}
                className="rounded-xl shadow-xl cursor-pointer bg-gray-400 border-2 border-gray-700 w-full inline-block"
                style={{ height: `${randomHeight}px` }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={visible ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              />
            );
          })}
      </motion.div>
      <div className="h-10" /> {/* Extra space to ensure the last row is visible */}
    </div>
  );
};

export default Masonary;

