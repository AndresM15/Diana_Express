"use client"

import { motion } from 'framer-motion'
import { Users, Calculator, ExternalLink, Info, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts'
import type { ViewMode, Currency, PayrollRole } from '@/lib/data-types'

interface PayrollSheetProps {
  payrollRoles: PayrollRole[]
  smmlv: number
  setSmmlv: (value: number) => void
  auxTransporte: number
  setAuxTransporte: (value: number) => void
  isExempt: boolean
  trm: number
  currency: Currency
  viewMode: ViewMode
  formatCOP: (value: number) => string
  formatUSD: (value: number) => string
  onFormulaClick: (id: string) => void
}

const fuentesLinks: Record<string, string> = {
  'Computrabajo': 'https://co.computrabajo.com/salarios/quimico-formulador',
  'Indeed': 'https://co.indeed.com/career/'
}

export function PayrollSheet({
  payrollRoles, smmlv, setSmmlv, auxTransporte, setAuxTransporte, isExempt, trm, currency, viewMode, formatCOP, formatUSD
}: PayrollSheetProps) {
  const headcount = payrollRoles.reduce((sum, r) => sum + r.personas, 0)
  const totalNominaDirecta = payrollRoles.reduce((sum, r) => sum + r.nominaDirecta, 0)
  const totalCostoEmpresa = payrollRoles.reduce((sum, r) => sum + r.costoEmpresa, 0)
  const costoPromedio = totalCostoEmpresa / headcount
  const totalAuxilio = payrollRoles.reduce((sum, r) => sum + r.auxilio, 0)
  const totalPrima = payrollRoles.reduce((sum, r) => sum + r.prima, 0)
  const totalCesantias = payrollRoles.reduce((sum, r) => sum + r.cesantias, 0)
  const totalIntCesantias = payrollRoles.reduce((sum, r) => sum + r.intCesantias, 0)
  const totalVacaciones = payrollRoles.reduce((sum, r) => sum + r.vacaciones, 0)
  const totalAportes = payrollRoles.reduce((sum, r) => sum + r.aportes, 0)

  const chartData = payrollRoles.map(r => ({
    name: r.cargo.length > 15 ? r.cargo.substring(0, 15) + '...' : r.cargo,
    nominaDirecta: Math.round(r.nominaDirecta),
    provisiones: Math.round(r.prima + r.cesantias + r.intCesantias + r.vacaciones),
    aportes: Math.round(r.aportes)
  }))

  const formulas = [
    { name: 'Salario aplicado', excel: '=MAX(salario_ref, SMMLV)', human: 'salario_aplicado = max(salario_referencia, SMMLV)' },
    { name: 'Auxilio de transporte', excel: '=IF(salario_aplicado<=2*SMMLV, personas*auxilio, 0)', human: 'si salario <= 2 SMMLV, entonces personas × auxilio; si no, 0' },
    { name: 'Nómina directa', excel: '=personas*salario_aplicado + auxilio', human: 'nómina_directa = personas × salario_aplicado + auxilio' },
    { name: 'Prima', excel: '=nómina_directa * 8.33%', human: 'prima_mensual = nómina_directa × 8,33%' },
    { name: 'Cesantías', excel: '=nómina_directa * 8.33%', human: 'cesantías_mensuales = nómina_directa × 8,33%' },
    { name: 'Intereses cesantías', excel: '=cesantías * 12%', human: 'intereses_cesantías = cesantías × 12%' },
    { name: 'Vacaciones', excel: '=personas*salario_aplicado * 4.17%', human: 'vacaciones = personas × salario_aplicado × 4,17%' },
    { name: 'Aportes empleador', excel: '=personas*salario*(12%+4%+0.522%+IF(exonerado,0,13.5%))', human: 'pensión 12% + caja 4% + ARL 0.522% + (si no exonerado: salud 8.5% + SENA 2% + ICBF 3%)' },
    { name: 'Costo empresa', excel: '=nómina_directa+prima+cesantías+int_ces+vac+aportes', human: 'suma de nómina directa + todas las provisiones + aportes' }
  ]

  return (
    <div className="space-y-6">
      {/* Parameters Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-600" />
              Parámetros de referencia 2026
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-xs">SMMLV 2026</Label>
                {viewMode === 'edit' ? (
                  <Input
                    type="number"
                    value={smmlv}
                    onChange={(e) => setSmmlv(Number(e.target.value))}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm font-medium mt-1">{formatCOP(smmlv)}</p>
                )}
              </div>
              <div>
                <Label className="text-xs">Auxilio de transporte</Label>
                {viewMode === 'edit' ? (
                  <Input
                    type="number"
                    value={auxTransporte}
                    onChange={(e) => setAuxTransporte(Number(e.target.value))}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm font-medium mt-1">{formatCOP(auxTransporte)}</p>
                )}
              </div>
              <div>
                <Label className="text-xs">Umbral auxilio (2 SMMLV)</Label>
                <p className="text-sm font-medium mt-1">{formatCOP(2 * smmlv)}</p>
              </div>
              <div>
                <Label className="text-xs">Empresa exonerada</Label>
                <Badge variant={isExempt ? 'default' : 'secondary'} className="mt-1">
                  {isExempt ? 'Sí' : 'No'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-br from-amber-500/10 to-transparent">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Headcount total</p>
              <p className="text-3xl font-bold">{headcount}</p>
              <p className="text-xs text-muted-foreground">personas</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}>
          <Card className="bg-gradient-to-br from-emerald-500/10 to-transparent">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Nómina directa total</p>
              <p className="text-xl font-bold">{formatCOP(totalNominaDirecta)}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gradient-to-br from-primary/10 to-transparent">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Costo empresa mensual</p>
              <p className="text-xl font-bold">{formatCOP(totalCostoEmpresa)}</p>
              {currency === 'both' && (
                <p className="text-sm text-muted-foreground">{formatUSD(totalCostoEmpresa / trm)} USD</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }}>
          <Card className="bg-gradient-to-br from-purple-500/10 to-transparent">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Costo promedio/persona</p>
              <p className="text-xl font-bold">{formatCOP(costoPromedio)}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Chart */}
      {(viewMode === 'executive' || viewMode === 'analytic') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-4">
              <h4 className="text-sm font-medium mb-4">Composición del costo empresa por cargo</h4>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical">
                    <XAxis type="number" tickFormatter={(v) => `$${(v/1000000).toFixed(1)}M`} />
                    <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 10 }} />
                    <RechartsTooltip formatter={(value: number) => formatCOP(value)} />
                    <Legend />
                    <Bar dataKey="nominaDirecta" name="Nómina directa" stackId="a" fill="#3b82f6" />
                    <Bar dataKey="provisiones" name="Provisiones" stackId="a" fill="#10b981" />
                    <Bar dataKey="aportes" name="Aportes" stackId="a" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Main Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-xs">Cargo</TableHead>
                    <TableHead className="text-xs text-center">Personas</TableHead>
                    <TableHead className="text-xs">Fuente</TableHead>
                    <TableHead className="text-xs text-right">Salario Ref</TableHead>
                    <TableHead className="text-xs text-right">Salario Aplicado</TableHead>
                    <TableHead className="text-xs text-right">Auxilio</TableHead>
                    <TableHead className="text-xs text-right">Nómina Directa</TableHead>
                    <TableHead className="text-xs text-right">Costo Empresa</TableHead>
                    {currency === 'both' && (
                      <TableHead className="text-xs text-right">USD</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollRoles.map((role) => (
                    <TableRow key={role.cargo}>
                      <TableCell className="text-xs font-medium">{role.cargo}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{role.personas}</Badge>
                      </TableCell>
                      <TableCell>
                        <a 
                          href={fuentesLinks[role.fuenteSalarial] || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                        >
                          {role.fuenteSalarial}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </TableCell>
                      <TableCell className="text-xs text-right">{formatCOP(role.salarioRef)}</TableCell>
                      <TableCell className="text-xs text-right">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="cursor-help">
                              {formatCOP(role.salarioAplicado)}
                              {role.salarioRef < smmlv && (
                                <Badge variant="outline" className="ml-1 text-[8px] bg-amber-500/10">ajustado</Badge>
                              )}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-mono text-xs">= MAX({formatCOP(role.salarioRef)}, SMMLV)</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-xs text-right">{formatCOP(role.auxilio)}</TableCell>
                      <TableCell className="text-xs text-right font-medium">{formatCOP(role.nominaDirecta)}</TableCell>
                      <TableCell className="text-xs text-right font-bold">{formatCOP(role.costoEmpresa)}</TableCell>
                      {currency === 'both' && (
                        <TableCell className="text-xs text-right text-muted-foreground">{formatUSD(role.costoEmpresaUSD)}</TableCell>
                      )}
                    </TableRow>
                  ))}
                  {/* Totals */}
                  <TableRow className="bg-muted/50 font-bold">
                    <TableCell className="text-xs">TOTAL</TableCell>
                    <TableCell className="text-center"><Badge>{headcount}</Badge></TableCell>
                    <TableCell colSpan={4} />
                    <TableCell className="text-xs text-right">{formatCOP(totalNominaDirecta)}</TableCell>
                    <TableCell className="text-xs text-right">{formatCOP(totalCostoEmpresa)}</TableCell>
                    {currency === 'both' && (
                      <TableCell className="text-xs text-right">{formatUSD(totalCostoEmpresa / trm)}</TableCell>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Formulas Accordion */}
      {(viewMode === 'analytic' || viewMode === 'audit') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardContent className="p-4">
              <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Fórmulas de cálculo de nómina
              </h4>
              <Accordion type="single" collapsible className="w-full">
                {formulas.map((formula, index) => (
                  <AccordionItem key={formula.name} value={`item-${index}`}>
                    <AccordionTrigger className="text-sm">{formula.name}</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 p-2 bg-muted/30 rounded">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px]">Excel</Badge>
                          <code className="text-xs font-mono">{formula.excel}</code>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px]">Humano</Badge>
                          <span className="text-xs">{formula.human}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Totals Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
      >
        <Card className="bg-muted/30">
          <CardContent className="p-3">
            <p className="text-[10px] text-muted-foreground">Total Auxilio</p>
            <p className="text-sm font-bold">{formatCOP(totalAuxilio)}</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/30">
          <CardContent className="p-3">
            <p className="text-[10px] text-muted-foreground">Total Prima</p>
            <p className="text-sm font-bold">{formatCOP(totalPrima)}</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/30">
          <CardContent className="p-3">
            <p className="text-[10px] text-muted-foreground">Total Cesantías</p>
            <p className="text-sm font-bold">{formatCOP(totalCesantias)}</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/30">
          <CardContent className="p-3">
            <p className="text-[10px] text-muted-foreground">Total Int. Cesantías</p>
            <p className="text-sm font-bold">{formatCOP(totalIntCesantias)}</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/30">
          <CardContent className="p-3">
            <p className="text-[10px] text-muted-foreground">Total Vacaciones</p>
            <p className="text-sm font-bold">{formatCOP(totalVacaciones)}</p>
          </CardContent>
        </Card>
        <Card className="bg-muted/30">
          <CardContent className="p-3">
            <p className="text-[10px] text-muted-foreground">Total Aportes</p>
            <p className="text-sm font-bold">{formatCOP(totalAportes)}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Methodology Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-4 bg-muted/30 rounded-lg"
      >
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-muted-foreground mt-0.5" />
          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Criterios de cálculo:</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Salario aplicado = mayor valor entre salario de referencia y SMMLV.</li>
              <li>Auxilio de transporte = se aplica cuando el salario no supera 2 SMMLV.</li>
              <li>Prestaciones incluidas: prima, cesantías, intereses sobre cesantías y vacaciones.</li>
              <li>Aportes empleador: ARL clase I (0.522%), pensión (12%) y caja (4%); exoneración controlada por parámetro.</li>
              <li>Para cargos cuyo salario publicado está por debajo del SMMLV 2026, el modelo ajusta automáticamente.</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
