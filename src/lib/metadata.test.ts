import { describe, expect, it } from "vitest";
import { generatePageMetadata } from "./metadata";

describe("page metadata", () => {
  it("uses page overrides consistently in search and social previews", () => {
    const result = generatePageMetadata({
      title: "A new project",
      description: "A project by Dane",
      image: "https://images.example/project.png",
    });
    expect(result.title).toBe("A new project");
    expect(result.description).toBe("A project by Dane");
    for (const preview of [result.openGraph, result.twitter]) {
      expect(preview).toMatchObject({
        title: "A new project",
        description: "A project by Dane",
        images: ["https://images.example/project.png"],
      });
    }
  });

  it("explicitly prevents indexing and following when a page opts out", () => {
    expect(
      generatePageMetadata({ title: "Private", noIndex: true }).robots,
    ).toEqual({ index: false, follow: false });
    expect(generatePageMetadata({ title: "Public" }).robots).toBeUndefined();
  });
});
