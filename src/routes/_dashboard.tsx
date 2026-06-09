import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { SidebarProvider, useSidebar } from "@/components/dashboard/SidebarContext";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_dashboard")({
  component: DashboardLayout,
});

function Inner() {
  const { collapsed } = useSidebar();
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate({ to: "/login" });
  }, [loading, isAuthenticated, navigate]);

  if (loading || !isAuthenticated) {
    return <div className="min-h-screen bg-[#06060F]" />;
  }

  return (
    <div className="flex min-h-screen bg-[#06060F] font-sans">
      <AppSidebar />
      <div
        className={cn(
          "flex flex-col flex-1 min-w-0 overflow-x-hidden transition-all duration-200 ease-in-out",
          collapsed ? "ml-14" : "ml-[232px]",
        )}
      >
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function DashboardLayout() {
  return (
    <SidebarProvider>
      <Inner />
    </SidebarProvider>
  );
}
