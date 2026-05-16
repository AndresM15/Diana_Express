// Data Workspace Types

export type CellType = 'input' | 'formula' | 'imported' | 'benchmark' | 'calculated' | 'inconsistent'
export type Currency = 'COP' | 'USD' | 'both'
export type ViewMode = 'executive' | 'analytic' | 'edit' | 'audit'

export interface FormulaInfo {
  excel: string
  human: string
  inputs: string[]
  sheet: string
  usesTRM: boolean
  usesBenchmark: boolean
  dependencies: string[]
  businessExplanation: string
}

export interface CellMeta {
  type: CellType
  formula?: FormulaInfo
  source?: string
  baseCurrency?: Currency
  isEditable: boolean
  originalValue?: number | string
  inconsistencyNote?: string
}

export interface DataWorkspaceState {
  trm: number
  currency: Currency
  viewMode: ViewMode
  activeBook: string
  activeSheet: string
  isExempt: boolean
  smmlv: number
  auxTransporte: number
}

// Payroll calculation types
export interface PayrollRole {
  cargo: string
  personas: number
  fuenteSalarial: string
  salarioRef: number
  salarioAplicado: number
  auxilio: number
  nominaDirecta: number
  prima: number
  cesantias: number
  intCesantias: number
  vacaciones: number
  aportes: number
  costoEmpresa: number
  costoEmpresaUSD: number
}

// Material cost types
export interface Material {
  material: string
  clasificacion: 'Materia prima' | 'Empaque primario' | 'Empaque secundario'
  unidad: string
  cantidadPorUnidad: number
  costoCompraRef: number
  baseCompra: string
  costoUnitario: number
  costoPorUnidad: number
  observacion: string
}

// Tangible asset types
export interface TangibleAsset {
  tipo: string
  recurso: string
  cantidad: number
  costoUnitario: number
  costoTotal: number
  vidaUtil: number
  costoMensual: number
}

// Intangible asset types
export interface IntangibleAsset {
  tipo: string
  recurso: string
  cantidad: number
  costoEstimado: number
  mesesAmortizacion: number
  costoMensualEq: number
  observacion: string
}

// Valuation factor types
export interface ValuationFactor {
  factor: string
  ponderacion: number
  puntuacion: number
  resultadoPonderado: number
  justificacion: string
}

// Segmentation step types
export interface SegmentationStep {
  paso: number
  nombre: string
  contenido: string
  contenidoNormalizado?: string
}
