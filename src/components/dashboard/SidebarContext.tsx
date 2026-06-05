import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Ctx = { collapsed: boolean; setCollapsed: (v: boolean) => void };

const SidebarContext = createContext<Ctx>({ collapsed: false, setCollapsed: () => {} });

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsedState] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem("sidebar_collapsed");
      if (v === "1") setCollapsedState(true);
    } catch {}
  }, []);

  const setCollapsed = (v: boolean) => {
    setCollapsedState(v);
    try {
      localStorage.setItem("sidebar_collapsed", v ? "1" : "0");
    } catch {}
  };

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);
