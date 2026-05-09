# Tasks: Create Client Page

## Status Legend
- [ ] TODO
- [~] IN PROGRESS
- [x] DONE
- [!] BLOCKED

---

## T-01: Install dependencies + QueryClientProvider
**Status:** [ ]
**What:** Install `@tanstack/react-query`, `react-hook-form`, `@hookform/resolvers`. Add `QueryClientProvider` to private layout.
**Where:**
- `package.json` (via pnpm)
- `src/app/(private)/layout.tsx`
**Done when:** `pnpm typecheck` passes; `useQuery`/`useMutation` importable.
**Gate:** `pnpm typecheck`
**No dependencies.**

---

## T-02: Add shadcn components
**Status:** [ ]
**What:** Add Form, Textarea, Accordion, Alert via shadcn CLI.
**Where:** `src/components/ui/`
**Done when:** All 4 components importable from `@/components/ui/`.
**Gate:** `pnpm typecheck`
**Depends on:** T-01 (project stable)

---

## T-03: Update Zod schema
**Status:** [ ]
**What:** Add `reminderMessageTemplate` (max 1600), fix email validation, export constant.
**Where:** `src/features/client/schema/index.ts`
**Done when:**
- `MAX_REMINDER_MESSAGE_TEMPLATE_LENGTH = 1600` exported
- `CreateClientSchema` rejects template > 1600 chars
- Email validated when present, passes when empty string
**Gate:** `pnpm typecheck`
**Depends on:** T-01

---

## T-04: Create `fetchWithAuth` utility
**Status:** [ ]
**What:** Client-side fetch wrapper that gets Clerk token and injects Bearer header.
**Where:** `src/lib/api-client.ts`
**Done when:** Function signature `fetchWithAuth<T>(path: string, options?: RequestInit): Promise<T>` exported; throws `{ status: number; error: string }` on non-2xx.
**Gate:** `pnpm typecheck`
**Depends on:** T-01

---

## T-05: Create `useCreateClient` hook
**Status:** [ ]
**What:** `useMutation` wrapping POST /api/clients via `fetchWithAuth`. Handles success (invalidate + toast + redirect) and error (status-mapped toast).
**Where:** `src/features/client/hooks/use-create-client.ts`
**Done when:**
- Hook exports `{ mutate, isPending }`
- `onSuccess` invalidates `['clients']` + sonner toast.success + router.push
- `onError` maps 401/4xx/fallback to toast.error
**Gate:** `pnpm typecheck`
**Depends on:** T-03, T-04

---

## T-06: Create `PlaceholderHelp` component
**Status:** [ ]
**What:** Alert listing 6 template placeholders with note about default message.
**Where:** `src/features/client/components/placeholder-help.tsx`
**Done when:** All 6 placeholders listed; note about default message present; no TS errors.
**Gate:** `pnpm typecheck`
**Depends on:** T-02

---

## T-07: Create `ClientForm` component
**Status:** [ ]
**What:** Full form with RHF + zodResolver. Fields: name, phone, email, reminderMessageTemplate (in Accordion). Char counter. Submit/cancel buttons.
**Where:** `src/features/client/components/client-form.tsx`
**Done when:**
- `"use client"` directive present
- All 4 fields render with `FormField` + `FormLabel` + `FormControl` + `FormMessage`
- Textarea shows `X / 1600` counter
- Accordion wraps template field + PlaceholderHelp
- Submit disabled + shows spinner when `isPending`
- Cancel calls `router.back()`
- Empty optional fields stripped to `undefined` before mutate
**Gate:** `pnpm typecheck`
**Depends on:** T-05, T-06

---

## T-08: Create `/dashboard/clients/new` page
**Status:** [ ]
**What:** Server component page rendering Breadcrumbs + ClientForm.
**Where:** `src/app/(private)/dashboard/clients/new/page.tsx`
**Done when:** Page renders; breadcrumb shows Dashboard → Clientes → Novo cliente.
**Gate:** `pnpm typecheck`
**Depends on:** T-07

---

## T-09: Wire clients listing button
**Status:** [ ]
**What:** "Cadastrar Cliente" button in clients page navigates to `/dashboard/clients/new`.
**Where:** `src/app/(private)/dashboard/clients/page.tsx`
**Done when:** Button wrapped in `<Link href="/dashboard/clients/new">` or uses `router.push`.
**Gate:** `pnpm typecheck`
**Depends on:** T-08

---

## Execution Order

```
T-01 → T-02 ─┐
         T-03 ┤
         T-04 ┘→ T-05 → T-06 → T-07 → T-08 → T-09

T-02 and T-03 and T-04 can run in parallel after T-01.
T-06 needs only T-02.
T-07 needs T-05 + T-06.
```

## Parallel Groups

| Group | Tasks | Blocker |
|-------|-------|---------|
| G1 | T-01 | none |
| G2 | T-02, T-03, T-04 | T-01 done |
| G3 | T-05, T-06 | G2 done |
| G4 | T-07 | G3 done |
| G5 | T-08, T-09 | T-07 done |
