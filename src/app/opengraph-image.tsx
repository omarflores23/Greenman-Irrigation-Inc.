import { ImageResponse } from "next/og";
export const alt =
  "GreenMan Irrigation — Family-owned. Locally rooted. Lynn, Massachusetts.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "72px 90px",
        background: "#174D36",
        color: "#fff",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 26,
          color: "#b4d991",
          letterSpacing: 4,
          display: "flex",
        }}
      >
        GREENMAN IRRIGATION INC.
      </div>
      <div
        style={{
          fontSize: 86,
          lineHeight: 1.07,
          letterSpacing: -4,
          marginTop: 35,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>Good care.</span>
        <span>Greener days.</span>
      </div>
      <div
        style={{
          fontSize: 25,
          color: "#dae8d5",
          marginTop: 40,
          display: "flex",
        }}
      >
        Family-owned. Locally rooted. Lynn, Massachusetts.
      </div>
    </div>,
    size,
  );
}
