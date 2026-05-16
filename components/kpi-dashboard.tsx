"use client"

import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { HelpCircle, TrendingUp, Users, ThumbsUp, Target, BarChart3 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// KPI Data from survey
const kpiData = {
  interes: { value: 76.8, label: "Interes Directo", description: "Porcentaje de encuestados que respondieron Si al interes en el producto" },
  talVez: { value: 15.9, label: "Tal Vez", description: "Encuestados que mostraron interes condicional" },
  rechazo: { value: 6.4, label: "Rechazo", description: "Porcentaje que respondio No" },
  aceptacion: { value: 92.7, label: "Aceptacion Potencial", description: "Si % + Tal vez % = 76.8% + 15.9%", formula: "Si % + Tal vez %" },
  viabilidad: { value: 70.5, label: "Indice de Viabilidad", description: "Si % - No % = 76.8% - 6.4%", formula: "Si % - No %" },
  conversion: { value: 82.8, label: "Conversion Potencial", description: "Si / (Si + Tal vez) = 76.8 / 92.7", formula: "Si / (Si + Tal vez)" }
}

const sampleData = {
  muestraInfinita: 384,
  muestraFinita: 217,
  respuestasReales: 220,
  poblacionN: 500
}

function AnimatedCounter({ value, suffix = "%", delay = 0 }: { value: number; suffix?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const spring = useSpring(0, { stiffness: 50, damping: 20 })
  const display = useTransform(spring, (current) => `${current.toFixed(1)}${suffix}`)
  const [displayValue, setDisplayValue] = useState(`0${suffix}`)
  
  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        spring.set(value)
      }, delay * 1000)
      return () => clearTimeout(timeout)
    }
  }, [isInView, spring, value, delay])
  
  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setDisplayValue(v))
    return unsubscribe
  }, [display])
  
  return <span ref={ref}>{displayValue}</span>
}

