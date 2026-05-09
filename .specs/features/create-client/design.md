# Design: Create Client Page

## File Map

```
src/
├── lib/
│   └── api-client.ts                          # NEW — fetchWithAuth utility
├── features/client/
│   ├── schema/index.ts                        # MODIFY — add reminderMessageTemplate + email validation
│   ├── hooks/
│   │   └── use-create-client.ts               # NEW — useMutation hook
│   └── components/
│       ├── client-form.tsx                    # NEW — form UI + RHF logic
│       └── placeholder-help.tsx               # NEW — alert with template placeholders
└── app/(private)/dashboard/clients/
    ├── page.tsx                               # MODIFY — wire "Cadastrar Cliente" button
    └── new/
        └── page.tsx                           # NEW — server page wrapping ClientForm
```

## Component Tree

```
ClientsNewPage (server)
└── ClientForm (client) ["use client"]
    ├── useCreateClient()           ← mutation hook
    ├── useForm() + zodResolver()   ← RHF
    ├── Form > FormField (name)     → Input
    ├── Form > FormField (phone)    → Input
    ├── Form > FormField (email)    → Input
    ├── Accordion
    │   └── Form > FormField (reminderMessageTemplate)
    │       ├── Textarea + char counter
    │       └── PlaceholderHelp     ← Alert subcomponent
    └── Button[submit] + Button[cancel]
```

## Data Flow

```
User fills form
  → RHF validates (Zod) on submit
  → onSubmit strips empty strings → undefined
  → useCreateClient.mutate(payload)
    → fetchWithAuth('POST /api/clients', payload)
      → Clerk getToken() → Authorization: Bearer
      → returns ClientDTO | throws { status, error }
    → onSuccess: invalidateQueries(['clients']) + toast + router.push('/dashboard/clients')
    → onError: map status → error message → toast.error
```

## QueryClientProvider Placement

Add to `src/app/(private)/layout.tsx`:
```tsx
// Wrap children with QueryClientProvider
// Use singleton pattern: module-level `new QueryClient()`
```

## API Payload Shape

```ts
type CreateClientPayload = {
  name: string
  phone?: string          // omit if empty
  email?: string          // omit if empty
  reminderMessageTemplate?: string  // omit if empty/whitespace
}
```

## Error Handling Matrix

| HTTP Status | Toast message |
|-------------|---------------|
| 401 | "Sessão expirada. Faça login novamente." |
| 4xx | body.error ?? "Erro ao criar cliente." |
| network/5xx | "Erro de servidor. Tente novamente." |

## Shadcn Components Needed

Already installed: Button, Input, Card, Label
Need to add via CLI:
- `Form` (shadcn add form)
- `Textarea` (shadcn add textarea)
- `Accordion` (shadcn add accordion)
- `Alert` (shadcn add alert)

Sonner (`sonner`) already installed — use `toast()` directly.

## Conventions (from codebase)

- Feature modules: `src/features/[domain]/`
- Hooks in `features/[domain]/hooks/`
- Components in `features/[domain]/components/`
- Shared UI: `src/components/ui/` (shadcn)
- Portuguese strings (PT-BR) hardcoded
- `cn()` from `@/lib/utils` for class merging
