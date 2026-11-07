import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy, RotateCcw, Volume2, VolumeX, Maximize2, Minimize2, Eye, EyeOff, Zap } from 'lucide-react';
import { LetterCardType, LETTER_CARDS } from '../data/questions';
import { TeamScoreItem } from './Leaderboard';
import { sound } from '../utils/sound';
import { TeamAvatar } from './TeamAvatar';

export interface TileHistoryInfo {
  tileNumber: number;
  letter: LetterCardType;
  winnerTeamId?: string;
  winnerTeamName?: string;
  winnerTeamAvatar?: string;
  action?: 'keep' | 'give';
  points?: number;
  unanswered?: boolean;
}

interface BoardScreenProps {
  totalQuestions: number;
  openedTiles: Record<number, TileHistoryInfo>;
  tileLetters: Record<number, LetterCardType>;
  currentTurnTeam: TeamScoreItem;
  teams: TeamScoreItem[];
  onSelectTile: (tileNumber: number) => void;
  onOpenLeaderboard: () => void;
  onResetGame: () => void;
  isFullScreen: boolean;
  onToggleFullScreen: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onEndGame: () => void;
}

export const BoardScreen: React.FC<BoardScreenProps> = ({
  totalQuestions = 30,
  openedTiles,
  tileLetters,
  currentTurnTeam,
  teams,
  onSelectTile,
  onOpenLeaderboard,
  onResetGame,
  isFullScreen,
  onToggleFullScreen,
  soundEnabled,
  onToggleSound,
  onEndGame,
}) => {
  const [mcViewOpen, setMcViewOpen] = React.useState(false);

  const openedCount = Object.keys(openedTiles).length;
  const isFinished = openedCount >= totalQuestions;

  // Tìm đội dẫn đầu hiện tại để hiển thị vương miện
  const topTeam = [...teams].sort((a, b) => b.score - a.score)[0];

  const handleTileClick = (num: number) => {
    if (openedTiles[num]) return;
    sound.playFlip();
    onSelectTile(num);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 md:py-6 text-black">
      {/* Top Banner Lượt Chọn Ô - Chữ Đen To Rõ Nhìn Từ Xa */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6 bg-white border-3 border-pink-300 rounded-3xl p-5 md:p-6 shadow-md">
        {/* Lượt chọn ô của nhóm */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-pink-50 border-2 border-pink-300 p-1 flex items-center justify-center shadow-xs">
              <TeamAvatar
                avatar={currentTurnTeam.avatar}
                name={currentTurnTeam.name}
                size="lg"
                className="w-13 h-13 md:w-16 md:h-16"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 text-sm">✨</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs md:text-sm font-black uppercase tracking-wider text-white bg-black px-3 py-1 rounded-full shadow-2xs">
                LƯỢT CHỌN Ô TIẾP THEO
              </span>
              <span className="text-sm md:text-base font-black text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                (Đã mở: {openedCount}/{totalQuestions})
              </span>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
                {currentTurnTeam.name}
              </h2>
              <img
                src="assets/animals/tiger.png"
                alt="Cheering Tiger"
                className="w-10 h-10 object-contain filter drop-shadow-xs hidden sm:inline-block animate-float-slow"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Thanh công cụ và Top 1 Viền Điện Thật Lực */}
        <div className="flex flex-wrap items-center gap-2.5">
          {topTeam && (
            <button
              onClick={onOpenLeaderboard}
              className="relative p-[2.5px] rounded-2xl electric-beam-bg electric-border-box hover:scale-103 transition-transform cursor-pointer shadow-sm"
              title="Xem bảng xếp hạng"
            >
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-[13px] bg-gradient-to-r from-amber-50 via-white to-sky-50 text-black font-black text-sm md:text-base">
                <span className="text-base electric-spark">⚡</span>
                <TeamAvatar avatar={topTeam.avatar} name={topTeam.name} size="xs" className="w-6 h-6" />
                <span className="font-black text-black">{topTeam.name}</span>
                <span className="font-black text-rose-700 tabular-nums">({topTeam.score}đ)</span>
              </div>
            </button>
          )}

          <button
            onClick={onOpenLeaderboard}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-black hover:bg-slate-800 text-white font-black text-sm md:text-base transition-all shadow-xs cursor-pointer"
          >
            <Trophy className="w-5 h-5 text-amber-300" />
            <span>Bảng Xếp Hạng 11 Nhóm</span>
          </button>

          <button
            onClick={onToggleSound}
            className={`p-2.5 rounded-2xl border-2 transition-colors cursor-pointer ${
              soundEnabled ? 'bg-pink-100 text-black border-pink-300' : 'bg-slate-100 text-slate-400 border-slate-300'
            }`}
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          <button
            onClick={onToggleFullScreen}
            className="p-2.5 rounded-2xl bg-white border-2 border-slate-300 text-black hover:bg-slate-100 transition-colors cursor-pointer"
            title={isFullScreen ? 'Thu nhỏ' : 'Toàn màn hình máy chiếu'}
          >
            {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setMcViewOpen(!mcViewOpen)}
            className="p-2.5 rounded-2xl bg-white border-2 border-slate-300 text-black hover:bg-slate-100 transition-colors cursor-pointer"
            title="MC Soi ô bí mật"
          >
            {mcViewOpen ? <EyeOff className="w-5 h-5 text-purple-600" /> : <Eye className="w-5 h-5" />}
          </button>

          <button
            onClick={onResetGame}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white border-2 border-rose-300 text-rose-600 hover:bg-rose-50 font-black text-xs md:text-sm transition-colors cursor-pointer shadow-2xs"
            title="Reset toàn bộ trò chơi để làm lại từ đầu"
          >
            <RotateCcw className="w-4 h-4 text-rose-600" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* MC Secret Cheat View Banner */}
      {mcViewOpen && (
        <div className="mb-4 p-3.5 rounded-2xl bg-purple-100 border-2 border-purple-300 text-black text-sm flex items-center justify-between font-bold">
          <span>
            🕵️ Bảng soi ký tự bí mật dành riêng cho MC:
          </span>
          <span className="font-black text-black">
            W = +20, A = +10, B = -20, D = -10, E = +50
          </span>
        </div>
      )}

      {/* Grid 30 ô số W-A-B-D-E - Số to bự rõ nét nhìn từ xa */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-10 gap-3 md:gap-4">
        {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((tileNum) => {
          const opened = openedTiles[tileNum];
          const letter = tileLetters[tileNum] || 'W';
          const letterInfo = LETTER_CARDS[letter];

          if (opened) {
            // Ô đã mở
            return (
              <motion.div
                key={tileNum}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                className={`flex flex-col items-center justify-center p-2 rounded-3xl border-3 transition-all relative min-h-[105px] md:min-h-[120px] shadow-xs ${
                  opened.unanswered
                    ? 'bg-slate-200 border-slate-400 text-slate-500'
                    : `${letterInfo.badgeBg} text-black font-black`
                }`}
              >
                <span className="text-xs font-black text-black opacity-60 absolute top-2 left-2.5">
                  {tileNum}
                </span>

                <div className="text-3xl md:text-4xl font-black text-black mt-1">
                  {letter}
                </div>

                <div className="text-xs font-black uppercase text-black mt-0.5">
                  {opened.unanswered ? 'Bỏ qua' : letterInfo.name}
                </div>

                {opened.winnerTeamAvatar && (
                  <div className="flex items-center gap-1.5 mt-1.5 px-2 py-0.5 rounded-full bg-white text-xs font-black text-black shadow-2xs border border-slate-300">
                    <TeamAvatar avatar={opened.winnerTeamAvatar} size="xs" className="w-4 h-4" />
                    <span className="text-[10px] uppercase font-black">
                      {opened.action === 'give' ? 'CHO' : 'GIỮ'}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          }

          // Ô chưa mở - Số to bự màu đen đậm
          return (
            <motion.button
              key={tileNum}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => handleTileClick(tileNum)}
              className="group flex flex-col items-center justify-center p-3 rounded-3xl border-3 border-pink-300 bg-gradient-to-b from-white via-pink-50/60 to-pink-100/80 hover:border-black hover:shadow-lg transition-all cursor-pointer relative min-h-[105px] md:min-h-[120px]"
            >
              <div className="flex items-center justify-between w-full absolute top-2 px-3">
                <span className="text-xs font-black text-rose-400">✨</span>
                {mcViewOpen && (
                  <span className="text-xs font-black text-black bg-purple-200 px-1.5 py-0.5 rounded-md">
                    {letter}
                  </span>
                )}
              </div>

              <span className="text-3xl md:text-4xl lg:text-5xl font-black text-black tracking-tight group-hover:scale-110 transition-transform">
                {tileNum}
              </span>

              <span className="text-[11px] font-black text-black mt-1 uppercase tracking-wider opacity-70 group-hover:opacity-100">
                CHỌN Ô
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Thông báo kết thúc 30 câu */}
      {isFinished && (
        <div className="mt-8 text-center p-8 bg-gradient-to-r from-amber-100 via-rose-100 to-pink-100 border-3 border-amber-400 rounded-3xl shadow-md">
          <span className="text-5xl animate-crown block mb-3">👑</span>
          <h3 className="text-3xl md:text-4xl font-black text-black mb-2">
            ĐÃ HOÀN THÀNH TẤT CẢ 30 Ô SỐ CÂU HỎI!
          </h3>
          <p className="text-base md:text-lg text-black font-bold mb-6">
            Chúc mừng tất cả 11 nhóm đã tham gia thi đấu hết mình trong Quiz Arena!
          </p>
          <button
            onClick={onEndGame}
            className="px-10 py-4 rounded-full bg-black text-white font-black text-xl shadow-lg hover:scale-103 transition-transform cursor-pointer"
          >
            🏆 XEM LỄ TRAO GIẢI QUÁN QUÂN
          </button>
        </div>
      )}
    </div>
  );
};
