"use client";

import Link from "next/link";
import { AlertCircle, Clock } from "lucide-react";
import { useSubscription } from "@/features/subscription/hooks/use-subscription";
import {
  getTrialDaysRemaining,
  isSubscriptionActive,
} from "@/features/subscription/schema";
import { ROUTES } from "@/constants/routes";

export function SubscriptionBanner() {
  const { data: sub, isLoading } = useSubscription();

  if (isLoading || !sub) return null;

  if (sub.status === "TRIALING") {
    const days = getTrialDaysRemaining(sub);
    if (days <= 3) {
      return (
        <div className="flex items-center gap-2 rounded-md border border-yellow-200 bg-yellow-50 px-3 py-2 text-xs text-yellow-800 dark:border-yellow-900/50 dark:bg-yellow-950/30 dark:text-yellow-400">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          <span>
            Trial expira em <strong>{days} dia{days !== 1 ? "s" : ""}</strong>.{" "}
            <Link href={ROUTES.billing} className="underline underline-offset-2 hover:no-underline">
              Assine agora
            </Link>
          </span>
        </div>
      );
    }
    return null;
  }

  if (!isSubscriptionActive(sub)) {
    return (
      <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
        <span>
          Assinatura inativa.{" "}
          <Link href={ROUTES.billing} className="underline underline-offset-2 hover:no-underline">
            Reativar plano
          </Link>
        </span>
      </div>
    );
  }

  return null;
}
