import { Badge } from "@/components/ui/badge";
import type { DebtDTO } from "@/features/deb/schema";

type DebtStatus = DebtDTO["status"];

const STATUS_CONFIG: Record<DebtStatus, { label: string; className: string }> =
  {
    PENDING: {
      label: "Pendente",
      className:
        "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
    PAID: {
      label: "Pago",
      className:
        "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400",
    },
    OVERDUE: {
      label: "Vencido",
      className:
        "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400",
    },
  };

export function DebtStatusBadge({ status }: { status: DebtStatus }) {
  const { label, className } = STATUS_CONFIG[status];
  return <Badge className={className}>{label}</Badge>;
}
