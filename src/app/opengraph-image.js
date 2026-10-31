import { ImageResponse } from "next/og";

// The image people see when the link is shared on Facebook, Messenger, etc.
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
          background: "#080e1c",
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(3,222,254,0.28), rgba(8,14,28,0) 55%)",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 44,
            fontWeight: 700,
            color: "#03defe",
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
            color: "rgba(255,255,255,0.8)",
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
            background: "#03defe",
            color: "#080e1c",
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
