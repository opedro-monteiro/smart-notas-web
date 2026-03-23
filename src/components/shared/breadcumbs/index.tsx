"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const labels: Record<string, string> = {
  dashboard: "Dashboard",
  clients: "Clientes",
  settings: "Configurações",
};

function toLabel(segment: string): string {
  return labels[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1);
}

export function GetBreadcrumb() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => ({
    label: toLabel(segment),
    href: "/" + segments.slice(0, index + 1).join("/"),
    isLast: index === segments.length - 1,
  }));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <React.Fragment key={crumb.label}>
            {index > 0 && <BreadcrumbSeparator key={`sep-${crumb.href}`} />}
            <BreadcrumbItem key={crumb.href}>
              {crumb.isLast ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  render={<a href={crumb.href}>{crumb.label}</a>}
                />
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
