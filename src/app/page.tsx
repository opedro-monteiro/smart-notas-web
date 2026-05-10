"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Bell,
  Check,
  Mail,
  MessageSquare,
  Moon,
  Smartphone,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ─── Animation primitives ─────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-72px" } as Parameters<
    typeof useInView
  >[1]);
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration: shouldReduce ? 0 : 0.6,
        delay: shouldReduce ? 0 : delay,
        ease,
      }}
      className={className}
    >
      <Tag className="contents">{children}</Tag>
    </motion.div>
  );
}

// ─── Dark mode toggle ─────────────────────────────────────────────────────────

function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    Promise.resolve().then(() => {
      setMounted(true);
      setDark(isDark);
    });
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("lembreto-theme", next ? "dark" : "light");
    } catch {}
  }

  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <motion.button
      onClick={toggle}
      aria-label={dark ? "Mudar para modo claro" : "Mudar para modo escuro"}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="p-2 rounded-lg border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
    >
      {dark ? <Sun size={15} /> : <Moon size={15} />}
    </motion.button>
  );
}

// ─── Notification mockup ──────────────────────────────────────────────────────

function NotificationStack() {
  const shouldReduce = useReducedMotion();

  const messages = [
    {
      channel: "WhatsApp",
      color: "#25D366",
      text: "Olá, João! Passando para lembrar que a fatura de R$ 320 vence hoje.",
      time: "09:30",
      icon: MessageSquare,
    },
    {
      channel: "SMS",
      color: "#1D9E75",
      text: "Lembrete: parcela de R$ 150 vence amanhã. Clique para pagar.",
      time: "10:15",
      icon: Smartphone,
    },
    {
      channel: "E-mail",
      color: "#185FA5",
      text: "Sua fatura de março está disponível.",
      time: "11:00",
      icon: Mail,
    },
  ];

  return (
    <div className="relative select-none" aria-hidden>
      <div className="space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.channel}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: shouldReduce ? 0 : 0.55,
              delay: shouldReduce ? 0 : 0.4 + i * 0.18,
              ease,
            }}
            className="flex items-start gap-3 rounded-2xl p-4 shadow-lg"
            style={{ backgroundColor: "oklch(1 0 0 / 96%)" }}
          >
            <div
              className="mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: msg.color + "20" }}
            >
              <msg.icon size={15} style={{ color: msg.color }} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-xs font-semibold"
                  style={{ color: msg.color }}
                >
                  {msg.channel}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "oklch(0.55 0.01 200)" }}
                >
                  {msg.time}
                </span>
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "oklch(0.3 0.01 200)" }}
              >
                {msg.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Delivered indicator */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: shouldReduce ? 0 : 0.4,
          delay: shouldReduce ? 0 : 1.1,
        }}
        className="mt-4 flex items-center gap-2 justify-end"
      >
        <div
          className="w-4 h-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#1D9E75" }}
        >
          <Check size={10} className="text-white" strokeWidth={3} />
        </div>
        <span
          className="text-xs font-medium"
          style={{ color: "oklch(0.75 0.03 160)" }}
        >
          3 lembretes enviados automaticamente
        </span>
      </motion.div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const benefits = [
  {
    num: "01",
    title: "Lembretes automáticos",
    text: "Configure uma vez. O Lembreto envia no momento certo, pelo canal certo. Você não precisa lembrar de cobrar.",
  },
  {
    num: "02",
    title: "Qualquer canal",
    text: "WhatsApp, SMS, e-mail ou push. O devedor recebe onde ele está — sem você fazer nada.",
  },
  {
    num: "03",
    title: "Sem constrangimento",
    text: "Mensagens com o seu nome e tom. Parece que você mesmo enviou. Só que foi automático.",
  },
];

type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted: boolean;
  badge?: string;
  extra?: string;
};

