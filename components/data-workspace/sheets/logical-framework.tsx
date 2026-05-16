"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, AlertTriangle, ArrowRight, Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { ViewMode } from '@/lib/data-types'

interface LogicalFrameworkSheetProps {
  framework: {
    original: {
      fin: { objetivo: string; ivo: string; mv: string; supuestos: string }
      proposito: { objetivo: string; ivo: string; mv: string; supuestos: string }
      componentes: { objetivo: string; ivo: string; mv: string; supuestos: string }
      actividades: { objetivo: string; ivo: string; mv: string; supuestos: string }
    }
    normalized: {
      fin: { objetivo: string; ivo: string; mv: string; supuestos: string }
      proposito: { objetivo: string; ivo: string; mv: string; supuestos: string }
      componentes: { objetivo: string; ivo: string; mv: string; supuestos: string }
      actividades: { objetivo: string; ivo: string; mv: string; supuestos: string }
    }
  }
  viewMode: ViewMode
}

const levels = [
  { key: 'fin', label: 'Fin (Impacto)', color: 'bg-purple-500' },
  { key: 'proposito', label: 'Propósito (Efecto)', color: 'bg-blue-500' },
  { key: 'componentes', label: 'Componentes (Productos)', color: 'bg-emerald-500' },
  { key: 'actividades', label: 'Actividades (Acciones)', color: 'bg-amber-500' }
]

export function LogicalFrameworkSheet({ framework, viewMode }: LogicalFrameworkSheetProps) {
  const [showOriginal, setShowOriginal] = useState(false)

  const data = showOriginal || viewMode === 'audit' ? framework.original : framework.normalized

  return (
    <div className="space-y-6">
      {/* Warning Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-700">Contenido heredado detectado</p>
            <p className="text-xs text-muted-foreground mt-1">
              Esta hoja contiene texto original de una categoría incorrecta (bebida funcional / alimentos y bebidas saludables). 
              Se presenta una versión normalizada para cuidado oral preventivo junto con el contenido original para auditoría.
            </p>
          </div>
        </div>
      </motion.div>

      {/* View Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="normalized" onValueChange={(v) => setShowOriginal(v === 'original')}>
          <TabsList>
            <TabsTrigger value="normalized" className="gap-2">
              <Check className="w-3 h-3" />
              Vista Normalizada (Biolumin)
            </TabsTrigger>
            <TabsTrigger value="original" className="gap-2">
              <AlertTriangle className="w-3 h-3" />
              Original (Auditoría)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="normalized" className="mt-4">
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
              <Check className="w-3 h-3 mr-1" />
              Contenido adaptado a Colgate Biolumin - Cuidado Oral Preventivo
            </Badge>
          </TabsContent>

          <TabsContent value="original" className="mt-4">
            <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Contenido original sin modificar - Fuente heredada / requiere depuración semántica
            </Badge>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Framework Accordion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Matriz de Marco Lógico
            </h4>

            <Accordion type="single" collapsible defaultValue="fin" className="w-full">
              {levels.map((level, index) => {
                const levelData = data[level.key as keyof typeof data]
                return (
                  <AccordionItem key={level.key} value={level.key}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-8 rounded ${level.color}`} />
                        <span className="font-medium">{level.label}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
                      >
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Objetivo</p>
                            <p className="text-sm">{levelData.objetivo}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">IVO (Indicadores Verificables)</p>
                            <p className="text-sm">{levelData.ivo}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">MV (Medios de Verificación)</p>
                            <p className="text-sm">{levelData.mv}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Supuestos</p>
                            <p className="text-sm">{levelData.supuestos}</p>
                          </div>
                        </div>
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>

      {/* Comparison View (Audit Mode) */}
      {viewMode === 'audit' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-4">
              <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                Comparación Original vs Normalizado
              </h4>

              <div className="space-y-4">
                {levels.map((level) => {
                  const orig = framework.original[level.key as keyof typeof framework.original]
                  const norm = framework.normalized[level.key as keyof typeof framework.normalized]
                  
                  return (
                    <div key={level.key} className="border rounded-lg overflow-hidden">
                      <div className={`px-4 py-2 ${level.color} text-white text-sm font-medium`}>
                        {level.label}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
                        <div className="p-3 bg-amber-500/5">
                          <Badge variant="outline" className="mb-2 text-[10px] bg-amber-500/10">Original</Badge>
                          <p className="text-xs">{orig.objetivo}</p>
                        </div>
                        <div className="p-3 bg-emerald-500/5">
                          <Badge variant="outline" className="mb-2 text-[10px] bg-emerald-500/10">Normalizado</Badge>
                          <p className="text-xs">{norm.objetivo}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Naming Note */}
      {viewMode === 'audit' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-4 bg-muted/50 rounded-lg"
        >
          <h5 className="text-sm font-medium mb-2">Nota de normalización - Naming del producto</h5>
          <p className="text-xs text-muted-foreground">
            Hay inconsistencia entre &ldquo;Biolumin&rdquo; y &ldquo;Biolumen&rdquo; en documentos fuente. 
            <strong> Nombre comercial sugerido:</strong> Colgate Biolumin | 
            <strong> Nombre interno/referencia:</strong> BIOLUMEN / Biolumen. 
            Ambas variaciones se conservan en auditoría.
          </p>
        </motion.div>
      )}
    </div>
  )
}
