import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Crown, Medal, Award, RotateCcw, Sparkles, Trophy, Zap } from 'lucide-react';
import { TeamScoreItem } from './Leaderboard';
import { sound } from '../utils/sound';
import { TeamAvatar } from './TeamAvatar';

interface GameOverScreenProps {
  teams: TeamScoreItem[];
  onRestartGame: () => void;
  onViewBoard: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  teams,
  onRestartGame,
  onViewBoard,
}) => {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const champion = sortedTeams[0];
  const runnerUp = sortedTeams[1];
  const thirdPlace = sortedTeams[2];

  useEffect(() => {
    sound.playFanfare();
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#F472B6', '#FBBF24', '#38BDF8', '#4ADE80', '#A78BFA'],
      });
      const timer = setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
        });
      }, 500);
      return () => clearTimeout(timer);
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 text-center text-black">
      {/* Banner Vinh danh Quán Quân */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative p-6 md:p-12 rounded-3xl bg-gradient-to-b from-amber-100 via-yellow-50 to-white border-4 border-amber-400 shadow-xl mb-8 overflow-hidden"
      >
        <span className="absolute -top-2 left-6 text-4xl animate-float-slow">✨</span>
        <span className="absolute -top-2 right-6 text-4xl animate-float-reverse">🎉</span>

        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-amber-200 border-2 border-amber-400 text-black font-black text-sm md:text-base mb-4 shadow-xs">
          <Crown className="w-5 h-5 text-black animate-crown" />
          <span>LỄ TRAO GIẢI QUIZ ARENA 11 NHÓM</span>
          <Crown className="w-5 h-5 text-black animate-crown" />
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight mb-3">
          CHÚC MỪNG QUÁN QUÂN ĐẤU TRƯỜNG!
        </h1>

        <p className="text-base md:text-xl text-black font-bold mb-8">
          Vinh danh các nhóm xuất sắc nhất trong 30 câu hỏi thử thách cam go
        </p>

        {/* Podium Top 3 */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 items-end max-w-3xl mx-auto pt-6 pb-2">
          {/* Top 2 - Huy Chương Bạc */}
          {runnerUp && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white border-2 border-slate-300 p-1 flex items-center justify-center shadow-xs mb-1">
                <TeamAvatar avatar={runnerUp.avatar} name={runnerUp.name} size="lg" className="w-14 h-14 md:w-16 md:h-16" />
              </div>
              <div className="font-black text-base md:text-xl text-black truncate max-w-full">
                {runnerUp.name}
              </div>
              <div className="text-lg md:text-2xl font-black text-black tabular-nums">
                {runnerUp.score}đ
              </div>
              <div className="w-full h-28 md:h-36 rounded-t-3xl bg-gradient-to-t from-slate-300 to-slate-100 border-3 border-b-0 border-slate-400 flex flex-col items-center justify-center p-2 shadow-xs mt-2 animate-shimmer-sweep">
                <Medal className="w-8 h-8 text-black mb-1" />
                <span className="text-xs md:text-sm font-black text-black">TOP 2</span>
                <span className="text-[10px] md:text-xs font-black text-slate-700">HUY CHƯƠNG BẠC</span>
              </div>
            </motion.div>
          )}

          {/* Top 1 - Viền điện Quán Quân thật lực & gọn gàng */}
          {champion && (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-2">
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-2xl electric-spark z-10">⚡</span>
                <div className="p-[2.5px] rounded-3xl electric-beam-bg electric-border-box">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-[21px] bg-white border border-sky-300 p-1.5 flex items-center justify-center shadow-md">
                    <TeamAvatar avatar={champion.avatar} name={champion.name} size="xl" className="w-16 h-16 md:w-20 md:h-20" />
                  </div>
                </div>
              </div>
              <div className="font-black text-lg md:text-2xl text-black truncate max-w-full">
                {champion.name}
              </div>
              <div className="text-2xl md:text-3xl font-black text-rose-600 tabular-nums">
                {champion.score}đ
              </div>
              <div className="w-full h-36 md:h-48 rounded-t-3xl bg-gradient-to-t from-amber-300 via-amber-200 to-yellow-100 border-4 border-b-0 border-amber-500 flex flex-col items-center justify-center p-2 shadow-lg mt-2 ring-3 ring-amber-300">
                <Zap className="w-10 h-10 text-black mb-1 fill-black animate-bounce" />
                <span className="text-sm md:text-base font-black text-black">QUÁN QUÂN</span>
                <span className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-1">
                  <span>⚡</span> VIỀN ĐIỆN VÀNG <span>⚡</span>
                </span>
              </div>
            </motion.div>
          )}

          {/* Top 3 - Huy Chương Đồng */}
          {thirdPlace && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white border-2 border-amber-300 p-1 flex items-center justify-center shadow-xs mb-1">
                <TeamAvatar avatar={thirdPlace.avatar} name={thirdPlace.name} size="lg" className="w-14 h-14 md:w-16 md:h-16" />
              </div>
              <div className="font-black text-base md:text-xl text-black truncate max-w-full">
                {thirdPlace.name}
              </div>
              <div className="text-lg md:text-2xl font-black text-black tabular-nums">
                {thirdPlace.score}đ
              </div>
              <div className="w-full h-22 md:h-28 rounded-t-3xl bg-gradient-to-t from-orange-200 to-amber-100 border-3 border-b-0 border-amber-600/40 flex flex-col items-center justify-center p-2 shadow-2xs mt-2 animate-shimmer-sweep-bronze">
                <Award className="w-8 h-8 text-black mb-1" />
                <span className="text-xs md:text-sm font-black text-black">TOP 3</span>
                <span className="text-[10px] md:text-xs font-black text-amber-900">HUY CHƯƠNG ĐỒNG</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Nút hành động */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={onViewBoard}
          className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border-2 border-slate-300 text-black font-black text-base shadow-xs hover:bg-slate-50 cursor-pointer"
        >
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>Xem lại bàn cờ 30 ô</span>
        </button>

        <button
          onClick={onRestartGame}
          className="flex items-center gap-2 px-10 py-4 rounded-full bg-black hover:bg-slate-800 text-white font-black text-lg shadow-lg hover:scale-103 transition-transform cursor-pointer ring-4 ring-slate-300"
        >
          <RotateCcw className="w-6 h-6" />
          <span>RESET TOÀN BỘ TIẾN ĐỘ TRÒ CHƠI</span>
        </button>
      </div>
    </div>
  );
};
