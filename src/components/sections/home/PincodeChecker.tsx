"use client";

import { useId, useState, type FormEvent } from "react";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { format } from "@/i18n/format";
import { useI18n } from "@/i18n/I18nProvider";
import { whatsappHref } from "@/lib/contact";

type Result =
  | { kind: "idle" }
  | { kind: "invalid" }
  | { kind: "yes"; areaId: string; pincode: string }
  | { kind: "no"; pincode: string };

/** Simple client-side lookup against the pincodes in src/data/site.ts. */
export function PincodeChecker() {
  const { locale, t } = useI18n();
  const c = t.delivery.checker;
  const inputId = useId();
  const [value, setValue] = useState("");
  const [result, setResult] = useState<Result>({ kind: "idle" });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const pincode = value.trim();
    if (!/^\d{6}$/.test(pincode)) return setResult({ kind: "invalid" });
    const area = site.deliveryAreas.find((a) => a.pincodes.includes(pincode));
    setResult(area ? { kind: "yes", areaId: area.id, pincode } : { kind: "no", pincode });
  };

  const areaName =
    result.kind === "yes"
      ? site.deliveryAreas.find((a) => a.id === result.areaId)?.name[locale]
      : undefined;

  return (
    <div className="rounded-lg border border-gold bg-cream-50 p-6 shadow-softer sm:p-8">
      <h3 className="text-subhead ta:text-xl">{c.title}</h3>
      <form
        onSubmit={onSubmit}
        className="mt-5 flex flex-col gap-3 sm:flex-row"
        noValidate
      >
        <label htmlFor={inputId} className="sr-only">
          {c.label}
        </label>
        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={6}
          placeholder={c.placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value.replace(/\D/g, ""));
            if (result.kind !== "idle") setResult({ kind: "idle" });
          }}
          aria-invalid={result.kind === "invalid"}
          aria-describedby={`${inputId}-result`}
          className="min-h-12 min-w-0 flex-1 rounded-lg border border-gold/70 bg-white px-4 text-lg tracking-widest text-ink placeholder:tracking-normal placeholder:text-ink-muted/70 focus:border-navy ta:placeholder:text-base"
        />
        <Button type="submit" size="lg">
          {c.button}
        </Button>
      </form>

      <div
        id={`${inputId}-result`}
        aria-live="polite"
        className="mt-4 min-h-14 text-base"
      >
        {result.kind === "invalid" && (
          <p className="font-semibold text-red-800">{c.invalid}</p>
        )}
        {result.kind === "yes" && (
          <p className="flex items-start gap-2 font-semibold text-leaf-700">
            <CheckIcon size={22} className="mt-0.5 shrink-0" />
            {format(c.yes, { area: areaName ?? "", pincode: result.pincode })}
          </p>
        )}
        {result.kind === "no" && (
          <div>
            <p className="text-ink">{format(c.no, { pincode: result.pincode })}</p>
            <a
              href={whatsappHref(format(t.whatsapp.pincode, { pincode: result.pincode }))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 font-semibold text-navy underline decoration-gold underline-offset-4 hover:text-gold-700"
            >
              <WhatsAppIcon size={18} />
              {c.ask}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
