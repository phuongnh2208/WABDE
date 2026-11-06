import { LockKeyhole, Sparkles } from "lucide-react";

export default function GameGrid({ questions, openedIds, onSelect }) {
  return (
    <section className="panel grid-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">BẢNG CÂU HỎI</p>
          <h2>Mở ô, chinh phục tri thức!</h2>
        </div>
        <span className="progress-pill"><Sparkles size={16} /> {openedIds.length}/30 ô đã mở</span>
      </div>
      <div className="game-grid">
        {questions.map((question) => {
          const opened = openedIds.includes(question.id);
          return (
            <button key={question.id} disabled={opened} onClick={() => onSelect(question)} className={`number-card ${opened ? "opened" : ""}`}>
              {opened ? <LockKeyhole size={21} /> : <span>{String(question.id).padStart(2, "0")}</span>}
            </button>
          );
        })}
      </div>
      <div className="legend"><span className="legend-dot" /> Ô sáng: chưa chơi <span className="legend-dot muted" /> Ô mờ: đã hoàn thành</div>
    </section>
  );
}
