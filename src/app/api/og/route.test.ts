import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("Open Graph image endpoint", () => {
  it("renders a correctly sized PNG and applies each requested text field", async () => {
    const images: Buffer[] = [];
    for (const query of [
      "",
      "?title=A+new+project",
      "?description=Project+preview",
    ]) {
      const response = await GET(
        new Request(`https://xexr.com/api/og${query}`),
      );
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toBe("image/png");
      const png = Buffer.from(await response.arrayBuffer());
      expect(png.subarray(0, 8)).toEqual(
        Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
      );
      expect(png.readUInt32BE(16)).toBe(1200);
      expect(png.readUInt32BE(20)).toBe(630);
      images.push(png);
    }
    expect(images[1]).not.toEqual(images[0]);
    expect(images[2]).not.toEqual(images[0]);
  });
});
