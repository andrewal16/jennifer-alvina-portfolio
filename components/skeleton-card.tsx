export function SkeletonCard({ aspectRatio = "4 / 3" }: { aspectRatio?: string }) {
  return (
    <>
      {/* COLOR PALETTE UPDATE */}
      <div className="animate-pulse overflow-hidden rounded-xl border border-brand-secondary bg-[var(--bg-card)] shadow-md">
      {/* Performance UX: reserve image space to avoid CLS while data loads. */}
      <div className="bg-brand-primary-light" style={{ aspectRatio }} />
      <div className="space-y-3 p-6">
        <div className="h-4 w-3/4 bg-brand-primary-dark" />
        <div className="h-4 w-full bg-brand-primary-dark" />
        <div className="h-4 w-5/6 bg-brand-primary-dark" />
      </div>
      </div>
    </>
  );
}
