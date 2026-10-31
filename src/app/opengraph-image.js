import { ImageResponse } from "next/og";

// The image people see when the link is shared on Facebook, Messenger, etc.
// Colors match the site theme (graphite background, lime signal accent).
export const alt = "BinDev | Websites, web apps & custom software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0B0F14",
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(184,255,61,0.22), rgba(11,15,20,0) 55%)",
          color: "#EAEFF7",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 44,
            fontWeight: 700,
            color: "#B8FF3D",
          }}
        >
          {"<BD/>"}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 110,
            fontWeight: 800,
            marginTop: 16,
          }}
        >
          BinDev
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            marginTop: 20,
            maxWidth: 900,
            color: "#9BA6B5",
          }}
        >
          Websites, web apps and custom software for small businesses.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 52,
            alignSelf: "flex-start",
            padding: "18px 40px",
            borderRadius: 999,
            background: "#B8FF3D",
            color: "#0B0F14",
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          Book a free call
        </div>
      </div>
    ),
    { ...size }
  );
}
