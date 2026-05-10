import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { QueryProvider } from "@/components/query-provider";
import { SubscriptionBanner } from "@/features/subscription/components/subscription-banner";
import { Toaster } from "sonner";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <QueryProvider>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 p-5">
                  <SubscriptionBanner />
                  {children}
                </div>
              </div>
            </div>
          </SidebarInset>
          <Toaster position="top-right" richColors />
        </SidebarProvider>
      </QueryProvider>
  );
}
