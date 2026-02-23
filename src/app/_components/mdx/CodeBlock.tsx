"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Check, ClipboardCopy, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const COLLAPSE_THRESHOLD = 30
const COPY_FEEDBACK_MS = 2000

function stripDecorations(text: string): string {
  return text
    .split("\n")
    .map((line) =>
      line
        .replace(/^\s*\d+\s*[|│]?\s?/, "") // line numbers
        .replace(/^[+-]\s?/, "") // diff markers
    )
    .join("\n")
}

function CodeBlock({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"pre">) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [lineCount, setLineCount] = useState(0)

  useEffect(() => {
    if (!preRef.current) return
    // rehype-pretty-code wraps lines in [data-line] spans
    const lines = preRef.current.querySelectorAll("[data-line]")
    if (lines.length > 0) {
      setLineCount(lines.length)
    } else {
      // Fallback: count newlines in text content
      const text = preRef.current.textContent ?? ""
      setLineCount(text.split("\n").length)
    }
  }, [children])

  const handleCopy = useCallback(async () => {
    const raw = preRef.current?.textContent ?? ""
    const cleaned = stripDecorations(raw)
    await navigator.clipboard.writeText(cleaned)
    setCopied(true)
    setTimeout(() => setCopied(false), COPY_FEEDBACK_MS)
  }, [])

  // Extract filename from data attribute if present
  const dataProps = props as Record<string, unknown>
  const filename =
    typeof dataProps["data-filename"] === "string"
      ? dataProps["data-filename"]
      : undefined

  const shouldCollapse = lineCount > COLLAPSE_THRESHOLD && !expanded

  return (
    <div
      data-slot="code-block"
      className="group/code relative my-6 rounded-[10px] bg-[#0d0d0d]"
    >
      {/* macOS window chrome */}
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        {filename && (
          <span className="ml-2 font-mono text-xs text-[#6a6a6a]">
            {filename}
          </span>
        )}
        <button
          type="button"
          onClick={handleCopy}
          className="ml-auto flex size-[44px] shrink-0 items-center justify-center rounded-md text-[#6a6a6a] transition-colors hover:text-[#e8e8e8]"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <Check className="size-4 text-green-400" />
          ) : (
            <ClipboardCopy className="size-4" />
          )}
        </button>
      </div>

      {/* Code area */}
      <div
        className={cn("overflow-x-auto", {
          "max-h-[calc(30lh+2rem)] overflow-y-hidden": shouldCollapse,
        })}
      >
        <pre
          ref={preRef}
          className={cn(
            "p-4 font-mono text-sm leading-relaxed [&_[data-highlighted-line]]:bg-[var(--accent-dim)]",
            className
          )}
          {...props}
        >
          {children}
        </pre>
      </div>

      {/* Expand/collapse for long blocks */}
      {lineCount > COLLAPSE_THRESHOLD && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="flex w-full items-center justify-center gap-1 border-t border-white/5 py-2 font-mono text-xs text-[#6a6a6a] transition-colors hover:text-[#e8e8e8]"
        >
          {expanded ? (
            <>
              <ChevronUp className="size-3" />
              Collapse
            </>
          ) : (
            <>
              <ChevronDown className="size-3" />
              Expand ({lineCount} lines)
            </>
          )}
        </button>
      )}
    </div>
  )
}

export { CodeBlock }
