import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
          background:
            "linear-gradient(145deg, #E0FBFC 0%, #48CAE4 48%, #00B4D8 100%)",
          color: "white",
          fontWeight: 800,
          fontSize: 64,
          letterSpacing: -2,
        }}
      >
        PK
      </div>
    ),
    size
  );
}
