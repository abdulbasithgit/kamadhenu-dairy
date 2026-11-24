"use client";

import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from "@/components/icons";
import { PlaceholderNotice, SampleBadge } from "@/components/ui/PlaceholderNotice";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const arrowClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/70 bg-cream-50 text-navy hover:bg-gold-100";

/**
 * Swipeable slider built on native CSS scroll-snap (no slider library,
 * works with touch, trackpad and keyboard). No autoplay.
 */
export function Testimonials() {
  const { t } = useI18n();
  const trackRef = useRef<HTMLUListElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const hasPlaceholders = testimonials.some((r) => r.placeholder);

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const amount = card ? card.getBoundingClientRect().width + 20 : track.clientWidth;
    track.scrollBy({ left: dir * amount, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <Section tone="tile" labelledBy="reviews-title">
      <SectionHeading
        id="reviews-title"
        eyebrow={t.reviews.eyebrow}
        title={t.reviews.title}
      />
      {hasPlaceholders && (
        <PlaceholderNotice className="mt-6">{t.reviews.notice}</PlaceholderNotice>
      )}

      <ul
        ref={trackRef}
        aria-label={t.reviews.listLabel}
        tabIndex={0}
        className="mt-10 flex snap-x snap-mandatory [scrollbar-width:thin] gap-5 overflow-x-auto scroll-smooth pb-4 motion-reduce:scroll-auto"
      >
        {testimonials.map((review) => {
          const copy = t.reviews.items[review.id];
          return (
            <li
              key={review.id}
              className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.84rem)]"
            >
              <figure
                className={cn(
                  "flex h-full flex-col rounded-lg bg-cream-50 p-6 shadow-softer",
                  review.placeholder
                    ? "border-2 border-dashed border-gold-300"
                    : "border border-gold/40",
                )}
              >
                <div className="flex items-start justify-between">
                  <QuoteIcon size={32} className="text-leaf" />
                  {review.placeholder && <SampleBadge label={t.common.sample} />}
                </div>
                <blockquote
                  className={cn(
                    "mt-4 flex-1 text-lg leading-relaxed ta:text-base",
                    review.placeholder
                      ? "text-ink-muted italic ta:not-italic"
                      : "text-ink",
                  )}
                >
                  {copy.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-gold/30 pt-4">
                  <span className="block font-display font-semibold text-navy ta:font-tamil">
                    {copy.name}
                  </span>
                  <span className="text-sm text-ink-muted">{copy.location}</span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label={t.reviews.previous}
          className={arrowClass}
        >
          <ChevronLeftIcon size={20} />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label={t.reviews.next}
          className={arrowClass}
        >
          <ChevronRightIcon size={20} />
        </button>
      </div>
    </Section>
  );
}
