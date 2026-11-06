import { AnimatePresence, motion } from "framer-motion";
import { Crown, Medal, Trophy } from "lucide-react";

export default function Leaderboard({ teams }) {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score || a.id - b.id);
  return (
    <aside className="panel leaderboard-panel">
      <div className="leaderboard-title"><div><p className="eyebrow">LIVE SCORE</p><h2>Bảng xếp hạng</h2></div><Trophy className="title-icon" /></div>
      <AnimatePresence initial={false}>
        <motion.ul layout className="team-list">
          {sortedTeams.map((team, index) => (
            <motion.li layout key={team.id} className={`team-row rank-${index + 1}`} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
              <span className="rank">{index < 3 ? <Medal size={17} /> : index + 1}</span>
              <span className="team-name">{team.name}</span>
              <motion.span key={team.score} initial={{ scale: 1.35, color: team.lastDelta >= 0 ? "#16a34a" : "#ef4444" }} animate={{ scale: 1, color: "#172033" }} className="team-score">{team.score > 0 ? "+" : ""}{team.score}</motion.span>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
      <div className="leaderboard-note"><Crown size={15} /> Điểm được tự động sắp xếp sau mỗi lượt</div>
    </aside>
  );
}
