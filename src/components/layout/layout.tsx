"use client";

import React from "react";
import { Button, Link, ScrollShadow, Spacer, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";

import { Logo } from "./logo";
import { sectionItemsWithTeams } from "./sidebar-items";
import SidebarDrawer from "./sidebar-drawer";
import Sidebar from "./sidebar";
import { NavUser } from "../nav-user";
/**
 * 💡 TIP: You can use the usePathname hook from Next.js App Router to get the current pathname
 * and use it as the active key for the Sidebar component.
 *
 * ```tsx
 * import {usePathname} from "next/navigation";
 *
 * const pathname = usePathname();
 * const currentPath = pathname.split("/")?.[1]
 *
 * <Sidebar defaultSelectedKey="home" selectedKeys={[currentPath]} />
 * ```
 */

/**
 * Layout component that provides the main application structure with a sidebar and content area
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pathname = usePathname();
  const currentPath = pathname.split("/")?.[1] || "home";

  // Get page title based on current path
  const pageTitle = React.useMemo(() => {
    const path = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);
    return path === "Home" ? "Overview" : path;
  }, [currentPath]);

  // Memoize the sidebar content to prevent unnecessary re-renders
  const sidebarContent = React.useMemo(() => (
    <div className="relative flex h-full w-72 flex-1 flex-col p-6">
      <div className="flex items-center gap-4 px-2">
        <Logo />
        <Link href="/">
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Startup Studio Dev</span>
            <span className="text-xs text-muted-foreground">Free Tools & Games</span>
          </div>
        </Link>
      </div>

      <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
        <Sidebar
          defaultSelectedKey="home"
          selectedKeys={[currentPath]}
          items={sectionItemsWithTeams}
        />
      </ScrollShadow>

      <Spacer y={8} />
      <div className="mt-auto flex flex-col">
        <NavUser />

      </div>
    </div>
  ), [currentPath]);

  return (
    <div className="flex h-dvh w-full">
      <SidebarDrawer
        className="!border-r-small border-divider"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {sidebarContent}
      </SidebarDrawer>
      <div className="flex flex-1 flex-col p-4 overflow-hidden">
        <header className="flex h-16 items-center gap-2 rounded-medium border-small border-divider px-4 mb-4">
          <Button isIconOnly className="flex sm:hidden" size="sm" variant="light" onPress={onOpen}>
            <Icon
              className="text-default-500"
              height={24}
              icon="solar:hamburger-menu-outline"
              width={24}
            />
          </Button>
          <h2 className="text-medium font-medium text-default-700">{pageTitle}</h2>
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
