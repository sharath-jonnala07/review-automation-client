import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 9,
          background: "linear-gradient(145deg, #10756D 0%, #0A524C 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.28)",
        }}
      >
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
          <path
            d="M1 7 L4.5 7 L6.5 2 L8.5 12 L10.5 4 L12.5 9.5 L14.5 7 L19 7"
            stroke="white"
            stroke-width="1.9"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
