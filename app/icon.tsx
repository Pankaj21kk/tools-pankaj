import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(145deg, #f59e0b 0%, #f97316 48%, #0ea5e9 100%)",
          color: "white",
          fontWeight: 800,
          fontSize: 180,
          letterSpacing: -4,
        }}
      >
        PK
      </div>
    ),
    size
  );
}
