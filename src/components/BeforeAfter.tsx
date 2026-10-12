"use client";

import Image from "next/image";
import { useId, useState } from "react";

type ComparisonImage = { src: string; alt: string };
type BeforeAfterProps = {
  before: ComparisonImage;
  after: ComparisonImage;
  caption: string;
};

/** Render only owner-approved, confirmed same-site image pairs. */
export function BeforeAfter({ before, after, caption }: BeforeAfterProps) {
  const [reveal, setReveal] = useState(50);
  const sliderId = useId();
  const captionId = useId();

  return (
    <figure className="before-after">
      <div
        className="comparison-images"
        style={{
          position: "relative",
          aspectRatio: "512 / 910",
          maxWidth: 512,
          width: "100%",
          overflow: "hidden",
          marginInline: "auto",
        }}
      >
        <Image
          src={before.src}
          alt={`Before: ${before.alt}`}
          width={512}
          height={910}
          sizes="(max-width: 640px) 90vw, 512px"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: `inset(0 ${100 - reveal}% 0 0)`,
          }}
        >
          <Image
            src={after.src}
            alt={`After: ${after.alt}`}
            width={512}
            height={910}
            sizes="(max-width: 640px) 90vw, 512px"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        <div
          className="comparison-divider"
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${reveal}%`,
            width: 3,
            background: "#fff",
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        />
      </div>
      <div className="comparison-controls">
        <div className="comparison-labels">
          <span>After</span>
          <span>Before</span>
        </div>
        <label htmlFor={sliderId}>Compare before and after photographs</label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={100}
          step={1}
          value={reveal}
          onChange={(event) => setReveal(Number(event.target.value))}
          aria-valuetext={`${reveal}% of the after photograph visible`}
          aria-describedby={captionId}
        />
        <p>
          Move the slider or use the arrow keys to reveal the after photograph.
        </p>
      </div>
      <figcaption id={captionId}>{caption}</figcaption>
    </figure>
  );
}

export default BeforeAfter;
