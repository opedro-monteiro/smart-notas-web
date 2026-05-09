import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { PLACEHOLDERS_PT } from "@/features/client/utils/placeholder-converter"

export function PlaceholderHelp() {
  return (
    <Alert variant="default" className="mt-2">
      <InfoIcon className="h-4 w-4" />
      <AlertDescription>
        <p className="mb-2 font-medium">Variáveis disponíveis:</p>
        <ul className="space-y-1 text-sm">
          {PLACEHOLDERS_PT.map(({ key, label }) => (
            <li key={key}>
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                {key}
              </code>{" "}
              — {label}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-muted-foreground">
          Sem mensagem personalizada, o sistema usa a mensagem padrão.
        </p>
      </AlertDescription>
    </Alert>
  )
}
