"use client";
import { Separator } from "@base-ui/react";
import { SidebarTrigger } from "./ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { useIsMobile } from "@/hooks/use-mobile";

export function SiteHeader() {
  const isMobile = useIsMobile();
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) justify-between">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4 data-vertical:self-auto"
        />
        <h1 className="text-base font-medium">Pagina atual</h1>
      </div>
      <div className="px-5">
        {!isMobile && <UserButton userProfileMode="modal" />}
      </div>
    </header>
  );
}
