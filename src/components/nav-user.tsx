"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Route } from "next"
import { useSessionStore } from "@/state/session"
import useSignOut from "@/hooks/useSignOut"

export const NavUser = ({ user }: { user?: { name: string; email: string; avatar: string } }) => {
  const { session } = useSessionStore()
  const { signOut } = useSignOut()

  // If user prop is provided, use it (for backward compatibility)
  // Otherwise, use the session data
  const userData = user || (session?.user ? {
    name: `${session.user.firstName || ''} ${session.user.lastName || ''}`.trim() || 'User',
    email: session.user.email || '',
    avatar: session.user.avatar || ''
  } : undefined)

  if (!userData && !session) {
    return (
      <Button asChild size="default" variant="outline" className="bg-primary text-primary-foreground">
        <Link href={"/sign-in" as Route}>Sign In</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar>
            <AvatarImage src={userData?.avatar || "https://i.pravatar.cc/150?u=a042581f4e29026024d"} alt={userData?.name || "User"} />
            <AvatarFallback>{userData?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-medium leading-none">{userData?.name || `${session?.user?.firstName || ''} ${session?.user?.lastName || ''}`.trim() || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">{userData?.email || session?.user?.email}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Signed in as</p>
            <p className="text-xs leading-none text-muted-foreground">{userData?.email || session?.user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings">My Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings/sessions">Manage Sessions</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500" onClick={signOut}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
