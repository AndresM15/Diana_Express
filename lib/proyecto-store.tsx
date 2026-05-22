"use client"

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react"

export interface ProyectoMaterial {
  id: string
  nombre: string
  unidad: string
  cantidadPorUnidad: number
  costoUnitario: number
}

export interface ProyectoIntangible {
  id: string
  nombre: string
  tipo: string
  cantidad: number
  costoEstimated: number
}

const INITIAL_MATERIALES: ProyectoMaterial[] = [
  { id: "1", nombre: "Arroz precocido", unidad: "g", cantidadPorUnidad: 85, costoUnitario: 12 },
  { id: "2", nombre: "Aceite vegetal", unidad: "ml", cantidadPorUnidad: 8, costoUnitario: 18 },
  { id: "3", nombre: "Sal y condimentos", unidad: "g", cantidadPorUnidad: 4, costoUnitario: 25 },
  { id: "4", nombre: "Pouch laminado UHT", unidad: "und", cantidadPorUnidad: 1, costoUnitario: 420 },
  { id: "5", nombre: "Caja display", unidad: "und", cantidadPorUnidad: 0.1, costoUnitario: 1800 },
]

const INITIAL_INTANGIBLES: ProyectoIntangible[] = [
  { id: "1", nombre: "Registro INVIMA", tipo: "Licencias", cantidad: 1, costoEstimated: 45000000 },
  { id: "2", nombre: "Marca Diana Express", tipo: "Conocimiento", cantidad: 1, costoEstimated: 12000000 },
  { id: "3", nombre: "ERP producción", tipo: "Software", cantidad: 1, costoEstimated: 8500000 },
]

interface ProyectoStoreValue {
  volumenProduccionMensual: number
  setVolumenProduccionMensual: (value: number) => void
  materiales: ProyectoMaterial[]
  updateMaterialCosto: (id: string, costo: number) => void
  intangibles: ProyectoIntangible[]
}

const ProyectoStoreContext = createContext<ProyectoStoreValue | null>(null)

export function ProyectoStoreProvider({ children }: { children: ReactNode }) {
  const [volumenProduccionMensual, setVolumenProduccionMensual] = useState(14_167)
  const [materiales, setMateriales] = useState(INITIAL_MATERIALES)

  const updateMaterialCosto = useCallback((id: string, costo: number) => {
    setMateriales((prev) =>
      prev.map((m) => (m.id === id ? { ...m, costoUnitario: costo } : m))
    )
  }, [])

  const value: ProyectoStoreValue = {
    volumenProduccionMensual,
    setVolumenProduccionMensual,
    materiales,
    updateMaterialCosto,
    intangibles: INITIAL_INTANGIBLES,
  }

  return (
    <ProyectoStoreContext.Provider value={value}>
      {children}
    </ProyectoStoreContext.Provider>
  )
}

export function useProyectoStore(): ProyectoStoreValue {
  const context = useContext(ProyectoStoreContext)
  if (!context) {
    throw new Error(
      "useProyectoStore debe usarse dentro de ProyectoStoreProvider"
    )
  }
  return context
}
