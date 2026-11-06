import { RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import GameGrid from "./components/GameGrid";
import Leaderboard from "./components/Leaderboard";
import QuestionModal from "./components/QuestionModal";
import { questions } from "./data/questions";

const initialTeams = Array.from({ length: 13 }, (_, index) => ({ id: index + 1, name: `Nhóm ${index + 1}`, score: 0, lastDelta: 0 }));

export default function App() {
  const [teams, setTeams] = useState(initialTeams);
  const [openedIds, setOpenedIds] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const updateScore = (winnerId, points, decision) => {
    setTeams((current) => current.map((team) => {
      const affected = decision === "hold" ? team.id === winnerId : team.id !== winnerId;
      return affected ? { ...team, score: team.score + points, lastDelta: points } : { ...team, lastDelta: 0 };
    }));
    setOpenedIds((ids) => [...ids, activeQuestion.id]);
    setActiveQuestion(null);
  };

  const resetGame = () => { setTeams(initialTeams); setOpenedIds([]); setActiveQuestion(null); };
  return (
    <main className="app-shell">
      <header className="hero-header">
        <div className="brand-mark">W<span>·</span>A<span>·</span>B<span>·</span>D<span>·</span>E</div>
        <div><p className="eyebrow">QUIZ SHOW · QUYỀN SỞ HỮU TRÍ TUỆ & CÔNG NGHỆ</p><h1>Đấu trường tri thức</h1><p className="hero-subtitle">Chọn ô số · Trả lời đúng · Bứt phá điểm số!</p></div>
        <button className="reset-button" onClick={resetGame}><RotateCcw size={17} /> Chơi lại</button>
      </header>
      <div className="game-layout"><div><div className="intro-banner"><Sparkles /><span>Mỗi ô là một thử thách. Bạn có đủ bản lĩnh để mở khóa tất cả?</span></div><GameGrid questions={questions} openedIds={openedIds} onSelect={setActiveQuestion} /></div><Leaderboard teams={teams} /></div>
      <footer>W-A-B-D-E <span>•</span> Học vui – Nhớ lâu – Chơi công bằng</footer>
      {activeQuestion && <QuestionModal question={activeQuestion} teams={teams} onClose={() => setActiveQuestion(null)} onScore={updateScore} />}
    </main>
  );
}
