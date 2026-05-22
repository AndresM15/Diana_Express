"use client"

import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  TrendingUp, 
  Target, 
  Lightbulb,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Rocket
} from "lucide-react"
import { useRef } from "react"
import { SectionHeader } from "@/components/section-header"
import { staggerContainer, riseBounce } from "@/lib/motion-presets"

const keyInsights = [
  {
    icon: TrendingUp,
    title: "Viabilidad financiera aprobada",
    description: "VPN de $627.481.530 COP y TIR del 51,20% superan el WACC del 12%. Dictamen técnico-financiero: APROBADO.",
    metric: "APROBADO",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10"
  },
  {
    icon: Target,
    title: "Precio de venta definido",
    description: "Precio unitario de $5.500 COP por pouch de 250 g, alineado con la estrategia de valor del segmento urbano.",
    metric: "$5.500",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Lightbulb,
    title: "Segmento objetivo claro",
    description: "Jóvenes profesionales (DINKs) como target principal por rentabilidad; estudiantes aportan volumen en ciudades universitarias.",
    metric: "DINKs",
    color: "text-accent",
    bgColor: "bg-accent/10"
  }
]

const nextSteps = [
  "Escalar piloto en Bogotá, Medellín, Cali, Manizales y Pereira",
  "Activar campaña #Diana90sChallenge en TikTok e Instagram",
  "Negociar presencia en Oxxo, Ara, D1 y grandes superficies",
  "Instalar vending en campus universitarios (UAM y aliados)",
  "Monitorear penetración del 5% (170.000 unidades año 1)"
]

const warnings = [
  {
    title: "Sensibilidad al precio",
    description: "Inflación o competencia hard-discount podría migrar estudiantes y hogares de ingresos medios a marcas más baratas."
  },
  {
    title: "Capacidad de producción",
    description: "Lote base de 10.000 unidades por corrida requiere planificación para demanda mensual de 14.167 unidades."
  }
]

const gridStagger = staggerContainer(0.12, 0.1)
const cardRise = riseBounce

export function Conclusions() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeader
          icon={Sparkles}
          title="Conclusiones e Insights"
          lightOnDark
          iconClassName="text-white"
          iconBoxClassName="bg-white/15"
          description="Resumen ejecutivo de los hallazgos clave y recomendaciones para el lanzamiento de Diana Express."
        />

        {/* Key Insights */}
        <motion.div 
          ref={ref}
          variants={gridStagger}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {keyInsights.map((insight, index) => (
            <motion.div
              key={index}
              variants={cardRise}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-card border-border h-full hover:shadow-xl transition-all duration-300 group overflow-hidden relative">
                <motion.div
                  className={`absolute inset-0 ${insight.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <CardContent className="pt-6 relative">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div 
                      className={`p-3 rounded-xl ${insight.bgColor}`}
                      whileHover={{ scale: 1.12 }}
                      transition={{ duration: 0.28 }}
                    >
                      <insight.icon className={`w-6 h-6 ${insight.color}`} />
                    </motion.div>
                    <motion.span 
                      className={`text-2xl font-bold ${insight.color}`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", delay: 0.3 + index * 0.1 }}
                    >
                      {insight.metric}
                    </motion.span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{insight.title}</h3>
                  <p className="text-muted-foreground text-sm">{insight.description}</p>
                  
                  <motion.div
                    className={`h-1 ${insight.color.replace('text-', 'bg-')} mt-4 origin-left rounded-full`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary and Next Steps */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <Card className="bg-card border-border h-full group hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="p-2 rounded-lg bg-chart-4/10"
                  >
                    <CheckCircle2 className="w-5 h-5 text-chart-4" />
                  </motion.div>
                  Decision de Lanzamiento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div 
                  className="p-6 bg-chart-4/10 rounded-xl border border-chart-4/20 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-chart-4/10 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="text-lg font-semibold text-foreground mb-2 relative">
                    La evidencia respalda el lanzamiento
                  </p>
                  <p className="text-muted-foreground relative">
                    Los indicadores de mercado, aceptacion del consumidor y viabilidad economica 
                    sugieren un potencial comercial favorable para Diana Express.
                  </p>
                </motion.div>

                <div className="space-y-3">
                  <p className="font-semibold text-foreground">Fortalezas del proyecto:</p>
                  <ul className="space-y-2">
                    {[
                      "Diferenciacion clara vs competencia",
                      "Respaldo marca Diana (+60 años)",
                      "Tecnologia innovadora validada",
                      "Segmentacion coherente con el producto",
                      "Estructura de costos definida"
                    ].map((item, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-center gap-2 text-muted-foreground group/item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-chart-4 shrink-0" />
                        </motion.div>
                        <span className="group-hover/item:text-foreground transition-colors">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <Card className="bg-card border-border h-full hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="p-2 rounded-lg bg-accent/10"
                  >
                    <ArrowRight className="w-5 h-5 text-accent" />
                  </motion.div>
                  Proximos Pasos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {nextSteps.map((step, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-3 group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.span 
                        className="w-6 h-6 rounded-full bg-accent/20 text-accent text-sm font-semibold flex items-center justify-center shrink-0"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", delay: 0.2 + index * 0.1 }}
                        whileHover={{ scale: 1.2, backgroundColor: "var(--accent)" }}
                      >
                        {index + 1}
                      </motion.span>
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">{step}</span>
                    </motion.li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Warnings/Notes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-card border-border border-l-4 border-l-accent overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AlertCircle className="w-5 h-5 text-accent" />
                </motion.div>
                Notas y Consideraciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {warnings.map((warning, index) => (
                  <motion.div 
                    key={index} 
                    className="p-4 bg-accent/5 rounded-lg border border-accent/10 hover:border-accent/30 transition-colors"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="font-semibold text-foreground mb-1">{warning.title}</p>
                    <p className="text-sm text-muted-foreground">{warning.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          <Card className="bg-gradient-to-br from-primary/5 via-background to-accent/5 border-primary/20 overflow-hidden relative">
            {/* Animated background particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-32 h-32 rounded-full bg-primary/5"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 2) * 60}%`
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                  x: [-10, 10, -10],
                  y: [-10, 10, -10]
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}

            <CardContent className="py-12 relative">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Rocket className="w-8 h-8 text-primary" />
                </motion.div>
              </motion.div>

              <motion.h3 
                className="text-2xl font-bold text-foreground mb-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Listo para el siguiente paso?
              </motion.h3>
              <motion.p 
                className="text-muted-foreground max-w-xl mx-auto mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Este analisis proporciona la base para tomar decisiones informadas sobre el lanzamiento 
                de Diana Express en el mercado colombiano Ready-to-Eat.
              </motion.p>
              <motion.div 
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground relative overflow-hidden group">
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    Descargar Reporte
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </motion.span>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
