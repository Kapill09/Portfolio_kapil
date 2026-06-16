interface CloudShapeProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  style?: React.CSSProperties
}

const sizeMap = {
  sm: { width: '120px', height: '50px' },
  md: { width: '200px', height: '80px' },
  lg: { width: '320px', height: '120px' },
}

export function CloudShape({ className = '', size = 'md', style }: CloudShapeProps) {
  const { width, height } = sizeMap[size]

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{ ...style, willChange: 'transform' }}
      aria-hidden="true"
    >
      <div
        className="relative"
        style={{ width, height, willChange: 'transform' }}
      >
        {/* Main cloud body */}
        <div
          className="absolute rounded-full bg-[#e2e8f0] dark:bg-[#c9d1d9]"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            filter: 'blur(10px)',
          }}
        />
        {/* Cloud puff left */}
        <div
          className="absolute rounded-full bg-[#e2e8f0] dark:bg-[#c9d1d9]"
          style={{
            width: '60%',
            height: '80%',
            left: '-15%',
            top: '10%',
            borderRadius: '50%',
            filter: 'blur(8px)',
          }}
        />
        {/* Cloud puff right */}
        <div
          className="absolute rounded-full bg-[#e2e8f0] dark:bg-[#c9d1d9]"
          style={{
            width: '55%',
            height: '75%',
            right: '-10%',
            top: '15%',
            borderRadius: '50%',
            filter: 'blur(8px)',
          }}
        />
        {/* Cloud puff top */}
        <div
          className="absolute rounded-full bg-[#f1f5f9] dark:bg-[#e6edf3]"
          style={{
            width: '40%',
            height: '60%',
            left: '30%',
            top: '-20%',
            borderRadius: '50%',
            filter: 'blur(8px)',
          }}
        />
      </div>
    </div>
  )
}
