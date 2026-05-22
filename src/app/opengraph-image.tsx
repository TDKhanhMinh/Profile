import { ImageResponse } from "next/og";

export const alt = "Trần Đỗ Khánh Minh Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #020617 0%, #0f172a 58%, #064e3b 100%)",
          color: "#f8fafc",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: 72,
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ color: "#4ade80", fontSize: 34, fontWeight: 700 }}>
            Web Developer / Full-stack Developer
          </div>
          <div style={{ fontSize: 78, fontWeight: 800, letterSpacing: 0, lineHeight: 1 }}>
            Trần Đỗ Khánh Minh
          </div>
          <div style={{ color: "#cbd5e1", fontSize: 34 }}>
            Next.js • Spring Boot • AWS • IoT
          </div>
        </div>
      </div>
    ),
    size,
  );
}
