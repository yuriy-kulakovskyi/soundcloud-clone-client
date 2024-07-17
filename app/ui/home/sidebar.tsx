"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import Box from "@/app/ui/home/box";
import SidebarItem from "@/app/ui/home/sidebar-item";
import Library from "@/app/ui/home/library";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();

  const routes = useMemo(() => [
    {
      icon: HiHome,
      label: "Home",
      active: pathname !== "/search",
      href: "/"
    },
    {
      icon: BiSearch,
      label: "Search",
      active: pathname === "/search",
      href: "/search"
    }
  ], [pathname]);

  return (
    <div className="flex h-full">
      <div 
        className="
          hidden
          md:flex
          flex-col
          gap-y-2
          bg-black-900
          h-full
          w-[300px]
          p-2
        "
      >
        <Box className="overflow-hidden">
          <div 
            className="
              flex 
              flex-col
              gap-y-4
              px-5
              py-4
            ">
              {
                routes.map((item) => {
                  return (
                    <SidebarItem 
                      key={item.label}
                      {...item}
                    />
                  );
                })
              }
           </div>
        </Box>
        <Box className="overflow-y-auto h-screen">
          <Library />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">
        {children}
      </main>
    </div>
  );
}

export default Sidebar;