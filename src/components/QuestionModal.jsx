import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CircleAlert, Gift, ShieldAlert, X } from "lucide-react";
import { useState } from "react";

const characterInfo = {
  W: { name: "WOW", points: 20, className: "character-w", icon: "★" },
  A: { name: "ANGEL", points: 10, className: "character-a", icon: "✦" },
  B: { name: "BOOM", points: -20, className: "character-b", icon: "!" },
  D: { name: "DEVIL", points: -10, className: "character-d", icon: "♠" },
  E: { name: "EXTRA", points: 50, className: "character-e", icon: "◆" },
};

export default function QuestionModal({ question, teams, onClose, onScore }) {
  const [currentTeamId, setCurrentTeamId] = useState(teams[0].id);
  const [attempts, setAttempts] = useState(0);
  const [failedIds, setFailedIds] = useState([]);
  const [phase, setPhase] = useState("answering");
  const [choice, setChoice] = useState(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const character = characterInfo[question.hiddenCharacter];
  const availableTeams = teams.filter((team) => !failedIds.includes(team.id));

  const handleWrong = () => {
    const nextFailed = [...failedIds, currentTeamId];
    const nextAttempts = attempts + 1;
    setFailedIds(nextFailed);
    setAttempts(nextAttempts);
    if (nextAttempts >= 3 || nextFailed.length >= teams.length) setPhase("revealed");
    else setCurrentTeamId(teams.find((team) => !nextFailed.includes(team.id))?.id ?? teams[0].id);
  };

  const handleCorrect = () => { setAttempts(attempts + 1); setAnsweredCorrectly(true); setPhase("revealed"); };
  const finish = (decision) => { setChoice(decision); setTimeout(() => onScore(currentTeamId, character.points, decision), 450); };

  return (
    <div className="modal-backdrop">
      <motion.div initial={{ opacity: 0, y: 22, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="question-modal">
        <button className="close-button" onClick={onClose} aria-label="Đóng"><X /></button>
        <div className="modal-topline"><span className="question-number">Ô {String(question.id).padStart(2, "0")}</span><span className="attempt-counter">Lượt {Math.min(attempts + 1, 3)}/3</span></div>
        <h2>{question.text}</h2>
        {phase === "answering" && <div className="answering-area">
          <label htmlFor="team-select">Đội đang trả lời</label>
          <select id="team-select" value={currentTeamId} onChange={(event) => setCurrentTeamId(Number(event.target.value))}>
            {availableTeams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
          </select>
          <div className="options-list">{question.options.map((option, index) => <div key={option} className="option"><b>{String.fromCharCode(65 + index)}</b>{option}</div>)}</div>
          <div className="modal-actions"><button className="action-button wrong" onClick={handleWrong}><CircleAlert size={18} /> Trả lời sai</button><button className="action-button correct" onClick={handleCorrect}><CheckCircle2 size={18} /> Trả lời đúng</button></div>
          {failedIds.length > 0 && <p className="helper-text">Các đội đã sai: {failedIds.map((id) => teams.find((team) => team.id === id)?.name).join(", ")}. Hãy chọn đội tranh lượt.</p>}
        </div>}
        <AnimatePresence mode="wait">
          {phase === "revealed" && <motion.div key="revealed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="reveal-area">
            <p className="answer-notice">{attempts >= 3 ? "Đã hết 3 lượt! Đáp án đúng là:" : "Chính xác! Ký tự bí mật là:"}</p>
            <div className={`character-card ${character.className}`}><span>{character.icon}</span><strong>{question.hiddenCharacter}</strong><small>{character.name} · {character.points > 0 ? "+" : ""}{character.points} điểm</small></div>
            {answeredCorrectly && !choice && <><p className="choice-label">Đội trả lời đúng quyết định:</p><div className="choice-actions"><button className="hold-button" onClick={() => finish("hold")}><ShieldAlert /> GIỮ<small>Chỉ đội mình</small></button><button className="give-button" onClick={() => finish("give")}><Gift /> CHO<small>Các đội còn lại</small></button></div></>}
            {!answeredCorrectly && <><p className="correct-answer">Đáp án: <strong>{question.answer}</strong></p><button className="finish-button" onClick={() => onScore(currentTeamId, 0, "hold")}>Mở bảng câu hỏi</button></>}
            {choice && <p className="helper-text">Đã cập nhật điểm. Đang quay về bảng câu hỏi...</p>}
          </motion.div>}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
