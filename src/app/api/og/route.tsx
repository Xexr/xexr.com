import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/siteConfig";

export const runtime = "edge";

/**
 * Dynamic OG image generation endpoint.
 *
 * Usage: /api/og?title=Your+Page+Title&description=Optional+description
 *
 * @example
 * // In your page metadata:
 * export const metadata = generatePageMetadata({
 *   title: "Dashboard",
 *   image: `/api/og?title=${encodeURIComponent("Dashboard")}`,
 * });
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? siteConfig.name;
  const description = searchParams.get("description") ?? siteConfig.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#030712",
          padding: "40px 80px",
        }}
      >
        {/* Gradient background accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          {/* Site name badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 24px",
              borderRadius: "9999px",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              border: "1px solid rgba(59, 130, 246, 0.2)",
              marginBottom: "32px",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                color: "#60a5fa",
                fontWeight: 600,
              }}
            >
              {siteConfig.name}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#f9fafb",
              lineHeight: 1.1,
              marginBottom: "24px",
              maxWidth: "900px",
            }}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "28px",
              color: "#9ca3af",
              maxWidth: "700px",
              lineHeight: 1.4,
            }}
          >
            {description}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
