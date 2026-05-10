"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { PLANS } from "@/core/plans";
import { PlanCard } from "@/features/subscription/components/plan-card";
import { useSubscription } from "@/features/subscription/hooks/use-subscription";
import {
  getTrialDaysRemaining,
  isSubscriptionActive,
} from "@/features/subscription/schema";
import { Skeleton } from "@/components/ui/skeleton";

function SuccessBanner() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";

  if (!isSuccess) return null;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400">
      <CheckCircle className="h-5 w-5 shrink-0" />
      <p className="text-sm font-medium">
        Pagamento confirmado! Sua assinatura foi ativada.
      </p>
    </div>
  );
}

function BillingContent() {
  const { data: sub, isLoading } = useSubscription();

  return (
    <>
      <Suspense>
        <SuccessBanner />
      </Suspense>

      {isLoading ? (
        <Skeleton className="h-16 w-full max-w-md" />
      ) : sub ? (
        <StatusCard sub={sub} />
      ) : null}

      <div className="grid gap-6 md:grid-cols-3">
        {(Object.values(PLANS) as typeof PLANS[keyof typeof PLANS][]).map((plan) => (
          <PlanCard key={plan.tier} plan={plan} currentSub={sub} />
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Todos os planos incluem 7 dias de teste grátis. Cancele a qualquer momento.
      </p>
    </>
  );
}

export default function BillingPage() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold">Planos e Assinatura</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Escolha o plano ideal para o seu negócio.
        </p>
      </div>

      <BillingContent />
    </div>
  );
}

function StatusCard({ sub }: { sub: NonNullable<ReturnType<typeof useSubscription>["data"]> }) {
  const active = isSubscriptionActive(sub);
  const trialDays = getTrialDaysRemaining(sub);

  if (sub.status === "TRIALING") {
    return (
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/50 dark:bg-yellow-950/30">
        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
          Trial gratuito — {trialDays} dia{trialDays !== 1 ? "s" : ""} restante{trialDays !== 1 ? "s" : ""}
        </p>
        <p className="mt-0.5 text-xs text-yellow-700 dark:text-yellow-500">
          Assine um plano para continuar usando o Smart Notas após o trial.
        </p>
      </div>
    );
  }

  if (sub.status === "ACTIVE") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900/50 dark:bg-green-950/30">
        <p className="text-sm font-medium text-green-800 dark:text-green-400">
          Plano {sub.planTier} — Ativo
        </p>
        <p className="mt-0.5 text-xs text-green-700 dark:text-green-500">
          Próxima renovação: {sub.currentPeriodEnd.toLocaleDateString("pt-BR")}
        </p>
      </div>
    );
  }

  if (!active) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/30">
        <p className="text-sm font-medium text-red-800 dark:text-red-400">
          Assinatura inativa
        </p>
        <p className="mt-0.5 text-xs text-red-700 dark:text-red-500">
          Escolha um plano abaixo para reativar o acesso.
        </p>
      </div>
    );
  }

  return null;
}