const plans: Plan[] = [
  {
    name: "Pessoal",
    price: "R$ 0",
    period: "/mês",
    description: "Grátis para sempre.",
    features: ["Até 10 contatos", "Lembretes por e-mail", "Dashboard básico"],
    cta: "Começar grátis",
    href: "/sign-up",
    highlighted: false,
  },
  {
    name: "Cobrador",
    price: "R$ 29",
    period: "/mês",
    description: "Para autônomos e freelancers.",
    badge: "Mais popular",
    features: [
      "Até 100 contatos",
      "WhatsApp + SMS + e-mail",
      "Templates personalizados",
      "Dashboard completo",
      "Reenvio automático",
    ],
    cta: "Assinar agora",
    href: "/sign-up",
    highlighted: true,
  },
  {
    name: "Negócio",
    price: "R$ 79",
    period: "/mês",
    description: "Para pequenas empresas.",
    features: [
      "Até 500 contatos",
      "Todos os canais",
      "Relatórios avançados",
      "Múltiplos usuários",
      "Suporte prioritário",
    ],
    cta: "Assinar agora",
    href: "/sign-up",
    highlighted: false,
  },
  {
    name: "Agência",
    price: "R$ 199",
    period: "/mês",
    description: "Para quem gerencia múltiplos clientes.",
    extra: "+ R$ 0,20/cobrança excedente",
    features: [
      "Contatos ilimitados",
      "Todos os canais",
      "API de integração",
      "Multi-conta",
      "Gerente dedicado",
      "SLA garantido",
    ],
    cta: "Falar com especialista",
    href: "/sign-up",
    highlighted: false,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* SCROLL PROGRESS */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          backgroundColor: "var(--color-primary)",
        }}
        className="fixed top-0 left-0 right-0 h-0.5 origin-left z-[60]"
      />

      {/* NAV */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ backgroundColor: "var(--color-primary)" }}
        className="sticky top-0.5 z-50"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
              <Bell size={14} className="text-white" />
            </div>
            <span
              className="text-base font-bold text-white tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Lembreto
            </span>
          </div>

          <nav className="hidden sm:flex items-center gap-6">
            <Link
              href="#beneficios"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Como funciona
            </Link>
            <Link
              href="#planos"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Planos
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <Link
              href="/sign-in"
              className="text-sm text-white/80 hover:text-white transition-colors px-3 py-1.5"
            >
              Entrar
            </Link>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/sign-up"
                className="text-sm font-semibold bg-white px-4 py-1.5 rounded-lg transition-colors hover:bg-white/90 text-primary"
              >
                Começar grátis
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* HERO — drenched teal, split layout */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-0 lg:pt-20 lg:pb-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-end">
            {/* Left: copy */}
            <div className="pb-16 lg:pb-20">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease }}
                className="inline-flex items-center gap-2 mb-6 text-white/90 text-xs font-medium tracking-widest uppercase"
              >
                <div className="w-4 h-px bg-white/90" />
                Automação de cobranças
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.08, ease }}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[0.95] tracking-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                O lembrete
                <br />
                que ninguém
                <br />
                <span style={{ color: "oklch(0.87 0.09 160)" }}>ignora.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.2, ease }}
                className="text-base sm:text-lg text-white/70 leading-relaxed mb-10 max-w-md"
              >
                Cobre clientes por WhatsApp, SMS ou e-mail de forma automática,
                no momento certo, sem constrangimento.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3, ease }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all text-primary"
                    style={{
                      backgroundColor: "oklch(0.98 0 0)",
                    }}
                  >
                    Começar grátis <ArrowRight size={15} />
                  </Link>
                </motion.div>
                <Link
                  href="#planos"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm border border-white/25 text-white/80 hover:bg-white/10 transition-colors"
                >
                  Ver planos
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.48 }}
                className="flex items-center gap-4 mt-8"
              >
                {[
                  "Sem cartão de crédito",
                  "Setup em 5 minutos",
                  "Cancele quando quiser",
                ].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 text-xs text-white/90"
                  >
                    <Check
                      size={11}
                      strokeWidth={2.5}
                      className="text-white/40"
                    />
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right: notification mockup */}
            <div className="hidden lg:block pb-0 pt-8">
              <div
                className="rounded-t-3xl p-6 pt-8"
                style={{
                  backgroundColor: "oklch(0.12 0.025 160)",
                  boxShadow: "inset 0 1px 0 oklch(1 0 0 / 8%)",
                }}
              >
                <div className="mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-xs text-white animate-pulse">
                    Lembreto — enviando agora
                  </span>
                </div>
                <NotificationStack />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS — numbered statement list */}
      <section
        id="beneficios"
        className="py-24 px-5 sm:px-8"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-16">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--color-primary)" }}
            >
              Por que o Lembreto
            </p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight max-w-lg"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Cobranças sem drama,
              <br />
              recebimentos em dia.
            </h2>
          </Reveal>

          <BenefitStatements />
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="h-px" style={{ backgroundColor: "var(--border)" }} />
      </div>

      {/* PLANS */}
      <section id="planos" className="py-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-16">
            <p
              className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: "var(--color-primary)" }}
            >
              Planos
            </p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Simples. Transparente.
              <br />
              Sem surpresas.
            </h2>
          </Reveal>

          <PlanCards />
        </div>
      </section>

      {/* CTA — dark teal drench */}
      <section
        className="py-24 px-5 sm:px-8"
        style={{ backgroundColor: "var(--color-primary-darker)" }}
      >
        <Reveal className="max-w-2xl mx-auto">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: "oklch(0.75 0.09 160)" }}
          >
            Pronto para começar?
          </p>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-5 dark:text-background"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Configure em 5 minutos.
            <br />
            <span style={{ color: "oklch(0.83 0.1 160)" }}>
              Receba mais em dia.
            </span>
          </h2>
          <p className="text-white/90 mb-10 max-w-md leading-relaxed dark:text-background">
            Sem cartão de crédito. Sem burocracia. Comece grátis e adicione
            canais conforme cresce.
          </p>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block"
          >
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all text-white"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Começar grátis <ArrowRight size={15} />
            </Link>
          </motion.div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer
        className="border-t py-10 px-5 sm:px-8"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--background-secondary)",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <Bell size={12} className="text-white" />
            </div>
            <span
              className="text-sm font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--foreground)",
              }}
            >
              Lembreto
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Lembreto. Todos os direitos reservados.
          </p>
          <div className="flex gap-5 text-xs text-muted-foreground">
            <Link
              href="/termos"
              className="hover:text-foreground transition-colors"
            >
              Termos de uso
            </Link>
            <Link
              href="/privacidade"
              className="hover:text-foreground transition-colors"
            >
              Privacidade
            </Link>
            <Link
              href="/contato"
              className="hover:text-foreground transition-colors"
            >
              Contato
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Benefit statements ───────────────────────────────────────────────────────

