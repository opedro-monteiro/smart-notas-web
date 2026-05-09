"use client";
import Link from "next/link";
import { Users } from "lucide-react";
import { GetBreadcrumb } from "@/components/shared/breadcumbs";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { columns } from "@/features/client/constant/columns";
import { useClients } from "@/features/client/hooks/use-clients";
import { ClientsTableSkeleton } from "@/features/client/components/clients-table-skeleton";

function ClientsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-md border py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Users className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="font-medium">Nenhum cliente cadastrado</p>
        <p className="text-sm text-muted-foreground">
          Cadastre seu primeiro cliente para começar.
        </p>
      </div>
      <Link href="/dashboard/clients/new">
        <Button size="sm">Cadastrar cliente</Button>
      </Link>
    </div>
  );
}

export default function ClientsPage() {
  const { data: clients, isLoading, isError } = useClients();

  return (
    <div className="container mx-auto space-y-3">
      <section className="w-full flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Clientes</h1>
          <GetBreadcrumb />
        </div>
        <Link href="/dashboard/clients/new">
          <Button>Cadastrar Cliente</Button>
        </Link>
      </section>

      {isLoading && <ClientsTableSkeleton />}

      {isError && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Erro ao carregar clientes. Tente recarregar a página.
        </div>
      )}

      {!isLoading && !isError && clients?.length === 0 && (
        <ClientsEmptyState />
      )}

      {!isLoading && !isError && clients && clients.length > 0 && (
        <DataTable columns={columns} data={clients} />
      )}
    </div>
  );
}
