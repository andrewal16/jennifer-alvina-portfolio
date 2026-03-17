export function SkeletonCard({ aspectRatio = "4 / 3" }: { aspectRatio?: string }) {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_4px_6px_-1px_rgba(0,33,71,0.06),0_2px_4px_-2px_rgba(0,33,71,0.04)]">
      {/* Performance UX: reserve image space to avoid CLS while data loads. */}
      <div className="bg-primary-100" style={{ aspectRatio }} />
      <div className="space-y-3 p-6">
        <div className="h-4 w-3/4 bg-slate-200" />
        <div className="h-4 w-full bg-slate-200" />
        <div className="h-4 w-5/6 bg-slate-200" />
      </div>
    </div>
  );
}