function BenefitStatements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" } as Parameters<
    typeof useInView
  >[1]);
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="divide-y"
      style={{ borderColor: "var(--border)" }}
    >
      {benefits.map((b, i) => (
        <motion.div
          key={b.num}
          variants={fadeUp}
          transition={{ duration: shouldReduce ? 0 : 0.55, ease }}
          className="group grid grid-cols-[4rem_1fr] sm:grid-cols-[6rem_1fr_1fr] gap-6 py-10 items-start"
        >
          {/* Number */}
          <span
            className="text-4xl font-extrabold leading-none tabular-nums transition-colors duration-300"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-primary-medium)",
            }}
          >
            {b.num}
          </span>

          {/* Title */}
          <h3
            className="text-xl sm:text-2xl font-bold tracking-tight pt-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {b.title}
          </h3>

          {/* Text — hidden on mobile col 1, full on sm+ */}
          <p className="hidden sm:block text-sm text-muted-foreground leading-relaxed pt-1.5 max-w-sm">
            {b.text}
          </p>

          {/* Mobile text */}
          <p className="sm:hidden col-span-1 col-start-2 text-sm text-muted-foreground leading-relaxed -mt-4">
            {b.text}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Plan cards ───────────────────────────────────────────────────────────────

function PlanCards() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" } as Parameters<
    typeof useInView
  >[1]);
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {plans.map((plan) => (
        <motion.div
          key={plan.name}
          variants={scaleIn}
          transition={{ duration: shouldReduce ? 0 : 0.5, ease }}
          whileHover={
            shouldReduce
              ? {}
              : {
                  y: plan.highlighted ? -6 : -3,
                  boxShadow: plan.highlighted
                    ? "0 20px 48px oklch(0.55 0.14 160 / 0.3)"
                    : "0 8px 24px oklch(0 0 0 / 0.08)",
                }
          }
          className="rounded-2xl p-6 border flex flex-col relative text-primary"
          style={{
            backgroundColor: plan.highlighted
              ? "var(--color-primary)"
              : "var(--background-card)",
            borderColor: plan.highlighted ? "transparent" : "var(--border)",
            color: plan.highlighted ? "#fff" : "inherit",
            boxShadow: plan.highlighted
              ? "0 8px 32px oklch(0.55 0.14 160 / 0.22)"
              : undefined,
          }}
        >
          {plan.badge && (
            <span
              className="absolute -top-3 left-5 px-3 py-0.5 rounded-full text-xs font-bold border-2 border-primary"
              style={{
                backgroundColor: "oklch(0.98 0 0)",
                color: "var(--color-primary)",
              }}
            >
              {plan.badge}
            </span>
          )}

          <div className="mb-5">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{
                color: plan.highlighted
                  ? "oklch(0.9 0.06 160)"
                  : "var(--color-primary)",
              }}
            >
              {plan.name}
            </p>
            <div className="flex items-baseline gap-1 mb-1">
              <span
                className="text-4xl font-extrabold leading-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {plan.price}
              </span>
              <span
                className="text-sm"
                style={{
                  color: plan.highlighted
                    ? "oklch(1 0 0 / 0.6)"
                    : "var(--muted-foreground)",
                }}
              >
                {plan.period}
              </span>
            </div>
            {plan.extra && (
              <p
                className="text-xs mt-1"
                style={{
                  color: plan.highlighted
                    ? "oklch(1 0 0 / 0.5)"
                    : "var(--muted-foreground)",
                }}
              >
                {plan.extra}
              </p>
            )}
          </div>

          <p
            className="text-sm mb-6 leading-relaxed"
            style={{
              color: plan.highlighted
                ? "oklch(1 0 0 / 0.72)"
                : "var(--muted-foreground)",
            }}
          >
            {plan.description}
          </p>

          <ul className="space-y-2.5 mb-8 flex-1">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm">
                <div
                  className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: plan.highlighted
                      ? "oklch(1 0 0 / 0.2)"
                      : "var(--color-primary-light)",
                  }}
                >
                  <Check
                    size={9}
                    strokeWidth={3}
                    style={{
                      color: plan.highlighted
                        ? "#fff"
                        : "var(--color-primary-dark)",
                    }}
                  />
                </div>
                <span
                  style={{
                    color: plan.highlighted ? "oklch(1 0 0 / 0.88)" : undefined,
                  }}
                >
                  {f}
                </span>
              </li>
            ))}
          </ul>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={plan.href}
              className="block w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold transition-colors text-primary"
              style={
                plan.highlighted
                  ? {
                      backgroundColor: "oklch(0.98 0 0)",
                    }
                  : {
                      backgroundColor: "var(--color-primary-light)",
                      color: "var(--color-primary-dark)",
                      border: "1px solid var(--border)",
                    }
              }
            >
              {plan.cta}
            </Link>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
