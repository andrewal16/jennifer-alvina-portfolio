"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ProjectImage } from "@/lib/types";

type ProjectGalleryProps = {
  images: ProjectImage[];
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
      <div className="mt-10 grid gap-4 md:grid-cols-12 lg:gap-5">
        {images.map((image, index) => (
          <button
            key={`${image.url}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`${getGalleryCardClass(index)} group relative block overflow-hidden bg-stone-200 text-left`}
            aria-label={`Open ${projectTitle} gallery image ${index + 1}`}
          >
            <Image
              src={image.url}
              alt={image.alt || `${projectTitle} gallery image ${index + 1}`}
              fill
              placeholder={image.lqip ? "blur" : "empty"}
              blurDataURL={image.lqip}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
