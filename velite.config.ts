import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { createHighlighter, type ThemeRegistrationRaw } from "shiki";
import { defineCollection, defineConfig, s } from "velite";

// Custom Shiki theme: string literals use var(--accent) so code blocks
// reflect the active Vibe colour. All other tokens are theme-neutral grays.
const vibeTheme: ThemeRegistrationRaw = {
  name: "xexr-vibe",
  type: "dark",
  colors: {
    "editor.background": "#050505",
    "editor.foreground": "#e8e8e8",
  },
  settings: [
    { settings: { foreground: "#e8e8e8" } },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#6a6a6a", fontStyle: "italic" },
    },
    {
      scope: ["keyword", "keyword.control", "storage.type", "storage.modifier"],
      settings: { foreground: "#b0b0b0" },
    },
    {
      scope: [
        "string",
        "string.quoted.double",
        "string.quoted.single",
        "string.template",
        "string.quoted.template",
      ],
      settings: { foreground: "var(--accent)" },
    },
    {
      scope: ["constant.numeric", "constant.language", "constant.character"],
      settings: { foreground: "#c0c0c0" },
    },
    {
      scope: ["entity.name.function", "support.function"],
      settings: { foreground: "#d0d0d0" },
    },
    {
      scope: [
        "entity.name.type",
        "support.type",
        "entity.name.class",
        "support.class",
      ],
      settings: { foreground: "#c0c0c0" },
    },
    {
      scope: ["variable", "variable.other", "support.variable"],
      settings: { foreground: "#e8e8e8" },
    },
    {
      scope: ["entity.name.tag", "punctuation.definition.tag", "meta.tag"],
      settings: { foreground: "#b0b0b0" },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: "#a0a0a0" },
    },
    {
      scope: ["punctuation", "meta.brace"],
      settings: { foreground: "#8a8a8a" },
    },
    {
      scope: [
        "keyword.operator",
        "keyword.operator.assignment",
        "keyword.operator.arrow",
      ],
      settings: { foreground: "#a0a0a0" },
    },
  ],
};

const posts = defineCollection({
  name: "Post",
  pattern: "posts/*/index.mdx",
  schema: s
    .object({
      title: s.string(),
      description: s.string(),
      date: s.string(),
      updated: s.string().optional(),
      tags: s.array(s.string()),
      draft: s.boolean().default(false),
      featured: s.boolean().default(false),
      image: s.string().optional(),
      readingTime: s.number().optional(),
      body: s.mdx(),
      meta: s.metadata(),
      filePath: s.path(),
    })
    .transform(({ meta, filePath, readingTime: manualReadingTime, ...rest }) => {
      const slug = filePath.replace(/^posts\//, "");
      return {
        ...rest,
        slug,
        url: `/posts/${slug}`,
        readingTime: manualReadingTime ?? Math.ceil(meta.wordCount / 238),
      };
    }),
});

const projects = defineCollection({
  name: "Project",
  pattern: "projects/*.yaml",
  schema: s.object({
    name: s.string(),
    description: s.string(),
    url: s.string().optional(),
    repo: s.string().optional(),
    techStack: s.array(s.string()),
    status: s.enum(["active", "maintained", "shelved", "archived"]),
    featured: s.boolean(),
    tags: s.array(s.string()),
  }),
});

const books = defineCollection({
  name: "Book",
  pattern: "bookshelf/*.yaml",
  schema: s.object({
    title: s.string(),
    author: s.string(),
    status: s.enum(["reading", "finished", "want-to-read"]),
    thoughts: s.string().optional(),
    link: s.string().optional(),
    dateFinished: s.string().optional(),
  }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
  },
  collections: { posts, projects, books },
  mdx: {
    gfm: false,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "xexr-vibe",
          keepBackground: false,
          getHighlighter: (options: Parameters<typeof createHighlighter>[0]) =>
            createHighlighter({ ...options, themes: [vibeTheme] }),
        },
      ],
    ],
  },
});
