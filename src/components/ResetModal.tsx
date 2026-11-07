import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, AlertTriangle, X } from 'lucide-react';
import { sound } from '../utils/sound';

interface ResetModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="relative w-full max-w-md bg-white border-4 border-rose-400 rounded-3xl p-6 md:p-8 shadow-2xl text-center text-black"
        >
          {/* Nút đóng góc phải */}
          <button
            onClick={() => {
              sound.playClick();
              onCancel();
            }}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-black rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Cute animal peeking */}
          <div className="flex justify-center mb-3">
            <div className="relative">
              <img
                src="assets/animals/monkey.png"
                alt="Cute Monkey"
                className="w-16 h-16 object-contain filter drop-shadow-md animate-bounce"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 text-2xl">🔄</span>
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-black tracking-tight mb-2">
            RESET TIẾN ĐỘ TRÒ CHƠI?
          </h3>

          <p className="text-sm md:text-base text-slate-700 font-bold leading-relaxed mb-6">
            Toàn bộ điểm số của 11 nhóm sẽ về <b className="text-rose-600">0 điểm</b>, tất cả 30 ô số sẽ được đóng lại để bắt đầu vòng thi đấu mới.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onCancel();
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-black font-black text-base cursor-pointer transition-colors"
            >
              Hủy Bỏ
            </button>

            <button
              onClick={() => {
                sound.playCorrect();
                onConfirm();
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-base shadow-lg hover:scale-103 transition-transform cursor-pointer ring-4 ring-rose-200"
            >
              Xác Nhận Reset Toàn Bộ
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
