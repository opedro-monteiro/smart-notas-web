"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CirclePlusIcon } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useSubscription } from "@/features/subscription/hooks/use-subscription";
import { isAtLimit } from "@/core/plans";
import { isSubscriptionActive } from "@/features/subscription/schema";

export function NavMain({
  items,
}: Readonly<{
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}>) {
  const pathname = usePathname();
  const { data: sub } = useSubscription();

  const clientCount = 0; // Optimistic — backend enforces hard limit
  const clientLimitReached =
    sub && isSubscriptionActive(sub)
      ? isAtLimit(sub.planTier, "clients", clientCount)
      : false;
  const canAddClient = isSubscriptionActive(sub ?? null) && !clientLimitReached;

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip={canAddClient ? "Cadastrar Cliente" : "Limite de clientes atingido"}
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              render={canAddClient ? <Link href={ROUTES.clientsNew} /> : <button disabled />}
            >
              <CirclePlusIcon />
              <span>Cadastrar Cliente</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              item.url === ROUTES.dashboard
                ? pathname === item.url
                : pathname.startsWith(item.url);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  render={<Link href={item.url} />}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
