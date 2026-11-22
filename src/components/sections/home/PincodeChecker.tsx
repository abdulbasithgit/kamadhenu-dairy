"use client";

import { useId, useState, type FormEvent } from "react";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

type Result =
  | { kind: "idle" }
  | { kind: "invalid" }
  | { kind: "yes"; area: string; pincode: string }
  | { kind: "no"; pincode: string };

function findArea(pincode: string) {
  return site.deliveryAreas.find((a) =>
    (a.pincodes as readonly string[]).includes(pincode),
  );
}

/** Simple client-side lookup against the pincodes in src/data/site.ts. */
export function PincodeChecker() {
  const inputId = useId();
  const [value, setValue] = useState("");
  const [result, setResult] = useState<Result>({ kind: "idle" });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const pincode = value.trim();
    if (!/^\d{6}$/.test(pincode)) return setResult({ kind: "invalid" });
    const area = findArea(pincode);
    setResult(area ? { kind: "yes", area: area.name, pincode } : { kind: "no", pincode });
  };

  return (
    <div className="rounded-lg border border-gold bg-cream-50 p-6 shadow-softer sm:p-8">
      <h3 className="text-2xl font-semibold">Check if we deliver to you</h3>
      <form
        onSubmit={onSubmit}
        className="mt-5 flex flex-col gap-3 sm:flex-row"
        noValidate
      >
        <label htmlFor={inputId} className="sr-only">
          Your 6-digit pincode
        </label>
        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={6}
          placeholder="Enter your pincode"
          value={value}
          onChange={(e) => {
            setValue(e.target.value.replace(/\D/g, ""));
            if (result.kind !== "idle") setResult({ kind: "idle" });
          }}
          aria-invalid={result.kind === "invalid"}
          aria-describedby={`${inputId}-result`}
          className="min-h-12 flex-1 rounded-lg border border-gold/70 bg-white px-4 text-lg tracking-widest text-ink placeholder:tracking-normal placeholder:text-ink-muted/70 focus:border-navy"
        />
        <Button type="submit" size="lg">
          Check
        </Button>
      </form>

      <div
        id={`${inputId}-result`}
        aria-live="polite"
        className="mt-4 min-h-14 text-base"
      >
        {result.kind === "invalid" && (
          <p className="font-semibold text-red-800">
            Please enter a valid 6-digit pincode.
          </p>
        )}
        {result.kind === "yes" && (
          <p className="flex items-start gap-2 font-semibold text-leaf">
            <CheckIcon size={22} className="mt-0.5 shrink-0" />
            Good news – we deliver to {result.area} ({result.pincode})!
          </p>
        )}
        {result.kind === "no" && (
          <div>
            <p className="text-ink">
              We don&apos;t deliver to {result.pincode} yet, but we are adding new routes.
            </p>
            <a
              href={whatsappLink(
                `Hello, do you deliver to pincode ${result.pincode}? Please let me know when you do.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 font-semibold text-navy underline decoration-gold underline-offset-4 hover:text-gold-700"
            >
              <WhatsAppIcon size={18} />
              Ask us on WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
