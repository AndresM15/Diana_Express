"use client"

import { motion } from 'framer-motion'
import { 
  Package, Building, Layers, Users, TrendingUp, DollarSign, 
  Info, Calculator, ArrowRight
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { ViewMode, Currency } from '@/lib/data-types'

interface CostSummarySheetProps {
  totals: {
    materialTotal: number
    tangibleTotal: number
    tangibleMensual: number
    intangibleTotal: number
    intangibleMensual: number
    payrollTotal: number
    headcount: number
    capexTotal: number
    mensualEquivalente: number
  }
  trm: number
  currency: Currency
  viewMode: ViewMode
  formatCOP: (value: number) => string
  formatUSD: (value: number) => string
  onFormulaClick: (id: string) => void
}

export function CostSummarySheet({
  totals, trm, currency, viewMode, formatCOP, formatUSD, onFormulaClick
}: CostSummarySheetProps) {
  const kpis = [
    {
      id: 'materials',
      label: 'Costo materiales por unidad',
      valueCOP: totals.materialTotal,
      type: 'Costo unitario',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/10',
      formula: 'SUM(materiales[costo_por_unidad])'
    },
    {
      id: 'tangible',
      label: 'Inversión tangible total',
      valueCOP: totals.tangibleTotal,
      type: 'CAPEX',
      icon: Building,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-500/10',
      formula: 'SUM(tangibles[costo_total])'
    },
    {
      id: 'tangible_mensual',
      label: 'Costo mensual tangibles',
      valueCOP: totals.tangibleMensual,
      type: 'Mensual equivalente',
      icon: Building,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-500/10',
      formula: 'SUM(tangibles[costo_mensual])'
    },
    {
      id: 'intangible',
      label: 'Inversión intangible total',
      valueCOP: totals.intangibleTotal,
      type: 'CAPEX / intangible',
      icon: Layers,
      color: 'text-purple-600',
      bgColor: 'bg-purple-500/10',
      formula: 'SUM(intangibles[costo_estimado])'
    },
    {
      id: 'intangible_mensual',
      label: 'Costo mensual intangibles',
      valueCOP: totals.intangibleMensual,
      type: 'Mensual equivalente',
      icon: Layers,
      color: 'text-purple-600',
      bgColor: 'bg-purple-500/10',
      formula: 'SUM(intangibles[costo_mensual_eq])'
    },
    {
      id: 'payroll',
      label: 'Costo empresa nómina mensual',
      valueCOP: totals.payrollTotal,
      type: 'Mensual',
      icon: Users,
      color: 'text-amber-600',
      bgColor: 'bg-amber-500/10',
      formula: 'SUM(nomina[costo_empresa])'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-6">
      {/* Description */}
      {viewMode === 'executive' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-muted/50 rounded-lg p-4 border"
        >
          <p className="text-sm text-muted-foreground">
            <strong>Vista consolidada para exposición académica.</strong> Todas las cifras se alimentan 
            automáticamente desde las hojas de detalle. Producto base: Diana Express pouch 100g / 250g.
          </p>
        </motion.div>
      )}

      {/* KPI Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {kpis.map((kpi, index) => (
          <motion.div key={kpi.id} variants={itemVariants}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow border-primary/5">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                    <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className="text-[10px]">{kpi.type}</Badge>
                    {viewMode === 'audit' && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6"
                              onClick={() => onFormulaClick(kpi.id)}
                            >
                              <Calculator className="w-3 h-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-mono text-xs">{kpi.formula}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                <div className="space-y-1">
                  {(currency === 'COP' || currency === 'both') && (
                    <p className="text-lg font-bold text-foreground">
                      {formatCOP(kpi.valueCOP)}
                      <span className="text-xs font-normal text-muted-foreground ml-1">COP</span>
                    </p>
                  )}
                  {(currency === 'USD' || currency === 'both') && (
                    <p className={`${currency === 'both' ? 'text-sm' : 'text-lg font-bold'} text-muted-foreground`}>
                      {formatUSD(kpi.valueCOP / trm)}
                      <span className="text-xs font-normal ml-1">USD</span>
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Insights Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Insights del Modelo</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <span className="text-sm">CAPEX total combinado</span>
                  <div className="text-right">
                    <p className="font-bold">{formatCOP(totals.capexTotal)}</p>
                    <p className="text-xs text-muted-foreground">{formatUSD(totals.capexTotal / trm)} USD</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <span className="text-sm">Mensual equiv. total</span>
                  <div className="text-right">
                    <p className="font-bold">{formatCOP(totals.mensualEquivalente)}</p>
                    <p className="text-xs text-muted-foreground">{formatUSD(totals.mensualEquivalente / trm)} USD</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <span className="text-sm">Headcount total</span>
                  <p className="font-bold text-xl">{totals.headcount} personas</p>
                </div>
                <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-600 mt-0.5" />
                    <p className="text-xs text-amber-700">
                      La nómina es el principal componente mensual del modelo, representando el 
                      <strong> {((totals.payrollTotal / (totals.payrollTotal + totals.mensualEquivalente)) * 100).toFixed(1)}%</strong> del 
                      costo mensual operativo total.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Color Legend (Audit Mode) */}
      {viewMode === 'audit' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="p-4 bg-muted/30 rounded-lg"
        >
          <h4 className="text-sm font-medium mb-3">Leyenda de colores del workbook original</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500" />
              <span className="text-xs">Entradas/parámetros editables</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-500" />
              <span className="text-xs">Datos importados/referencia</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-foreground" />
              <span className="text-xs">Fórmulas y resultados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-orange-500" />
              <span className="text-xs">Notas metodológicas</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
