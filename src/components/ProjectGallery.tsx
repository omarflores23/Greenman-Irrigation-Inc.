"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import type { PhotoAsset, PhotoCategory } from "@/data/greenmanGallery";

type Filter = "All Work" | PhotoCategory;
const filters: Filter[] = [
  "All Work",
  "Irrigation",
  "Landscaping",
  "Site Preparation",
  "Operations",
];

export function ProjectGallery({
  photos,
  initialCategory,
}: {
  photos: PhotoAsset[];
  initialCategory?: string;
}) {
  const [filter, setFilter] = useState<Filter>(
    () =>
      filters.find((category) => category === initialCategory) ?? "All Work",
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const captionId = useId();
  const filteredPhotos = useMemo(
    () =>
      photos.filter(
        (photo) => filter === "All Work" || photo.category === filter,
      ),
    [filter, photos],
  );
  const isOpen = activeIndex !== null;
  const activePhoto =
    activeIndex === null ? undefined : filteredPhotos[activeIndex];

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [isOpen]);

  function closeLightbox() {
    setActiveIndex(null);
  }

  function movePhoto(direction: number) {
    setActiveIndex((index) =>
      index === null || filteredPhotos.length === 0
        ? null
        : (index + direction + filteredPhotos.length) % filteredPhotos.length,
    );
  }

  function handleKeys(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      movePhoto(event.key === "ArrowRight" ? 1 : -1);
    }
    if (event.key === "Tab") {
      const focusable = Array.from(
        event.currentTarget.querySelectorAll<HTMLButtonElement>(
          "button:not(:disabled)",
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  }

  return (
    <div>
      <div
        className="gallery-filters"
        role="group"
        aria-label="Filter project photographs"
      >
        {filters.map((category) => {
          const count =
            category === "All Work"
              ? photos.length
              : photos.filter((photo) => photo.category === category).length;
          return (
            <button
              key={category}
              type="button"
              className={`button ${filter === category ? "active" : ""}`}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category} <span aria-hidden="true">({count})</span>
              <span className="sr-only">, {count} photographs</span>
            </button>
          );
        })}
      </div>
      <p className="gallery-result-count" role="status" aria-live="polite">
        {filteredPhotos.length}{" "}
        {filteredPhotos.length === 1 ? "photograph" : "photographs"} · {filter}
      </p>
      <div className="gallery-grid">
        {filteredPhotos.map((photo, index) => (
          <figure key={photo.id} className="gallery-card">
            <button
              type="button"
              className="gallery-media"
              aria-label={`Open image: ${photo.alt}`}
              aria-haspopup="dialog"
              onClick={(event) => {
                openerRef.current = event.currentTarget;
                setActiveIndex(index);
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 44vw, 320px"
                style={{
                  objectFit: "contain",
                  objectPosition: photo.objectPosition,
                }}
              />
            </button>
            <figcaption className="gallery-caption">
              <span className="eyebrow">{photo.category}</span>
              <p>{photo.alt}</p>
              <span className="gallery-view-label" aria-hidden="true">
                View photograph ↗
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      {filteredPhotos.length === 0 && (
        <p>No photographs are available in this category.</p>
      )}
      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-labelledby={titleId}
        aria-describedby={captionId}
        onCancel={(event) => {
          event.preventDefault();
          closeLightbox();
        }}
        onKeyDown={handleKeys}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeLightbox();
        }}
      >
        {activePhoto && (
          <div className="lightbox-body">
            <div className="lightbox-controls">
              <p id={titleId}>
                {activePhoto.category} · {(activeIndex ?? 0) + 1} of{" "}
                {filteredPhotos.length}
              </p>
              <button
                type="button"
                className="button"
                onClick={closeLightbox}
                autoFocus
                aria-label="Close image viewer"
              >
                Close ×
              </button>
            </div>
            <Image
              className="lightbox-image"
              src={activePhoto.src}
              alt={activePhoto.alt}
              width={activePhoto.width}
              height={activePhoto.height}
              sizes="(max-width: 640px) 90vw, 512px"
              style={{
                objectFit: "contain",
                objectPosition: activePhoto.objectPosition,
              }}
            />
            <div className="gallery-caption" id={captionId}>
              <p>{activePhoto.alt}</p>
              <p className="photo-source">
                Source: {activePhoto.sourceVideo} ·{" "}
                {activePhoto.timestampSeconds.toFixed(2)} seconds
              </p>
            </div>
            <div className="lightbox-controls">
              <button
                type="button"
                className="button"
                onClick={() => movePhoto(-1)}
                disabled={filteredPhotos.length < 2}
                aria-label="Previous image"
              >
                ← Previous
              </button>
              <span className="lightbox-keyboard-hint">
                Use arrow keys to browse
              </span>
              <button
                type="button"
                className="button"
                onClick={() => movePhoto(1)}
                disabled={filteredPhotos.length < 2}
                aria-label="Next image"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}

export default ProjectGallery;
