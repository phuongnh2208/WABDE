import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Users, Play, HelpCircle, Shield, Award, Plus, Trash2 } from 'lucide-react';
import { LETTER_CARDS, LetterCardType } from '../data/questions';
import { TEAM_PRESETS, TeamPreset } from '../data/stickers';
import { sound } from '../utils/sound';
import { TeamAvatar } from './TeamAvatar';

export interface SetupTeamData {
  id: string;
  name: string;
  avatar: string;
  preset: TeamPreset;
}

interface WelcomeScreenProps {
  onStartGame: (teams: SetupTeamData[]) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartGame }) => {
  // Mặc định đầy đủ 11 nhóm (Nhóm 2, 3, 5 - 13, không có nhóm 1 và 4)
  const [selectedTeams, setSelectedTeams] = useState<SetupTeamData[]>(() =>
    TEAM_PRESETS.map((preset) => ({
      id: preset.id,
      name: preset.name,
      avatar: preset.avatar,
      preset: preset,
    }))
  );

  const [activeTab, setActiveTab] = useState<'setup' | 'rules'>('setup');

  const handleAddTeam = () => {
    if (selectedTeams.length >= 16) return;
    sound.playClick();
    const nextIndex = selectedTeams.length;
    const preset = TEAM_PRESETS[nextIndex % TEAM_PRESETS.length];
    const newTeam: SetupTeamData = {
      id: `team-${Date.now()}`,
      name: `Nhóm ${nextIndex + 1}`,
      avatar: preset.avatar,
      preset: preset,
    };
    setSelectedTeams([...selectedTeams, newTeam]);
  };

  const handleRemoveTeam = (id: string) => {
    if (selectedTeams.length <= 2) return;
    sound.playClick();
    setSelectedTeams(selectedTeams.filter(t => t.id !== id));
  };

  const handleUpdateName = (id: string, newName: string) => {
    setSelectedTeams(selectedTeams.map(t => t.id === id ? { ...t, name: newName } : t));
  };

  const handleUpdateAvatar = (id: string, avatar: string, preset: TeamPreset) => {
    sound.playClick();
    setSelectedTeams(selectedTeams.map(t => t.id === id ? { ...t, avatar, preset } : t));
  };

  const handleStart = () => {
    sound.playCorrect();
    onStartGame(selectedTeams);
  };

  const letterKeys: LetterCardType[] = ['W', 'A', 'B', 'D', 'E'];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 text-black">
      {/* Hero Banner Anime Pastel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center relative bg-gradient-to-b from-pink-100/80 via-rose-50/60 to-white/95 border-3 border-pink-300 rounded-3xl p-6 md:p-10 shadow-sm mb-8 overflow-hidden"
      >
        {/* Chú gấu trúc đỏ và hamster từ ảnh mẫu ở các góc trống */}
        <img
          src="assets/animals/redpanda.png"
          alt="Cute Red Panda"
          className="absolute top-4 left-6 w-14 h-14 object-contain filter drop-shadow-sm animate-float-slow select-none hidden sm:block"
          referrerPolicy="no-referrer"
        />
        <img
          src="assets/animals/hamster.png"
          alt="Cute Hamster"
          className="absolute top-4 right-6 w-14 h-14 object-contain filter drop-shadow-sm animate-float-reverse select-none hidden sm:block"
          referrerPolicy="no-referrer"
        />
        <img
          src="assets/animals/tiger.png"
          alt="Cute Tiger"
          className="absolute bottom-4 left-6 w-14 h-14 object-contain filter drop-shadow-sm animate-float-reverse select-none hidden md:block"
          referrerPolicy="no-referrer"
        />
        <img
          src="assets/animals/chick.png"
          alt="Cute Chick"
          className="absolute bottom-4 right-6 w-14 h-14 object-contain filter drop-shadow-sm animate-float-slow select-none hidden md:block"
          referrerPolicy="no-referrer"
        />

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border-2 border-pink-300 text-black text-sm md:text-base font-black mb-3 shadow-xs">
          <Sparkles className="w-5 h-5 text-rose-500 animate-twinkle" />
          <span>QUIZ ARENA W – A – B – D – E · 11 NHÓM (2, 3, 5 – 13)</span>
          <Sparkles className="w-5 h-5 text-rose-500 animate-twinkle" />
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight mb-3">
          ĐẤU TRƯỜNG <span className="text-rose-600">30 CÂU HỎI</span>
        </h1>

        <p className="max-w-3xl mx-auto text-black text-base md:text-xl font-bold leading-relaxed">
          11 nhóm thi đấu luân phiên (Nhóm 2, 3, 5 đến 13). Nhóm chính trả lời sai, các nhóm còn lại được giành tối đa 3 lượt!
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => { sound.playClick(); setActiveTab('setup'); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-base md:text-lg transition-all cursor-pointer ${
              activeTab === 'setup'
                ? 'bg-black text-white shadow-md scale-105'
                : 'bg-white text-black border-2 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Danh Sách 11 Nhóm Thi Đấu</span>
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('rules'); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-base md:text-lg transition-all cursor-pointer ${
              activeTab === 'rules'
                ? 'bg-black text-white shadow-md scale-105'
                : 'bg-white text-black border-2 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            <span>Luật Chơi & Ký Tự Điểm</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      {activeTab === 'setup' ? (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white/90 p-4 rounded-3xl border-2 border-pink-200">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-black">
                11 Nhóm Tham Gia ({selectedTeams.length} nhóm)
              </h2>
              <p className="text-sm md:text-base text-black font-semibold mt-1">
                Lượt câu hỏi sẽ lần lượt đi qua 11 nhóm (Nhóm 2, 3, 5 - 13) theo thứ tự xoay vòng.
              </p>
            </div>
            {selectedTeams.length < 16 && (
              <button
                onClick={handleAddTeam}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-base transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-5 h-5" />
                <span>Thêm nhóm</span>
              </button>
            )}
          </div>

          {/* Grid 11 Nhóm to rõ dễ nhìn từ xa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {selectedTeams.map((team, idx) => (
              <div
                key={team.id}
                className={`p-4 rounded-3xl border-2 ${team.preset.borderColor} ${team.preset.lightBg} shadow-xs transition-all relative`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 p-1 bg-white rounded-2xl shadow-xs border border-slate-200 flex items-center justify-center shrink-0">
                      <TeamAvatar
                        avatar={team.avatar}
                        name={team.name}
                        size="md"
                        className="w-10 h-10"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-black text-black uppercase tracking-wider block">
                        Lượt #{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={team.name}
                        onChange={(e) => handleUpdateName(team.id, e.target.value)}
                        className="font-black text-black text-lg md:text-xl bg-transparent border-b-2 border-slate-400 focus:border-rose-600 focus:outline-hidden w-28 md:w-32"
                      />
                    </div>
                  </div>

                  {selectedTeams.length > 2 && (
                    <button
                      onClick={() => handleRemoveTeam(team.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-white transition-colors cursor-pointer"
                      title="Xóa nhóm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Ký tự bí mật W-A-B-D-E */}
          <div className="bg-white border-2 border-pink-200 rounded-3xl p-6 shadow-xs">
            <h3 className="text-lg md:text-xl font-black text-black mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-rose-500" />
              <span>BẢNG KÝ TỰ BÍ MẬT W – A – B – D – E</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {letterKeys.map((k) => {
                const info = LETTER_CARDS[k];
                return (
                  <div
                    key={k}
                    className={`p-4 rounded-2xl border-2 text-center ${info.badgeBg}`}
                  >
                    <div className="text-3xl mb-1">{info.icon}</div>
                    <div className="font-black text-lg text-black">{info.type} - {info.name}</div>
                    <div className="font-black text-xl text-black mt-1">{info.description}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nút Khởi động Game */}
          <div className="text-center pt-4">
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-3 px-12 py-5 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-rose-500 text-white font-black text-xl md:text-2xl shadow-xl hover:scale-103 active:scale-98 transition-all cursor-pointer ring-4 ring-rose-200"
            >
              <Play className="w-7 h-7 fill-white" />
              <span>BẮT ĐẦU ĐẤU TRƯỜNG 11 NHÓM</span>
            </button>
          </div>
        </div>
      ) : (
        /* Tab Luật Chơi Chi Tiết */
        <div className="bg-white border-3 border-pink-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 text-black">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-2 flex items-center gap-3">
              <Award className="w-8 h-8 text-rose-500" />
              <span>LUẬT CHƠI ĐẤU TRƯỜNG 11 NHÓM (W – A – B – D – E)</span>
            </h2>
            <p className="text-base md:text-lg text-black font-semibold">
              30 câu hỏi về Pháp luật CNTT & Sở hữu trí tuệ, 11 nhóm thi đấu theo thứ tự luân phiên (Nhóm 2, 3, 5 đến 13).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-base border-collapse rounded-2xl overflow-hidden border-2 border-slate-200">
              <thead>
                <tr className="bg-slate-100 text-black font-black text-lg">
                  <th className="p-3.5 border-b border-slate-300">Ký tự</th>
                  <th className="p-3.5 border-b border-slate-300">Tên gọi</th>
                  <th className="p-3.5 border-b border-slate-300">Điểm số</th>
                  <th className="p-3.5 border-b border-slate-300">Ý nghĩa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-bold text-black">
                <tr className="bg-sky-50/70">
                  <td className="p-3.5 font-black text-2xl text-black">W</td>
                  <td className="p-3.5">WOW</td>
                  <td className="p-3.5 font-black text-xl text-black">+20 điểm</td>
                  <td className="p-3.5">✨ Phước lành bùng nổ</td>
                </tr>
                <tr className="bg-emerald-50/70">
                  <td className="p-3.5 font-black text-2xl text-black">A</td>
                  <td className="p-3.5">ANGEL</td>
                  <td className="p-3.5 font-black text-xl text-black">+10 điểm</td>
                  <td className="p-3.5">👼 Thiên thần che chở</td>
                </tr>
                <tr className="bg-rose-50/70">
                  <td className="p-3.5 font-black text-2xl text-black">B</td>
                  <td className="p-3.5">BOOM</td>
                  <td className="p-3.5 font-black text-xl text-black">-20 điểm</td>
                  <td className="p-3.5">💣 Bom nổ trừ điểm</td>
                </tr>
                <tr className="bg-purple-50/70">
                  <td className="p-3.5 font-black text-2xl text-black">D</td>
                  <td className="p-3.5">DEVIL</td>
                  <td className="p-3.5 font-black text-xl text-black">-10 điểm</td>
                  <td className="p-3.5">😈 Ác quỷ nghịch ngợm</td>
                </tr>
                <tr className="bg-amber-50/70">
                  <td className="p-3.5 font-black text-2xl text-black">E</td>
                  <td className="p-3.5">EXTRA</td>
                  <td className="p-3.5 font-black text-xl text-black">+50 điểm</td>
                  <td className="p-3.5">⭐ Siêu thưởng đặc biệt</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
            <div className="p-5 rounded-2xl bg-pink-50 border-2 border-pink-200">
              <h4 className="font-black text-black text-lg mb-2">1. Thứ tự chọn ô luân phiên</h4>
              <p className="text-sm md:text-base font-semibold leading-relaxed">
                Mỗi câu hỏi lần lượt dành cho 11 nhóm (Nhóm 2, 3, 5 tới 13). Nhóm chính được chọn ô số và trả lời đầu tiên.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-sky-50 border-2 border-sky-200">
              <h4 className="font-black text-black text-lg mb-2">2. Giành lượt (Tối đa 3 lượt)</h4>
              <p className="text-sm md:text-base font-semibold leading-relaxed">
                Nếu nhóm chính trả lời sai, các nhóm khác được bấm giành lượt. Tối đa 3 lượt giành cho mỗi câu. Sau 3 lượt vẫn không đúng, công bố kết quả và bỏ qua điểm.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-200">
              <h4 className="font-black text-black text-lg mb-2">3. Lựa chọn CHO hoặc GIỮ</h4>
              <p className="text-sm md:text-base font-semibold leading-relaxed">
                Nhóm trả lời đúng mở ký tự ẩn:<br />
                • <b>GIỮ:</b> Chỉ nhóm mình chịu cộng hoặc trừ điểm theo ký tự.<br />
                • <b>CHO:</b> Tất cả các nhóm đối thủ còn lại chịu điểm theo ký tự; nhóm chọn không bị ảnh hưởng.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
              <h4 className="font-black text-black text-lg mb-2">4. Bảng Xếp Hạng Định Kỳ</h4>
              <p className="text-sm md:text-base font-semibold leading-relaxed">
                Bảng xếp hạng hiển thị sau mỗi vòng 11 câu (mỗi nhóm hoàn thành 1 lượt) hoặc khi kết thúc 30 câu. Top 1 đội đầu bảng nhận vương miện hoàng gia lấp lánh (không dùng số thứ tự 1-2-3-4).
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => { sound.playClick(); setActiveTab('setup'); }}
              className="px-8 py-3 rounded-2xl bg-black text-white font-black text-base cursor-pointer shadow-md"
            >
              Quay lại danh sách 11 nhóm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
