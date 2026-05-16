"use client"

import { motion } from 'framer-motion'
import { Package, Sparkles, Calculator, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip } from 'recharts'
import type { ViewMode, Currency, Material } from '@/lib/data-types'

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
  const totalMaterials = materials.reduce((sum, m) => sum + m.costoPorUnidad, 0)
  const totalEmpaque = materials.filter(m => m.clasificacion.includes('Empaque')).reduce((sum, m) => sum + m.costoPorUnidad, 0)
  const totalMateriasPrimas = totalMaterials - totalEmpaque
  const participacionEmpaque = (totalEmpaque / totalMaterials) * 100
  
  const indicadorPH = materials.find(m => m.material.includes('Indicador'))
  const participacionIndicador = indicadorPH ? (indicadorPH.costoPorUnidad / totalMaterials) * 100 : 0

  const pieData = [
    { name: 'Materias Primas', value: totalMateriasPrimas, color: '#3b82f6' },
    { name: 'Empaque', value: totalEmpaque, color: '#10b981' }
  ]

  const barData = materials.map(m => ({
    name: m.material.length > 15 ? m.material.substring(0, 15) + '...' : m.material,
    costo: m.costoPorUnidad
  }))

  const handleMaterialChange = (index: number, field: keyof Material, value: number | string) => {
    const updated = [...materials]
    updated[index] = { ...updated[index], [field]: value }
    
    // Recalculate derived values
    if (field === 'cantidadPorUnidad' || field === 'costoCompraRef') {
      const baseQty = updated[index].clasificacion.includes('Empaque') ? 1 : 1000
      updated[index].costoUnitario = updated[index].clasificacion.includes('Empaque') 
        ? updated[index].costoCompraRef 
        : updated[index].costoCompraRef / baseQty
      updated[index].costoPorUnidad = updated[index].cantidadPorUnidad * updated[index].costoUnitario
    }
    
    setMaterials(updated)
  }

  return (
    <div className="space-y-6">
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-500/10 to-transparent">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Costo total materiales/unidad</p>
              <p className="text-xl font-bold">{formatCOP(totalMaterials)}</p>
              {currency === 'both' && (
                <p className="text-sm text-muted-foreground">{formatUSD(totalMaterials / trm)} USD</p>
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
              <p className="text-xs text-muted-foreground mb-1">Costo total empaque</p>
              <p className="text-xl font-bold">{formatCOP(totalEmpaque)}</p>
              <p className="text-sm text-emerald-600">{participacionEmpaque.toFixed(1)}% del total</p>
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
              <p className="text-xs text-muted-foreground mb-1">Materias primas (sin empaque)</p>
              <p className="text-xl font-bold">{formatCOP(totalMateriasPrimas)}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-1 mb-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <p className="text-xs text-muted-foreground">Indicador de pH</p>
              </div>
              <p className="text-xl font-bold">{formatCOP(indicadorPH?.costoPorUnidad || 0)}</p>
              <p className="text-sm text-amber-600">{participacionIndicador.toFixed(2)}% del total</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts (Executive/Analytic View) */}
      {(viewMode === 'executive' || viewMode === 'analytic') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-4">
                <h4 className="text-sm font-medium mb-4">Composición por clasificación</h4>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        formatter={(value: number) => formatCOP(value)}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card>
              <CardContent className="p-4">
                <h4 className="text-sm font-medium mb-4">Costo por componente</h4>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} layout="vertical">
                      <XAxis type="number" tickFormatter={(v) => `$${v}`} />
                      <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 10 }} />
                      <RechartsTooltip formatter={(value: number) => formatCOP(value)} />
                      <Bar dataKey="costo" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
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
                    <TableHead className="text-xs">Material</TableHead>
                    <TableHead className="text-xs">Clasificación</TableHead>
                    <TableHead className="text-xs">Unidad</TableHead>
                    <TableHead className="text-xs text-right">Cantidad/Unidad</TableHead>
                    <TableHead className="text-xs text-right">Costo Compra Ref</TableHead>
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
                  {materials.map((material, index) => (
                    <TableRow 
                      key={material.material}
                      className={material.material.includes('Indicador') ? 'bg-amber-500/5' : ''}
                    >
                      <TableCell className="text-xs font-medium">
                        <div className="flex items-center gap-2">
                          {material.material.includes('Indicador') && (
                            <Sparkles className="w-3 h-3 text-amber-500" />
                          )}
                          {material.material}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px]">
                          {material.clasificacion}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs">{material.unidad}</TableCell>
                      <TableCell className="text-right">
                        {viewMode === 'edit' ? (
                          <Input
                            type="number"
                            value={material.cantidadPorUnidad}
                            onChange={(e) => handleMaterialChange(index, 'cantidadPorUnidad', Number(e.target.value))}
                            className="w-20 h-7 text-xs text-right"
                          />
                        ) : (
                          <span className="text-xs">{material.cantidadPorUnidad}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {viewMode === 'edit' ? (
                          <Input
                            type="number"
                            value={material.costoCompraRef}
                            onChange={(e) => handleMaterialChange(index, 'costoCompraRef', Number(e.target.value))}
                            className="w-24 h-7 text-xs text-right"
                          />
                        ) : (
                          <span className="text-xs">{formatCOP(material.costoCompraRef)}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs">{material.baseCompra}</TableCell>
                      <TableCell className="text-right">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="text-xs cursor-help">
                              {formatCOP(material.costoUnitario)}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-mono text-xs">
                                = costo_compra / base_compra
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-right">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="text-xs font-medium cursor-help">
                              {formatCOP(material.costoPorUnidad)}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-mono text-xs">
                                = cantidad × costo_unitario
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{material.observacion}</TableCell>
                    </TableRow>
                  ))}
                  {/* Totals Row */}
                  <TableRow className="bg-muted/50 font-bold">
                    <TableCell colSpan={7} className="text-xs text-right">TOTAL</TableCell>
                    <TableCell className="text-xs text-right">{formatCOP(totalMaterials)}</TableCell>
                    <TableCell />
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <Package className="w-4 h-4 text-emerald-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-emerald-700">Componente más costoso</p>
                <p className="text-xs text-muted-foreground">
                  El <strong>tubo plástico laminado 90 g</strong> representa {formatCOP(498)} por unidad, 
                  siendo el componente individual de mayor costo.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-700">Diferenciador Biolumin</p>
                <p className="text-xs text-muted-foreground">
                  El indicador de pH no es el principal driver del costo unitario; 
                  el empaque pesa más ({participacionEmpaque.toFixed(1)}% vs {participacionIndicador.toFixed(2)}%).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
