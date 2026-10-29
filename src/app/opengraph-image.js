import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#151713", padding: "66px", color: "#f1f1e9" }}>
      <div style={{ display: "flex", fontSize: 30 }}>{site.name}<span style={{ color: "#c2ef73" }}>.</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 78, letterSpacing: "-4px", lineHeight: 1.1 }}><span>{site.hero.title}</span><span style={{ color: "#c2ef73" }}>{site.hero.accent}</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #41443a", paddingTop: 25, fontSize: 22 }}><span>{site.role}</span><span>7+ years of web experience</span></div>
    </div>,
    size,
  );
}
