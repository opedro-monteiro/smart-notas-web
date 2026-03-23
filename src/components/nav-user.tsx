"use client";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { UserButton, useUser } from "@clerk/nextjs";

export function NavUser() {
  const { user } = useUser();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <section className="flex gap-2 items-center border-t-2">
          <UserButton userProfileMode="modal" />
          <div className="flex flex-col">
            <p>{user?.fullName}</p>
            <p className="text-foreground text-xs">
              {user?.emailAddresses[0].emailAddress}
            </p>
          </div>
        </section>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
