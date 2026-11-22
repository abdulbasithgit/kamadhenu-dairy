"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";
import { withBasePath } from "@/lib/basePath";
import { whatsappLink } from "@/lib/whatsapp";

function formatPrice(price: number | null) {
  return price === null ? "Price on request" : `₹${price.toLocaleString("en-IN")}`;
}

export function ProductCard({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const groupId = useId();
  const href = `/products/${product.slug}`;
  const message = `Hello, I would like to enquire about ${product.name} (${size.label}).`;

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
            alt={product.image.alt}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 92vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ objectPosition: product.image.position ?? "center" }}
          />
        ) : (
          <Placeholder label={product.placeholderLabel} className="border-0 border-b" />
        )}
        {product.isNew && (
          <span className="absolute top-3 left-3 rounded-full bg-leaf px-3 py-1 text-xs font-bold tracking-wide text-white">
            New
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-semibold">
          <Link href={href} className="hover:text-gold-700">
            {product.name}
          </Link>
        </h3>
        <p lang="ta" className="font-tamil text-sm text-gold-700">
          {product.tamilName}
        </p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
          {product.shortDescription}
        </p>

        <fieldset className="mt-4">
          <legend
            id={groupId}
            className="mb-2 text-xs font-bold tracking-wider text-navy uppercase"
          >
            Size
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => {
              const checked = s.label === size.label;
              return (
                <label
                  key={s.label}
                  className={cn(
                    "cursor-pointer rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy",
                    checked
                      ? "border-navy bg-navy text-white"
                      : "border-gold/60 text-navy hover:border-navy",
                  )}
                >
                  <input
                    type="radio"
                    name={`${groupId}-size`}
                    value={s.label}
                    checked={checked}
                    onChange={() => setSize(s)}
                    className="sr-only"
                  />
                  {s.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-gold-700">{formatPrice(size.price)}</p>
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("primary", "sm")}
            aria-label={`Enquire about ${product.name} ${size.label} on WhatsApp (opens in a new tab)`}
          >
            <WhatsAppIcon size={16} />
            Enquire
          </a>
        </div>
      </div>
    </article>
  );
}
