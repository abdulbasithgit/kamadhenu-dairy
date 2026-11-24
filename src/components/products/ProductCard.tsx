"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import type { Product, ProductSize } from "@/data/products";
import { localizedHref } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { format } from "@/i18n/format";
import { useI18n } from "@/i18n/I18nProvider";
import { withBasePath } from "@/lib/basePath";
import { cn } from "@/lib/cn";
import { whatsappHref } from "@/lib/contact";

export function sizeLabel(size: ProductSize, t: Dictionary) {
  return `${size.amount} ${t.units[size.unit]}`;
}

export function ProductCard({ product }: { product: Product }) {
  const { locale, t } = useI18n();
  const [sizeIndex, setSizeIndex] = useState(0);
  const groupId = useId();
  const copy = t.products.items[product.slug];
  const size = product.sizes[sizeIndex];
  const label = sizeLabel(size, t);
  const href = localizedHref(locale, `/products/${product.slug}`);
  const price =
    size.price === null
      ? t.common.priceOnRequest
      : `₹${size.price.toLocaleString("en-IN")}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-gold/40 bg-cream-50 shadow-softer transition-shadow hover:shadow-soft">
      <Link
        href={href}
        className="relative block aspect-[4/3] overflow-hidden"
        tabIndex={-1}
      >
        {product.image ? (
          <Image
            src={withBasePath(product.image.src)}
            alt={copy.imageAlt}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 92vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ objectPosition: product.image.position ?? "center" }}
          />
        ) : (
          <Placeholder label={copy.placeholder} className="border-0 border-b" />
        )}
        {product.isNew && (
          <span className="absolute top-3 left-3 rounded-full bg-leaf-700 px-3 py-1 text-xs font-bold tracking-wide text-white">
            {t.common.new}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-semibold ta:text-lg">
          <Link href={href} className="hover:text-gold-700">
            {copy.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
          {copy.description}
        </p>

        <fieldset className="mt-4">
          <legend className="mb-2 text-xs font-bold tracking-wider text-navy uppercase">
            {t.common.size}
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s, i) => {
              const checked = i === sizeIndex;
              return (
                <label
                  key={`${s.amount}${s.unit}`}
                  className={cn(
                    "cursor-pointer rounded-full border px-3 py-1.5 text-sm font-semibold whitespace-nowrap transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy",
                    checked
                      ? "border-navy bg-navy text-white"
                      : "border-gold/60 text-navy hover:border-navy",
                  )}
                >
                  <input
                    type="radio"
                    name={`${groupId}-size`}
                    value={i}
                    checked={checked}
                    onChange={() => setSizeIndex(i)}
                    className="sr-only"
                  />
                  {sizeLabel(s, t)}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-gold-700">{price}</p>
          <a
            href={whatsappHref(
              format(t.whatsapp.enquire, { product: copy.name, size: label }),
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("primary", "sm")}
            aria-label={format(t.common.enquireLabel, {
              product: copy.name,
              size: label,
            })}
          >
            <WhatsAppIcon size={16} />
            {t.common.enquire}
          </a>
        </div>
      </div>
    </article>
  );
}
