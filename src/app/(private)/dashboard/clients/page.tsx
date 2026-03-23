import { GetBreadcrumb } from "@/components/shared/breadcumbs";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { columns } from "@/features/client/constant/columns";
import { clientsData } from "@/features/client/constant/data";

export default function ClientsPage() {
  return (
    <div className="container mx-auto space-y-3">
      <section className="w-full flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Tela de Clientes</h1>
          <GetBreadcrumb />
        </div>
        <Button>Cadastrar Cliente</Button>
      </section>
      <DataTable columns={columns} data={clientsData} />
    </div>
  );
}
