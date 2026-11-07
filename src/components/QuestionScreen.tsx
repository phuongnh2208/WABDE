import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Clock, Sparkles, AlertTriangle, ChevronDown, Users } from 'lucide-react';
import { QuestionItem, LetterCardType, LETTER_CARDS } from '../data/questions';
import { TeamScoreItem } from './Leaderboard';
import { sound } from '../utils/sound';
import { TeamAvatar } from './TeamAvatar';

interface QuestionScreenProps {
  question: QuestionItem;
  tileNumber: number;
  hiddenLetter: LetterCardType;
  initialTurnTeam: TeamScoreItem;
  allTeams: TeamScoreItem[];
  onFinishTurn: (result: {
    tileNumber: number;
    letter: LetterCardType;
    winnerTeamId?: string;
    action?: 'keep' | 'give';
    pointsChange?: number;
    unanswered?: boolean;
    updatedScores: Record<string, number>;
  }) => void;
  onCancelBack: () => void;
}

interface ToastAlert {
  type: 'wrong' | 'steal';
  title: string;
  message: string;
  teamName: string;
  teamAvatar: string;
}

interface WrongAnswerInfo {
  teamName: string;
  teamAvatar: string;
  selectedOption: string;
  remainingSteals: number;
  stealCount: number;
  isLastAttempt: boolean;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  tileNumber,
  hiddenLetter,
  initialTurnTeam,
  allTeams,
  onFinishTurn,
  onCancelBack,
}) => {
  // Nhóm đang giữ lượt trả lời hiện tại
  const [currentAnsweringTeamId, setCurrentAnsweringTeamId] = useState<string>(initialTurnTeam.id);
  // Đánh dấu xem nhóm chính ban đầu đã trả lời sai chưa
  const [isInitialTeamFailed, setIsInitialTeamFailed] = useState<boolean>(false);
  // Danh sách các nhóm đã trả lời sai trong câu này
  const [failedTeamIds, setFailedTeamIds] = useState<string[]>([]);
  // Đếm số lượt giành đã thực hiện (tối đa 3 lượt giành)
  const [stealAttemptsCount, setStealAttemptsCount] = useState<number>(0);

  // Phương án được chọn (A, B, C, D)
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  // Giai đoạn: 'answering' | 'decision_modal' | 'all_failed'
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState<boolean>(false);
  const [isAllFailedModalOpen, setIsAllFailedModalOpen] = useState<boolean>(false);
  // Popup cảnh báo trực tiếp khi trả lời sai
  const [isWrongAnswerModalOpen, setIsWrongAnswerModalOpen] = useState<boolean>(false);
  const [wrongAnswerInfo, setWrongAnswerInfo] = useState<WrongAnswerInfo | null>(null);
  // Nhóm chiến thắng câu hỏi
  const [winnerTeam, setWinnerTeam] = useState<TeamScoreItem | null>(null);
  // Lựa chọn CHO hoặc GIỮ
  const [choice, setChoice] = useState<'keep' | 'give' | null>(null);

  // Cảnh báo nổi bật ra màn hình khi có nhóm GIÀNH LƯỢT
  const [toastAlert, setToastAlert] = useState<ToastAlert | null>(null);

  // Đồng hồ đếm ngược 30 giây
  const [timerSeconds, setTimerSeconds] = useState<number>(30);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  // Thông báo HẾT GIỜ ra màn hình
  const [isTimeUpModalOpen, setIsTimeUpModalOpen] = useState<boolean>(false);
  // MC Toolbar toggle
  const [showMcControls, setShowMcControls] = useState<boolean>(false);

  const currentAnsweringTeam = allTeams.find(t => t.id === currentAnsweringTeamId) || initialTurnTeam;
  const letterInfo = LETTER_CARDS[hiddenLetter];


  // Tự động tắt toast cảnh báo sau 3.5 giây nếu người dùng không bấm đóng
  useEffect(() => {
    if (!toastAlert) return;
    const timer = setTimeout(() => {
      setToastAlert(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toastAlert]);

  // Hiệu ứng đếm ngược: Kêu từng giây & Hết giờ phát chuông thông báo
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            sound.playTimeoutAlarm();
            setIsTimerRunning(false);
            setIsTimeUpModalOpen(true);
            return 0;
          }
          sound.playTick();
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  // Xử lý kiểm tra đáp án
  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    setIsTimerRunning(false);

    if (selectedOption === question.correctAnswer) {
      // TRẢ LỜI ĐÚNG! Bật popup CHO / GIỮ với biểu tượng ẩn như cũ
      sound.playCorrect();
      setWinnerTeam(currentAnsweringTeam);
      setToastAlert(null);
      setIsDecisionModalOpen(true);
    } else {
      // TRẢ LỜI SAI! Bật POPUP CẢNH BÁO TRỰC TIẾP LÊN MÀN HÌNH
      sound.playWrong();
      const chosenOption = selectedOption;
      const updatedFailed = [...failedTeamIds, currentAnsweringTeamId];
      setFailedTeamIds(updatedFailed);
      setSelectedOption(null);
      setTimerSeconds(30);

      const nextStealCount = isInitialTeamFailed ? stealAttemptsCount + 1 : stealAttemptsCount;
      if (isInitialTeamFailed) {
        setStealAttemptsCount(nextStealCount);
      } else {
        setIsInitialTeamFailed(true);
      }

      const remainingSteals = Math.max(0, 3 - nextStealCount);
      const isLastAttempt = nextStealCount >= 3 || updatedFailed.length >= allTeams.length;

      setWrongAnswerInfo({
        teamName: currentAnsweringTeam.name,
        teamAvatar: currentAnsweringTeam.avatar,
        selectedOption: chosenOption || '',
        remainingSteals,
        stealCount: nextStealCount,
        isLastAttempt,
      });
      setIsWrongAnswerModalOpen(true);
    }
  };

  // Chọn nhóm trả lời từ MENU THẢ ở trên câu hỏi
  const handleSelectAnsweringTeam = (teamId: string) => {
    if (teamId === currentAnsweringTeamId) return;
    const targetTeam = allTeams.find(t => t.id === teamId);
    if (!targetTeam) return;

    sound.playClick();
    setCurrentAnsweringTeamId(teamId);
    setSelectedOption(null);
    setTimerSeconds(30);
    setIsTimerRunning(true);
    setIsTimeUpModalOpen(false);

    // Nếu nhóm chính đã sai thì việc chọn nhóm mới chính là giành lượt trả lời
    if (isInitialTeamFailed) {
      const nextStealCount = stealAttemptsCount + 1;
      setStealAttemptsCount(nextStealCount);

      // Cảnh báo rõ lên màn hình: Nhóm đã giành quyền trả lời
      setToastAlert({
        type: 'steal',
        title: 'GIÀNH QUYỀN TRẢ LỜI!',
        teamName: targetTeam.name,
        teamAvatar: targetTeam.avatar,
        message: `⚡ ${targetTeam.name} đã giành được quyền trả lời câu hỏi! (Lượt giành ${nextStealCount}/3)`,
      });
    }
  };


  // MC xác nhận đúng thủ công
  const handleMcForceCorrect = (team: TeamScoreItem) => {
    setIsTimerRunning(false);
    sound.playCorrect();
    setWinnerTeam(team);
    setToastAlert(null);
    setIsDecisionModalOpen(true);
  };

  // MC xác nhận sai thủ công
  const handleMcForceWrong = () => {
    setIsTimerRunning(false);
    sound.playWrong();
    const updatedFailed = [...failedTeamIds, currentAnsweringTeamId];
    setFailedTeamIds(updatedFailed);
    const chosenOption = selectedOption || 'MC xác nhận';
    setSelectedOption(null);
    setTimerSeconds(30);

    const nextStealCount = isInitialTeamFailed ? stealAttemptsCount + 1 : stealAttemptsCount;
    if (isInitialTeamFailed) {
      setStealAttemptsCount(nextStealCount);
    } else {
      setIsInitialTeamFailed(true);
    }

    const remainingSteals = Math.max(0, 3 - nextStealCount);
    const isLastAttempt = nextStealCount >= 3 || updatedFailed.length >= allTeams.length;

    setWrongAnswerInfo({
      teamName: currentAnsweringTeam.name,
      teamAvatar: currentAnsweringTeam.avatar,
      selectedOption: chosenOption,
      remainingSteals,
      stealCount: nextStealCount,
      isLastAttempt,
    });
    setIsWrongAnswerModalOpen(true);
  };

  // Xử lý xác nhận lựa chọn CHO hoặc GIỮ trong POPUP MODAL
  const handleConfirmChoice = (selectedChoice: 'keep' | 'give') => {
    setChoice(selectedChoice);
    if (letterInfo.points < 0) {
      sound.playBoom();
    } else {
      sound.playCorrect();
    }

    const updatedScores: Record<string, number> = {};

    if (winnerTeam) {
      if (selectedChoice === 'keep') {
        allTeams.forEach(t => {
          if (t.id === winnerTeam.id) {
            updatedScores[t.id] = t.score + letterInfo.points;
          } else {
            updatedScores[t.id] = t.score;
          }
        });
      } else {
        allTeams.forEach(t => {
          if (t.id === winnerTeam.id) {
            updatedScores[t.id] = t.score;
          } else {
            updatedScores[t.id] = t.score + letterInfo.points;
          }
        });
      }
    }

    // Đóng popup và chuyển lượt mượt mà
    setTimeout(() => {
      setIsDecisionModalOpen(false);
      onFinishTurn({
        tileNumber,
        letter: hiddenLetter,
        winnerTeamId: winnerTeam?.id,
        action: selectedChoice,
        pointsChange: letterInfo.points,
        unanswered: false,
        updatedScores,
      });
    }, 900);
  };

  // Khi không ai trả lời đúng (sau 3 lượt giành hoặc hết nhóm)
  const handleFinishUnanswered = () => {
    sound.playClick();
    const updatedScores: Record<string, number> = {};
    allTeams.forEach(t => {
      updatedScores[t.id] = t.score;
    });

    setIsAllFailedModalOpen(false);
    onFinishTurn({
      tileNumber,
      letter: hiddenLetter,
      unanswered: true,
      updatedScores,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 flex flex-col justify-between select-none text-black">
      {/* CẢNH BÁO NỔI BẬT LÊN MÀN HÌNH KHI TRẢ LỜI SAI HOẶC GIÀNH LƯỢT */}
      <AnimatePresence>
        {toastAlert && (
          <motion.div
            initial={{ opacity: 0, y: -25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="mb-3 z-30"
          >
            <div className={`p-3.5 sm:p-4 rounded-2xl border-3 shadow-lg flex items-center justify-between gap-3 ${
              toastAlert.type === 'wrong'
                ? 'bg-rose-50 border-rose-500 text-rose-950'
                : 'bg-purple-50 border-purple-500 text-purple-950'
            }`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl p-1 bg-white rounded-xl shadow-xs border border-slate-200">
                  {toastAlert.type === 'wrong' ? '❌' : '⚡'}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs uppercase font-black px-2.5 py-0.5 rounded-full text-white ${
                      toastAlert.type === 'wrong' ? 'bg-rose-600' : 'bg-purple-600'
                    }`}>
                      {toastAlert.title}
                    </span>
                    <span className="font-black text-black text-sm sm:text-base flex items-center gap-1.5">
                      <TeamAvatar avatar={toastAlert.teamAvatar} size="xs" className="w-5 h-5 inline-block" />
                      <span>{toastAlert.teamName}</span>
                    </span>
                  </div>
                  <p className="font-extrabold text-black text-sm sm:text-base mt-0.5 leading-snug">
                    {toastAlert.message}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setToastAlert(null)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-black font-black text-xs cursor-pointer shadow-2xs shrink-0"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KHUNG CÂU HỎI CHÍNH - Vừa vặn 1 màn hình máy chiếu, chữ tô đậm rõ nét */}
      <div className="bg-white border-3 border-pink-300 rounded-3xl p-4 sm:p-5 shadow-sm relative">
        {/* THANH MENU THẢ CHỌN NHÓM VÀ CÔNG CỤ Ở TRÊN PHẦN CÂU HỎI */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3 pb-3 border-b-2 border-slate-200">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="px-3.5 py-1.5 rounded-2xl bg-black text-white font-black text-base shadow-2xs">
              Ô {tileNumber}
            </span>

            {/* Đồng hồ đếm ngược 30s */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border-2 shadow-2xs ${
              timerSeconds <= 5 && isTimerRunning
                ? 'bg-rose-100 border-rose-400 text-rose-700 animate-pulse'
                : 'bg-amber-100 border-amber-300 text-black'
            }`}>
              <Clock className="w-4 h-4 text-black" />
              <span className="text-base font-black text-black tabular-nums">
                {timerSeconds}s
              </span>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setIsTimerRunning(!isTimerRunning);
                }}
                className="text-xs font-black text-black bg-white px-2 py-0.5 rounded-lg border border-amber-400 hover:bg-amber-50 uppercase cursor-pointer"
              >
                {isTimerRunning ? 'Dừng' : 'Chạy'}
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setTimerSeconds(30);
                  setIsTimerRunning(false);
                  setIsTimeUpModalOpen(false);
                }}
                className="text-xs font-black text-black hover:text-rose-600 cursor-pointer ml-0.5"
                title="Đặt lại 30s"
              >
                ↺
              </button>
            </div>

            {/* THANH MENU THẢ ĐỂ CHỌN NHÓM TRẢ LỜI / GIÀNH LƯỢT */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-black text-black uppercase tracking-wider flex items-center gap-1">
                <Users className="w-4 h-4 text-rose-500" />
                <span className="hidden sm:inline">Nhóm trả lời:</span>
              </span>
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-300 p-0.5 flex items-center justify-center shrink-0 shadow-2xs">
                  <TeamAvatar avatar={currentAnsweringTeam.avatar} name={currentAnsweringTeam.name} size="xs" className="w-6 h-6" />
                </div>
                <div className="relative">
                  <select
                    value={currentAnsweringTeamId}
                    onChange={(e) => handleSelectAnsweringTeam(e.target.value)}
                    className={`appearance-none font-black text-sm sm:text-base text-black pl-3 pr-8 py-1.5 rounded-2xl cursor-pointer shadow-xs focus:ring-2 focus:ring-black focus:outline-none transition-all ${
                      isInitialTeamFailed
                        ? 'bg-purple-100 hover:bg-purple-200 border-2 border-purple-500 ring-2 ring-purple-300'
                        : 'bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 hover:from-pink-200 hover:to-rose-100 border-2 border-pink-400'
                    }`}
                  >
                    {allTeams.map((team) => {
                      const isFailed = failedTeamIds.includes(team.id);
                      const isCurrent = team.id === currentAnsweringTeamId;
                      return (
                        <option
                          key={team.id}
                          value={team.id}
                          disabled={isFailed && !isCurrent}
                          className={isFailed ? 'text-slate-400' : 'text-black font-black'}
                        >
                          {team.name} {isCurrent ? '★ (Đang trả lời)' : isFailed ? '✕ (Đã trả lời sai)' : '✓ (Có thể chọn)'}
                        </option>
                      );
                    })}
                  </select>
                  <ChevronDown className="w-4 h-4 text-black absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {isInitialTeamFailed && (
                <span className="text-xs font-black bg-purple-200 text-purple-900 px-2.5 py-1 rounded-full border border-purple-300 animate-pulse">
                  ⚡ Lượt giành {stealAttemptsCount}/3
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Nút MC */}
            <button
              type="button"
              onClick={() => setShowMcControls(!showMcControls)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-black text-xs font-black cursor-pointer shadow-2xs"
              title="Công cụ MC điều phối"
            >
              ⚙️ MC
            </button>
          </div>
        </div>

        {/* Bảng điều khiển MC nếu mở */}
        {showMcControls && (
          <div className="mb-3 p-3 rounded-2xl bg-purple-100 border-2 border-purple-300 text-black text-xs">
            <div className="font-black mb-1.5 flex items-center justify-between">
              <span>👑 BẢNG ĐIỀU PHỐI MC: Đáp án chuẩn: <b>{question.correctAnswer}</b> | Thẻ ẩn: <b>{hiddenLetter} ({letterInfo.name})</b></span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleMcForceCorrect(currentAnsweringTeam)}
                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black cursor-pointer"
              >
                ✓ Cho {currentAnsweringTeam.name} Đúng
              </button>
              <button
                type="button"
                onClick={handleMcForceWrong}
                className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-black cursor-pointer"
              >
                ✗ Chấm Sai (Cảnh báo & Mở giành lượt)
              </button>
              <button
                type="button"
                onClick={handleFinishUnanswered}
                className="px-3 py-1 rounded-lg bg-black hover:bg-slate-800 text-white font-black cursor-pointer"
              >
                Bỏ qua câu này (0 điểm)
              </button>
            </div>
          </div>
        )}

        {/* NỘI DUNG CÂU HỎI CHÍNH - Chữ vừa vặn, tô đậm đen rõ nét */}
        <div className="mb-3.5 bg-slate-50 p-4 sm:p-5 rounded-2xl border-2 border-slate-200">
          <h3 className="text-xl sm:text-2xl font-black text-black leading-snug whitespace-pre-line tracking-tight">
            {question.question}
          </h3>
        </div>

        {/* 4 PHƯƠNG ÁN A, B, C, D - Dàn 2 cột ngang, chữ tô đậm rõ ràng */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {question.options.map((opt) => {
            const isSelected = selectedOption === opt.key;

            let optStyle = 'border-slate-300 bg-white hover:border-pink-400 hover:bg-pink-50/50 text-black';
            if (isSelected) {
              optStyle = 'border-black bg-pink-100 text-black ring-2 ring-black font-black';
            }

            return (
              <button
                key={opt.key}
                onClick={() => {
                  sound.playClick();
                  setSelectedOption(opt.key);
                }}
                className={`w-full text-left flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl border-2 transition-all cursor-pointer shadow-2xs ${optStyle}`}
              >
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-base shrink-0 shadow-2xs ${
                  isSelected
                    ? 'bg-black text-white'
                    : 'bg-rose-100 text-black border border-rose-300'
                }`}>
                  {opt.key}
                </span>
                <span className="text-base sm:text-lg font-black text-black leading-snug pt-0.5">
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* HÀNG NÚT THAO TÁC CHÍNH - NẰM TRỰC TIẾP TRONG MÀN HÌNH KHÔNG CẦN CUỘN */}
        <div className="flex items-center justify-between gap-3 pt-2.5 border-t-2 border-slate-200">
          <button
            onClick={onCancelBack}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-black border-2 border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Quay lại bàn cờ
          </button>

          <button
            disabled={!selectedOption}
            onClick={handleCheckAnswer}
            className={`flex items-center gap-2 px-7 py-2.5 rounded-xl font-black text-base md:text-lg shadow-md transition-all ${
              selectedOption
                ? 'bg-rose-600 hover:bg-rose-700 text-white cursor-pointer active:scale-98'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>KIỂM TRA ĐÁP ÁN</span>
          </button>
        </div>
      </div>


      {/* POPUP CẢNH BÁO TRỰC TIẾP KHI TRẢ LỜI SAI */}
      <AnimatePresence>
        {isWrongAnswerModalOpen && wrongAnswerInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 15 }}
              className="bg-white border-4 border-rose-500 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl relative text-black"
            >
              {/* Biểu tượng cảnh báo lớn */}
              <div className="w-20 h-20 rounded-3xl bg-rose-100 border-2 border-rose-400 flex items-center justify-center mx-auto mb-3 shadow-md animate-bounce">
                <span className="text-5xl">❌</span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-300 text-rose-900 text-xs sm:text-sm font-black mb-3">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>CẢNH BÁO TRẢ LỜI SAI</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-rose-600 tracking-tight mb-2">
                RẤT TIẾC, CHƯA ĐÚNG!
              </h2>

              <div className="p-4 rounded-2xl bg-rose-50/70 border-2 border-rose-200 my-4 text-black text-left">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 p-1 bg-white rounded-xl shadow-2xs border border-slate-200 flex items-center justify-center shrink-0">
                    <TeamAvatar avatar={wrongAnswerInfo.teamAvatar} name={wrongAnswerInfo.teamName} size="md" className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-rose-700 block">
                      Nhóm vừa trả lời:
                    </span>
                    <span className="text-xl font-black text-black">
                      {wrongAnswerInfo.teamName}
                    </span>
                  </div>
                </div>

                <p className="text-base font-extrabold text-black leading-snug">
                  Phương án đã chọn: <b className="text-rose-600 font-black text-lg">[{wrongAnswerInfo.selectedOption}]</b> là đáp án chưa chính xác.
                </p>
              </div>

              {/* Thông tin số lượt giành còn lại */}
              {!wrongAnswerInfo.isLastAttempt ? (
                <div className="p-3.5 rounded-2xl bg-purple-50 border-2 border-purple-200 text-black mb-6 text-center">
                  <span className="text-sm font-black text-purple-900 block mb-1">
                    ⚡ CÒN LẠI {wrongAnswerInfo.remainingSteals}/3 LƯỢT GIÀNH QUYỀN TRẢ LỜI!
                  </span>
                  <span className="text-xs font-bold text-slate-700 block">
                    Người điều phối hãy bấm nút bên dưới và chọn nhóm giành quyền ở <b>Menu thả</b> phía trên.
                  </span>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-slate-100 border-2 border-slate-300 text-black mb-6 text-center">
                  <span className="text-sm font-black text-rose-700 block">
                    Đã hết 3 lượt giành quyền cho câu hỏi này!
                  </span>
                </div>
              )}

              {/* Nút xác nhận đóng popup */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setIsWrongAnswerModalOpen(false);
                  if (wrongAnswerInfo.isLastAttempt) {
                    setIsAllFailedModalOpen(true);
                  }
                }}
                className="w-full py-4 px-8 rounded-2xl bg-black hover:bg-slate-800 text-white font-black text-base sm:text-lg shadow-lg cursor-pointer transition-transform hover:scale-102 active:scale-98"
              >
                {!wrongAnswerInfo.isLastAttempt
                  ? 'Xác Nhận & Chọn Nhóm Giành Quyền'
                  : 'Xem Kết Quả Chuẩn & Tiếp Tục'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* POPUP OVERLAY CHO HOẶC GIỮ VỚI BIỂU TƯỢNG ẨN NHƯ CŨ */}
      <AnimatePresence>
        {isDecisionModalOpen && winnerTeam && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="bg-white border-4 border-pink-400 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl relative text-black"
            >
              {/* Banner chúc mừng */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-black text-base font-black mb-3">
                <Sparkles className="w-5 h-5 text-emerald-600 animate-twinkle" />
                <TeamAvatar avatar={winnerTeam.avatar} name={winnerTeam.name} size="xs" className="w-6 h-6 inline-block" />
                <span>{winnerTeam.name} TRẢ LỜI ĐÚNG!</span>
                <Sparkles className="w-5 h-5 text-emerald-600 animate-twinkle" />
              </div>

              <h3 className="text-xl md:text-2xl font-black text-black mb-2">
                KÝ TỰ BÍ MẬT Ô {tileNumber}:
              </h3>

              {/* Thẻ Ký tự W-A-B-D-E */}
              <motion.div
                initial={{ rotateY: 180, scale: 0.8 }}
                animate={{ rotateY: 0, scale: 1 }}
                className={`inline-block p-5 rounded-3xl border-3 my-2 ${letterInfo.badgeBg} shadow-md`}
              >
                <span className="text-4xl block mb-1">{letterInfo.icon}</span>
                <span className="text-6xl font-black block tracking-tight text-black">
                  {letterInfo.type}
                </span>
                <span className="text-xl font-black block text-black">
                  {letterInfo.name} ({letterInfo.description})
                </span>
              </motion.div>

              <p className="text-sm md:text-base text-slate-800 font-bold mb-5 leading-relaxed">
                • <b>GIỮ:</b> Chỉ {winnerTeam.name} áp dụng {letterInfo.description}.<br />
                • <b>CHO:</b> Tất cả các nhóm đối thủ còn lại đều áp dụng {letterInfo.description}.
              </p>

              {/* 2 Nút Lớn CHO / GIỮ */}
              {choice === null ? (
                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                  <button
                    onClick={() => handleConfirmChoice('keep')}
                    className="p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg md:text-xl shadow-lg cursor-pointer transition-transform hover:scale-103"
                  >
                    <span className="block text-2xl mb-1">🎁</span>
                    <span>GIỮ ĐIỂM</span>
                  </button>

                  <button
                    onClick={() => handleConfirmChoice('give')}
                    className="p-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black text-lg md:text-xl shadow-lg cursor-pointer transition-transform hover:scale-103"
                  >
                    <span className="block text-2xl mb-1">🎯</span>
                    <span>CHO ĐIỂM</span>
                  </button>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-pink-100 border border-pink-300 text-black font-black text-base animate-pulse">
                  Đã ghi nhận: {choice === 'keep' ? 'GIỮ ĐIỂM' : 'CHO ĐIỂM'}! Đang lưu điểm...
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* POPUP KHI SAU 3 LƯỢT GIÀNH VẪN KHÔNG ĐÚNG */}
      <AnimatePresence>
        {isAllFailedModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white border-4 border-rose-400 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl text-black"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-300 text-black text-sm font-black mb-3">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <span>HẾT 3 LƯỢT GIÀNH - KHÔNG CÓ NHÓM NÀO ĐÚNG!</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-300 my-3 text-black">
                <span className="text-base font-black block mb-1">📢 ĐÁP ÁN ĐÚNG LÀ:</span>
                <span className="text-3xl font-black text-rose-600 block mb-1">
                  {question.correctAnswer}
                </span>
                <span className="text-sm font-bold block text-slate-700">
                  Ký tự ô {tileNumber}: <b>{letterInfo.type} ({letterInfo.name})</b> (Bỏ qua câu này, không tính điểm)
                </span>
              </div>

              <button
                onClick={handleFinishUnanswered}
                className="px-8 py-3 rounded-2xl bg-black hover:bg-slate-800 text-white font-black text-base shadow-md cursor-pointer"
              >
                Tiếp Tục Vòng Chơi
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* THÔNG BÁO POPUP HẾT GIỜ 30S */}
      <AnimatePresence>
        {isTimeUpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="bg-white border-4 border-rose-500 rounded-3xl p-6 max-w-md w-full text-center shadow-2xl text-black"
            >
              <div className="text-5xl mb-2 animate-bounce">⏰</div>
              <h2 className="text-3xl font-black text-rose-600 tracking-tight mb-2">
                ĐÃ HẾT GIỜ!
              </h2>
              <p className="text-base text-black font-bold mb-5">
                Thời gian 30 giây của câu hỏi này đã kết thúc!
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsTimeUpModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-black text-white font-black text-sm hover:bg-slate-800 cursor-pointer"
                >
                  Đóng
                </button>
                {!isInitialTeamFailed && (
                  <button
                    onClick={() => {
                      setIsTimeUpModalOpen(false);
                      handleMcForceWrong();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-black text-sm hover:bg-rose-700 cursor-pointer"
                  >
                    Chuyển sang Giành lượt
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
