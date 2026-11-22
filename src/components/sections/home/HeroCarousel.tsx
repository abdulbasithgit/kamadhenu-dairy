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
import { freeSample, heroSlides } from "@/data/home";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { whatsappLink } from "@/lib/whatsapp";

const INTERVAL_MS = 6000;

/**
 * No layout shift: every slide is rendered on the server and stacked in the
 * same grid cell, so the hero's height is always that of the tallest slide.
 * Only opacity changes between slides.
 */
export function HeroCarousel() {
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
      aria-label="Highlights"
      className="relative overflow-hidden border-b border-gold/30 bg-athangudi"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <h1 className="sr-only">
        {site.name} – {site.tagline}
      </h1>

      <Container className="pt-10 pb-8 sm:pt-14 lg:pt-16">
        <div className="grid" aria-live={running ? "off" : "polite"}>
          {heroSlides.map((slide, i) => {
            const active = i === index;
            return (
              <div
                key={slide.headline}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!active}
                inert={!active}
                className={cn(
                  "col-start-1 row-start-1 grid items-center gap-8 transition-opacity duration-700 ease-out md:grid-cols-[1.1fr_1fr] md:gap-12",
                  active ? "visible opacity-100" : "invisible opacity-0",
                )}
              >
                <div>
                  <p className="mb-3 text-xs font-bold tracking-[0.2em] text-gold-700 uppercase">
                    {slide.eyebrow}
                  </p>
                  <h2 className="text-[2.1rem] leading-[1.15] font-semibold sm:text-5xl lg:text-[3.4rem]">
                    {slide.headline}
                  </h2>
                  <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-muted">
                    {slide.subtext}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
                    <ButtonLink href="/subscribe" size="lg">
                      Subscribe Now <ArrowRightIcon size={18} />
                    </ButtonLink>
                    <ButtonLink
                      href={whatsappLink(freeSample.whatsappMessage)}
                      external
                      variant="gold"
                      size="lg"
                    >
                      Try a Free Sample
                    </ButtonLink>
                  </div>
                </div>

                <ArchFrame className="mx-auto aspect-[4/5] w-full max-w-[17rem] bg-cream-50 sm:max-w-xs md:max-w-sm">
                  {slide.image ? (
                    <Image
                      src={slide.image.src}
                      alt={slide.image.alt}
                      fill
                      preload={i === 0}
                      sizes="(min-width: 768px) 384px, 320px"
                      className="object-cover"
                      style={{ objectPosition: slide.image.position ?? "center" }}
                    />
                  ) : (
                    <Placeholder label={slide.placeholderLabel} className="border-0" />
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
            aria-label="Previous slide"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/70 bg-cream-50 text-navy hover:bg-gold-100"
          >
            <ChevronLeftIcon size={20} />
          </button>

          <ul className="flex items-center" aria-label="Choose slide">
            {heroSlides.map((slide, i) => (
              <li key={slide.headline}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Slide ${i + 1}: ${slide.eyebrow}`}
                  aria-current={i === index ? "true" : undefined}
                  className="group inline-flex h-11 w-8 items-center justify-center"
                >
                  <span
                    className={cn(
                      "block h-2.5 rounded-full transition-all duration-300",
                      i === index
                        ? "w-7 bg-navy"
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
            aria-label="Next slide"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/70 bg-cream-50 text-navy hover:bg-gold-100"
          >
            <ChevronRightIcon size={20} />
          </button>

          {!reduceMotion && (
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
              className="ml-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-navy hover:bg-gold-100"
            >
              {userPaused ? <PlayIcon size={18} /> : <PauseIcon size={18} />}
            </button>
          )}
        </div>
      </Container>
    </section>
  );
}
