"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? current : (current + 1) % images.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null ? current : (current - 1 + images.length) % images.length,
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
          <div className="relative h-full min-h-[55vh] w-full" onClick={(event) => event.stopPropagation()}>
            <Image
              src={activeImage.url}
              alt={activeImage.alt || `${projectTitle} full image`}
              fill
              placeholder={activeImage.lqip ? "blur" : "empty"}
              blurDataURL={activeImage.lqip}
              className="object-contain"
              // Performance: lightbox always fills viewport width.
              sizes="100vw"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
