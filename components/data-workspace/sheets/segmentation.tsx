"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Users, Lightbulb, ChevronRight, Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ViewMode, SegmentationStep } from '@/lib/data-types'

interface SegmentationSheetProps {
  steps: SegmentationStep[]
  viewMode: ViewMode
}

export function SegmentationSheet({ steps, viewMode }: SegmentationSheetProps) {
  const [activeStep, setActiveStep] = useState(1)

  const segments = [
    {
      id: 'A',
      name: 'Innovadores Preventivos',
      description: 'Adultos 18-45 urbanos, interesados en prevenci?n e innovaci?n',
      motivation: 'Innovaci?n + experiencia + prevenci?n',
      message: '"Te avisa cuando tu boca est? m?s ?cida"',
      strategy: 'Demostraci?n/educaci?n (QR, contenido, POP)',
      color: 'primary'
    },
    {
      id: 'B',
      name: 'Hogares Conscientes',
      description: 'Padres/cuidadores que buscan productos diferenciados',
      motivation: 'Seguridad + claridad + confianza',
      message: '"Alerta orientativa para la prevenci?n familiar"',
      strategy: 'Respaldos + promociones de introducci?n, distribuci?n en droguer?as/supermercados',
      color: 'accent'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Stepper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="p-6">
            <h4 className="text-sm font-medium mb-6 flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Proceso de Segmentaci?n (7 pasos)
            </h4>
            
            {/* Step indicators */}
            <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
              {steps.map((step, index) => (
                <div key={step.paso} className="flex items-center">
                  <motion.button
                    onClick={() => setActiveStep(step.paso)}
                    className={`
                      flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                      ${activeStep === step.paso 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : activeStep > step.paso
                          ? 'bg-primary/20 text-primary border-primary/50'
                          : 'bg-muted text-muted-foreground border-muted-foreground/30'
                      }
                    `}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {activeStep > step.paso ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-sm font-bold">{step.paso}</span>
                    )}
                  </motion.button>
                  {index < steps.length - 1 && (
                    <div className={`
                      w-8 md:w-16 h-0.5 mx-1
                      ${activeStep > step.paso ? 'bg-primary' : 'bg-muted-foreground/30'}
                    `} />
                  )}
                </div>
              ))}
            </div>

            {/* Active step content */}
            <AnimatePresence mode="wait">
              {steps.map((step) => (
                activeStep === step.paso && (
                  <motion.div
                    key={step.paso}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-muted/30 rounded-lg p-6"
                  >
                    <Badge variant="outline" className="mb-2">Paso {step.paso}</Badge>
                    <h5 className="text-lg font-semibold mb-3">{step.nombre}</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.contenido}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                        disabled={activeStep === 1}
                        className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-50"
                      >
                        Anterior
                      </button>
                      <button
                        onClick={() => setActiveStep(Math.min(7, activeStep + 1))}
                        disabled={activeStep === 7}
                        className="text-xs text-primary hover:underline flex items-center gap-1 disabled:opacity-50"
                      >
                        Siguiente <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Segment Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {segments.map((segment, index) => (
          <motion.div
            key={segment.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Card className={`h-full ${segment.color === 'primary' ? 'border-primary/30 bg-primary/5' : 'border-accent/30 bg-accent/5'}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${segment.color === 'primary' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}`}>
                    <span className="font-bold">{segment.id}</span>
                  </div>
                  <div>
                    <h5 className="font-semibold">{segment.name}</h5>
                    <Badge variant="outline" className="text-[10px]">
                      {segment.id === 'A' ? 'Target Primario' : 'Target Secundario'}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{segment.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium">Motivaci?n</p>
                      <p className="text-xs text-muted-foreground">{segment.motivation}</p>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-background/50 rounded-lg">
                    <p className="text-xs font-medium mb-1">Mensaje clave:</p>
                    <p className="text-sm font-medium italic">{segment.message}</p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs font-medium">Estrategia</p>
                      <p className="text-xs text-muted-foreground">{segment.strategy}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg"
      >
        <div className="flex items-start gap-2">
          <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-700">Insight clave de segmentaci?n</p>
            <p className="text-xs text-muted-foreground mt-1">
              El producto requiere <strong>educaci?n</strong> para reducir fricci?n de adopci?n. 
              Ambos segmentos necesitan claridad del beneficio; la diferencia est? en que A busca innovaci?n/experiencia 
              mientras B prioriza seguridad/confianza.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Validation Pending CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardContent className="p-4">
            <h5 className="text-sm font-medium text-blue-700 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Validaciones pendientes
            </h5>
            <p className="text-xs text-muted-foreground">
              Para cerrar rigurosidad, se debe ejecutar la entrevista semiestructurada para validar:
            </p>
            <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc list-inside">
              <li>Percepcion de conveniencia 90 segundos</li>
              <li>Disposicion de pago vs arroz tradicional</li>
              <li>Preferencia variante quinua vs tradicional</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Note for consolidation */}
      {viewMode === 'audit' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground"
        >
          <strong>Nota de auditor?a:</strong> Fuente consolidada: &ldquo;Taller - Un ejemplo practico de segmentacion (1).pdf&rdquo; 
          del Grupo Diana. Versi?n operativa ?nica en esta vista.
        </motion.div>
      )}
    </div>
  )
}
