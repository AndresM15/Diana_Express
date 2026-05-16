"use client"

import { motion } from 'framer-motion'
import { Layers, AlertTriangle, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'
import type { ViewMode, Currency, IntangibleAsset } from '@/lib/data-types'
import { calculateIntangibleAsset } from '@/lib/data-store'

interface IntangiblesSheetProps {
  intangibles: IntangibleAsset[]
  setIntangibles: (intangibles: IntangibleAsset[]) => void
  trm: number
  currency: Currency
  viewMode: ViewMode
  formatCOP: (value: number) => string
  formatUSD: (value: number) => string
  onFormulaClick: (id: string) => void
}

export function IntangiblesSheet({
  intangibles, setIntangibles, trm, currency, viewMode, formatCOP, formatUSD
}: IntangiblesSheetProps) {
  const totalInversion = intangibles.reduce((sum, i) => sum + i.costoEstimado, 0)
  const totalMensual = intangibles.reduce((sum, i) => sum + i.costoMensualEq, 0)
  
  const mayorMensual = intangibles.reduce((max, i) => i.costoMensualEq > max.costoMensualEq ? i : max, intangibles[0])

  const chartData = intangibles.map(i => ({
    name: i.recurso.length > 25 ? i.recurso.substring(0, 25) + '...' : i.recurso,
    mensual: Math.round(i.costoMensualEq)
  }))

  const handleChange = (index: number, field: keyof IntangibleAsset, value: number) => {
    const updated = [...intangibles]
    updated[index] = { ...updated[index], [field]: value }
    updated[index] = calculateIntangibleAsset(updated[index])
    setIntangibles(updated)
  }

  // Benchmark inconsistency for design item
  const designItem = intangibles.find(i => i.recurso.includes('Diseño gráfico'))
  const benchmarkDesign = 8000 * 4150 // 33,200,000 COP

  return (
    <div className="space-y-6">
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-purple-500/10 to-transparent">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Inversión intangible total</p>
              <p className="text-xl font-bold">{formatCOP(totalInversion)}</p>
              {currency === 'both' && (
                <p className="text-sm text-muted-foreground">{formatUSD(totalInversion / trm)} USD</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="bg-gradient-to-br from-blue-500/10 to-transparent">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Costo mensual equivalente</p>
              <p className="text-xl font-bold">{formatCOP(totalMensual)}</p>
              {currency === 'both' && (
                <p className="text-sm text-muted-foreground">{formatUSD(totalMensual / trm)} USD</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-emerald-500/10 to-transparent">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Principal driver mensual</p>
              <p className="text-sm font-medium truncate">{mayorMensual.recurso}</p>
              <p className="text-lg font-bold">{formatCOP(mayorMensual.costoMensualEq)}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="bg-gradient-to-br from-amber-500/10 to-transparent">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Recursos con igual costo mensual</p>
              <p className="text-sm">Diseño gráfico = Gestión regulatoria</p>
              <p className="text-lg font-bold">{formatCOP(250000)}</p>
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
              <h4 className="text-sm font-medium mb-4">Costo mensual equivalente por recurso</h4>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical">
                    <XAxis type="number" tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                    <YAxis type="category" dataKey="name" width={180} tick={{ fontSize: 10 }} />
                    <RechartsTooltip formatter={(value: number) => formatCOP(value)} />
                    <Bar dataKey="mensual" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Data Table */}
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
                    <TableHead className="text-xs">Tipo</TableHead>
                    <TableHead className="text-xs">Recurso</TableHead>
                    <TableHead className="text-xs text-right">Cantidad</TableHead>
                    <TableHead className="text-xs text-right">Costo Estimado COP</TableHead>
                    <TableHead className="text-xs text-right">Meses Amortización</TableHead>
                    <TableHead className="text-xs text-right">
                      <div className="flex items-center justify-end gap-1">
                        Costo Mensual Eq.
                        {viewMode === 'audit' && (
                          <Badge variant="outline" className="text-[8px] bg-emerald-500/10">fx</Badge>
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-xs">Observación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {intangibles.map((asset, index) => (
                    <TableRow 
                      key={asset.recurso}
                      className={asset.recurso.includes('Diseño') ? 'bg-amber-500/5' : ''}
                    >
                      <TableCell>
                        <Badge variant="outline" className="text-[10px]">{asset.tipo}</Badge>
                      </TableCell>
                      <TableCell className="text-xs font-medium">
                        <div className="flex items-center gap-2">
                          {asset.recurso}
                          {asset.recurso.includes('Diseño') && viewMode === 'audit' && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                                    <AlertTriangle className="w-3 h-3" />
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <p className="text-xs">
                                    <strong>Inconsistencia detectada:</strong> Benchmark externo = {formatUSD(8000)} USD/proyecto 
                                    = {formatCOP(benchmarkDesign)} vs modelo local = {formatCOP(asset.costoEstimado)}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-xs">{asset.cantidad}</TableCell>
                      <TableCell className="text-right">
                        {viewMode === 'edit' ? (
                          <Input
                            type="number"
                            value={asset.costoEstimado}
                            onChange={(e) => handleChange(index, 'costoEstimado', Number(e.target.value))}
                            className="w-28 h-7 text-xs text-right"
                          />
                        ) : (
                          <span className="text-xs">{formatCOP(asset.costoEstimado)}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {viewMode === 'edit' ? (
                          <Input
                            type="number"
                            value={asset.mesesAmortizacion}
                            onChange={(e) => handleChange(index, 'mesesAmortizacion', Number(e.target.value))}
                            className="w-16 h-7 text-xs text-right"
                          />
                        ) : (
                          <span className="text-xs">{asset.mesesAmortizacion}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="text-xs font-medium cursor-help">
                              {formatCOP(asset.costoMensualEq)}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-mono text-xs">= costo_estimado / meses_amortizacion</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{asset.observacion}</TableCell>
                    </TableRow>
                  ))}
                  {/* Totals Row */}
                  <TableRow className="bg-muted/50 font-bold">
                    <TableCell colSpan={3} className="text-xs text-right">TOTAL</TableCell>
                    <TableCell className="text-xs text-right">{formatCOP(totalInversion)}</TableCell>
                    <TableCell />
                    <TableCell className="text-xs text-right">{formatCOP(totalMensual)}</TableCell>
                    <TableCell />
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Inconsistency Alert (Audit Mode) */}
      {viewMode === 'audit' && designItem && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg"
        >
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-700">Inconsistencia marcada en auditoría</p>
              <p className="text-xs text-muted-foreground mt-1">
                El ítem &ldquo;Diseño gráfico y etiquetado&rdquo; tiene un benchmark externo de {formatUSD(8000)} USD/proyecto 
                (equivalente a {formatCOP(benchmarkDesign)} a TRM 4.150), mientras que el modelo local usa {formatCOP(designItem.costoEstimado)}.
              </p>
              <p className="text-xs text-amber-600 mt-2">
                Tratamiento: benchmark externo vs supuesto local. Comparación visible sin sobreescribir el valor del workbook.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
