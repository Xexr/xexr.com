import type { MDXComponents } from "mdx/types"
import { ExternalLink } from "lucide-react"

import { CodeBlock } from "@/app/_components/mdx/CodeBlock"
import { Callout } from "@/app/_components/mdx/Callout"
import { MDXImage } from "@/app/_components/mdx/MDXImage"

function isExternalUrl(href: string): boolean {
  return /^https?:\/\//.test(href)
}

function Anchor({
  href = "",
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (isExternalUrl(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-baseline gap-0.5"
        {...props}
      >
        {children}
        <ExternalLink
          className="inline size-3 shrink-0 self-center"
          aria-hidden="true"
        />
      </a>
    )
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre: (props: React.ComponentPropsWithoutRef<"pre">) => (
      <CodeBlock {...props} />
    ),
    a: Anchor,
    Callout,
    MDXImage,
    ...components,
  }
}
