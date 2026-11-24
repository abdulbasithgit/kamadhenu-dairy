import { CloseIcon } from "@/components/icons";
import { site } from "@/data/site";
import { getI18n } from "@/i18n/server";
import { DismissPreviewButton } from "./DismissPreviewButton";

export const PREVIEW_DISMISS_KEY = "kamadhenu-preview-banner-dismissed";

/**
 * Small "preview" notice at the very top of every page (only when
 * site.previewMode is true). Once dismissed it stays hidden for that visitor.
 *
 * No flash on reload: the inline script runs before the first paint and marks
 * <html data-preview-dismissed>, which CSS (globals.css) uses to hide the bar.
 */
export async function PreviewBanner() {
  if (!site.previewMode) return null;
  const { t } = await getI18n();
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(localStorage.getItem("${PREVIEW_DISMISS_KEY}"))document.documentElement.setAttribute("data-preview-dismissed","")}catch(e){}`,
        }}
      />
      <div
        role="region"
        aria-label={t.preview.region}
        className="preview-banner relative z-50 bg-navy-900 text-gold-100"
      >
        <p className="px-12 py-2 text-center text-sm font-semibold tracking-wide">
          {t.preview.banner}
        </p>
        <DismissPreviewButton storageKey={PREVIEW_DISMISS_KEY} label={t.preview.dismiss}>
          <CloseIcon size={18} />
        </DismissPreviewButton>
      </div>
    </>
  );
}
