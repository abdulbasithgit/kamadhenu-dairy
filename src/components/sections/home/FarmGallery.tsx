"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/icons";
import { Placeholder } from "@/components/ui/Placeholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gallery, type GalleryItem } from "@/data/home";
import { format } from "@/i18n/format";
import { useI18n } from "@/i18n/I18nProvider";
import { withBasePath } from "@/lib/basePath";
import { cn } from "@/lib/cn";

const shapeClass: Record<GalleryItem["shape"], string> = {
  tall: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[4/3]",
};

/** Masonry grid (CSS columns) + accessible lightbox using native <dialog>. */
export function FarmGallery() {
  const { t } = useI18n();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const count = gallery.length;

  const photo = (item: GalleryItem, sizes: string) => {
    const copy = t.gallery.items[item.id];
    return item.src ? (
      <Image
        src={withBasePath(item.src)}
        alt={copy.alt}
        fill
        sizes={sizes}
        className="object-cover"
      />
    ) : (
      <Placeholder label={copy.placeholder} className="border-0" />
    );
  };

  const show = (i: number) => {
    setOpen(i);
    dialogRef.current?.showModal();
  };
  const close = useCallback(() => dialogRef.current?.close(), []);
  const step = useCallback(
    (delta: number) => setOpen((i) => (i === null ? i : (i + delta + count) % count)),
    [count],
  );

  // Arrow keys move between photos while the lightbox is open
  useEffect(() => {
    if (open === null) return;
    const onKeyDown = ({ key }: KeyboardEvent) => {
      if (key === "ArrowRight") step(1);
      if (key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  const current = open === null ? null : gallery[open];

  return (
    <Section labelledBy="gallery-title">
      <SectionHeading
        id="gallery-title"
        eyebrow={t.gallery.eyebrow}
        title={t.gallery.title}
        intro={t.gallery.intro}
      />

      <ul className="mt-12 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
        {gallery.map((item, i) => (
          <li key={item.id} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              type="button"
              onClick={() => show(i)}
              aria-label={format(t.gallery.open, { name: t.gallery.items[item.id].alt })}
              className={cn(
                "group relative block w-full overflow-hidden rounded-lg border border-gold/40 shadow-softer",
                shapeClass[item.shape],
              )}
            >
              <span className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
                {photo(item, "(min-width: 1024px) 270px, (min-width: 768px) 33vw, 50vw")}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={t.gallery.viewer}
        onClose={() => setOpen(null)}
        onClick={(ev) => {
          // click on the dark backdrop (outside the content) closes
          if (ev.target === ev.currentTarget) close();
        }}
        className="m-auto w-[min(56rem,calc(100vw-2rem))] overflow-visible bg-transparent p-0 backdrop:bg-navy-900/85"
      >
        {current && (
          <figure className="relative rounded-lg border border-gold bg-cream p-2 shadow-soft">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              {photo(current, "(min-width: 900px) 900px, 100vw")}
            </div>
            <figcaption className="flex items-center justify-between gap-2 px-2 pt-3 pb-1 text-sm text-navy">
              <span className="font-semibold">{t.gallery.items[current.id].alt}</span>
              <span className="text-ink-muted tabular-nums">
                {(open ?? 0) + 1} / {count}
              </span>
            </figcaption>

            <button
              type="button"
              onClick={close}
              aria-label={t.gallery.close}
              autoFocus
              className="absolute -top-4 -right-2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold bg-cream text-navy shadow-soft hover:bg-gold-100 sm:-right-4"
            >
              <CloseIcon size={22} />
            </button>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={t.gallery.previous}
              className="absolute top-1/2 left-3 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-navy shadow-soft hover:bg-cream"
            >
              <ChevronLeftIcon size={22} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={t.gallery.next}
              className="absolute top-1/2 right-3 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-navy shadow-soft hover:bg-cream"
            >
              <ChevronRightIcon size={22} />
            </button>
          </figure>
        )}
      </dialog>
    </Section>
  );
}
