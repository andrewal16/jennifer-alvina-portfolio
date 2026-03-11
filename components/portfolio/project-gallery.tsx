"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ProjectGalleryProps = {
  images: string[];
  projectTitle: string;
};

function getGalleryCardClass(index: number) {
  const pattern = index % 5;

  if (pattern === 0) return "md:col-span-7 aspect-[4/5]";
  if (pattern === 1) return "md:col-span-5 aspect-[4/3]";
  if (pattern === 2) return "md:col-span-5 aspect-[4/3]";
  if (pattern === 3) return "md:col-span-4 aspect-[3/4]";
  return "md:col-span-8 aspect-[16/10]";
}

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? current : (current + 1) % images.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? current
            : (current - 1 + images.length) % images.length,
        );
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, images.length]);

  const activeImage = activeIndex !== null ? images[activeIndex] : null;
  const activeFrameLabel =
    activeIndex === null ? "01" : (activeIndex + 1).toString().padStart(2, "0");

  function showPrevious() {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + images.length) % images.length;
    });
  }

  function showNext() {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % images.length;
    });
  }

  return (
    <>
      <div className="mt-10 grid gap-4 md:grid-cols-12 lg:gap-5">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`${getGalleryCardClass(index)} group relative block overflow-hidden bg-stone-200 text-left`}
            aria-label={`Open ${projectTitle} gallery image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${projectTitle} gallery image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent px-4 py-4">
              <div className="flex items-end justify-between gap-4 text-stone-50">
                <span className="text-[11px] uppercase tracking-[0.18em]">
                  Frame {(index + 1).toString().padStart(2, "0")}
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-stone-200">
                  Click to Expand
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeImage ? (
        <div
          className="fixed inset-0 z-[100] bg-black/88 px-4 py-4 backdrop-blur-sm md:px-6 md:py-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${projectTitle} image preview`}
          onClick={() => setActiveIndex(null)}
        >
          <div className="mx-auto flex h-full w-full max-w-7xl flex-col">
            <div className="flex items-center justify-between gap-4 border-b border-white/12 pb-4 text-stone-100">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400">
                  {projectTitle}
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-stone-100">
                  Frame {activeFrameLabel} /{" "}
                  {images.length.toString().padStart(2, "0")}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="border border-white/20 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-stone-100 transition-colors hover:border-white/60"
                aria-label="Close image preview"
              >
                Close
              </button>
            </div>

            <div
              className="relative flex min-h-0 flex-1 items-center justify-center py-6"
              onClick={(event) => event.stopPropagation()}
            >
              {images.length > 1 ? (
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 border border-white/18 bg-black/25 px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-stone-100 transition-colors hover:border-white/50 md:block"
                  aria-label="Show previous image"
                >
                  Prev
                </button>
              ) : null}

              <div className="relative h-full min-h-[55vh] w-full">
                <Image
                  src={activeImage}
                  alt={`${projectTitle} gallery image ${activeFrameLabel}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {images.length > 1 ? (
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 border border-white/18 bg-black/25 px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-stone-100 transition-colors hover:border-white/50 md:block"
                  aria-label="Show next image"
                >
                  Next
                </button>
              ) : null}
            </div>

            {images.length > 1 ? (
              <div
                className="flex items-center justify-center gap-3 border-t border-white/12 pt-4 md:hidden"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={showPrevious}
                  className="border border-white/18 px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-stone-100"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="border border-white/18 px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-stone-100"
                >
                  Next
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
