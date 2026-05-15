import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lembreto.com.br"),
  title: "Lembreto — O lembrete que ninguém ignora",
  description:
    "Cobre clientes e amigos por WhatsApp, SMS ou e-mail de forma automática. Lembretes de cobrança personalizados para pessoas físicas, autônomos e empresas.",
  applicationName: "Lembreto",
  appleWebApp: {
    title: "Lembreto",
  },
  openGraph: {
    title: "Lembreto — Cobranças automáticas sem constrangimento",
    description:
      "Cobre clientes e amigos por WhatsApp, SMS ou e-mail de forma automática. Lembretes de cobrança personalizados para pessoas físicas, autônomos e empresas.",
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lembreto — Cobranças automáticas sem constrangimento",
    description:
      "Cobre clientes e amigos por WhatsApp, SMS ou e-mail de forma automática.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1D9E75",
};

const darkModeScript = `(function(){try{var s=localStorage.getItem('lembreto-theme');if(s==='dark'||(s===null&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        bricolage.variable,
        geistSans.variable,
        geistMono.variable,
        "font-sans",
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: darkModeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ClerkProvider localization={ptBR}>{children}</ClerkProvider>
      </body>
    </html>
  );
}
