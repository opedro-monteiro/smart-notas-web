"use client";

import { Check, Loader2, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatPlanPrice, type PlanConfig } from "@/core/plans";
import { useCreateCheckout } from "@/features/subscription/hooks/use-create-checkout";
import type { PlanTier, SubscriptionDTO } from "@/features/subscription/schema";

type PlanCardProps = {
  plan: PlanConfig;
  currentSub: SubscriptionDTO | null | undefined;
};

export function PlanCard({ plan, currentSub }: PlanCardProps) {
  const { mutate: createCheckout, isPending } = useCreateCheckout();

  const isCurrentPlan =
    currentSub?.status === "ACTIVE" && currentSub.planTier === plan.tier;

  const canSubscribe =
    !isCurrentPlan &&
    currentSub?.status !== "ACTIVE";

  function handleSubscribe() {
    createCheckout(plan.tier as PlanTier);
  }

  return (
    <Card
      className={cn(
        "relative flex flex-col",
        plan.highlighted && "border-primary shadow-lg scale-[1.02]",
      )}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-yellow-900">
            <Star className="h-3 w-3" />
            {plan.badge}
          </span>
        </div>
      )}

      <CardHeader className={cn("pb-4", plan.highlighted && "bg-primary text-primary-foreground rounded-t-xl")}>
        <p className={cn("text-xs font-semibold uppercase tracking-widest", plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground")}>
          {plan.name}
        </p>
        <div className="flex items-end gap-1 mt-1">
          <span className="text-3xl font-bold">{formatPlanPrice(plan.priceMonthly)}</span>
          <span className={cn("mb-1 text-sm", plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground")}>/mês</span>
        </div>
        <p className={cn("text-sm mt-1", plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground")}>
          {plan.description}
        </p>
        {isCurrentPlan && (
          <span className="mt-2 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Plano atual
          </span>
        )}
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4 pt-4">
        <ul className="flex-1 space-y-2.5">
          {plan.features.map((f) => (
            <li
              key={f.text}
              className={cn(
                "flex items-start gap-2 text-sm",
                !f.included && "text-muted-foreground/50",
              )}
            >
              <Check
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  f.included ? "text-green-500" : "opacity-30",
                )}
              />
              {f.text}
            </li>
          ))}
        </ul>

        {plan.highlight && (
          <p className="text-center text-xs font-semibold text-primary">
            ✦ {plan.highlight}
          </p>
        )}

        <Button
          onClick={handleSubscribe}
          disabled={!canSubscribe || isPending}
          variant={plan.highlighted ? "default" : "outline"}
          className="w-full"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isCurrentPlan ? (
            "Plano atual"
          ) : (
            "Assinar agora"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
