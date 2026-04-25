import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Pulse — Know what customers feel before the metrics confess.";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#071C1B",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* ── Background orbs ── */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 580,
            height: 580,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,117,109,0.45) 0%, transparent 70%)",
            filter: "blur(0px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -140,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,117,109,0.28) 0%, transparent 70%)",
          }}
        />
        {/* Dot grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(16,117,109,0.18) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        {/* Center vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(7,28,27,0.62) 100%)",
          }}
        />

        {/* ── Content ── */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: "56px 72px",
            height: "100%",
          }}
        >
          {/* Top bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: "linear-gradient(145deg, #10756D 0%, #0A524C 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.12)",
                }}
              >
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                  <path
                    d="M2 10 L6 10 L9 3 L12 17 L15 6 L18 13 L21 10 L26 10"
                    stroke="white"
                    stroke-width="2.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#F0FAF9",
                  letterSpacing: "-0.3px",
                }}
              >
                Pulse
              </span>
            </div>

            {/* Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(16,117,109,0.18)",
                border: "1px solid rgba(16,117,109,0.4)",
                borderRadius: 999,
                padding: "8px 18px",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#4ECDC4",
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#7DD8D2",
                  letterSpacing: "0.06em",
                }}
              >
                AI REVIEW INTELLIGENCE
              </span>
            </div>
          </div>

          {/* Main headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
              gap: 0,
              marginTop: -12,
            }}
          >
            <div
              style={{
                fontSize: 82,
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: "-2px",
                color: "#F0FAF9",
              }}
            >
              Know what
            </div>
            <div
              style={{
                fontSize: 82,
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: "-2px",
                color: "#F0FAF9",
              }}
            >
              customers feel —
            </div>
            <div
              style={{
                fontSize: 82,
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: "-2px",
                color: "#10756D",
              }}
            >
              before metrics confess.
            </div>

            {/* Subtext */}
            <div
              style={{
                marginTop: 28,
                fontSize: 22,
                fontWeight: 400,
                color: "rgba(240,250,249,0.52)",
                lineHeight: 1.5,
                maxWidth: 680,
              }}
            >
              Verified quotes, ranked themes, and stakeholder-ready reports —
              generated in 8 minutes, not 8 hours.
            </div>
          </div>

          {/* Bottom metrics strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              paddingTop: 28,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {[
              ["18k", "reviews per run"],
              ["8 min", "scrape to report"],
              ["$0.50", "hard cost ceiling"],
              ["100%", "quotes verified"],
            ].map(([metric, label], i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 22px",
                  background: "rgba(16,117,109,0.10)",
                  border: "1px solid rgba(16,117,109,0.22)",
                  borderRadius: 999,
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#4ECDC4",
                  }}
                >
                  {metric}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: "rgba(240,250,249,0.45)",
                    fontWeight: 400,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
