# Feature Spec: Create Client Page

## Overview

Form page at `/dashboard/clients/new` to create a client via `POST /api/clients`.
Clerk-authenticated. Separate UI from logic via custom hooks.

## Requirements

### REQ-001: Install missing dependencies
Install `@tanstack/react-query` and `react-hook-form` + `@hookform/resolvers`.
Add `QueryClientProvider` to `src/app/(private)/layout.tsx`.

### REQ-002: Update Zod schema
File: `src/features/client/schema/index.ts`
- Add `reminderMessageTemplate?: string` (max 1600 chars) to `CreateClientSchema`
- Add email format validation: `z.string().email().optional().or(z.literal(''))`
- Export `MAX_REMINDER_MESSAGE_TEMPLATE_LENGTH = 1600`

### REQ-003: API client utility
File: `src/lib/api-client.ts`
- `fetchWithAuth(path, options)` — uses Clerk `useAuth().getToken()` to inject `Authorization: Bearer <token>`
- Returns typed response or throws with `{ status, error }` shape
- Used only client-side (`"use client"`)

### REQ-004: `useCreateClient` mutation hook
File: `src/features/client/hooks/use-create-client.ts`
- `useMutation` with `mutationKey: ['clients', 'create']`
- On success: `queryClient.invalidateQueries({ queryKey: ['clients'] })` + toast success + `router.push('/dashboard/clients')`
- On error: map 401 → "Sessão expirada"; 4xx body.error; fallback generic
- Returns `{ mutate, isPending, error }`

### REQ-005: `ClientForm` component
File: `src/features/client/components/client-form.tsx`
- `"use client"`
- Uses `useForm` + `zodResolver(CreateClientFormSchema)`
- `defaultValues: { name: '', phone: '', email: '', reminderMessageTemplate: '' }`
- On submit: strip empty strings → `undefined` before calling `mutate`
- shadcn `Form` + `FormField` + `FormItem` + `FormLabel` + `FormControl` + `FormMessage`
- Fields: `Input` (name, phone, email), `Textarea` (reminderMessageTemplate)
- Char counter on Textarea: `X / 1600`
- `PlaceholderHelp` subcomponent (Alert/Callout listing placeholders)
- `reminderMessageTemplate` inside shadcn `Accordion` ("Mensagem personalizada avançada")
- Submit `Button` disabled + spinner when `isPending`
- Cancel `Button` variant `outline` → `router.back()`

### REQ-006: `PlaceholderHelp` subcomponent
File: `src/features/client/components/placeholder-help.tsx`
- Lists: `{{clientName}}`, `{{amount}}`, `{{dueDate}}`, `{{dueDateSpoken}}`, `{{sender}}`, `{{companyName}}`
- Note: without template, system uses default message
- Uses shadcn `Alert` + `AlertDescription`

### REQ-007: Create client page
File: `src/app/(private)/dashboard/clients/new/page.tsx`
- Server component (no `"use client"`)
- Renders `Breadcrumbs` + `ClientForm`
- Breadcrumb: Dashboard → Clientes → Novo cliente

### REQ-008: Wire "Cadastrar Cliente" button in clients listing
File: `src/app/(private)/dashboard/clients/page.tsx`
- Button navigates to `/dashboard/clients/new`

## Acceptance Criteria

- [ ] REQ-001: `pnpm typecheck` passes after deps install
- [ ] REQ-002: Schema rejects `reminderMessageTemplate` > 1600 chars; invalid email; empty name
- [ ] REQ-003: Every `fetchWithAuth` call includes Bearer token
- [ ] REQ-004: Success invalidates `['clients']` query; error states show correct messages
- [ ] REQ-005: Form submits only valid data; empty optional fields omitted from body
- [ ] REQ-006: All 6 placeholders listed in UI
- [ ] REQ-007: Page renders with correct breadcrumb
- [ ] REQ-008: Button navigates to `/dashboard/clients/new`

## Out of Scope

- PATCH / DELETE client
- Phone E.164 normalization
- i18n beyond PT-BR strings
- E2E Playwright tests
