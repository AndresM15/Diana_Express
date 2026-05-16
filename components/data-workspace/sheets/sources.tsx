"use client"

import { motion } from 'framer-motion'
import { FileText, ExternalLink, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { ViewMode } from '@/lib/data-types'

interface SourcesSheetProps {
  sources: { tipo: string; detalle: string; fuente: string }[]
  benchmarkCrosswalk: { 
    item: string; 
    benchmarkUSD: number; 
    unidad: string; 
    trmUsado: number; 
    resultadoCOP: number; 
    coincide: boolean; 
    enWorkbook: number | null 
  }[]
  trm: number
  viewMode: ViewMode
  formatCOP: (value: number) => string
}

export function SourcesSheet({
  sources, benchmarkCrosswalk, trm, viewMode, formatCOP
}: SourcesSheetProps) {
  return (
    <div className="space-y-6">
      {/* Sources Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b bg-muted/30">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Fuentes y supuestos del modelo
              </h4>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-xs">Tipo</TableHead>
                    <TableHead className="text-xs">Detalle</TableHead>
                    <TableHead className="text-xs">Fuente</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sources.map((source, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px]">{source.tipo}</Badge>
                      </TableCell>
                      <TableCell className="text-xs">{source.detalle}</TableCell>
                      <TableCell className="text-xs">
                        {source.fuente.startsWith('http') ? (
                          <a 
                            href={source.fuente} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1"
                          >
                            {source.fuente.length > 50 ? source.fuente.substring(0, 50) + '...' : source.fuente}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          source.fuente
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Benchmark Crosswalk */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b bg-purple-500/5">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-purple-600" />
                Crosswalk benchmark USD vs modelo COP
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                Comparación de referencias externas en USD con valores del workbook en COP. TRM usado: {trm.toLocaleString()} COP/USD
              </p>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-xs">Item</TableHead>
                    <TableHead className="text-xs text-right">Benchmark USD</TableHead>
                    <TableHead className="text-xs">Unidad</TableHead>
                    <TableHead className="text-xs text-right">Conversión COP</TableHead>
                    <TableHead className="text-xs text-right">En Workbook COP</TableHead>
                    <TableHead className="text-xs text-center">Coincide</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {benchmarkCrosswalk.map((item, index) => (
                    <TableRow 
                      key={index}
                      className={!item.coincide ? 'bg-amber-500/5' : ''}
                    >
                      <TableCell className="text-xs font-medium">{item.item}</TableCell>
                      <TableCell className="text-xs text-right">$ {item.benchmarkUSD.toLocaleString()}</TableCell>
                      <TableCell className="text-xs">{item.unidad}</TableCell>
                      <TableCell className="text-xs text-right">{formatCOP(item.resultadoCOP)}</TableCell>
                      <TableCell className="text-xs text-right">
                        {item.enWorkbook !== null ? formatCOP(item.enWorkbook) : (
                          <Badge variant="outline" className="text-[10px]">No modelado</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.coincide ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-amber-500 mx-auto" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Crosswalk Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardContent className="p-4">
            <h5 className="text-sm font-medium text-emerald-700 mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Coincidencias validadas
            </h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>- Indicador de pH: 45 USD/kg x 4.150 = 186.750 COP/kg</li>
              <li>- Tubo laminado: 0.12 USD x 4.150 = 498 COP</li>
              <li>- Empaque secundario: 0.08 USD x 4.150 = 332 COP</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent className="p-4">
            <h5 className="text-sm font-medium text-amber-700 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Inconsistencias detectadas
            </h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>- Tapas plásticas: 124.5 COP/unidad - no aparece explícita</li>
              <li>- Diseño gráfico: benchmark 33.2M vs modelo 3M COP</li>
              <li>- Distribución/logística: 830 COP/unidad - no modelado</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Data Type Legend */}
      {viewMode === 'audit' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4 bg-muted/30 rounded-lg"
        >
          <h5 className="text-sm font-medium mb-3">Clasificación de datos</h5>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-500/10 text-blue-600">input</Badge>
              <span className="text-xs">Dato editable</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600">importado</Badge>
              <span className="text-xs">Dato importado</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-purple-500/10 text-purple-600">benchmark</Badge>
              <span className="text-xs">Referencia externa</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-gray-500/10 text-gray-600">calculado</Badge>
              <span className="text-xs">Fórmula aplicada</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-amber-500/10 text-amber-600">inconsistente</Badge>
              <span className="text-xs">Requiere revisión</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600">supuesto</Badge>
              <span className="text-xs">Supuesto académico</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
