import Link from "next/link"
import {
  MessageSquareText,
  Phone,
  Mail,
  Smartphone,
  ArrowRight,
  BarChart3,
  Users,
  FileText,
  Check,
  Zap,
  Clock,
  ShieldCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import LogoTraditional from "@/components/icons/logo-icon"

// ─── Types ────────────────────────────────────────────────────────────────────

type PricingFeature = { text: string; included: boolean }

type PricingTier = {
  name: string
  price: string
  period: string
  description: string
  features: PricingFeature[]
  cta: string
  href: string
  highlighted: boolean
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: MessageSquareText,
    label: "WhatsApp & SMS",
    title: "Mensagens que chegam onde o cliente está",
    description:
      "Envie cobranças pelo canal preferido do seu cliente. Taxa de abertura de WhatsApp chega a 98% — muito mais eficaz que e-mail.",
    accent: "bg-green-500",
  },
  {
    icon: Mail,
    label: "Email",
    title: "E-mails formais e rastreáveis",
    description:
      "Templates profissionais com comprovante de entrega. Ideal para clientes corporativos e registros legais.",
    accent: "bg-primary",
  },
  {
    icon: Phone,
    label: "Ligação automática",
    title: "Voz quando o silêncio não funciona",
    description:
      "Ligações automáticas com mensagem de voz personalizada para devedores que ignoram mensagens escritas.",
    accent: "bg-orange-500",
  },
  {
    icon: FileText,
    label: "Templates",
    title: "Mensagens personalizadas com variáveis",
    description:
      "Use {{nomeCliente}}, {{valor}}, {{dataVencimento}} e mais. Cada mensagem parece escrita à mão.",
    accent: "bg-violet-500",
  },
]

const steps = [
  {
    number: "01",
    title: "Cadastre seus clientes",
    description:
      "Importe ou adicione clientes com nome, telefone e e-mail. Leva menos de 2 minutos.",
  },
  {
    number: "02",
    title: "Configure os débitos",
    description:
      "Defina valor, vencimento e os canais preferidos de cada cliente: SMS, WhatsApp, e-mail ou ligação.",
  },
  {
    number: "03",
    title: "Receba em dia",
    description:
      "O Smart Notas envia os lembretes automaticamente. Você acompanha tudo pelo dashboard em tempo real.",
  },
]

const tiers: PricingTier[] = [
  {
    name: "Gratuito",
    price: "R$ 0",
    period: "/mês",
    description: "Para começar a organizar suas cobranças.",
    features: [
      { text: "Até 10 clientes", included: true },
      { text: "Cobranças por e-mail", included: true },
      { text: "Dashboard básico", included: true },
      { text: "SMS e WhatsApp", included: false },
      { text: "Ligações automáticas", included: false },
      { text: "Templates personalizados", included: false },
    ],
    cta: "Começar grátis",
    href: "/sign-up",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "R$ 99",
    period: "/mês",
    description: "Para empresas que não toleram inadimplência.",
    features: [
      { text: "Clientes ilimitados", included: true },
      { text: "SMS, WhatsApp e e-mail", included: true },
      { text: "Ligações automáticas", included: true },
      { text: "Templates com variáveis", included: true },
      { text: "Dashboard avançado", included: true },
      { text: "Suporte prioritário", included: true },
    ],
    cta: "Assinar Pro",
    href: "/sign-up",
    highlighted: true,
  },
]

// ─── Features grid ────────────────────────────────────────────────────────────

const openRates = [
  { label: "Abertura WhatsApp", pct: 96, color: "bg-green-500" },
  { label: "Abertura SMS", pct: 82, color: "bg-blue-500" },
  { label: "Abertura E-mail", pct: 43, color: "bg-violet-500" },
]

