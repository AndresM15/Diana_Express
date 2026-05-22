"use client"

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Database, Calculator, DollarSign, Users, Package, Building, FileText, 
  PieChart, Target, TrendingUp, Settings, Eye, Edit3, FileSearch, 
  RefreshCw, Search, Filter, ChevronDown, Info, AlertTriangle, CheckCircle,
  Layers, BookOpen
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import type { ViewMode, Currency } from '@/lib/data-types'
import { 
  initialMaterials, initialTangibleAssets, initialIntangibleAssets, 
  initialPayrollRoles, initialValuationFactors, initialSegmentationSteps,
  calculatePayroll, sourcesData, benchmarkCrosswalk, scoringScale, logicalFramework
} from '@/lib/data-store'

import { CostSummarySheet } from './sheets/cost-summary'
import { MaterialsSheet } from './sheets/materials'
import { TangiblesSheet } from './sheets/tangibles'
import { IntangiblesSheet } from './sheets/intangibles'
import { PayrollSheet } from './sheets/payroll'
import { SourcesSheet } from './sheets/sources'
import { SegmentationSheet } from './sheets/segmentation'
import { LogicalFrameworkSheet } from './sheets/logical-framework'
import { ValuationSheet } from './sheets/valuation'
import { FormulaPanel } from './formula-panel'

const books = [
  { id: 'costos', name: 'Modelo de Costos', icon: Calculator },
  { id: 'segmentacion', name: 'Segmentación', icon: Target },
  { id: 'evaluacion', name: 'Evaluación del Negocio', icon: TrendingUp }
]

const sheets: Record<string, { id: string; name: string; icon: React.ElementType }[]> = {
  costos: [
    { id: 'resumen', name: 'Resumen de Costos', icon: PieChart },
    { id: 'materiales', name: 'Materiales y Empaque', icon: Package },
    { id: 'tangibles', name: 'CAPEX Tangible', icon: Building },
    { id: 'intangibles', name: 'Recursos Intangibles', icon: Layers },
    { id: 'nomina', name: 'Nómina y Costo Empresa', icon: Users },
    { id: 'fuentes', name: 'Fuentes y Supuestos', icon: FileText }
  ],
  segmentacion: [
    { id: 'segmentacion', name: 'Segmentación de Mercado', icon: Target }
  ],
  evaluacion: [
    { id: 'marco-logico', name: 'Matriz de Marco Lógico', icon: BookOpen },
    { id: 'valoracion', name: 'Valoración de Factores', icon: TrendingUp }
  ]
}

const viewModes: { id: ViewMode; name: string; icon: React.ElementType }[] = [
  { id: 'executive', name: 'Ejecutiva', icon: Eye },
  { id: 'analytic', name: 'Analítica', icon: PieChart },
  { id: 'edit', name: 'Edición', icon: Edit3 },
  { id: 'audit', name: 'Auditoría', icon: FileSearch }
]

