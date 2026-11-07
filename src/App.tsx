/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { WelcomeScreen, SetupTeamData } from './components/WelcomeScreen';
import { BoardScreen, TileHistoryInfo } from './components/BoardScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { Leaderboard, TeamScoreItem } from './components/Leaderboard';
import { GameOverScreen } from './components/GameOverScreen';
import { QUESTIONS_DATA, DEFAULT_TILE_LETTERS, LetterCardType } from './data/questions';
import { sound } from './utils/sound';

import { TEAM_PRESETS } from './data/stickers';
import { WalkingAnimals } from './components/WalkingAnimals';
import { ResetModal } from './components/ResetModal';

type GameScreen = 'welcome' | 'board' | 'question' | 'leaderboard' | 'gameover';

const STORAGE_KEY = 'QUIZ_ARENA_WABDE_STATE_11TEAMS_V3';

export default function App() {
  const [screen, setScreen] = useState<GameScreen>('welcome');
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [teams, setTeams] = useState<TeamScoreItem[]>(() =>
    TEAM_PRESETS.map((preset) => ({
      id: preset.id,
      name: preset.name,
      score: 0,
      avatar: preset.avatar,
      preset: preset,
      recentChange: 0,
    }))
  );
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [activeTileNumber, setActiveTileNumber] = useState<number | null>(null);
  const [openedTiles, setOpenedTiles] = useState<Record<number, TileHistoryInfo>>({});
  const [tileLetters, setTileLetters] = useState<Record<number, LetterCardType>>({});
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [leaderboardContext, setLeaderboardContext] = useState<{
    afterTileNumber?: number;
    winnerName?: string;
  }>({});

  // Khởi tạo phân bổ ký tự cho 30 ô số
  const generateTileLetters = (): Record<number, LetterCardType> => {
    const lettersMap: Record<number, LetterCardType> = {};
    for (let i = 1; i <= 30; i++) {
      lettersMap[i] = DEFAULT_TILE_LETTERS[(i - 1) % DEFAULT_TILE_LETTERS.length];
    }
    return lettersMap;
  };

  // Nạp dữ liệu từ localStorage khi mở trang
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.teams && parsed.teams.length === 11) {
          const normalizedTeams = parsed.teams.map((t: TeamScoreItem) => {
            const preset = TEAM_PRESETS.find((p) => p.id === t.id || p.name === t.name);
            return {
              ...t,
              avatar: preset ? preset.avatar : t.avatar,
              preset: preset ? preset : t.preset,
            };
          });

          const normalizedOpened = { ...(parsed.openedTiles || {}) };
          Object.keys(normalizedOpened).forEach((k) => {
            const tile = normalizedOpened[Number(k)];
            if (tile && tile.winnerTeamId) {
              const preset = TEAM_PRESETS.find((p) => p.id === tile.winnerTeamId);
              if (preset) {
                tile.winnerTeamAvatar = preset.avatar;
              }
            }
          });

          setTeams(normalizedTeams);
          setCurrentTurnIndex(parsed.currentTurnIndex || 0);
          setOpenedTiles(normalizedOpened);
          setTileLetters(parsed.tileLetters || generateTileLetters());
          setScreen(parsed.screen || 'board');
          return;
        }
      }
      setTileLetters(generateTileLetters());
    } catch {
      setTileLetters(generateTileLetters());
    }
  }, []);

  // Lưu trạng thái vào localStorage khi có thay đổi
  useEffect(() => {
    if (teams.length >= 2) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            teams,
            currentTurnIndex,
            openedTiles,
            tileLetters,
            screen: screen === 'question' ? 'board' : screen,
          })
        );
      } catch {
        // ignore storage errors
      }
    }
  }, [teams, currentTurnIndex, openedTiles, tileLetters, screen]);

  // Bắt đầu game mới từ WelcomeScreen
  const handleStartGame = (setupTeams: SetupTeamData[]) => {
    const initializedTeams: TeamScoreItem[] = setupTeams.map((t) => ({
      id: t.id,
      name: t.name,
      score: 0,
      avatar: t.avatar,
      preset: t.preset,
      recentChange: 0,
    }));

    setTeams(initializedTeams);
    setCurrentTurnIndex(0);
    setOpenedTiles({});
    setTileLetters(generateTileLetters());
    setScreen('board');
  };

  // Chọn ô số để giải câu đố
  const handleSelectTile = (tileNumber: number) => {
    setActiveTileNumber(tileNumber);
    setScreen('question');
  };

  // Hoàn thành lượt câu hỏi (Đúng hoặc Hết lượt)
  const handleFinishTurn = (result: {
    tileNumber: number;
    letter: LetterCardType;
    winnerTeamId?: string;
    action?: 'keep' | 'give';
    pointsChange?: number;
    unanswered?: boolean;
    updatedScores: Record<string, number>;
  }) => {
    const winner = teams.find((t) => t.id === result.winnerTeamId);

    // Cập nhật điểm cho tất cả các nhóm
    const nextTeams = teams.map((team) => {
      const newScore = result.updatedScores[team.id] ?? team.score;
      const recentChange = newScore - team.score;
      return {
        ...team,
        score: newScore,
        recentChange,
      };
    });

    // Cập nhật trạng thái ô số đã mở
    const nextOpenedTiles: Record<number, TileHistoryInfo> = {
      ...openedTiles,
      [result.tileNumber]: {
        tileNumber: result.tileNumber,
        letter: result.letter,
        winnerTeamId: result.winnerTeamId,
        winnerTeamName: winner?.name,
        winnerTeamAvatar: winner?.avatar,
        action: result.action,
        points: result.pointsChange,
        unanswered: result.unanswered,
      },
    };

    setTeams(nextTeams);
    setOpenedTiles(nextOpenedTiles);

    // Chuyển lượt luân phiên sang nhóm tiếp theo (theo đúng quy định ban đầu)
    const nextTurn = (currentTurnIndex + 1) % teams.length;
    setCurrentTurnIndex(nextTurn);

    const nextOpenedCount = Object.keys(nextOpenedTiles).length;

    // Lưu context cho Bảng xếp hạng
    setLeaderboardContext({
      afterTileNumber: result.tileNumber,
      winnerName: winner?.name,
    });

    // Sau khoảng 1 vòng (11 lượt tất cả) hoặc khi kết thúc 30 câu thì mới hiện bảng thống kê
    if (nextOpenedCount % 11 === 0 || nextOpenedCount >= 30) {
      setScreen('leaderboard');
    } else {
      // Các câu thông thường: lập tức quay lại bàn cờ để chơi tiếp mà không bị gián đoạn
      setScreen('board');
    }
  };

  // Kích hoạt hộp thoại Reset toàn bộ trò chơi
  const handleResetGame = () => {
    sound.playClick();
    setIsResetModalOpen(true);
  };

  // Thực thi Reset toàn bộ tiến độ trò chơi về ban đầu
  const handleExecuteReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setTeams(
      TEAM_PRESETS.map((preset) => ({
        id: preset.id,
        name: preset.name,
        score: 0,
        avatar: preset.avatar,
        preset: preset,
        recentChange: 0,
      }))
    );
    setCurrentTurnIndex(0);
    setOpenedTiles({});
    setTileLetters(generateTileLetters());
    setActiveTileNumber(null);
    setIsResetModalOpen(false);
    setScreen('board');
  };

  // Toàn màn hình
  const handleToggleFullScreen = () => {
    sound.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullScreen(false);
    }
  };

  // Bật tắt âm thanh
  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    sound.enabled = nextVal;
    setSoundEnabled(nextVal);
    if (nextVal) sound.playClick();
  };

  // Tìm câu hỏi tương ứng
  const currentQuestion = activeTileNumber
    ? QUESTIONS_DATA.find((q) => q.id === activeTileNumber) || QUESTIONS_DATA[0]
    : QUESTIONS_DATA[0];

  const currentTurnTeam = teams[currentTurnIndex] || teams[0];

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-pink-200 selection:text-pink-900">
      {/* Top Header bar */}
      <header className="border-b border-pink-200/60 bg-white/70 backdrop-blur-md sticky top-0 z-40 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              if (teams.length >= 2) setScreen('board');
              else setScreen('welcome');
            }}
            className="flex items-center gap-2 cursor-pointer group text-left"
          >
            <span className="text-2xl filter drop-shadow-xs group-hover:rotate-12 transition-transform">
              🌸
            </span>
            <div>
              <span className="font-black text-rose-800 text-xl md:text-2xl tracking-tight block leading-tight">
                QUIZ ARENA <span className="text-pink-500 font-extrabold text-base md:text-lg">W-A-B-D-E</span>
              </span>
            </div>
          </button>

          {/* Nav pills */}
          <div className="flex items-center gap-2">
            {teams.length >= 2 && (
              <>
                <button
                  onClick={() => { sound.playClick(); setScreen('board'); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    screen === 'board'
                      ? 'bg-rose-500 text-white shadow-2xs'
                      : 'bg-pink-50 text-rose-700 hover:bg-pink-100'
                  }`}
                >
                  Bàn cờ 30 ô
                </button>
                <button
                  onClick={() => { sound.playClick(); setScreen('leaderboard'); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    screen === 'leaderboard'
                      ? 'bg-rose-500 text-white shadow-2xs'
                      : 'bg-pink-50 text-rose-700 hover:bg-pink-100'
                  }`}
                >
                  Bảng xếp hạng
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Body View */}
      <main className="flex-1 flex flex-col justify-center py-4">
        {screen === 'welcome' && (
          <WelcomeScreen onStartGame={handleStartGame} />
        )}

        {screen === 'board' && currentTurnTeam && (
          <BoardScreen
            totalQuestions={30}
            openedTiles={openedTiles}
            tileLetters={tileLetters}
            currentTurnTeam={currentTurnTeam}
            teams={teams}
            onSelectTile={handleSelectTile}
            onOpenLeaderboard={() => setScreen('leaderboard')}
            onResetGame={handleResetGame}
            isFullScreen={isFullScreen}
            onToggleFullScreen={handleToggleFullScreen}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            onEndGame={() => setScreen('gameover')}
          />
        )}

        {screen === 'question' && activeTileNumber && currentTurnTeam && (
          <QuestionScreen
            question={currentQuestion}
            tileNumber={activeTileNumber}
            hiddenLetter={tileLetters[activeTileNumber] || 'W'}
            initialTurnTeam={currentTurnTeam}
            allTeams={teams}
            onFinishTurn={handleFinishTurn}
            onCancelBack={() => setScreen('board')}
          />
        )}

        {screen === 'leaderboard' && (
          <Leaderboard
            teams={teams}
            title={
              leaderboardContext.afterTileNumber
                ? `Bảng Xếp Hạng Sau Ô Số ${leaderboardContext.afterTileNumber}`
                : 'Bảng Xếp Hạng Đấu Trường'
            }
            subtitle={
              leaderboardContext.winnerName
                ? `${leaderboardContext.winnerName} vừa hoàn thành câu hỏi xuất sắc!`
                : 'Tự động sắp xếp và vinh danh Top 1 Vương miện hoàng gia'
            }
            continueText={
              Object.keys(openedTiles).length >= 30
                ? 'Xem Lễ Trao Giải Quán Quân'
                : 'Tiếp tục chọn ô số tiếp theo'
            }
            onContinue={() => {
              sound.playClick();
              if (Object.keys(openedTiles).length >= 30) {
                setScreen('gameover');
              } else {
                setScreen('board');
              }
            }}
            onResetGame={handleResetGame}
          />
        )}

        {screen === 'gameover' && (
          <GameOverScreen
            teams={teams}
            onRestartGame={handleResetGame}
            onViewBoard={() => setScreen('board')}
          />
        )}
      </main>

      {/* Hộp thoại xác nhận Reset Toàn Bộ Trò Chơi */}
      <ResetModal
        isOpen={isResetModalOpen}
        onConfirm={handleExecuteReset}
        onCancel={() => setIsResetModalOpen(false)}
      />

      {/* Hoạt ảnh con vật nhỏ đi lại ở dưới các góc màn hình (không đè lên chữ) */}
      <WalkingAnimals />
    </div>
  );
}