function FeaturesGrid() {
  const MainIcon = features[0].icon
  return (
    <>
      {/* Big feature */}
      <div className="md:row-span-2 flex flex-col justify-between rounded-2xl border border-border bg-muted/30 p-8">
        <div>
          <div
            className={cn(
              "mb-6 inline-flex h-10 w-10 items-center justify-center rounded-xl text-white",
              features[0].accent,
            )}
          >
            <MainIcon className="h-5 w-5" />
          </div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {features[0].label}
          </div>
          <h3 className="font-heading text-xl font-bold leading-snug md:text-2xl">
            {features[0].title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {features[0].description}
          </p>
        </div>

        <div className="mt-8 space-y-2">
          {openRates.map((bar) => (
            <div key={bar.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{bar.label}</span>
                <span className="font-semibold">{bar.pct}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div
                  className={cn("h-full rounded-full", bar.color)}
                  style={{ width: `${bar.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smaller features */}
      {features.slice(1).map((f) => {
        const Icon = f.icon
        return (
          <div
            key={f.label}
            className="flex gap-4 rounded-2xl border border-border bg-muted/30 p-6"
          >
            <div
              className={cn(
                "shrink-0 flex h-9 w-9 items-center justify-center rounded-lg text-white",
                f.accent,
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {f.label}
              </div>
              <h3 className="font-heading text-sm font-bold leading-snug">
                {f.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </div>
          </div>
        )
      })}
    </>
  )
}

// ─── Notification mockup ───────────────────────────────────────────────────────

function NotificationMockup() {
  return (
    <div className="relative w-full max-w-sm mx-auto select-none" aria-hidden>
      {/* Phone frame */}
      <div className="relative rounded-3xl border-2 border-foreground/10 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden">
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-zinc-50 dark:bg-zinc-800 border-b border-border">
          <span className="text-xs font-medium text-muted-foreground">09:41</span>
          <div className="flex gap-1">
            <div className="w-3 h-1.5 rounded-full bg-foreground/40" />
            <div className="w-3 h-1.5 rounded-full bg-foreground/40" />
            <div className="w-3 h-1.5 rounded-full bg-foreground/40" />
          </div>
        </div>

        {/* Message list */}
        <div className="p-4 space-y-3 bg-white dark:bg-zinc-900">
          {/* WhatsApp */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50">
            <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
              <MessageSquareText className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-green-700 dark:text-green-400">WhatsApp</p>
              <p className="text-xs text-foreground/70 leading-relaxed mt-0.5">
                Olá Maria, seu boleto de{" "}
                <span className="font-semibold text-foreground">R$ 1.250,00</span>{" "}
                vence amanhã.
              </p>
            </div>
            <span className="shrink-0 text-[10px] text-muted-foreground">Agora</span>
          </div>

          {/* SMS */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
            <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
              <Smartphone className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">SMS</p>
              <p className="text-xs text-foreground/70 leading-relaxed mt-0.5">
                Lembrete: fatura de{" "}
                <span className="font-semibold text-foreground">R$ 840,00</span>{" "}
                vence em 3 dias.
              </p>
            </div>
            <span className="shrink-0 text-[10px] text-muted-foreground">2m</span>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3 p-3 rounded-xl bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/50">
            <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-white">
              <Mail className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-violet-700 dark:text-violet-400">E-mail</p>
              <p className="text-xs text-foreground/70 leading-relaxed mt-0.5">
                Aviso de vencimento — João Silva —{" "}
                <span className="font-semibold text-foreground">R$ 3.200,00</span>
              </p>
            </div>
            <span className="shrink-0 text-[10px] text-muted-foreground">5m</span>
          </div>

          {/* Stats bar */}
          <div className="mt-4 grid grid-cols-3 gap-2 pt-3 border-t border-border">
            <div className="text-center">
              <p className="text-base font-bold text-foreground">94%</p>
              <p className="text-[10px] text-muted-foreground">Entregues</p>
            </div>
            <div className="text-center border-x border-border">
              <p className="text-base font-bold text-green-600">78%</p>
              <p className="text-[10px] text-muted-foreground">Pagos</p>
            </div>
            <div className="text-center">
              <p className="text-base font-bold text-foreground">3h</p>
              <p className="text-[10px] text-muted-foreground">Tempo médio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -top-3 -right-3 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg">
        <Zap className="h-3 w-3" />
        Automático
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <LogoTraditional width={32} height={32} />
            <span className="font-heading text-base font-semibold tracking-tight">
              Smart Notas
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="#funcionalidades"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Funcionalidades
            </Link>
            <Link
              href="#como-funciona"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Como funciona
            </Link>
            <Link
              href="#precos"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Preços
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
              )}
            >
              Entrar
            </Link>
            <Link
              href="/sign-up"
              className={cn(buttonVariants({ size: "sm" }))}
            >
              Começar grátis
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero ───────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-border">
          {/* Subtle grid background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
              {/* Left */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-green-500" />
                  Cobranças automáticas em produção
                </div>

                <div className="space-y-4">
                  <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                    Pare de perder dinheiro com faturas{" "}
                    <span className="relative">
                      não pagas
                      <span
                        className="absolute bottom-1 left-0 h-1 w-full rounded-full bg-primary opacity-40"
                        aria-hidden
                      />
                    </span>
                    .
                  </h1>
                  <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                    Smart Notas envia lembretes automáticos por SMS, WhatsApp,
                    e-mail e ligação. Você configura uma vez — o sistema cobra
                    por você.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/sign-up"
                    className={cn(buttonVariants({ size: "lg" }), "gap-2")}
                  >
                    Começar gratuitamente
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#como-funciona"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                    )}
                  >
                    Ver demonstração
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-green-500" />
                    Sem cartão de crédito
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-green-500" />
                    Configuração em 5 minutos
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-green-500" />
                    Cancele quando quiser
                  </span>
                </div>
              </div>

              {/* Right — notification mockup */}
              <div className="flex justify-center md:justify-end">
                <NotificationMockup />
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats band ─────────────────────────────────────────────────────── */}
        <section className="border-b border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-6 py-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { value: "94%", label: "Taxa de entrega" },
                { value: "3×", label: "Mais pagamentos em dia" },
                { value: "< 5min", label: "Para configurar" },
                { value: "4 canais", label: "SMS, WhatsApp, E-mail, Voz" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ───────────────────────────────────────────────────────── */}
        <section
          id="funcionalidades"
          className="mx-auto max-w-6xl px-6 py-20 md:py-28"
        >
          <div className="mb-14 max-w-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              Funcionalidades
            </p>
            <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Tudo que você precisa para receber em dia
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FeaturesGrid />
          </div>
        </section>

        {/* ── How it works ───────────────────────────────────────────────────── */}
        <section
          id="como-funciona"
          className="border-y border-border bg-muted/30"
        >
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                Como funciona
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
                Simples de configurar. Poderoso na prática.
              </h2>
            </div>

            <div className="relative grid gap-8 md:grid-cols-3">
              {/* Connector line — desktop only */}
              <div
                className="absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] hidden h-px border-t border-dashed border-border md:block"
                aria-hidden
              />

              {steps.map((step) => (
                <div key={step.number} className="relative flex flex-col items-start md:items-center md:text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-primary/20 bg-background font-heading text-xl font-bold text-primary">
                    {step.number}
                  </div>
                  <h3 className="mb-2 font-heading text-base font-bold">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Additional value props ─────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Clock,
                title: "Pontual e confiável",
                text: "Os lembretes saem no horário certo, todos os dias — mesmo quando você está de folga.",
              },
              {
                icon: ShieldCheck,
                title: "Seguro e conforme a LGPD",
                text: "Dados protegidos com criptografia. Processamento conforme a legislação brasileira.",
              },
              {
                icon: BarChart3,
                title: "Dashboard em tempo real",
                text: "Veja quem pagou, quem está em atraso e quais canais funcionam melhor para cada cliente.",
              },
            ].map((item) => {
              const ValueIcon = item.icon
              return (
              <div
                key={item.title}
                className="flex flex-col gap-3 rounded-2xl border border-border p-6"
              >
                <ValueIcon className="h-5 w-5 text-primary" />
                <h3 className="font-heading text-sm font-bold">{item.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
              )
            })}
          </div>
        </section>

        {/* ── Pricing ────────────────────────────────────────────────────────── */}
        <section
          id="precos"
          className="border-t border-border"
        >
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                Preços
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
                Simples e sem surpresas
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                Comece gratuitamente e faça upgrade quando precisar de mais
                alcance.
              </p>
            </div>

            <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={cn(
                    "flex flex-col rounded-2xl p-8",
                    tier.highlighted
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-background",
                  )}
                >
                  <div className="mb-6">
                    <p
                      className={cn(
                        "mb-1 text-xs font-semibold uppercase tracking-widest",
                        tier.highlighted
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground",
                      )}
                    >
                      {tier.name}
                    </p>
                    <div className="flex items-end gap-1">
                      <span className="font-heading text-4xl font-bold">
                        {tier.price}
                      </span>
                      <span
                        className={cn(
                          "mb-1 text-sm",
                          tier.highlighted
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground",
                        )}
                      >
                        {tier.period}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "mt-2 text-sm",
                        tier.highlighted
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground",
                      )}
                    >
                      {tier.description}
                    </p>
                  </div>

                  <ul className="mb-8 flex-1 space-y-3">
                    {tier.features.map((f) => (
                      <li
                        key={f.text}
                        className={cn(
                          "flex items-center gap-2.5 text-sm",
                          !f.included &&
                            (tier.highlighted
                              ? "opacity-40"
                              : "text-muted-foreground/50"),
                        )}
                      >
                        <Check
                          className={cn(
                            "h-4 w-4 shrink-0",
                            f.included
                              ? tier.highlighted
                                ? "text-primary-foreground"
                                : "text-green-500"
                              : "opacity-30",
                          )}
                        />
                        {f.text}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={tier.href}
                    className={cn(
                      "block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-colors",
                      tier.highlighted
                        ? "bg-white text-primary hover:bg-white/90"
                        : "border border-border bg-muted hover:bg-muted/70 text-foreground",
                    )}
                  >
                    {tier.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA band ───────────────────────────────────────────────────────── */}
        <section className="border-t border-border bg-primary">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center">
            <h2 className="font-heading text-2xl font-bold text-primary-foreground md:text-3xl">
              Pronto para receber o que é seu?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-primary-foreground/70">
              Configure em 5 minutos. Sem cartão de crédito. Cancele quando
              quiser.
            </p>
            <Link
              href="/sign-up"
              className={cn(
                "mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white/90",
              )}
            >
              Criar conta gratuita
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-10 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5">
                <LogoTraditional width={28} height={28} />
                <span className="font-heading text-sm font-semibold">
                  Smart Notas
                </span>
              </Link>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Cobranças automáticas que realmente funcionam.
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">
                Produto
              </p>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><Link href="#funcionalidades" className="hover:text-foreground transition-colors">Funcionalidades</Link></li>
                <li><Link href="#precos" className="hover:text-foreground transition-colors">Preços</Link></li>
                <li><Link href="#como-funciona" className="hover:text-foreground transition-colors">Como funciona</Link></li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">
                Conta
              </p>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><Link href="/sign-in" className="hover:text-foreground transition-colors">Entrar</Link></li>
                <li><Link href="/sign-up" className="hover:text-foreground transition-colors">Criar conta</Link></li>
                <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">
                Legal
              </p>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><span className="cursor-default">Termos de uso</span></li>
                <li><span className="cursor-default">Privacidade</span></li>
                <li><span className="cursor-default">LGPD</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-border pt-6 flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Smart Notas. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              Feito para pequenas e médias empresas brasileiras
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
