"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  CommandIcon,
  HandCoins,
  LayoutDashboardIcon,
  MessageCircleCheckIcon,
  Users2,
} from "lucide-react";
import LogoTraditional from "./icons/logo-icon";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Clientes",
      url: "#",
      icon: <Users2 />,
    },
    {
      title: "Débitos",
      url: "#",
      icon: <HandCoins />,
    },
    {
      title: "Registros de Cobrança",
      url: "#",
      icon: <MessageCircleCheckIcon />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <a
              href="/dashboard"
              aria-label="dashboard"
              className="flex items-center gap-2 px-2 py-2"
            >
              <LogoTraditional height={48} width={48} />
              <span className="text-base font-semibold">Smart Notas</span>
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
