"use client";

import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from "@/components/icons";
import { PlaceholderNotice, SampleBadge } from "@/components/ui/PlaceholderNotice";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * Swipeable slider built on native CSS scroll-snap (no slider library,
 * works with touch, trackpad and keyboard). No autoplay.
 */
export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const hasPlaceholders = testimonials.some((t) => t.placeholder);

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const amount = card ? card.getBoundingClientRect().width + 20 : track.clientWidth;
    track.scrollBy({ left: dir * amount, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <Section tone="tile" labelledBy="reviews-title">
      <SectionHeading id="reviews-title" eyebrow="Kind words" title="What families say" />
      {hasPlaceholders && (
        <PlaceholderNotice className="mt-6">
          Sample reviews for layout only – real customer reviews will replace these
        </PlaceholderNotice>
      )}

      <ul
        ref={trackRef}
        aria-label="Customer reviews"
        tabIndex={0}
        className="mt-10 flex snap-x snap-mandatory [scrollbar-width:thin] gap-5 overflow-x-auto scroll-smooth pb-4 motion-reduce:scroll-auto"
      >
        {testimonials.map((t, i) => (
          <li
            key={i}
            className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.84rem)]"
          >
            <figure
              className={cn(
                "flex h-full flex-col rounded-lg bg-cream-50 p-6 shadow-softer",
                t.placeholder
                  ? "border-2 border-dashed border-gold-300"
                  : "border border-gold/40",
              )}
            >
              <div className="flex items-start justify-between">
                <QuoteIcon size={32} className="text-gold" />
                {t.placeholder && <SampleBadge />}
              </div>
              <blockquote
                className={cn(
                  "mt-4 flex-1 text-lg leading-relaxed",
                  t.placeholder ? "text-ink-muted italic" : "text-ink",
                )}
              >
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-gold/30 pt-4">
                <span className="block font-display font-semibold text-navy">
                  {t.name}
                </span>
                <span className="text-sm text-ink-muted">{t.location}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Previous reviews"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/70 bg-cream-50 text-navy hover:bg-gold-100"
        >
          <ChevronLeftIcon size={20} />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Next reviews"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/70 bg-cream-50 text-navy hover:bg-gold-100"
        >
          <ChevronRightIcon size={20} />
        </button>
      </div>
    </Section>
  );
}
