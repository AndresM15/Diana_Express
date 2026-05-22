"use client"

import { ProyectoStoreProvider } from "@/lib/proyecto-store"

export function Providers({ children }: { children: React.ReactNode }) {
  return <ProyectoStoreProvider>{children}</ProyectoStoreProvider>
}
