"use client"

import { useEffect, useRef } from "react"

function isCanvasSupported() {
  if (typeof document === "undefined") return false
  try {
    return !!document.createElement("canvas").getContext("2d")
  } catch {
    return false
  }
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

function getParticleCount(width: number): number {
  return width < 768 ? 40 : 60 + Math.round((width / 1920) * 40)
}

function parseColor(raw: string): [number, number, number] {
  const hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(raw.trim())
  if (hex) {
    return [
      parseInt(hex[1] ?? "0", 16),
      parseInt(hex[2] ?? "0", 16),
      parseInt(hex[3] ?? "0", 16),
    ]
  }
  return [0, 255, 136]
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!isCanvasSupported()) return
    const el = canvasRef.current
    if (!el) return
    const context = el.getContext("2d")
    if (!context) return

    // Stable references for closures (TS doesn't narrow these in nested functions)
    const canvas: HTMLCanvasElement = el
    const ctx: CanvasRenderingContext2D = context

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const isTouch = "ontouchstart" in window

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let mouseX = -200
    let mouseY = -200
    let animationId = 0

    function readAccentColor(): string {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim()
      return raw || "#00ff88"
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = getParticleCount(width)
      if (particles.length !== count) {
        initParticles(count)
      }
    }

    function initParticles(count: number) {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      const [r, g, b] = parseColor(readAccentColor())
      const connectionDistance = 90
      const mouseRadius = 100

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!

        if (!reducedMotion) {
          p.x += p.vx
          p.y += p.vy

          if (p.x < 0 || p.x > width) p.vx *= -1
          if (p.y < 0 || p.y > height) p.vy *= -1

          p.x = Math.max(0, Math.min(width, p.x))
          p.y = Math.max(0, Math.min(height, p.y))

          if (!isTouch) {
            const dx = p.x - mouseX
            const dy = p.y - mouseY
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < mouseRadius && dist > 0) {
              const force = (mouseRadius - dist) / mouseRadius
              p.x += (dx / dist) * force * 2
              p.y += (dy / dist) * force * 2
            }
          }
        }

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]!
          const dx = p.x - other.x
          const dy = p.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDistance) {
            const opacity = 1 - dist / connectionDistance
            ctx.strokeStyle = `rgba(${r},${g},${b},${opacity * 0.15})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        }

        ctx.fillStyle = `rgba(${r},${g},${b},0.4)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }

      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.2,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.55
      )
      gradient.addColorStop(0, "rgba(0,0,0,0)")
      gradient.addColorStop(1, "rgba(0,0,0,1)")
      ctx.globalCompositeOperation = "destination-out"
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
      ctx.globalCompositeOperation = "source-over"

      if (!reducedMotion) {
        animationId = requestAnimationFrame(draw)
      }
    }

    function onMouseMove(e: MouseEvent) {
      if (isTouch) return
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    function onMouseLeave() {
      mouseX = -200
      mouseY = -200
    }

    function onVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(animationId)
      } else if (!reducedMotion) {
        animationId = requestAnimationFrame(draw)
      }
    }

    resize()

    if (reducedMotion) {
      draw()
    } else {
      animationId = requestAnimationFrame(draw)
    }

    window.addEventListener("resize", resize)
    if (!isTouch) {
      canvas.addEventListener("mousemove", onMouseMove)
      canvas.addEventListener("mouseleave", onMouseLeave)
    }
    document.addEventListener("visibilitychange", onVisibilityChange)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      if (!isTouch) {
        canvas.removeEventListener("mousemove", onMouseMove)
        canvas.removeEventListener("mouseleave", onMouseLeave)
      }
      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-slot="particle-canvas"
      className="pointer-events-auto absolute inset-0 -z-10"
    />
  )
}
