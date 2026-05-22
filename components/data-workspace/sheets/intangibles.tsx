"use client"

import { motion } from 'framer-motion'
import { Layers, TrendingUp, Calculator } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts'
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
  intangibles, setIntangibles, trm, currency, viewMode, formatCOP, formatUSD, onFormulaClick
}: IntangiblesSheetProps) {
  const totalInversion = intangibles.reduce((sum, i) => sum + i.costoEstimado, 0)
  const totalMensual = intangibles.reduce((sum, i) => sum + i.costoMensualEq, 0)

  const mayorInversion = intangibles.reduce(
    (max, i) => i.costoEstimado > max.costoEstimado ? i : max,
    intangibles[0]
  )
  const mayorMensual = intangibles.reduce(
    (max, i) => i.costoMensualEq > max.costoMensualEq ? i : max,
    intangibles[0]
  )

  const chartData = intangibles.map(i => ({
    name: i.recurso.length > 22 ? i.recurso.substring(0, 22) + '...' : i.recurso,
    mensual: Math.round(i.costoMensualEq)
  }))

  const handleChange = (index: number, field: keyof IntangibleAsset, value: number | string) => {
    const updated = [...intangibles]
    updated[index] = { ...updated[index], [field]: value }
    updated[index] = calculateIntangibleAsset(updated[index])
    setIntangibles(updated)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-violet-500/10 to-transparent">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Inversión intangible total</p>
              <p className="text-xl font-bold">{formatCOP(totalInversion)}</p>
              {currency === 'both' && (
                <p className="text-sm text-muted-foreground">{formatUSD(totalInversion / trm)} USD</p>
              )}
              {viewMode === 'audit' && (
                <button
                  type="button"
                  onClick={() => onFormulaClick('intangible-total')}
                  className="mt-2 text-[10px] text-primary hover:underline flex items-center gap-1"
                >
                  <Calculator className="w-3 h-3" />
                  Ver fórmula
                </button>
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
          <Card className="bg-gradient-to-br from-purple-500/10 to-transparent">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Mayor inversión</p>
              <p className="text-sm font-medium truncate">{mayorInversion.recurso}</p>
              <p className="text-lg font-bold">{formatCOP(mayorInversion.costoEstimado)}</p>
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
              <p className="text-xs text-muted-foreground mb-1">Mayor costo mensual</p>
              <p className="text-sm font-medium truncate">{mayorMensual.recurso}</p>
              <p className="text-lg font-bold">{formatCOP(mayorMensual.costoMensualEq)}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {(viewMode === 'executive' || viewMode === 'analytic') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-4">
              <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Costo mensual por recurso intangible
              </h4>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical">
                    <XAxis type="number" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <YAxis type="category" dataKey="name" width={160} tick={{ fontSize: 10 }} />
                    <RechartsTooltip formatter={(value: number) => formatCOP(value)} />
                    <Bar dataKey="mensual" radius={[0, 4, 4, 0]}>
                      {chartData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === chartData.indexOf(chartData.find(d => d.mensual === Math.max(...chartData.map(c => c.mensual)))!)
                            ? 'hsl(var(--primary))'
                            : 'hsl(var(--muted-foreground) / 0.3)'
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

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
                    <TableHead className="text-xs text-right">Meses Amort.</TableHead>
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
                  {intangibles.map((item, index) => (
                    <TableRow
                      key={item.recurso}
                      className={item.recurso === mayorInversion.recurso ? 'bg-violet-500/5' : ''}
                    >
                      <TableCell>
                        <Badge variant="outline" className="text-[10px]">{item.tipo}</Badge>
                      </TableCell>
                      <TableCell className="text-xs font-medium">{item.recurso}</TableCell>
                      <TableCell className="text-right">
                        {viewMode === 'edit' ? (
                          <Input
                            type="number"
                            value={item.cantidad}
                            onChange={(e) => handleChange(index, 'cantidad', Number(e.target.value))}
                            className="w-16 h-7 text-xs text-right"
                          />
                        ) : (
                          <span className="text-xs">{item.cantidad}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {viewMode === 'edit' ? (
                          <Input
                            type="number"
                            value={item.costoEstimado}
                            onChange={(e) => handleChange(index, 'costoEstimado', Number(e.target.value))}
                            className="w-28 h-7 text-xs text-right"
                          />
                        ) : (
                          <span className="text-xs">{formatCOP(item.costoEstimado)}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {viewMode === 'edit' ? (
                          <Input
                            type="number"
                            value={item.mesesAmortizacion}
                            onChange={(e) => handleChange(index, 'mesesAmortizacion', Number(e.target.value))}
                            className="w-20 h-7 text-xs text-right"
                          />
                        ) : (
                          <span className="text-xs">{item.mesesAmortizacion}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="text-xs font-medium cursor-help">
                              {formatCOP(item.costoMensualEq)}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-mono text-xs">= costo_estimado / meses_amortización</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-[140px] truncate">
                        {item.observacion}
                      </TableCell>
                    </TableRow>
                  ))}
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-4 bg-violet-500/5 border border-violet-500/20 rounded-lg"
      >
        <div className="flex items-start gap-2">
          <TrendingUp className="w-4 h-4 text-violet-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-violet-700">Principales drivers del costo mensual</p>
            <ul className="text-xs text-muted-foreground mt-2 space-y-1">
              <li>- Desarrollo de formulación: {formatCOP(333333.33)}/mes</li>
              <li>- Registro de marca: {formatCOP(125000)}/mes</li>
              <li>- Validación INVIMA: {formatCOP(83333.33)}/mes</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