function AnimatedProgress({ value, delay = 0, className = "" }: { value: number; delay?: number; className?: string }) {
  const [progress, setProgress] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        setProgress(value)
      }, delay * 1000)
      return () => clearTimeout(timeout)
    }
  }, [isInView, value, delay])
  
  return (
    <div ref={ref}>
      <Progress value={progress} className={`h-3 bg-muted transition-all duration-1000 ${className}`} />
    </div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

export function KPIDashboard() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
          >
            <BarChart3 className="w-8 h-8 text-primary" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            KPIs de Validacion de Mercado
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Resultados de la encuesta de validacion con <strong className="text-foreground">220 respuestas reales</strong> recolectadas.
          </motion.p>
        </motion.div>

        {/* Sample methodology */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-card border-border overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Users className="w-5 h-5 text-primary" />
                </motion.div>
                Metodologia de Muestreo
              </CardTitle>
              <CardDescription>
                Parametros estadisticos: Z=1.96, p=0.5, q=0.5, e=0.05
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { value: sampleData.muestraInfinita, label: "Muestra infinita", formula: "n = Z^2*p*q / e^2", highlight: false },
                  { value: sampleData.muestraFinita, label: `Muestra finita (N=${sampleData.poblacionN})`, formula: "n = N*Z^2*p*q / [e^2*(N-1) + Z^2*p*q]", highlight: false },
                  { value: sampleData.respuestasReales, label: "Respuestas recolectadas", formula: "Supera muestra minima", highlight: true }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className={`text-center p-4 rounded-lg ${item.highlight ? "bg-primary/10 border border-primary/20" : "bg-muted/50"}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.15, type: "spring" }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <motion.p 
                      className={`text-3xl font-bold ${item.highlight ? "text-primary" : "text-foreground"}`}
                    >
                      <AnimatedCounter value={item.value} suffix="" delay={0.5 + index * 0.2} />
                    </motion.p>
                    <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
                    <p className={`text-xs mt-2 font-mono ${item.highlight ? "text-chart-4" : "text-muted-foreground"}`}>
                      {item.highlight ? `✓ ${item.formula}` : item.formula}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main KPI Cards */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {/* Interest Distribution */}
          <motion.div variants={cardVariants}>
            <Card className="h-full bg-card border-border group hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-foreground">
                  <span className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="p-2 rounded-lg bg-chart-4/10"
                    >
                      <ThumbsUp className="w-5 h-5 text-chart-4" />
                    </motion.div>
                    Distribucion de Interes
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Si", value: kpiData.interes.value, color: "" },
                  { label: "Tal vez", value: kpiData.talVez.value, color: "[&>div]:bg-accent" },
                  { label: "No", value: kpiData.rechazo.value, color: "[&>div]:bg-destructive/60" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{item.label}</span>
                      <motion.span 
                        className="font-semibold text-foreground"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <AnimatedCounter value={item.value} delay={0.5 + index * 0.15} />
                      </motion.span>
                    </div>
                    <AnimatedProgress value={item.value} delay={0.4 + index * 0.1} className={item.color} />
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Acceptance Rate */}
          <motion.div variants={cardVariants}>
            <Card className="h-full bg-card border-border group hover:shadow-xl transition-shadow duration-300 overflow-hidden relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <CardHeader className="relative">
                <CardTitle className="flex items-center justify-between text-foreground">
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-2 rounded-lg bg-primary/10"
                    >
                      <Target className="w-5 h-5 text-primary" />
                    </motion.div>
                    Aceptacion Potencial
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="font-semibold">Formula:</p>
                        <p className="font-mono text-xs">{kpiData.aceptacion.formula}</p>
                        <p className="mt-2 text-xs">{kpiData.aceptacion.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8 relative">
                <motion.div 
                  className="text-6xl font-bold text-primary"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                >
                  <AnimatedCounter value={kpiData.aceptacion.value} delay={0.4} />
                </motion.div>
                <motion.p 
                  className="text-muted-foreground mt-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  de los encuestados
                </motion.p>
                <motion.p 
                  className="text-sm text-chart-4 mt-4 flex items-center gap-1"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.span
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <TrendingUp className="w-4 h-4" />
                  </motion.span>
                  Alto potencial de mercado
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Viability & Conversion */}
          <motion.div variants={cardVariants}>
            <Card className="h-full bg-card border-border group hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    className="p-2 rounded-lg bg-accent/10"
                  >
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </motion.div>
                  Indicadores Clave
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { 
                    label: "Indice de Viabilidad", 
                    value: kpiData.viabilidad.value, 
                    suffix: "",
                    formula: kpiData.viabilidad.formula,
                    note: "Diferencia neta positiva",
                    bg: "bg-muted/50"
                  },
                  { 
                    label: "Conversion Potencial", 
                    value: kpiData.conversion.value, 
                    suffix: "%",
                    formula: kpiData.conversion.formula,
                    note: "Probabilidad de compra efectiva",
                    bg: "bg-muted/50"
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className={`p-4 ${item.bg} rounded-lg`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.15 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-3 h-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-mono text-xs">{item.formula}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <motion.p 
                      className="text-3xl font-bold text-foreground"
                      initial={{ scale: 0.5 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", delay: 0.5 + index * 0.15 }}
                    >
                      <AnimatedCounter value={item.value} suffix={item.suffix} delay={0.6 + index * 0.15} />
                    </motion.p>
                    <p className="text-xs text-muted-foreground mt-1">{item.note}</p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Insight summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-4"
        >
          {[
            { label: "Alta aceptacion", value: "92.7%", color: "text-chart-4" },
            { label: "Bajo rechazo", value: "6.4%", color: "text-chart-4" },
            { label: "Segmento lider", value: "18-25 anos", color: "text-primary" },
            { label: "Driver principal", value: "Calidad", color: "text-accent" }
          ].map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, type: "spring" }}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <Card className="bg-card border-border text-center py-6 hover:shadow-lg transition-shadow cursor-pointer">
                <motion.p 
                  className={`text-2xl font-bold ${insight.color}`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.2 + index * 0.1 }}
                >
                  {insight.value}
                </motion.p>
                <p className="text-sm text-muted-foreground mt-1">{insight.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
