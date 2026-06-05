import { Outlet, createFileRoute } from "@tanstack/react-router";

/**
 * Pathless marketing layout — completely separate from any future dashboard.
 * Renders children only; no sidebar, no app chrome.
 * Child routes go in src/routes/_marketing.*.tsx (e.g. _marketing.index.tsx).
 */
export const Route = createFileRoute("/_marketing")({
  component: MarketingLayout,
});

function MarketingLayout() {
  return (
    <div className="min-h-screen bg-pd-black text-pd-text font-sans antialiased">
      <Outlet />
    </div>
  );
}
