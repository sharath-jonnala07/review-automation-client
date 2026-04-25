import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(145deg, #10756D 0%, #0A524C 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Gloss highlight */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 16,
            right: 16,
            height: 2,
            borderRadius: 1,
            background: "rgba(255,255,255,0.32)",
          }}
        />
        {/* ECG waveform */}
        <svg width="112" height="78" viewBox="0 0 112 78" fill="none">
          <path
            d="M4 39 L24 39 L34 10 L46 68 L58 22 L70 54 L82 39 L108 39"
            stroke="white"
            stroke-width="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
