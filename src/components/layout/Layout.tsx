"use client";

import React from "react";
import { Avatar, Button, ScrollShadow, Spacer, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";

import { AcmeIcon } from "./acme";
import { sectionItemsWithTeams } from "./sidebar-items";
import SidebarDrawer from "./sidebar-drawer";
import Sidebar from "./sidebar";

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

  // Memoize the sidebar content to prevent unnecessary re-renders
  const sidebarContent = React.useMemo(() => (
    <div className="relative flex h-full w-72 flex-1 flex-col p-6">
      <div className="flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
          <AcmeIcon className="text-background" />
        </div>
        <span className="text-small font-bold uppercase text-foreground">Acme</span>
      </div>
      <Spacer y={8} />
      <div className="flex items-center gap-3 px-3">
        <Avatar isBordered size="sm" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
        <div className="flex flex-col">
          <p className="text-small font-medium text-default-600">John Doe</p>
          <p className="text-tiny text-default-400">Product Designer</p>
        </div>
      </div>

      <Spacer y={8} />

      <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
        <Sidebar
          defaultSelectedKey="home"
          selectedKeys={[currentPath]}
          items={sectionItemsWithTeams}
        />
      </ScrollShadow>

      <Spacer y={8} />
      <div className="mt-auto flex flex-col">
        <Button
          fullWidth
          className="justify-start text-default-500 data-[hover=true]:text-foreground"
          startContent={
            <Icon className="text-default-500" icon="solar:info-circle-line-duotone" width={24} />
          }
          variant="light"
        >
          Help & Information
        </Button>
        <Button
          className="justify-start text-default-500 data-[hover=true]:text-foreground"
          startContent={
            <Icon
              className="rotate-180 text-default-500"
              icon="solar:minus-circle-line-duotone"
              width={24}
            />
          }
          variant="light"
        >
          Log Out
        </Button>
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
      <div className="p-4">
        <header className="flex h-16 items-center gap-2 rounded-medium border-small border-divider px-4">
          <Button isIconOnly className="flex sm:hidden" size="sm" variant="light" onPress={onOpen}>
            <Icon
              className="text-default-500"
              height={24}
              icon="solar:hamburger-menu-outline"
              width={24}
            />
          </Button>
          <h2 className="text-medium font-medium text-default-700">Overview</h2>
        </header>
        <main>

          {children}
        </main>
      </div>
    </div>
  );
}
