import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Optional: simple brand SVGs (lightweight)
const GmailSVG = () => (
  <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden>
    <path fill="#EA4335" d="M24 26.6 6.4 13.2A3 3 0 0 1 8 8.9h32a3 3 0 0 1 1.6 4.3L24 26.6z"/>
    <path fill="#34A853" d="M8 10v26a4 4 0 0 0 4 4h4V18.2z"/>
    <path fill="#4285F4" d="M36 40a4 4 0 0 0 4-4V10l-8 8.2V40z"/>
    <path fill="#FBBC05" d="M24 22 8 10l16 22 16-22z"/>
  </svg>
);

const OutlookSVG = () => (
  <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden>
    <rect x="6" y="10" width="20" height="28" rx="2" fill="#0078D4"/>
    <rect x="12" y="14" width="16" height="20" rx="1" fill="#fff"/>
    <rect x="26" y="10" width="16" height="28" rx="2" fill="#0A5EB0"/>
    <path d="M12 18a8 8 0 1 0 16 0a8 8 0 1 0-16 0" fill="#0078D4"/>
    <circle cx="20" cy="18" r="5" fill="#fff"/>
  </svg>
);

const YahooSVG = () => (
  <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden>
    <rect x="6" y="10" width="36" height="28" rx="4" fill="#430297"/>
    <text x="24" y="29" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">Y!</text>
  </svg>
);

// const ProtonSVG = () => (
//   <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden>
//     <rect x="6" y="10" width="36" height="28" rx="4" fill="#6D4AFF"/>
//     <path d="M14 34V16l10 7 10-7v18z" fill="#fff"/>
//   </svg>
// );

const IcloudSVG = () => (
  <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden>
    <rect x="6" y="10" width="36" height="28" rx="6" fill="#0D87FF"/>
    <path d="M30 31h-9a5 5 0 1 1 1.3-9.8A6.5 6.5 0 0 1 35 23a4 4 0 1 1-5 8z" fill="#fff"/>
  </svg>
);

const ZohoSVG = () => (
  <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden>
    <rect x="8" y="12" width="8" height="8" rx="1" fill="#E11D48"/>
    <rect x="20" y="12" width="8" height="8" rx="1" fill="#F59E0B"/>
    <rect x="32" y="12" width="8" height="8" rx="1" fill="#10B981"/>
    <rect x="14" y="24" width="20" height="10" rx="2" fill="#2563EB"/>
  </svg>
);

// const AOLSVG = () => (
//   <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden>
//     <rect x="6" y="10" width="36" height="28" rx="4" fill="#111827"/>
//     <text x="24" y="29" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">AOL</text>
//   </svg>
// );

// const YandexSVG = () => (
//   <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden>
//     <rect x="6" y="10" width="36" height="28" rx="4" fill="#DC2626"/>
//     <text x="24" y="29" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">Y</text>
//   </svg>
// );

const GenericMailSVG = () => (
  <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden>
    <rect x="6" y="10" width="36" height="28" rx="4" fill="#4B5563"/>
    <path d="M10 16l14 10L38 16" stroke="#fff" strokeWidth="2" fill="none"/>
  </svg>
);

export type ProviderKey =
  | "gmail"
  | "outlook"
  | "yahoo"
  | "icloud"
  | "proton"
  | "zoho"
  | "aol"
  | "yandex"
  | "custom";

export type EmailProvider = {
  key: ProviderKey;
  name: string;
  url: string; // where to open
  Icon: React.FC;
  domains?: string[]; // known domains to auto-suggest
};

const PROVIDERS: EmailProvider[] = [
  {
    key: "gmail",
    name: "Gmail",
    url: "https://mail.google.com/",
    Icon: GmailSVG,
    domains: ["gmail.com", "googlemail.com"]
  },
  {
    key: "outlook",
    name: "Outlook / Live",
    url: "https://outlook.live.com/",
    Icon: OutlookSVG,
    domains: ["outlook.com", "hotmail.com", "live.com", "msn.com"]
  },
  { key: "yahoo", name: "Yahoo Mail", url: "https://mail.yahoo.com/", Icon: YahooSVG, domains: ["yahoo.com"] },
  { key: "icloud", name: "iCloud Mail", url: "https://www.icloud.com/mail", Icon: IcloudSVG, domains: ["icloud.com", "me.com", "mac.com"] },
  // { key: "proton", name: "Proton Mail", url: "https://mail.proton.me/", Icon: ProtonSVG, domains: ["proton.me", "protonmail.com"] },
  { key: "zoho", name: "Zoho Mail", url: "https://mail.zoho.com/", Icon: ZohoSVG, domains: ["zoho.com"] },
  // { key: "aol", name: "AOL Mail", url: "https://mail.aol.com/", Icon: AOLSVG, domains: ["aol.com"] },
  // { key: "yandex", name: "Yandex Mail", url: "https://mail.yandex.com/", Icon: YandexSVG, domains: ["yandex.com", "yandex.ru"] },
  { key: "custom", name: "Other Provider", url: "about:blank", Icon: GenericMailSVG },
];

