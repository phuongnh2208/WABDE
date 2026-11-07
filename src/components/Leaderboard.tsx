import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, RotateCcw, Zap } from 'lucide-react';
import { TeamPreset } from '../data/stickers';
import { TeamAvatar } from './TeamAvatar';

export interface TeamScoreItem {
  id: string;
  name: string;
  score: number;
  avatar: string;
  preset: TeamPreset;
  recentChange?: number;
}

interface LeaderboardProps {
  teams: TeamScoreItem[];
  onContinue?: () => void;
  continueText?: string;
  showContinueButton?: boolean;
  onResetGame?: () => void;
  title?: string;
  subtitle?: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  teams,
  onContinue,
  continueText = 'Tiếp tục lượt chơi mới',
  showContinueButton = true,
  onResetGame,
  title = 'Bảng Xếp Hạng 11 Nhóm',
  subtitle = 'Tự động cập nhật thứ hạng theo điểm số thực tế'
}) => {
  // Sắp xếp các nhóm từ điểm cao xuống điểm thấp.
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  // Xác định vị trí đồng hạng
  const getRankCategory = (currentTeam: TeamScoreItem) => {
    const uniqueScores = Array.from(new Set(sortedTeams.map(t => t.score)));
    const scoreRank = uniqueScores.indexOf(currentTeam.score);

    if (scoreRank === 0) return 'gold';      // Top 1
    if (scoreRank === 1) return 'silver';    // Top 2
    if (scoreRank === 2) return 'bronze';    // Top 3
    return 'other';
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-6 text-black">
      {/* Header với phong cách Anime 2D Pastel - Chữ To Rõ */}
      <div className="text-center mb-8 relative">
        {/* Con vật nhỏ trang trí chỗ trống góc trên */}
        <div className="absolute -top-3 left-2 sm:left-8 hidden sm:flex items-center gap-1.5 opacity-90">
          <img
            src="assets/animals/chick.png"
            alt="Cute Chick"
            className="w-12 h-12 object-contain filter drop-shadow-sm animate-float-slow"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -top-3 right-2 sm:right-8 hidden sm:flex items-center gap-1.5 opacity-90">
          <img
            src="assets/animals/sheep.png"
            alt="Cute Sheep"
            className="w-12 h-12 object-contain filter drop-shadow-sm animate-float-reverse"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border-2 border-pink-300 text-black text-sm md:text-base font-black mb-3 shadow-xs">
          <Sparkles className="w-5 h-5 text-rose-500 animate-twinkle" />
          <span>BẢNG XẾP HẠNG 11 NHÓM THI ĐẤU (NHÓM 2, 3, 5 – 13)</span>
          <Sparkles className="w-5 h-5 text-rose-500 animate-twinkle" />
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight flex items-center justify-center gap-3">
          <span className="text-4xl animate-float-slow">⚡</span>
          {title}
          <span className="text-4xl animate-float-reverse">🏆</span>
        </h2>
        <p className="text-black text-base md:text-xl font-bold mt-2">
          {subtitle}
        </p>
      </div>

      {/* Danh sách 11 nhóm - Bỏ tên biệt danh, thay thế icon bằng ảnh động vật nhỏ cute, viền điện thật lực cho Top 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <AnimatePresence>
          {sortedTeams.map((team) => {
            const rankCategory = getRankCategory(team);

            if (rankCategory === 'gold') {
              // TOP 1: HIỆU ỨNG VIỀN ĐIỆN THẬT LỰC VÀ GỌN GÀNG
              return (
                <motion.div
                  key={team.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  className="relative p-[3px] rounded-3xl electric-beam-bg electric-border-box transition-all"
                >
                  <div className="flex items-center justify-between p-4 md:p-5 rounded-[21px] bg-gradient-to-r from-yellow-50 via-white to-sky-50 transition-all">
                    {/* Ảnh động vật nhỏ cute của nhóm dẫn đầu */}
                    <div className="flex items-center gap-3.5">
                      <div className="relative shrink-0">
                        <div className="w-15 h-15 md:w-17 md:h-17 rounded-2xl bg-white border-2 border-sky-400 p-1 flex items-center justify-center shadow-sm">
                          <TeamAvatar
                            avatar={team.avatar}
                            name={team.name}
                            size="lg"
                            className="w-13 h-13 md:w-15 md:h-15 hover:scale-110 transition-transform"
                          />
                        </div>
                        {/* Tia sét điện năng động */}
                        <div className="absolute -top-2 -right-1 text-base z-10 electric-spark">
                          ⚡
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-2xl md:text-3xl text-black tracking-tight">
                            {team.name}
                          </span>
                          <span className="text-xs md:text-sm font-black px-3 py-1 rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 text-black border border-amber-400 shadow-xs flex items-center gap-1.5 animate-pulse">
                            <Zap className="w-3.5 h-3.5 fill-black text-black" />
                            <span>DẪN ĐẦU</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Điểm số - To Rõ Ràng */}
                    <div className="flex items-center gap-3 shrink-0">
                      {team.recentChange !== undefined && team.recentChange !== 0 && (
                        <motion.span
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className={`text-sm md:text-base font-black px-3 py-1 rounded-xl shadow-2xs ${
                            team.recentChange > 0
                              ? 'bg-emerald-100 text-black border-2 border-emerald-400'
                              : 'bg-rose-100 text-black border-2 border-rose-400'
                          }`}
                        >
                          {team.recentChange > 0 ? `+${team.recentChange}` : team.recentChange}
                        </motion.span>
                      )}
                      <div className="text-right">
                        <span className="text-3xl md:text-4xl font-black text-black tracking-tight tabular-nums">
                          {team.score}
                        </span>
                        <span className="text-xs md:text-sm font-black text-black ml-1">
                          điểm
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }

            // Các nhóm hạng khác (Top 2 Bạc, Top 3 Đồng, và các nhóm còn lại)
            let cardBg = '';
            let avatarBoxBg = '';
            let tagBadge = '';

            if (rankCategory === 'silver') {
              cardBg = 'bg-gradient-to-r from-slate-100 via-zinc-50 to-slate-100 border-3 border-slate-400 shadow-xs animate-shimmer-sweep';
              avatarBoxBg = 'bg-white border-2 border-slate-400';
              tagBadge = 'HẠNG 2';
            } else if (rankCategory === 'bronze') {
              cardBg = 'bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100 border-3 border-amber-600/40 shadow-xs animate-shimmer-sweep-bronze';
              avatarBoxBg = 'bg-white border-2 border-amber-500';
              tagBadge = 'HẠNG 3';
            } else {
              cardBg = 'bg-white border-2 border-slate-200 hover:border-slate-300 shadow-2xs';
              avatarBoxBg = 'bg-slate-50 border-2 border-slate-200';
              tagBadge = '';
            }

            return (
              <motion.div
                key={team.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                className={`flex items-center justify-between p-4 md:p-5 rounded-3xl transition-all ${cardBg}`}
              >
                {/* Ảnh động vật nhỏ cute */}
                <div className="flex items-center gap-3.5">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${avatarBoxBg} p-1 flex items-center justify-center shrink-0 shadow-xs`}>
                    <TeamAvatar
                      avatar={team.avatar}
                      name={team.name}
                      size="lg"
                      className="w-12 h-12 md:w-14 md:h-14 hover:scale-105 transition-transform"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xl md:text-2xl text-black tracking-tight">
                        {team.name}
                      </span>
                      {tagBadge && (
                        <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                          rankCategory === 'silver' ? 'bg-slate-300 text-black' : 'bg-orange-300 text-black'
                        }`}>
                          {tagBadge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Điểm số - To Rõ Ràng */}
                <div className="flex items-center gap-3 shrink-0">
                  {team.recentChange !== undefined && team.recentChange !== 0 && (
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`text-sm md:text-base font-black px-3 py-1 rounded-xl shadow-2xs ${
                        team.recentChange > 0
                          ? 'bg-emerald-100 text-black border-2 border-emerald-400'
                          : 'bg-rose-100 text-black border-2 border-rose-400'
                      }`}
                    >
                      {team.recentChange > 0 ? `+${team.recentChange}` : team.recentChange}
                    </motion.span>
                  )}
                  <div className="text-right">
                    <span className="text-3xl md:text-4xl font-black text-black tracking-tight tabular-nums">
                      {team.score}
                    </span>
                    <span className="text-xs md:text-sm font-black text-black ml-1">
                      điểm
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Nút hành động */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        {showContinueButton && onContinue && (
          <button
            onClick={onContinue}
            className="flex items-center gap-3 px-10 py-4 rounded-full bg-black hover:bg-slate-800 text-white font-black text-lg md:text-xl shadow-lg hover:scale-103 transition-all cursor-pointer ring-4 ring-slate-300"
          >
            <span>{continueText}</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        )}

        {onResetGame && (
          <button
            onClick={onResetGame}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border-2 border-rose-300 text-rose-700 hover:bg-rose-50 font-black text-base shadow-xs transition-all cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 text-rose-600" />
            <span>Reset Toàn Bộ Tiến Độ Trò Chơi</span>
          </button>
        )}
      </div>
    </div>
  );
};
