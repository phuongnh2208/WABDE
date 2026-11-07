import React from 'react';
import { motion } from 'motion/react';

export const WalkingAnimals: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none">
      {/* GÓC TRÊN BÊN TRÁI (ngoài lề nội dung): Gấu trúc đỏ quàng khăn */}
      <motion.div
        animate={{
          y: [0, -6, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-16 left-3 hidden xl:flex flex-col items-center opacity-85"
      >
        <img
          src="assets/animals/redpanda.png"
          alt="Cute Red Panda"
          className="w-14 h-16 sm:w-16 sm:h-19 object-contain filter drop-shadow-sm"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </motion.div>

      {/* GÓC TRÊN BÊN PHẢI (ngoài lề nội dung): Chuột Hamster đáng yêu */}
      <motion.div
        animate={{
          y: [0, -7, 0],
          rotate: [2, -2, 2],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-16 right-3 hidden xl:flex flex-col items-center opacity-85"
      >
        <img
          src="assets/animals/hamster.png"
          alt="Cute Hamster"
          className="w-14 h-16 sm:w-16 sm:h-19 object-contain filter drop-shadow-sm"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </motion.div>

      {/* CẠNH GIỮA BÊN TRÁI: Chú hổ con tinh anh */}
      <motion.div
        animate={{
          y: [-5, 5, -5],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 -translate-y-1/2 left-2 hidden 2xl:flex flex-col items-center opacity-80"
      >
        <img
          src="assets/animals/tiger.png"
          alt="Cute Tiger"
          className="w-14 h-16 sm:w-16 sm:h-19 object-contain filter drop-shadow-sm"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </motion.div>

      {/* CẠNH GIỮA BÊN PHẢI: Chú cừu cầm táo */}
      <motion.div
        animate={{
          y: [5, -5, 5],
          rotate: [3, -3, 3],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 -translate-y-1/2 right-2 hidden 2xl:flex flex-col items-center opacity-80"
      >
        <img
          src="assets/animals/sheep.png"
          alt="Cute Sheep"
          className="w-14 h-16 sm:w-16 sm:h-19 object-contain filter drop-shadow-sm"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </motion.div>
    </div>
  );
};
