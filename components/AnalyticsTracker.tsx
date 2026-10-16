import { useEffect } from "react";
import type { createBrowserRouter } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import {
  initAnalytics,
  trackPageView,
  setAnalyticsUser,
} from "../services/analytics";

type AppRouter = ReturnType<typeof createBrowserRouter>;

// Renders nothing. Loads Google Analytics once, sends a page view every time
// the route changes, and tags activity with the logged-in user's internal ID.
const AnalyticsTracker = ({ router }: { router: AppRouter }) => {
  const { user } = useAuth();

  useEffect(() => {
    initAnalytics();

    let lastPath = "";
    const send = (path: string) => {
      if (path !== lastPath) {
        lastPath = path;
        trackPageView(path);
      }
    };

    send(router.state.location.pathname + router.state.location.search);

    return router.subscribe((state) => {
      if (state.navigation.state === "idle") {
        send(state.location.pathname + state.location.search);
      }
    });
  }, [router]);

  useEffect(() => {
    setAnalyticsUser(user?.id);
  }, [user?.id]);

  return null;
};

export default AnalyticsTracker;
