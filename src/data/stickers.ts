/**
 * Bộ 11 nhóm thi đấu (Chỉ có Nhóm 2, 3, 5 - 13, không có nhóm 1 và nhóm 4)
 * Mỗi nhóm đại diện bằng một hình ảnh động vật nhỏ cute (không dùng tên biệt danh)
 */

export interface TeamPreset {
  id: string;
  name: string;
  avatar: string; // Đường dẫn ảnh động vật cute
  label?: string; // Không còn dùng biệt danh
  bgGradient: string;
  borderColor: string;
  textColor: string;
  lightBg: string;
}

export const TEAM_PRESETS: TeamPreset[] = [
  {
    id: 'team-2',
    name: 'Nhóm 2',
    avatar: 'assets/animals/bunny.png',
    bgGradient: 'from-sky-100 to-blue-50',
    borderColor: 'border-sky-300',
    textColor: 'text-black',
    lightBg: 'bg-sky-50',
  },
  {
    id: 'team-3',
    name: 'Nhóm 3',
    avatar: 'assets/animals/cat.png',
    bgGradient: 'from-amber-100 to-yellow-50',
    borderColor: 'border-amber-300',
    textColor: 'text-black',
    lightBg: 'bg-amber-50',
  },
  {
    id: 'team-5',
    name: 'Nhóm 5',
    avatar: 'assets/animals/chick.png',
    bgGradient: 'from-emerald-100 to-green-50',
    borderColor: 'border-emerald-300',
    textColor: 'text-black',
    lightBg: 'bg-emerald-50',
  },
  {
    id: 'team-6',
    name: 'Nhóm 6',
    avatar: 'assets/animals/duck.png',
    bgGradient: 'from-purple-100 to-indigo-50',
    borderColor: 'border-purple-300',
    textColor: 'text-black',
    lightBg: 'bg-purple-50',
  },
  {
    id: 'team-7',
    name: 'Nhóm 7',
    avatar: 'assets/animals/hamster.png',
    bgGradient: 'from-slate-100 to-zinc-50',
    borderColor: 'border-slate-300',
    textColor: 'text-black',
    lightBg: 'bg-slate-50',
  },
  {
    id: 'team-8',
    name: 'Nhóm 8',
    avatar: 'assets/animals/monkey.png',
    bgGradient: 'from-yellow-100 to-amber-50',
    borderColor: 'border-yellow-300',
    textColor: 'text-black',
    lightBg: 'bg-yellow-50',
  },
  {
    id: 'team-9',
    name: 'Nhóm 9',
    avatar: 'assets/animals/penguin.png',
    bgGradient: 'from-teal-100 to-emerald-50',
    borderColor: 'border-teal-300',
    textColor: 'text-black',
    lightBg: 'bg-teal-50',
  },
  {
    id: 'team-10',
    name: 'Nhóm 10',
    avatar: 'assets/animals/redpanda.png',
    bgGradient: 'from-rose-100 to-orange-50',
    borderColor: 'border-rose-300',
    textColor: 'text-black',
    lightBg: 'bg-rose-50',
  },
  {
    id: 'team-11',
    name: 'Nhóm 11',
    avatar: 'assets/animals/sheep.png',
    bgGradient: 'from-cyan-100 to-blue-50',
    borderColor: 'border-cyan-300',
    textColor: 'text-black',
    lightBg: 'bg-cyan-50',
  },
  {
    id: 'team-12',
    name: 'Nhóm 12',
    avatar: 'assets/animals/shiba.png',
    bgGradient: 'from-amber-100 to-orange-50',
    borderColor: 'border-amber-300',
    textColor: 'text-black',
    lightBg: 'bg-amber-50',
  },
  {
    id: 'team-13',
    name: 'Nhóm 13',
    avatar: 'assets/animals/tiger.png',
    bgGradient: 'from-red-100 to-pink-50',
    borderColor: 'border-red-300',
    textColor: 'text-black',
    lightBg: 'bg-red-50',
  },
];
