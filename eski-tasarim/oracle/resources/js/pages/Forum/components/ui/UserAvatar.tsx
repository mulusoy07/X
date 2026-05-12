interface UserAvatarProps {
  displayName?: string | null
  avatar?: string | null
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  className?: string
}

// Generate consistent color from string
const getColorFromName = (name: string | null | undefined) => {
  const colors = [
    { bg: 'bg-blue-500', from: 'from-blue-500', to: 'to-blue-600' },
    { bg: 'bg-purple-500', from: 'from-purple-500', to: 'to-purple-600' },
    { bg: 'bg-pink-500', from: 'from-pink-500', to: 'to-pink-600' },
    { bg: 'bg-green-500', from: 'from-green-500', to: 'to-green-600' },
    { bg: 'bg-yellow-500', from: 'from-yellow-500', to: 'to-yellow-600' },
    { bg: 'bg-red-500', from: 'from-red-500', to: 'to-red-600' },
    { bg: 'bg-indigo-500', from: 'from-indigo-500', to: 'to-indigo-600' },
    { bg: 'bg-cyan-500', from: 'from-cyan-500', to: 'to-cyan-600' },
    { bg: 'bg-orange-500', from: 'from-orange-500', to: 'to-orange-600' },
    { bg: 'bg-teal-500', from: 'from-teal-500', to: 'to-teal-600' },
  ]

  if (!name) {
    return colors[0] // Default color
  }

  // Hash the name to get a consistent color
  const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0)
  return colors[hash % colors.length]
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
  '2xl': 'w-24 h-24',
  '3xl': 'w-32 h-32',
}

// Text sizes proportional to avatar size
const textSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-lg',
  xl: 'text-2xl',
  '2xl': 'text-4xl',
  '3xl': 'text-5xl',
}

export function UserAvatar({ displayName, avatar, size = 'md', className = '' }: UserAvatarProps) {
  const color = getColorFromName(displayName || null)
  const initial = displayName ? displayName.charAt(0).toUpperCase() : '?'
  const sizeClass = sizeClasses[size]
  const textClass = textSizeClasses[size]

  if (avatar) {
    return (
      <img
        src={avatar}
        alt={displayName || 'User'}
        className={`${sizeClass} rounded-full object-cover flex-shrink-0 ${className}`}
      />
    )
  }

  return (
    <div
      className={`${sizeClass} rounded-full bg-gradient-to-br ${color.from} ${color.to} flex items-center justify-center flex-shrink-0 ${className}`}
    >
      <span className={`font-black text-white ${textClass}`}>
        {initial}
      </span>
    </div>
  )
}
