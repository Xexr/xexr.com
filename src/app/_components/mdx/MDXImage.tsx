import Image from "next/image"

import { cn } from "@/lib/utils"

function MDXImage({
  src,
  alt,
  caption,
  width = 800,
  height = 450,
  className,
  ...props
}: {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  className?: string
}) {
  const img = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
        '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect fill="#0d0d0d" width="800" height="450"/></svg>'
      ).toString("base64")}`}
      className={cn("rounded-md", className)}
      {...props}
    />
  )

  if (caption) {
    return (
      <figure data-slot="mdx-image" className="my-6">
        {img}
        <figcaption className="mt-2 text-center text-sm text-[#6a6a6a]">
          {caption}
        </figcaption>
      </figure>
    )
  }

  return (
    <div data-slot="mdx-image" className="my-6">
      {img}
    </div>
  )
}

export { MDXImage }
