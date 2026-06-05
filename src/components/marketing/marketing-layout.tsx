import type { ReactNode } from "react";

/**
 * Marketing shell — wraps every public marketing page (home, features,
 * pricing, etc.). Completely separate from any future dashboard layout:
 * no sidebar, no app chrome, just the dark luxury surface.
 *
 * Usage in a TanStack route component:
 *   <MarketingLayout>...page content...</MarketingLayout>
 *
 * When the first marketing page is added, this can also be promoted to a
 * pathless route at `src/routes/_marketing.tsx` with sibling pages like
 * `src/routes/_marketing.index.tsx` so the layout is shared via <Outlet />.
 */
export function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-pd-black font-sans text-pd-text antialiased">
      {children}
    </div>
  );
}
