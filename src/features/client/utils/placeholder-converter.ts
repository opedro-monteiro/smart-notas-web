const PT_TO_EN: Record<string, string> = {
  "{{nomeCliente}}": "{{clientName}}",
  "{{valor}}": "{{amount}}",
  "{{dataVencimento}}": "{{dueDate}}",
  "{{dataVencimentoPorExtenso}}": "{{dueDateSpoken}}",
  "{{remetente}}": "{{sender}}",
  "{{nomeEmpresa}}": "{{companyName}}",
}

const EN_TO_PT: Record<string, string> = Object.fromEntries(
  Object.entries(PT_TO_EN).map(([pt, en]) => [en, pt])
)

function replacePlaceholders(
  template: string,
  map: Record<string, string>
): string {
  return Object.entries(map).reduce(
    (result, [from, to]) => result.replaceAll(from, to),
    template
  )
}

/** Convert user-facing PT-BR placeholders → API English placeholders (call before submit) */
export function templatePtToEn(template: string): string {
  return replacePlaceholders(template, PT_TO_EN)
}

/** Convert API English placeholders → user-facing PT-BR placeholders (call before display/edit) */
export function templateEnToPt(template: string): string {
  return replacePlaceholders(template, EN_TO_PT)
}

/** PT-BR placeholder metadata for UI display */
export const PLACEHOLDERS_PT = [
  { key: "{{nomeCliente}}", label: "Nome do cliente" },
  { key: "{{valor}}", label: "Valor da dívida" },
  { key: "{{dataVencimento}}", label: "Data de vencimento" },
  { key: "{{dataVencimentoPorExtenso}}", label: "Data de vencimento por extenso" },
  { key: "{{remetente}}", label: "Remetente" },
  { key: "{{nomeEmpresa}}", label: "Nome da empresa" },
] as const
