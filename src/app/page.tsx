import Link from "next/link"
import {
  MessageSquareText,
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
  X,
  RefreshCw,
  History,
  Star,
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
  badge?: string
  highlight?: string
  limits?: { whatsapp: string; sms: string; calls?: string; email: string }
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const painPoints = [
  "Manda cobrança individual no WhatsApp toda semana",
  "Esquece clientes em atraso e perde dinheiro",
  "Cobra fora do horário e passa constrangimento",
  "Não sabe quem pagou e quem está devendo",
  "Perde horas por mês em cobranças manuais",
]

const benefits = [
  {
    icon: Zap,
    title: "Cobranças automáticas",
    text: "Configure uma vez. O sistema cobra por você todos os dias, no horário certo, sem precisar lembrar.",
  },
  {
    icon: MessageSquareText,
    title: "WhatsApp, SMS, e-mail e voz",
    text: "Alcance seus clientes pelo canal que eles realmente respondem. Tudo automático e rastreável.",
  },
  {
    icon: FileText,
    title: "Mensagens personalizadas",
    text: "Templates com nome do cliente, valor e data de vencimento. Parece escrito à mão, vai automático.",
  },
  {
    icon: BarChart3,
    title: "Dashboard em tempo real",
    text: "Veja quem pagou, quem está em atraso e qual canal performa melhor para cada cliente.",
  },
  {
    icon: History,
    title: "Histórico completo",
    text: "Cada cobrança registrada com data, canal e status. Nunca mais perca o controle.",
  },
  {
    icon: RefreshCw,
    title: "Reenvio automático",
    text: "Cliente não abriu? O Smart Notas reenvio pelo próximo canal. Você não precisa fazer nada.",
  },
  {
    icon: ShieldCheck,
    title: "Seguro e conforme a LGPD",
    text: "Dados protegidos com criptografia e processamento conforme a legislação brasileira.",
  },
  {
    icon: Clock,
    title: "Funciona 24/7",
    text: "Mesmo quando você está de folga, viajando ou dormindo. As cobranças saem no horário.",
  },
]

const steps = [
  {
    number: "01",
    title: "Cadastre seus clientes",
    description:
      "Adicione clientes com nome, telefone e e-mail. Importação simples, leva menos de 2 minutos.",
  },
  {
    number: "02",
    title: "Configure as cobranças",
    description:
      "Defina valor, vencimento e os canais preferidos: WhatsApp, SMS, e-mail ou ligação.",
  },
  {
    number: "03",
    title: "O Smart Notas envia automaticamente",
    description:
      "Lembretes saem no momento certo, para a pessoa certa, pelo canal certo. Sem intervenção.",
  },
  {
    number: "04",
    title: "Receba mais em dia",
    description:
      "Acompanhe pagamentos no dashboard e veja a inadimplência cair mês a mês.",
  },
]

const differentials = [
  { icon: MessageSquareText, text: "Funciona no WhatsApp real" },
  { icon: Zap, text: "Automação de verdade, não lembretes manuais" },
  { icon: Clock, text: "Configuração em menos de 5 minutos" },
  { icon: ShieldCheck, text: "Seguro e LGPD compliant" },
  { icon: History, text: "Histórico completo de cobranças" },
  { icon: FileText, text: "Templates inteligentes com variáveis" },
  { icon: Users, text: "Multicanal por cliente" },
  { icon: RefreshCw, text: "Funciona mesmo quando você está offline" },
]

const tiers: PricingTier[] = [
  {
    name: "Starter",
    price: "R$ 27",
    period: "/mês",
    description: "Para microempresas que querem parar de cobrar manualmente.",
    limits: {
      whatsapp: "50 WhatsApp/mês",
      sms: "50 SMS/mês",
      email: "E-mails ilimitados",
    },
    features: [
      { text: "Até 50 clientes", included: true },
      { text: "50 WhatsApp + 50 SMS por mês", included: true },
      { text: "50 E-mails", included: true },
      { text: "Templates básicos", included: true },
      { text: "Dashboard simples", included: true },
      { text: "Ligações automáticas", included: false },
      { text: "Templates personalizados", included: false },
      { text: "Reenvio automático", included: false },
    ],
    cta: "Começar agora",
    href: "/sign-up",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "R$ 87",
    period: "/mês",
    description: "Para empresas que querem recuperar dinheiro de verdade.",
    badge: "Mais popular",
    highlight: "1 cliente recuperado já paga o plano.",
    limits: {
      whatsapp: "150 WhatsApp/mês",
      sms: "150 SMS/mês",
      email: "150 E-mails",
    },
    features: [
      { text: "Até 500 clientes", included: true },
      { text: "150 WhatsApp + 150 SMS por mês", included: true },
      { text: "150 E-mails", included: true },
      { text: "Templates personalizados", included: true },
      { text: "Dashboard avançado", included: true },
      { text: "Reenvio automático", included: true },
      { text: "Suporte prioritário", included: true },
      { text: "Ligações automáticas", included: false },
      { text: "Relatórios de desempenho", included: false },
    ],
    cta: "Automatizar minhas cobranças",
    href: "/sign-up",
    highlighted: true,
  },
  {
    name: "Scale",
    price: "R$ 299",
    period: "/mês",
    description: "Para operações maiores que não toleram inadimplência.",
    limits: {
      whatsapp: "1.500 WhatsApp/mês",
      sms: "1.500 SMS/mês",
      calls: "500 ligações/mês",
      email: "E-mails ilimitados",
    },
    features: [
      { text: "Clientes ilimitados", included: true },
      { text: "2.000 WhatsApp + 1.500 SMS/mês", included: true },
      { text: "500 ligações automáticas/mês", included: true },
      { text: "E-mails ilimitados", included: true },
      { text: "Multiusuários", included: true },
      { text: "Métricas avançadas", included: true },
      { text: "IA para sugestões de mensagem (em breve)", included: true },
      { text: "API (em breve)", included: true },
      { text: "Atendimento dedicado", included: true },
    ],
    cta: "Falar com especialista",
    href: "/sign-up",
    highlighted: false,
  },
]

// ─── Notification mockup ───────────────────────────────────────────────────────

function NotificationMockup() {
  return (
    <div className="relative w-full max-w-sm mx-auto select-none" aria-hidden>
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
              href="#problema"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Por que usar
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
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
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
                  Teste grátis por 7 dias — sem cartão de crédito
                </div>

                <div className="space-y-4">
                  <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                    Pare de perder dinheiro com clientes{" "}
                    <span className="relative">
                      inadimplentes
                      <span
                        className="absolute bottom-1 left-0 h-1 w-full rounded-full bg-primary opacity-40"
                        aria-hidden
                      />
                    </span>
                    .
                  </h1>
                  <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                    O Smart Notas automatiza cobranças por WhatsApp, SMS, e-mail
                    e ligação para que sua empresa receba mais sem desgaste.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/sign-up"
                    className={cn(buttonVariants({ size: "lg" }), "gap-2")}
                  >
                    Começar teste grátis
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
                    Teste grátis por 7 dias
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-green-500" />
                    Configuração em menos de 5 minutos
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-green-500" />
                    Cancele quando quiser
                  </span>
                </div>

                {/* Social proof */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex -space-x-2">
                    {["JM", "AS", "RF", "PL"].map((initials) => (
                      <div
                        key={initials}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary text-[10px] font-bold text-primary-foreground"
                      >
                        {initials}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Centenas de empresas já automatizaram suas cobranças
                    </p>
                  </div>
                </div>
              </div>

              {/* Right */}
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
                { value: "4 canais", label: "WhatsApp, SMS, E-mail, Voz" },
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

        {/* ── Pain section ───────────────────────────────────────────────────── */}
        <section id="problema" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="grid gap-14 md:grid-cols-2 md:gap-20 items-center">
              {/* Left — problems */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-destructive">
                  O problema
                </p>
                <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight mb-8 md:text-4xl">
                  Isso acontece na sua empresa?
                </h2>
                <ul className="space-y-4">
                  {painPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive/10">
                        <X className="h-3 w-3 text-destructive" />
                      </div>
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — solution */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">
                  O Smart Notas resolve isso automaticamente.
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                  Configure uma vez e o sistema envia cobranças profissionais pelo
                  canal certo, no horário certo, para cada cliente. Sem
                  constrangimento, sem esquecimento.
                </p>
                <ul className="space-y-2">
                  {[
                    "Cobranças automáticas no horário comercial",
                    "Mensagens personalizadas para cada cliente",
                    "Acompanhamento em tempo real de quem pagou",
                    "Zero intervenção manual no dia a dia",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/sign-up"
                  className={cn(buttonVariants({ size: "sm" }), "mt-8 gap-2")}
                >
                  Resolver agora
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Benefits ───────────────────────────────────────────────────────── */}
        <section className="border-b border-border bg-muted/20">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="mb-14 max-w-xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                Benefícios
              </p>
              <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Tudo para recuperar dinheiro sem desgaste
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((b) => {
                const BenefitIcon = b.icon
                return (
                  <div
                    key={b.title}
                    className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-6"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <BenefitIcon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-heading text-sm font-bold">{b.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {b.text}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── How it works ───────────────────────────────────────────────────── */}
        <section id="como-funciona" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                Como funciona
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
                Automatize suas cobranças em menos de 5 minutos.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                Configure uma vez. O Smart Notas faz o trabalho todos os dias.
              </p>
            </div>

            <div className="relative grid gap-8 md:grid-cols-4">
              <div
                className="absolute top-8 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] hidden h-px border-t border-dashed border-border md:block"
                aria-hidden
              />

              {steps.map((step) => (
                <div
                  key={step.number}
                  className="relative flex flex-col items-start md:items-center md:text-center"
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-primary/20 bg-background font-heading text-xl font-bold text-primary">
                    {step.number}
                  </div>
                  <h3 className="mb-2 font-heading text-sm font-bold">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Differentials ──────────────────────────────────────────────────── */}
        <section className="border-b border-border bg-muted/20">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-10 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
                Diferenciais
              </p>
              <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">
                O jeito profissional de cobrar clientes.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {differentials.map((d) => {
                const DiffIcon = d.icon
                return (
                  <div
                    key={d.text}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3"
                  >
                    <DiffIcon className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-xs font-medium">{d.text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Pricing ────────────────────────────────────────────────────────── */}
        <section id="precos" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                Preços
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
                Simples e sem surpresas
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                Comece gratuitamente por 7 dias. Sem cartão de crédito.
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={cn(
                    "relative flex flex-col rounded-2xl p-8",
                    tier.highlighted
                      ? "bg-primary text-primary-foreground shadow-xl scale-[1.02]"
                      : "border border-border bg-background",
                  )}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-yellow-900">
                        <Star className="h-3 w-3" />
                        {tier.badge}
                      </span>
                    </div>
                  )}

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

                  {tier.highlight && (
                    <p
                      className={cn(
                        "mb-4 text-center text-xs font-semibold",
                        tier.highlighted
                          ? "text-yellow-300"
                          : "text-primary",
                      )}
                    >
                      ✦ {tier.highlight}
                    </p>
                  )}

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

            <p className="mt-8 text-center text-xs text-muted-foreground">
              Todos os planos incluem 7 dias de teste grátis. Cancele a qualquer momento.
            </p>
          </div>
        </section>

        {/* ── Final CTA ──────────────────────────────────────────────────────── */}
        <section className="bg-primary">
          <div className="mx-auto max-w-6xl px-6 py-20 text-center">
            <h2 className="font-heading text-2xl font-bold text-primary-foreground md:text-4xl">
              Pare de cobrar manualmente hoje mesmo.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-primary-foreground/70">
              Configure o Smart Notas em menos de 5 minutos e deixe as cobranças
              acontecerem automaticamente.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
              >
                Começar teste grátis
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#como-funciona"
                className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10"
              >
                Ver demonstração
              </Link>
            </div>
            <p className="mt-5 text-xs text-primary-foreground/50">
              Sem cartão de crédito · Cancele quando quiser · Suporte incluso
            </p>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5">
                <LogoTraditional width={28} height={28} />
                <span className="font-heading text-sm font-semibold">
                  Smart Notas
                </span>
              </Link>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Cobranças automáticas para empresas que querem receber sem
                desgaste.
              </p>
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">
                Produto
              </p>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#problema"
                    className="hover:text-foreground transition-colors"
                  >
                    Por que usar
                  </Link>
                </li>
                <li>
                  <Link
                    href="#precos"
                    className="hover:text-foreground transition-colors"
                  >
                    Preços
                  </Link>
                </li>
                <li>
                  <Link
                    href="#como-funciona"
                    className="hover:text-foreground transition-colors"
                  >
                    Como funciona
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">
                Conta
              </p>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/sign-in"
                    className="hover:text-foreground transition-colors"
                  >
                    Entrar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sign-up"
                    className="hover:text-foreground transition-colors"
                  >
                    Criar conta
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="hover:text-foreground transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">
                Legal
              </p>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li>
                  <span className="cursor-default">Termos de uso</span>
                </li>
                <li>
                  <span className="cursor-default">Privacidade</span>
                </li>
                <li>
                  <span className="cursor-default">LGPD</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-border pt-6 flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Smart Notas. Todos os direitos
              reservados.
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
