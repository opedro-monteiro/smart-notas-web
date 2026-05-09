"use client";

import { TrendingUp, TrendingDown, DollarSign, Users, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { AnalyticsSummaryDTO } from "@/features/analytics/schema";

function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

type KpiCardsProps = {
  data: AnalyticsSummaryDTO | undefined;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
};

export function KpiCards({ data, isLoading, isError, onRetry }: KpiCardsProps) {
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-8 text-center">
        <AlertCircle className="h-8 w-8 text-destructive" />
        <p className="text-sm text-muted-foreground">Erro ao carregar dados.</p>
        <button
          onClick={onRetry}
          className="text-sm font-medium underline underline-offset-4 hover:text-primary"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Financial KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <FinancialCard
          title="A Receber"
          value={data ? formatBRL(data.totalReceivable) : null}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          isLoading={isLoading}
        />
        <FinancialCard
          title="Total Recebido"
          value={data ? formatBRL(data.totalCollected) : null}
          icon={<TrendingUp className="h-4 w-4 text-green-600" />}
          valueClassName="text-green-600"
          isLoading={isLoading}
        />
        <FinancialCard
          title="Em Atraso"
          value={data ? formatBRL(data.totalOverdue) : null}
          icon={<TrendingDown className="h-4 w-4 text-red-600" />}
          valueClassName="text-red-600"
          isLoading={isLoading}
        />
        <FinancialCard
          title="Taxa de Recebimento"
          value={data ? formatPercent(data.collectionRate) : null}
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          isLoading={isLoading}
        />
      </div>

      {/* Operational KPIs + Debt distribution */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <OperationalCard
          title="Clientes Ativos"
          value={data?.totalClients ?? null}
          subtitle="clientes cadastrados"
          isLoading={isLoading}
        />
        <OperationalCard
          title="Clientes Inadimplentes"
          value={data?.totalDelinquentClients ?? null}
          subtitle="com dívidas em atraso"
          highlight={data ? data.totalDelinquentClients > 0 : false}
          isLoading={isLoading}
        />
        <DebtDistributionCard data={data} isLoading={isLoading} />
      </div>
    </div>
  );
}

type FinancialCardProps = {
  title: string;
  value: string | null;
  icon: React.ReactNode;
  valueClassName?: string;
  isLoading: boolean;
};

function FinancialCard({ title, value, icon, valueClassName, isLoading }: FinancialCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-32" />
        ) : (
          <div className={`text-2xl font-bold ${valueClassName ?? ""}`}>{value}</div>
        )}
      </CardContent>
    </Card>
  );
}

type OperationalCardProps = {
  title: string;
  value: number | null;
  subtitle: string;
  highlight?: boolean;
  isLoading: boolean;
};

function OperationalCard({ title, value, subtitle, highlight, isLoading }: OperationalCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <div className="flex items-center gap-2">
            <span
              className={`text-2xl font-bold ${highlight ? "text-red-600" : ""}`}
            >
              {value}
            </span>
            {highlight && value !== null && value > 0 && (
              <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400">
                atenção
              </Badge>
            )}
          </div>
        )}
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

type DebtDistributionCardProps = {
  data: AnalyticsSummaryDTO | undefined;
  isLoading: boolean;
};

function DebtDistributionCard({ data, isLoading }: DebtDistributionCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Distribuição de Débitos</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400">
              {data?.debtsByStatus.PENDING ?? 0} pendentes
            </Badge>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
              {data?.debtsByStatus.PAID ?? 0} pagas
            </Badge>
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400">
              {data?.debtsByStatus.OVERDUE ?? 0} em atraso
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
