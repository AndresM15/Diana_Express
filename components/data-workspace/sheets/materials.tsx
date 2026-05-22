"use client"

import { motion } from 'framer-motion'
import { Package, TrendingUp, Calculator } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts'
import type { ViewMode, Currency, Material } from '@/lib/data-types'
import { calculateMaterialCost } from '@/lib/data-store'

interface MaterialsSheetProps {
  materials: Material[]
  setMaterials: (materials: Material[]) => void
  trm: number
  currency: Currency
  viewMode: ViewMode
  formatCOP: (value: number) => string
  formatUSD: (value: number) => string
  onFormulaClick: (id: string) => void
}

export function MaterialsSheet({
  materials, setMaterials, trm, currency, viewMode, formatCOP, formatUSD, onFormulaClick
}: MaterialsSheetProps) {
  const totalPorUnidad = materials.reduce((sum, m) => sum + m.costoPorUnidad, 0)
  const mayorCosto = materials.reduce((max, m) => m.costoPorUnidad > max.costoPorUnidad ? m : max, materials[0])

  const chartData = materials.map(m => ({
    name: m.material.length > 18 ? m.material.substring(0, 18) + '...' : m.material,
    costo: Math.round(m.costoPorUnidad)
  }))

  const handleChange = (index: number, field: keyof Material, value: number | string) => {
    const updated = [...materials]
    updated[index] = { ...updated[index], [field]: value }
    updated[index] = calculateMaterialCost(updated[index])
    setMaterials(updated)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-500/10 to-transparent">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Costo materiales por unidad</p>
              <p className="text-xl font-bold">{formatCOP(totalPorUnidad)}</p>
              {currency === 'both' && (
                <p className="text-sm text-muted-foreground">{formatUSD(totalPorUnidad / trm)} USD</p>
              )}
              {viewMode === 'audit' && (
                <button
                  type="button"
                  onClick={() => onFormulaClick('material-total')}
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
          <Card className="bg-gradient-to-br from-emerald-500/10 to-transparent">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Insumos registrados</p>
              <p className="text-xl font-bold">{materials.length}</p>
              <p className="text-sm text-muted-foreground">Materias primas y empaque</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="col-span-2"
        >
          <Card className="bg-gradient-to-br from-purple-500/10 to-transparent">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Mayor costo por unidad</p>
              <p className="text-sm font-medium truncate">{mayorCosto.material}</p>
              <p className="text-lg font-bold">{formatCOP(mayorCosto.costoPorUnidad)}</p>
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
                <Package className="w-4 h-4" />
                Costo por insumo (por pouch)
              </h4>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical">
                    <XAxis type="number" tickFormatter={(v) => `$${v}`} />
                    <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 10 }} />
                    <RechartsTooltip formatter={(value: number) => formatCOP(value)} />
                    <Bar dataKey="costo" radius={[0, 4, 4, 0]}>
                      {chartData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === chartData.indexOf(chartData.find(d => d.costo === Math.max(...chartData.map(c => c.costo)))!)
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
                    <TableHead className="text-xs">Material</TableHead>
                    <TableHead className="text-xs">Clasificación</TableHead>
                    <TableHead className="text-xs text-right">Cant./Unidad</TableHead>
                    <TableHead className="text-xs text-right">Costo Compra Ref.</TableHead>
                    <TableHead className="text-xs">Base Compra</TableHead>
                    <TableHead className="text-xs text-right">
                      <div className="flex items-center justify-end gap-1">
                        Costo Unitario
                        {viewMode === 'audit' && (
                          <Badge variant="outline" className="text-[8px] bg-emerald-500/10">fx</Badge>
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-xs text-right">
                      <div className="flex items-center justify-end gap-1">
                        Costo/Unidad
                        {viewMode === 'audit' && (
                          <Badge variant="outline" className="text-[8px] bg-emerald-500/10">fx</Badge>
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-xs">Observación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials.map((item, index) => (
                    <TableRow
                      key={item.material}
                      className={item.material === mayorCosto.material ? 'bg-blue-500/5' : ''}
                    >
                      <TableCell className="text-xs font-medium">{item.material}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px]">{item.clasificacion}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {viewMode === 'edit' ? (
                          <div className="flex items-center justify-end gap-1">
                            <Input
                              type="number"
                              value={item.cantidadPorUnidad}
                              onChange={(e) => handleChange(index, 'cantidadPorUnidad', Number(e.target.value))}
                              className="w-20 h-7 text-xs text-right"
                            />
                            <span className="text-[10px] text-muted-foreground">{item.unidad}</span>
                          </div>
                        ) : (
                          <span className="text-xs">{item.cantidadPorUnidad} {item.unidad}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {viewMode === 'edit' ? (
                          <Input
                            type="number"
                            value={item.costoCompraRef}
                            onChange={(e) => handleChange(index, 'costoCompraRef', Number(e.target.value))}
                            className="w-28 h-7 text-xs text-right"
                          />
                        ) : (
                          <span className="text-xs">{formatCOP(item.costoCompraRef)}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{item.baseCompra}</TableCell>
                      <TableCell className="text-right">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="text-xs cursor-help">
                              {formatCOP(item.costoUnitario)}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-mono text-xs">
                                {item.clasificacion.includes('Empaque')
                                  ? '= costo_compra_ref'
                                  : '= costo_compra_ref / base_compra'}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-right">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="text-xs font-medium cursor-help">
                              {formatCOP(item.costoPorUnidad)}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-mono text-xs">= cantidad × costo_unitario</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-[120px] truncate">
                        {item.observacion}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/50 font-bold">
                    <TableCell colSpan={6} className="text-xs text-right">TOTAL POR UNIDAD</TableCell>
                    <TableCell className="text-xs text-right">{formatCOP(totalPorUnidad)}</TableCell>
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
        className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg"
      >
        <div className="flex items-start gap-2">
          <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-700">Principales drivers del costo unitario</p>
            <ul className="text-xs text-muted-foreground mt-2 space-y-1">
              <li>- Pouch laminado UHT: {formatCOP(420)}</li>
              <li>- Arroz precocido: {formatCOP(1020)}</li>
              <li>- Mix quinua y verduras: {formatCOP(480)}</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
