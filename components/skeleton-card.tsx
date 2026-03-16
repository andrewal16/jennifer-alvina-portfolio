export function SkeletonCard({ aspectRatio = "4 / 3" }: { aspectRatio?: string }) {
  return (
    <div className="animate-pulse overflow-hidden rounded-[28px] border border-stone-200/80 bg-white/80">
      {/* Performance UX: reserve image space to avoid CLS while data loads. */}
      <div className="bg-stone-200" style={{ aspectRatio }} />
      <div className="space-y-3 p-6">
        <div className="h-4 w-3/4 bg-stone-200" />
        <div className="h-4 w-full bg-stone-200" />
        <div className="h-4 w-5/6 bg-stone-200" />
      </div>
    </div>
  );
}
