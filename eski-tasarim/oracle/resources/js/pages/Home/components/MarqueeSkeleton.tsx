interface MarqueeSkeletonProps {
  count?: number
}

export function MarqueeSkeleton({ count = 3 }: MarqueeSkeletonProps) {
  return (
    <div className="flex items-center w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <span key={idx} className="text-sm text-ko-text-muted leading-relaxed inline-flex items-center w-full">
          <span className="inline-block h-[23px] flex-1 bg-ko-text-muted/30 rounded animate-pulse" />
          <span className="inline-flex items-center justify-center mx-4 text-xs font-semibold text-ko-brand-primary/80">
            <span className="inline-block h-[15px] w-2 bg-ko-brand-primary/30 rounded animate-pulse" />
          </span>
        </span>
      ))}
    </div>
  )
}
