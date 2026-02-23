import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/siteConfig";

export const runtime = "edge";

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}

/**
 * Dynamic OG image generation endpoint.
 *
 * Usage: /api/og?title=Post+Title&description=A+subtitle&date=2026-01-15&tags=AI,Next.js
 */
export async function GET(request: Request) {
  const fontCss = await fetch(
    "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700&display=swap",
    { headers: { "User-Agent": "Mozilla/5.0" } }
  ).then((res) => res.text());

  const fontUrl =
    /src:\s*url\(([^)]+)\)\s*format\('woff2'\)/.exec(fontCss)?.[1];

  const fontData = fontUrl
    ? await fetch(fontUrl).then((r) => r.arrayBuffer())
    : null;

  const { searchParams } = new URL(request.url);
  const rawTitle = searchParams.get("title") ?? siteConfig.name;
  const title = truncate(rawTitle, 80);
  const description = searchParams.get("description") ?? siteConfig.tagline;
  const date = searchParams.get("date");
  const tags = searchParams.get("tags")?.split(",").filter(Boolean) ?? [];

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
          backgroundColor: "#050505",
          fontFamily: '"Plus Jakarta Sans", sans-serif',
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
              "radial-gradient(circle at 25% 25%, rgba(0, 255, 136, 0.15) 0%, transparent 50%)",
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
              backgroundColor: "rgba(0, 255, 136, 0.08)",
              border: "1px solid rgba(0, 255, 136, 0.25)",
              marginBottom: "32px",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                color: "#00ff88",
                fontWeight: 500,
              }}
            >
              {siteConfig.name}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#f9fafb",
              lineHeight: 1.1,
              marginBottom: "24px",
              maxWidth: "1000px",
            }}
          >
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p
              style={{
                fontSize: "28px",
                color: "#9ca3af",
                maxWidth: "800px",
                lineHeight: 1.4,
                marginBottom: date || tags.length > 0 ? "32px" : "0",
              }}
            >
              {description}
            </p>
          )}

          {/* Date and tags row */}
          {(date !== null || tags.length > 0) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {date && (
                <span style={{ fontSize: "20px", color: "#6b7280" }}>
                  {date}
                </span>
              )}
              {tags.length > 0 && (
                <div style={{ display: "flex", gap: "8px" }}>
                  {tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "16px",
                        color: "#00ff88",
                        padding: "4px 12px",
                        borderRadius: "9999px",
                        border: "1px solid rgba(0, 255, 136, 0.25)",
                      }}
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fontData
        ? [
            {
              name: "Plus Jakarta Sans",
              data: fontData,
              weight: 700,
              style: "normal" as const,
            },
          ]
        : undefined,
    }
  );
}
