import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  image,
  imageAlt,
  video,
  graphic,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
  video?: string;
  graphic?: ReactNode;
}) {
  const hasMedia = !!(video ?? image ?? graphic);

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 h-[400px] opacity-50"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />
      <div className="container-wide relative pb-20 pt-28 md:pb-28 md:pt-36">
        <div className={hasMedia ? "grid items-center gap-12 lg:grid-cols-[1fr_auto]" : undefined}>
          {/* left: text content */}
          <div>
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

          {/* right: graphic / video / image */}
          {hasMedia && (
            <div className="hidden lg:flex lg:items-center lg:justify-end lg:-translate-x-16">
              {graphic ? (
                graphic
              ) : (
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-3xl" />
                  {video ? (
                    <video
                      src={video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="relative h-96 w-96 rounded-2xl object-contain drop-shadow-[0_0_40px_rgba(99,179,237,0.2)]"
                    />
                  ) : (
                    <img
                      src={image}
                      alt={imageAlt ?? title}
                      className="relative h-96 w-96 object-contain drop-shadow-[0_0_40px_rgba(99,179,237,0.2)]"
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
