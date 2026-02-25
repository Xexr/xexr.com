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
    try {
      await navigator.clipboard.writeText(cleaned)
    } catch {
      // Fallback for insecure contexts (http://)
      const ta = document.createElement("textarea")
      ta.value = cleaned
      ta.style.position = "fixed"
      ta.style.opacity = "0"
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
    }
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
      className="group/code relative my-6 rounded-[10px] border border-white/10 bg-[#111]"
    >
      {/* Header bar */}
      <div className="flex items-center border-b border-white/10 px-5 py-2">
        {filename && (
          <span className="font-mono text-xs text-[#6a6a6a]">
            {filename}
          </span>
        )}
        <button
          type="button"
          onClick={handleCopy}
          className="ml-auto flex size-8 shrink-0 items-center justify-center rounded-md text-[#6a6a6a] transition-colors hover:text-[#e8e8e8]"
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
        className={cn("overflow-x-auto px-6 py-5", {
          "max-h-[calc(30lh+2rem)] overflow-y-hidden": shouldCollapse,
        })}
      >
        <pre
          ref={preRef}
          className={cn(
            "font-mono text-sm leading-relaxed [&_[data-highlighted-line]]:bg-[var(--accent-dim)]",
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