export function DataWorkspace() {
  // Global state
  const [trm, setTrm] = useState(4150)
  const [currency, setCurrency] = useState<Currency>('both')
  const [viewMode, setViewMode] = useState<ViewMode>('executive')
  const [activeBook, setActiveBook] = useState('costos')
  const [activeSheet, setActiveSheet] = useState('resumen')
  const [isExempt, setIsExempt] = useState(true)
  const [smmlv, setSmmlv] = useState(1750905)
  const [auxTransporte, setAuxTransporte] = useState(249095)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFormula, setSelectedFormula] = useState<string | null>(null)

  // Materials state
  const [materials, setMaterials] = useState(initialMaterials)
  
  // Tangibles state
  const [tangibles, setTangibles] = useState(initialTangibleAssets)
  
  // Intangibles state
  const [intangibles, setIntangibles] = useState(initialIntangibleAssets)
  
  // Payroll state - recalculate when parameters change
  const payrollRoles = useMemo(() => {
    return initialPayrollRoles.map(role => 
      calculatePayroll(
        { cargo: role.cargo, personas: role.personas, fuenteSalarial: role.fuenteSalarial, salarioRef: role.salarioRef },
        smmlv,
        auxTransporte,
        isExempt,
        trm
      )
    )
  }, [smmlv, auxTransporte, isExempt, trm])
  
  // Valuation state
  const [valuationFactors, setValuationFactors] = useState(initialValuationFactors)
  
  // Calculate totals
  const totals = useMemo(() => {
    const materialTotal = materials.reduce((sum, m) => sum + m.costoPorUnidad, 0)
    const tangibleTotal = tangibles.reduce((sum, t) => sum + t.costoTotal, 0)
    const tangibleMensual = tangibles.reduce((sum, t) => sum + t.costoMensual, 0)
    const intangibleTotal = intangibles.reduce((sum, i) => sum + i.costoEstimado, 0)
    const intangibleMensual = intangibles.reduce((sum, i) => sum + i.costoMensualEq, 0)
    const payrollTotal = payrollRoles.reduce((sum, p) => sum + p.costoEmpresa, 0)
    const headcount = payrollRoles.reduce((sum, p) => sum + p.personas, 0)
    const valuationTotal = valuationFactors.reduce((sum, v) => sum + v.resultadoPonderado, 0)
    
    return {
      materialTotal,
      tangibleTotal,
      tangibleMensual,
      intangibleTotal,
      intangibleMensual,
      payrollTotal,
      headcount,
      capexTotal: tangibleTotal + intangibleTotal,
      mensualEquivalente: tangibleMensual + intangibleMensual,
      valuationTotal
    }
  }, [materials, tangibles, intangibles, payrollRoles, valuationFactors])

  const formatCOP = (value: number) => {
    const rounded = Math.round(value)
    const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return `$ ${formatted}`
  }

  const formatUSD = (value: number) => {
    return `$ ${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  }

  const handleReset = () => {
    setTrm(4150)
    setSmmlv(1750905)
    setAuxTransporte(249095)
    setIsExempt(true)
    setMaterials(initialMaterials)
    setTangibles(initialTangibleAssets)
    setIntangibles(initialIntangibleAssets)
    setValuationFactors(initialValuationFactors)
  }

  const currentSheets = sheets[activeBook] || []

  return (
    <section id="data-workspace" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            <Database className="w-3 h-3 mr-1" />
            Centro de Datos
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Data Workspace
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dashboard ejecutivo, panel analítico, workbook editable e inspector de fórmulas 
            integrados en una sola interfaz profesional
          </p>
        </motion.div>

        {/* Control Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="mb-6 border-primary/10">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                {/* View Mode Toggle */}
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium text-muted-foreground">Vista:</Label>
                  <div className="flex bg-muted rounded-lg p-1">
                    {viewModes.map((mode) => (
                      <Button
                        key={mode.id}
                        variant={viewMode === mode.id ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode(mode.id)}
                        className="gap-1"
                      >
                        <mode.icon className="w-3 h-3" />
                        <span className="hidden sm:inline">{mode.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Currency Toggle */}
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium text-muted-foreground">Moneda:</Label>
                  <Select value={currency} onValueChange={(v) => setCurrency(v as Currency)}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="COP">Solo COP</SelectItem>
                      <SelectItem value="USD">Solo USD</SelectItem>
                      <SelectItem value="both">Ambas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* TRM Control */}
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium text-muted-foreground">TRM:</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                    <Input
                      type="number"
                      value={trm}
                      onChange={(e) => setTrm(Number(e.target.value))}
                      className="w-[100px] pl-6 text-sm"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">COP/USD</span>
                </div>

                {/* Exempt Toggle */}
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium text-muted-foreground">Empresa exonerada:</Label>
                  <Switch checked={isExempt} onCheckedChange={setIsExempt} />
                  <Badge variant={isExempt ? 'default' : 'secondary'} className="text-xs">
                    {isExempt ? 'Sí' : 'No'}
                  </Badge>
                </div>

                {/* Search */}
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar datos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>

                {/* Reset Button */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={handleReset}>
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Restablecer valores originales</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Workspace */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          {/* Book Navigation */}
          <Card className="lg:col-span-1 border-primary/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                Libros de Trabajo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {books.map((book) => (
                <motion.button
                  key={book.id}
                  onClick={() => {
                    setActiveBook(book.id)
                    setActiveSheet(sheets[book.id]?.[0]?.id || '')
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                    activeBook === book.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <book.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{book.name}</span>
                </motion.button>
              ))}

              {/* Sheet List */}
              <div className="pt-4 border-t mt-4">
                <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                  Hojas
                </p>
                <div className="space-y-1">
                  {currentSheets.map((sheet) => (
                    <motion.button
                      key={sheet.id}
                      onClick={() => setActiveSheet(sheet.id)}
                      className={`w-full flex items-center gap-2 p-2 rounded-md text-left text-sm transition-all ${
                        activeSheet === sheet.id 
                          ? 'bg-accent text-accent-foreground font-medium' 
                          : 'hover:bg-muted text-muted-foreground'
                      }`}
                      whileHover={{ x: 4 }}
                    >
                      <sheet.icon className="w-3 h-3" />
                      {sheet.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Legend */}
              {viewMode === 'audit' && (
                <div className="pt-4 border-t mt-4">
                  <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                    Leyenda de Datos
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/30">input</Badge>
                      <span className="text-muted-foreground">Editable</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">fx</Badge>
                      <span className="text-muted-foreground">Fórmula</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-500/30">ref</Badge>
                      <span className="text-muted-foreground">Benchmark</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                        <AlertTriangle className="w-3 h-3" />
                      </Badge>
                      <span className="text-muted-foreground">Inconsistencia</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sheet Content */}
          <Card className="lg:col-span-3 border-primary/10 overflow-hidden">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {currentSheets.find(s => s.id === activeSheet)?.name || 'Selecciona una hoja'}
                  </CardTitle>
                  <CardDescription>
                    Libro: {books.find(b => b.id === activeBook)?.name}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {viewMode === 'audit' && (
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-600">
                      <FileSearch className="w-3 h-3 mr-1" />
                      Modo Auditoría
                    </Badge>
                  )}
                  {viewMode === 'edit' && (
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-600">
                      <Edit3 className="w-3 h-3 mr-1" />
                      Modo Edición
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 max-h-[700px] overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeBook}-${activeSheet}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Render appropriate sheet */}
                  {activeBook === 'costos' && activeSheet === 'resumen' && (
                    <CostSummarySheet 
                      totals={totals}
                      trm={trm}
                      currency={currency}
                      viewMode={viewMode}
                      formatCOP={formatCOP}
                      formatUSD={formatUSD}
                      onFormulaClick={setSelectedFormula}
                    />
                  )}
                  {activeBook === 'costos' && activeSheet === 'materiales' && (
                    <MaterialsSheet 
                      materials={materials}
                      setMaterials={setMaterials}
                      trm={trm}
                      currency={currency}
                      viewMode={viewMode}
                      formatCOP={formatCOP}
                      formatUSD={formatUSD}
                      onFormulaClick={setSelectedFormula}
                    />
                  )}
                  {activeBook === 'costos' && activeSheet === 'tangibles' && (
                    <TangiblesSheet 
                      tangibles={tangibles}
                      setTangibles={setTangibles}
                      trm={trm}
                      currency={currency}
                      viewMode={viewMode}
                      formatCOP={formatCOP}
                      formatUSD={formatUSD}
                      onFormulaClick={setSelectedFormula}
                    />
                  )}
                  {activeBook === 'costos' && activeSheet === 'intangibles' && (
                    <IntangiblesSheet 
                      intangibles={intangibles}
                      setIntangibles={setIntangibles}
                      trm={trm}
                      currency={currency}
                      viewMode={viewMode}
                      formatCOP={formatCOP}
                      formatUSD={formatUSD}
                      onFormulaClick={setSelectedFormula}
                    />
                  )}
                  {activeBook === 'costos' && activeSheet === 'nomina' && (
                    <PayrollSheet 
                      payrollRoles={payrollRoles}
                      smmlv={smmlv}
                      setSmmlv={setSmmlv}
                      auxTransporte={auxTransporte}
                      setAuxTransporte={setAuxTransporte}
                      isExempt={isExempt}
                      trm={trm}
                      currency={currency}
                      viewMode={viewMode}
                      formatCOP={formatCOP}
                      formatUSD={formatUSD}
                      onFormulaClick={setSelectedFormula}
                    />
                  )}
                  {activeBook === 'costos' && activeSheet === 'fuentes' && (
                    <SourcesSheet 
                      sources={sourcesData}
                      benchmarkCrosswalk={benchmarkCrosswalk}
                      trm={trm}
                      viewMode={viewMode}
                      formatCOP={formatCOP}
                    />
                  )}
                  {activeBook === 'segmentacion' && activeSheet === 'segmentacion' && (
                    <SegmentationSheet 
                      steps={initialSegmentationSteps}
                      viewMode={viewMode}
                    />
                  )}
                  {activeBook === 'evaluacion' && activeSheet === 'marco-logico' && (
                    <LogicalFrameworkSheet 
                      framework={logicalFramework}
                      viewMode={viewMode}
                    />
                  )}
                  {activeBook === 'evaluacion' && activeSheet === 'valoracion' && (
                    <ValuationSheet 
                      factors={valuationFactors}
                      setFactors={setValuationFactors}
                      scoringScale={scoringScale}
                      viewMode={viewMode}
                      onFormulaClick={setSelectedFormula}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Formula Panel */}
        <AnimatePresence>
          {selectedFormula && (
            <FormulaPanel 
              formulaId={selectedFormula}
              onClose={() => setSelectedFormula(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