function inferProviderByEmail(email?: string): EmailProvider | null {
  if (!email) return null;
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return null;
  const found = PROVIDERS.find(p => p.domains?.includes(domain));
  return found ?? null;
}

function openInNewTab(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export type EmailProvidersPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string; // to highlight suggested provider
  resendVerification?: () => Promise<void> | void; // optional callback
};

const Backdrop: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div
    onClick={onClick}
    className="fixed inset-0 z-40 backdrop-blur-sm"
    aria-hidden
  />
);

const ModalCard: React.FC<React.PropsWithChildren> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96, y: 12 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.98, y: 8 }}
    transition={{ type: "spring", stiffness: 260, damping: 22 }}
    role="dialog"
    aria-modal="true"
    className="fixed inset-x-0 top-20 z-50 mx-auto w-[min(680px,92vw)] rounded-2xl bg-white p-5 shadow-2xl outline outline-1 -outline-offset-1 outline-gray-100 dark:bg-neutral-900 dark:outline-neutral-800"
  >
    {children}
  </motion.div>
);

const ProviderButton: React.FC<{
  provider: EmailProvider;
  suggested?: boolean;
}> = ({ provider, suggested }) => (
  <button
    onClick={() => openInNewTab(provider.url)}
    className="group flex items-center gap-3 rounded-2xl border border-gray-200 p-3 transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 dark:border-neutral-800"
    aria-label={`Open ${provider.name}`}
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white ring-1 ring-gray-200 dark:bg-neutral-900 dark:ring-neutral-700">
      <provider.Icon />
    </div>
    <div className="flex flex-col text-left">
      <span className="text-sm font-semibold leading-5">{provider.name}</span>
      <span className="text-xs text-gray-500 group-hover:underline">Open in new tab</span>
    </div>
    {suggested && (
      <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
        Suggested
      </span>
    )}
  </button>
);

const Divider: React.FC = () => (
  <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-neutral-800" />
);

export default function EmailProvidersPopup({ isOpen, onClose, userEmail, resendVerification }: EmailProvidersPopupProps) {
  const suggested = inferProviderByEmail(userEmail || undefined)?.key;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Backdrop onClick={onClose} />
          <ModalCard>
            <div className="flex flex-col max-h-[90vh] sm:max-h-none overflow-y-auto items-start justify-between gap-1">
              <div className="flex w-full items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Verify your email</h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    We sent a verification link to
                    {" "}
                    <span className="font-medium text-gray-900 dark:text-gray-100">{userEmail || "your address"}</span>.
                    {" "}Choose your provider to open your inbox.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:hover:bg-neutral-800"
                  aria-label="Close"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <Divider />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 w-full">
                {PROVIDERS.filter(p => p.key !== "custom").map((p) => (
                  <ProviderButton key={p.key} provider={p} suggested={suggested === p.key} />
                ))}
              </div>

              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                Don’t see your provider? Try the button below.
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2 w-full">
                <button
                  onClick={() => openInNewTab("https://mail.google.com/")}
                  className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
                >
                  Open webmail
                </button>
                <button
                  onClick={() => openInNewTab("mailto:")}
                  className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
                >
                  Open default mail app
                </button>
                {resendVerification && (
                  <button
                    onClick={() => void resendVerification()}
                    className="ml-auto rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Resend email
                  </button>
                )}
              </div>

              <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                Tip: If it’s not in your inbox, check Promotions/Spam. You can safely close this and come back after verifying.
              </p>
            </div>
          </ModalCard>
        </>
      )}
    </AnimatePresence>
  );
}
