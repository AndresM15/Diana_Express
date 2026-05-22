"use client"

import { motion } from 'framer-motion'
import { TrendingUp, Star, Info, Calculator } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Slider } from '@/components/ui/slider'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts'
import type { ViewMode, ValuationFactor } from '@/lib/data-types'
import { calculateValuationFactor } from '@/lib/data-store'

interface ValuationSheetProps {
  factors: ValuationFactor[]
  setFactors: (factors: ValuationFactor[]) => void
  scoringScale: { etiqueta: string; puntaje: number; explicacion: string }[]
  viewMode: ViewMode
  onFormulaClick: (id: string) => void
}

export function ValuationSheet({ factors, setFactors, scoringScale, viewMode }: ValuationSheetProps) {
  const totalPonderado = factors.reduce((sum, f) => sum + f.resultadoPonderado, 0)
  const totalPonderacion = factors.reduce((sum, f) => sum + f.ponderacion, 0)

  const radarData = factors.map(f => ({
    factor: f.factor,
    puntuacion: f.puntuacion,
    fullMark: 5
  }))

  const handleScoreChange = (index: number, newScore: number) => {
    const updated = [...factors]
    updated[index] = calculateValuationFactor({ ...updated[index], puntuacion: newScore })
    setFactors(updated)
  }

  const getScoreLabel = (score: number) => {
    const scale = scoringScale.find(s => s.puntaje === score)
    return scale?.etiqueta || ''
  }

  const getScoreColor = (score: number) => {
    if (score >= 5) return 'text-emerald-600'
    if (score >= 4) return 'text-blue-600'
    if (score >= 3) return 'text-amber-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <Badge variant="outline" className="mb-2">Resultado Final</Badge>
                <h3 className="text-4xl md:text-5xl font-bold text-primary">
                  {totalPonderado.toFixed(2)}
                  <span className="text-2xl text-muted-foreground"> / 5</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-2">Promedio ponderado de viabilidad</p>
              </div>
              
              <div className="w-full md:w-1/2 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="factor" tick={{ fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} />
                    <Radar
                      name="Puntuación"
                      dataKey="puntuacion"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Conclusion */}
            <div className="mt-6 p-4 bg-background/50 rounded-lg">
              <p className="text-sm leading-relaxed">
                El promedio ponderado obtenido es <strong>{totalPonderado.toFixed(2)}/5</strong>, lo que indica que 
                la oportunidad de negocio Diana Express presenta <strong>alta viabilidad</strong> y condiciones 
                favorables de implementación. La puntuación se sustenta principalmente en la competencia y los recursos 
                del Grupo Diana, además de la tendencia Ready-to-Eat y conveniencia urbana en 2026.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Scoring Scale Reference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Escala de Puntuación
            </h4>
            <div className="flex flex-wrap gap-2">
              {scoringScale.map((scale) => (
                <TooltipProvider key={scale.puntaje}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge 
                        variant="outline" 
                        className={`cursor-help ${
                          scale.puntaje >= 5 ? 'bg-emerald-500/10 text-emerald-600' :
                          scale.puntaje >= 4 ? 'bg-blue-500/10 text-blue-600' :
                          scale.puntaje >= 3 ? 'bg-amber-500/10 text-amber-600' :
                          'bg-red-500/10 text-red-600'
                        }`}
                      >
                        {scale.puntaje} - {scale.etiqueta}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-xs">{scale.explicacion}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Factors Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-xs">Factor</TableHead>
                    <TableHead className="text-xs text-center">Ponderación</TableHead>
                    <TableHead className="text-xs text-center">Puntuación</TableHead>
                    <TableHead className="text-xs text-right">
                      <div className="flex items-center justify-end gap-1">
                        Resultado Ponderado
                        {viewMode === 'audit' && (
                          <Badge variant="outline" className="text-[8px] bg-emerald-500/10">fx</Badge>
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-xs">Justificación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {factors.map((factor, index) => (
                    <TableRow key={factor.factor}>
                      <TableCell className="font-medium text-xs">{factor.factor}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{(factor.ponderacion * 100).toFixed(0)}%</Badge>
                      </TableCell>
                      <TableCell>
                        {viewMode === 'edit' ? (
                          <div className="flex items-center gap-2">
                            <Slider
                              value={[factor.puntuacion]}
                              min={1}
                              max={5}
                              step={1}
                              onValueChange={(v) => handleScoreChange(index, v[0])}
                              className="w-20"
                            />
                            <span className={`text-sm font-bold ${getScoreColor(factor.puntuacion)}`}>
                              {factor.puntuacion}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <span className={`text-lg font-bold ${getScoreColor(factor.puntuacion)}`}>
                              {factor.puntuacion}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              ({getScoreLabel(factor.puntuacion)})
                            </span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="cursor-help font-medium">
                              {factor.resultadoPonderado.toFixed(2)}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-mono text-xs">= {factor.ponderacion} × {factor.puntuacion}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-xs">
                        {factor.justificacion.length > 100 
                          ? factor.justificacion.substring(0, 100) + '...' 
                          : factor.justificacion
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Totals */}
                  <TableRow className="bg-muted/50 font-bold">
                    <TableCell className="text-xs">TOTAL</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={totalPonderacion === 1 ? 'default' : 'destructive'}>
                        {(totalPonderacion * 100).toFixed(0)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-xs">—</TableCell>
                    <TableCell className="text-right text-lg">{totalPonderado.toFixed(2)}</TableCell>
                    <TableCell />
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Validation Alert */}
      {totalPonderacion !== 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-red-600" />
            <p className="text-sm text-red-700">
              La suma de ponderaciones debe ser 1.00 (100%). Actualmente: {(totalPonderacion * 100).toFixed(0)}%
            </p>
          </div>
        </motion.div>
      )}

      {/* Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
      >
        <div className="flex items-start gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-700">Recomendación</p>
            <p className="text-xs text-muted-foreground mt-1">
              Para consolidar el éxito del proyecto se recomienda validar con mayor profundidad la 
              <strong> rentabilidad</strong>, especialmente los costos del indicador de pH, la eficiencia de 
              producción y la aceptación del precio en el mercado.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Formula Info (Audit Mode) */}
      {viewMode === 'audit' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-4 bg-muted/30 rounded-lg"
        >
          <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Fórmula del promedio ponderado
          </h5>
          <code className="text-xs font-mono block p-2 bg-background rounded">
            TOTAL = SUM(ponderación[i] × puntuación[i]) = {factors.map((f, i) => 
              `${f.ponderacion}×${f.puntuacion}${i < factors.length - 1 ? ' + ' : ''}`
            ).join('')} = {totalPonderado.toFixed(2)}
          </code>
        </motion.div>
      )}
    </div>
  )
}
