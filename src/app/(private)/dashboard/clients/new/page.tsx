import { GetBreadcrumb } from "@/components/shared/breadcumbs"
import { ClientForm } from "@/features/client/components/client-form"

export default function NewClientPage() {
  return (
    <div className="container mx-auto max-w-2xl space-y-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Novo cliente</h1>
        <GetBreadcrumb />
      </section>
      <ClientForm />
    </div>
  )
}
