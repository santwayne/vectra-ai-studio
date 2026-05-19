import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 h-[400px] opacity-50"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />
      <div className="container-wide relative pb-20 pt-28 md:pb-28 md:pt-36">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
          <span className="text-gradient">{title}</span>
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
