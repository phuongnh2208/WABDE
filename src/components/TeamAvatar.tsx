import React from 'react';

interface TeamAvatarProps {
  avatar: string;
  name?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const TeamAvatar: React.FC<TeamAvatarProps> = ({
  avatar,
  name = 'Nhóm',
  className = '',
  size = 'md',
}) => {
  const isImage =
    Boolean(avatar) &&
    (avatar.startsWith('/') ||
      avatar.includes('.png') ||
      avatar.includes('.jpg') ||
      avatar.includes('http'));

  const sizeClasses = {
    xs: 'w-5 h-5',
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-10 h-10 sm:w-12 sm:h-12',
    lg: 'w-13 h-13 sm:w-16 sm:h-16',
    xl: 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28',
  }[size];

  if (isImage) {
    return (
      <img
        src={avatar}
        alt={name}
        className={`${sizeClasses} object-contain filter drop-shadow-xs select-none transition-transform pointer-events-none ${className}`}
        referrerPolicy="no-referrer"
        onError={(e) => {
          // If image fails, fallback to a neat animal icon or hidden
          const target = e.target as HTMLImageElement;
          target.style.opacity = '0.5';
        }}
      />
    );
  }

  // Fallback if legacy emoji string
  const emojiSizeClasses = {
    xs: 'text-sm',
    sm: 'text-lg',
    md: 'text-3xl',
    lg: 'text-4xl sm:text-5xl',
    xl: 'text-5xl sm:text-6xl md:text-7xl',
  }[size];

  return (
    <span className={`${emojiSizeClasses} filter drop-shadow-xs select-none inline-block ${className}`}>
      {avatar}
    </span>
  );
};
