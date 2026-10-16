// Google Analytics 4 helper.
// The Measurement ID comes from VITE_GA_MEASUREMENT_ID (format: G-XXXXXXXXXX).
// If it is not set, every function here quietly does nothing, so local
// development and preview builds never send fake data to your real property.

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as
  | string
  | undefined;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialised = false;

export const initAnalytics = () => {
  if (initialised || !MEASUREMENT_ID || typeof window === "undefined") return;
  initialised = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  // gtag.js needs the real `arguments` object, not an array of arguments.
  // eslint-disable-next-line prefer-rest-params
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  // We send page views ourselves on every route change (see AnalyticsTracker),
  // because this is a single page app and the browser never reloads.
  window.gtag("config", MEASUREMENT_ID, { send_page_view: false });
};

export const trackPageView = (path: string) => {
  if (!MEASUREMENT_ID || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
};

// Use this for any action you want to count, for example:
// trackEvent("select_plan", { plan: "LOCAL_MONTHLY" })
export const trackEvent = (
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
) => {
  if (!MEASUREMENT_ID || !window.gtag) return;
  window.gtag("event", name, params);
};

// Links activity to one logged-in person across devices.
// Only ever pass an internal ID, never an email or phone number.
export const setAnalyticsUser = (userId?: string | null) => {
  if (!MEASUREMENT_ID || !window.gtag) return;
  window.gtag("set", { user_id: userId ?? undefined });
};
