export const ROUTES = {
  // Public
  home: "/",

  // Auth
  signIn: "/sign-in",
  signUp: "/sign-up",

  // Dashboard
  dashboard: "/dashboard",

  // Clients
  clients: "/dashboard/clients",
  clientsNew: "/dashboard/clients/new",
  clientDebts: (clientId: string) => `/dashboard/clients/${clientId}/debts`,

  // Debts
  debts: "/dashboard/debts",
  debtsRegisters: "/dashboard/debts-registers",
} as const;
