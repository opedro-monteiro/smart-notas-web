"use client";

import * as React from "react";
import {
  HandCoins,
  LayoutDashboardIcon,
  MessageCircleCheckIcon,
  Users2,
} from "lucide-react";

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
import LogoTraditional from "./icons/logo-icon";
import { ROUTES } from "@/constants/routes";

const navItems = [
  {
    title: "Dashboard",
    url: ROUTES.dashboard,
    icon: <LayoutDashboardIcon />,
  },
  {
    title: "Clientes",
    url: ROUTES.clients,
    icon: <Users2 />,
  },
  {
    title: "Débitos",
    url: ROUTES.debts,
    icon: <HandCoins />,
  },
  {
    title: "Registros de Cobrança",
    url: ROUTES.debtsRegisters,
    icon: <MessageCircleCheckIcon />,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <a
              href={ROUTES.dashboard}
              aria-label="dashboard"
              className="flex items-center gap-2 px-2 py-2"
            >
              <LogoTraditional height={48} width={48} />
              <span className="text-base font-semibold">Lembreto</span>
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
