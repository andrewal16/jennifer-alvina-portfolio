"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { ProjectImage } from "@/lib/types";

type ProjectGalleryProps = {
  images: ProjectImage[];
  projectTitle: string;
};

function getGalleryCardClass(index: number) {
  if (index === 0) return "aspect-[4/5] md:row-span-2 md:h-full";
  if (index % 3 === 0) return "aspect-[4/5]";
  return "aspect-[4/3]";
}

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const goToNextImage = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? current : (current + 1) % images.length,
    );
  }, [images.length]);

  const goToPreviousImage = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? current : (current - 1 + images.length) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") goToNextImage();
      if (event.key === "ArrowLeft") goToPreviousImage();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, goToNextImage, goToPreviousImage]);

  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      <div className="mt-6 grid gap-2 md:mt-7 md:grid-cols-2 md:gap-3">
        {images.map((image, index) => (
          <button
            key={`${image.url}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`${getGalleryCardClass(index)} group relative block overflow-hidden rounded-lg bg-stone-200 text-left`}
            aria-label={`Open ${projectTitle} gallery image ${index + 1}`}
          >
            <Image
              src={image.url}
              alt={image.alt || `${projectTitle} gallery image ${index + 1}`}
              fill
              placeholder={image.lqip ? "blur" : "empty"}
              blurDataURL={image.lqip}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 560px"
            />
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
          <div
            className="relative h-full min-h-[55vh] w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeImage.url}
              alt={activeImage.alt || `${projectTitle} full image`}
              fill
              placeholder={activeImage.lqip ? "blur" : "empty"}
              blurDataURL={activeImage.lqip}
              className="object-contain"
              sizes="100vw"
            />

            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close gallery"
              className="absolute right-3 top-3 rounded-full bg-black/65 px-3 py-2 text-sm font-semibold text-white shadow-lg ring-1 ring-white/35 transition hover:bg-black/85 md:right-5 md:top-5"
            >
              Close ✕
            </button>

            <button
              type="button"
              onClick={goToPreviousImage}
              disabled={images.length <= 1}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/65 px-3 py-2 text-sm font-semibold text-white shadow-lg ring-1 ring-white/35 transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-45 md:left-5"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={goToNextImage}
              disabled={images.length <= 1}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/65 px-3 py-2 text-sm font-semibold text-white shadow-lg ring-1 ring-white/35 transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-45 md:right-5"
            >
              Next →
            </button>

            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium tracking-wide text-white ring-1 ring-white/30 md:bottom-5 md:text-sm">
              {(activeIndex ?? 0) + 1} / {images.length}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
