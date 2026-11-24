"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from "@/components/icons";
import { ArchFrame } from "@/components/ui/ArchFrame";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { heroSlides } from "@/data/home";
import { site } from "@/data/site";
import { localizedHref } from "@/i18n/config";
import { format } from "@/i18n/format";
import { useI18n } from "@/i18n/I18nProvider";
import { withBasePath } from "@/lib/basePath";
import { cn } from "@/lib/cn";
import { whatsappHref } from "@/lib/contact";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const INTERVAL_MS = 6000;

const controlClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/70 bg-cream-50 text-navy hover:bg-gold-100";

/**
 * No layout shift: every slide is rendered on the server and stacked in the
 * same grid cell, so the hero's height is always that of the tallest slide.
 * Only opacity changes between slides.
 * Option B (rich-green) shows the hero on a forest-green tile background.
 */
export function HeroCarousel() {
  const { locale, t } = useI18n();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  const count = heroSlides.length;
  // Autoplay is off when the visitor prefers reduced motion
  const autoplay = !reduceMotion && !userPaused;
  const running = autoplay && !hovered && !focused;

  const go = useCallback((i: number) => setIndex((i + count) % count), [count]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [running, count]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t.hero.label}
      className="relative overflow-hidden border-b border-gold/30 bg-athangudi rich:bg-athangudi-forest"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <h1 className="sr-only">
        {site.name} – {t.common.tagline}
      </h1>

      <Container className="pt-10 pb-8 sm:pt-14 lg:pt-16">
        <div className="grid" aria-live={running ? "off" : "polite"}>
          {heroSlides.map((slide, i) => {
            const active = i === index;
            const copy = t.hero.slides[slide.id];
            return (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={format(t.hero.slideOf, { n: i + 1, total: count })}
                aria-hidden={!active}
                inert={!active}
                className={cn(
                  "col-start-1 row-start-1 grid items-center gap-8 transition-opacity duration-700 ease-out md:grid-cols-[1.1fr_1fr] md:gap-12",
                  active ? "visible opacity-100" : "invisible opacity-0",
                )}
              >
                <div>
                  <p className="mb-3 text-xs font-bold tracking-[0.2em] text-gold-700 uppercase rich:text-gold-300 ta:text-sm">
                    {copy.eyebrow}
                  </p>
                  <h2 className="text-[2.1rem] leading-[1.15] font-semibold sm:text-5xl lg:text-[3.4rem] rich:text-cream ta:text-[1.65rem] ta:sm:text-4xl ta:lg:text-[2.5rem]">
                    {copy.headline}
                  </h2>
                  <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-muted rich:text-cream/85 ta:text-base ta:sm:text-lg">
                    {copy.subtext}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
                    <ButtonLink
                      href={localizedHref(locale, "/subscribe")}
                      size="lg"
                      className="rich:bg-cream rich:text-navy rich:hover:bg-gold-100"
                    >
                      {t.common.subscribeNow} <ArrowRightIcon size={18} />
                    </ButtonLink>
                    <ButtonLink
                      href={whatsappHref(t.whatsapp.freeSample)}
                      external
                      variant="gold"
                      size="lg"
                    >
                      {t.common.tryFreeSample}
                    </ButtonLink>
                  </div>
                </div>

                <ArchFrame className="mx-auto aspect-[4/5] w-full max-w-[17rem] bg-cream-50 sm:max-w-xs md:max-w-sm">
                  {slide.image ? (
                    <Image
                      src={withBasePath(slide.image.src)}
                      alt={copy.imageAlt}
                      fill
                      preload={i === 0}
                      sizes="(min-width: 768px) 384px, 320px"
                      className="object-cover"
                      style={{ objectPosition: slide.image.position ?? "center" }}
                    />
                  ) : (
                    <Placeholder label={copy.placeholder} className="border-0" />
                  )}
                </ArchFrame>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-2 md:justify-start">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label={t.hero.previous}
            className={controlClass}
          >
            <ChevronLeftIcon size={20} />
          </button>

          <ul className="flex items-center" aria-label={t.hero.choose}>
            {heroSlides.map((slide, i) => (
              <li key={slide.id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={format(t.hero.goTo, {
                    n: i + 1,
                    name: t.hero.slides[slide.id].eyebrow,
                  })}
                  aria-current={i === index ? "true" : undefined}
                  className="group inline-flex h-11 w-8 items-center justify-center"
                >
                  <span
                    className={cn(
                      "block h-2.5 rounded-full transition-all duration-300",
                      i === index
                        ? "w-7 bg-navy rich:bg-cream"
                        : "w-2.5 bg-gold/60 group-hover:bg-gold",
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label={t.hero.next}
            className={controlClass}
          >
            <ChevronRightIcon size={20} />
          </button>

          {!reduceMotion && (
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? t.hero.play : t.hero.pause}
              className="ml-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-navy hover:bg-gold-100 rich:text-cream rich:hover:bg-white/10"
            >
              {userPaused ? <PlayIcon size={18} /> : <PauseIcon size={18} />}
            </button>
          )}
        </div>
      </Container>
    </section>
  );
}
