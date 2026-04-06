"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sidebar_options = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Customers", link: "/customers" },
  { name: "Appointments", link: "/appointments" },
  { name: "Commissions", link: "/commissions" },
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setIsMdUp(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const navHiddenFromSr = !isMdUp && !isOpen;

  return (
    <>
      <div
        role="presentation"
        className={cn(
          "fixed inset-0 top-20 z-40 bg-black/50 transition-opacity md:hidden",
          isOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside
        id="app-sidebar-nav"
        className={cn(
          "flex min-h-[calc(100vh-5rem)] w-64 max-w-[85vw] shrink-0 flex-col bg-mgm p-4 text-white shadow-xl transition-transform duration-200 ease-out md:max-w-none md:shadow-none",
          "fixed left-0 top-20 z-50 md:static md:z-auto md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
        aria-hidden={navHiddenFromSr}
      >
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 md:hidden">
          <span className="text-sm font-semibold text-gold">Menu</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1">
          <ul>
            {sidebar_options.map((option) => {
              const isActive =
                pathname === option.link ||
                pathname.startsWith(`${option.link}/`);
              return (
                <li key={option.name} className="mb-2">
                  <Link
                    href={option.link}
                    onClick={onClose}
                    className={cn(
                      "block rounded px-3 py-2 transition-colors",
                      isActive
                        ? "bg-black/20 text-gold"
                        : "text-white hover:text-gold",
                    )}
                  >
                    {option.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
