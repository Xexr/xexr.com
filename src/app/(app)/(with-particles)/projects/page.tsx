import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Route } from "next";
import { Badge } from "@components/ui/badge";
import { generatePageMetadata } from "@/lib/metadata";
import { allProjects, type Project } from "@/lib/content";

export const metadata: Metadata = generatePageMetadata({
  title: "Projects",
  description: "Things I'm building, maintaining, and have shipped.",
});

const statusConfig: Record<
  Project["status"],
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "bg-accent/15 text-accent border-accent/25",
  },
  maintained: {
    label: "Maintained",
    className: "bg-accent/8 text-accent/70 border-accent/15",
  },
  shelved: {
    label: "Shelved",
    className: "bg-muted text-muted-foreground border-border",
  },
  archived: {
    label: "Archived",
    className: "bg-muted/50 text-muted-foreground/60 border-border/50",
  },
};

function ProjectRow({ project }: { project: Project }) {
  const status = statusConfig[project.status] ?? statusConfig.active;

  return (
    <div className="group relative rounded-lg border border-transparent px-4 py-4 transition-colors hover:border-border">
      {/* Bottom accent line — grows on hover (matches PostCard) */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-400 ease-out group-hover:scale-x-100"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5">
            <h2 className="text-foreground text-base font-semibold tracking-tight transition-colors duration-400 group-hover:text-accent">
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5"
                >
                  {project.name}
                  <ExternalLink className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              ) : (
                project.name
              )}
            </h2>
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[0.65rem] font-medium ${status.className}`}
            >
              {status.label}
            </span>
          </div>

          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            {project.description}
          </p>

          {/* Tech stack badges */}
          {project.techStack.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {project.techStack.map((tech: string) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-[0.65rem]"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          )}

          {/* Tags — link to /posts?tag=X for cross-discovery */}
          {project.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/posts?tag=${encodeURIComponent(tag)}` as Route}
                  className="text-muted-foreground hover:text-accent text-[0.6rem] transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <article className="mx-auto max-w-[740px] px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Projects</h1>
      <p className="text-muted-foreground mb-8">
        Things I&apos;m building, maintaining, and have shipped.
      </p>

      <div className="flex flex-col divide-y divide-border/50">
        {allProjects.map((project) => (
          <ProjectRow key={project.name} project={project} />
        ))}
      </div>
    </article>
  );
}
