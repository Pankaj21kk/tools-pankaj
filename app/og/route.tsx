import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 12% 16%, #E0FBFC 0%, transparent 40%), radial-gradient(circle at 88% 20%, #CAF0F8 0%, transparent 35%), linear-gradient(145deg, #ADE8F4 0%, #48CAE4 48%, #00B4D8 100%)",
          color: "#111827",
          padding: "64px",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            alignSelf: "flex-start",
            border: "2px solid rgba(17,24,39,0.25)",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.86)",
            padding: "8px 16px",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Pankaj Portfolio Toolkit
        </div>

        <div style={{ maxWidth: "88%", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 68, lineHeight: 1.04, fontWeight: 800, color: "#0f172a" }}>
            Professional Tools Directory
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.25, color: "#111827" }}>
            Software and AI tools for creators, designers, developers, researchers, and game builders.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#111827",
          }}
        >
          <span>pankaj-tools-portfolio.vercel.app</span>
          <span>SEO + PWA Ready</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
