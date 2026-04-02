"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebar_options = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Customers", link: "/customers" },
  { name: "Appointments", link: "/appointments" },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-[15%] min-h-screen bg-mgm text-white p-4">
      <nav>
        <ul>
          {sidebar_options.map((option) => {

            const isActive = pathname === option.link ||
              pathname.startsWith(`${option.link}/`);
            return (

              <li key={option.name} className="mb-2">
                <Link
                  href={option.link}
                  className={`block px-3 py-2 rounded transition-colors
                    ${isActive
                      ? "bg-mgm text-gold"
                      : "text-white hover:text-gold"
                    }
                  `}
                >
                  {option.name}
                </Link>
              </li>
            );
          })}

        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
