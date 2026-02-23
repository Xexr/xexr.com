"use client";

import { useMemo } from "react";
import * as runtime from "react/jsx-runtime";
import type { MDXComponents } from "mdx/types";

import { useMDXComponents } from "../../../../mdx-components";

// Velite compiles MDX to a code string that must be executed via Function().
// This is the documented pattern — not an arbitrary eval.
// eslint-disable-next-line @typescript-eslint/no-implied-eval
const toComponent = (code: string) => new Function(code);

export function MDXContent({ code }: { code: string }) {
  const components = useMDXComponents({});
  const Component = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- Velite MDX runtime pattern
    () => toComponent(code)({ ...runtime }).default as React.FC<{ components: MDXComponents }>,
    [code],
  );
  return <Component components={components} />;
}
