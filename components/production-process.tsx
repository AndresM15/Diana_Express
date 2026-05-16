"use client"

import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { 
  Package, 
  Scale, 
  Beaker, 
  Blend, 
  CheckCircle2, 
  Box, 
  Stamp, 
  Truck,
  Thermometer,
  Droplets,
  CircleDot,
  Factory
} from "lucide-react"
import { useRef, useState } from "react"

const productionSteps = [
  {
    step: 1,
    icon: Package,
    title: "Recepcion de materias primas",
    description: "Verificacion y almacenamiento de ingredientes segun especificaciones de calidad.",
    details: "Se reciben y verifican: agua purificada, carbonato de calcio, silice hidratada, glicerina, indicador de pH encapsulado, tubos y cajas."
  },
  {
    step: 2,
    icon: Scale,
    title: "Pesaje de ingredientes",
    description: "Dosificacion precisa de cada componente segun formula establecida.",
    details: "Uso de balanza industrial calibrada para garantizar la proporcion exacta de cada ingrediente."
  },
  {
    step: 3,
    icon: Beaker,
    title: "Mezcla",
    description: "Combinacion de ingredientes en tanque mezclador industrial.",
    details: "Proceso controlado de temperatura y velocidad para asegurar homogeneidad de la base."
  },
  {
    step: 4,
    icon: Blend,
    title: "Homogeneizacion",
    description: "Procesamiento para obtener textura uniforme y estable.",
    details: "El homogeneizador garantiza la distribucion uniforme del indicador de pH encapsulado."
  },
  {
    step: 5,
    icon: CheckCircle2,
    title: "Control de calidad",
    description: "Verificacion de pH, viscosidad y consistencia del producto.",
    details: "Cada lote es analizado para confirmar que cumple con los estandares: pH 6.5-7.5, viscosidad y consistencia correctas."
  },
  {
    step: 6,
    icon: Box,
    title: "Envasado",
    description: "Llenado de tubos de 90g/120g con producto terminado.",
    details: "Llenadora semiautomatica que dosifica la cantidad exacta en cada tubo."
  },
  {
    step: 7,
    icon: Stamp,
    title: "Sellado y etiquetado",
    description: "Sellado hermetico y aplicacion de etiquetas con informacion del producto.",
    details: "Selladora de tubos y etiquetadora que garantizan la integridad y trazabilidad del producto."
  },
  {
    step: 8,
    icon: Truck,
    title: "Empaque y distribucion",
    description: "Colocacion en cajas y preparacion para envio a canales de venta.",
    details: "Empaque en cajas plegadizas de carton, paletizado y despacho a centros de distribucion."
  }
]

const qualityIndicators = [
  { icon: Droplets, label: "pH del producto", value: "6.5 - 7.5", status: "critical" },
  { icon: CircleDot, label: "Viscosidad", value: "Controlada", status: "normal" },
  { icon: Beaker, label: "Consistencia", value: "Homogenea", status: "normal" },
  { icon: Scale, label: "Peso del envase", value: "90g +/- 2g", status: "critical" },
  { icon: Stamp, label: "Sellado", value: "Hermetico", status: "critical" }
]

const productSpecs = {
  color: "Blanco",
  olor: "Menta fresca",
  sabor: "Mentolado suave",
  ph: "6.5 - 7.5",
  vidaUtil: "24 meses",
  almacenamiento: "Lugar fresco y seco, 15C - 30C"
}

const ingredients = [
  { name: "Agua purificada", function: "Base del producto" },
  { name: "Carbonato de calcio", function: "Abrasivo suave para limpiar" },
  { name: "Silice hidratada", function: "Ayuda a eliminar placa" },
  { name: "Glicerina", function: "Mantiene la humedad" },
  { name: "Sorbitol", function: "Endulzante y humectante" },
  { name: "Lauril sulfato de sodio", function: "Espuma y limpieza" },
  { name: "Fluoruro de sodio", function: "Prevencion de caries" },
  { name: "Aromas naturales", function: "Frescura (menta/hierbabuena)" },
  { name: "Carragenina/goma xantana", function: "Espesante" },
  { name: "Dioxido de titanio", function: "Color blanco" },
  { name: "Indicador de pH", function: "Cambio de color segun acidez" }
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
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

export function ProductionProcess() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [activeStep, setActiveStep] = useState<string | undefined>(undefined)

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
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
          >
            <Factory className="w-8 h-8 text-primary" />
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Produccion y Control de Calidad
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Proceso de fabricacion de Colgate Biolumin con los mas altos estandares de calidad y seguridad.
          </motion.p>
        </motion.div>

        {/* Product specifications */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-card border-border h-full hover:shadow-xl transition-shadow duration-300 group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="p-2 rounded-lg bg-primary/10"
                  >
                    <Thermometer className="w-5 h-5 text-primary" />
                  </motion.div>
                  Ficha Tecnica del Producto
                </CardTitle>
                <CardDescription>
                  Especificaciones de Colgate Biolumin 90g / 120g
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Color", value: productSpecs.color, highlight: false },
                    { label: "Olor", value: productSpecs.olor, highlight: false },
                    { label: "Sabor", value: productSpecs.sabor, highlight: false },
                    { label: "pH", value: productSpecs.ph, highlight: true },
                    { label: "Vida util", value: productSpecs.vidaUtil, highlight: false },
                    { label: "Almacenamiento", value: productSpecs.almacenamiento, highlight: false, small: true }
                  ].map((spec, index) => (
                    <motion.div 
                      key={index}
                      className={`p-4 rounded-lg ${spec.highlight ? "bg-primary/10 border border-primary/20" : "bg-muted/50"}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index, type: "spring" }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <p className="text-sm text-muted-foreground">{spec.label}</p>
                      <p className={`font-semibold ${spec.highlight ? "text-primary font-bold" : "text-foreground"} ${spec.small ? "text-xs" : ""}`}>
                        {spec.value}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Quality indicators */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold text-foreground mb-4">Indicadores de Control</h4>
                  <div className="flex flex-wrap gap-2">
                    {qualityIndicators.map((indicator, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index, type: "spring" }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Badge 
                          variant={indicator.status === "critical" ? "default" : "secondary"}
                          className={`flex items-center gap-1 cursor-pointer ${indicator.status === "critical" ? "bg-primary text-primary-foreground" : ""}`}
                        >
                          <indicator.icon className="w-3 h-3" />
                          {indicator.label}: {indicator.value}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-card border-border h-full hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="p-2 rounded-lg bg-accent/10"
                  >
                    <Beaker className="w-5 h-5 text-accent" />
                  </motion.div>
                  Ingredientes y Funcion
                </CardTitle>
                <CardDescription>
                  Componentes clave y su papel en la formula
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                  {ingredients.map((ingredient, index) => (
                    <motion.div 
                      key={index} 
                      className={`flex justify-between items-center p-3 rounded-lg ${
                        ingredient.name === "Indicador de pH" 
                          ? "bg-accent/10 border border-accent/20" 
                          : "bg-muted/50"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * index }}
                      whileHover={{ x: 5, backgroundColor: ingredient.name === "Indicador de pH" ? "var(--accent)" : "var(--muted)" }}
                    >
                      <span className={`font-medium ${
                        ingredient.name === "Indicador de pH" ? "text-accent" : "text-foreground"
                      }`}>
                        {ingredient.name}
                      </span>
                      <span className="text-sm text-muted-foreground text-right">
                        {ingredient.function}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Production Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-card border-border overflow-hidden">
            <CardHeader>
              <CardTitle className="text-foreground">Proceso de Produccion</CardTitle>
              <CardDescription>
                8 etapas desde la recepcion de materias primas hasta el empaque final
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Visual stepper */}
              <div className="hidden lg:flex items-center justify-between mb-12 relative">
                <motion.div 
                  className="absolute top-6 left-8 right-8 h-0.5 bg-border"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  style={{ transformOrigin: "left" }}
                />
                {productionSteps.map((step, index) => (
                  <motion.div 
                    key={index}
                    className="relative z-10 flex flex-col items-center text-center cursor-pointer group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index + 0.5, type: "spring" }}
                    whileHover={{ y: -5 }}
                    onClick={() => setActiveStep(activeStep === `step-${index}` ? undefined : `step-${index}`)}
                  >
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-2 shadow-lg group-hover:shadow-xl transition-shadow"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <step.icon className="w-5 h-5" />
                    </motion.div>
                    <span className="text-xs font-medium text-foreground max-w-20 group-hover:text-primary transition-colors">{step.title}</span>
                  </motion.div>
                ))}
              </div>

              {/* Accordion for details */}
              <Accordion 
                type="single" 
                collapsible 
                className="space-y-2"
                value={activeStep}
                onValueChange={setActiveStep}
              >
                {productionSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <AccordionItem 
                      value={`step-${index}`}
                      className="border border-border rounded-lg px-4 bg-muted/30 overflow-hidden"
                    >
                      <AccordionTrigger className="hover:no-underline group">
                        <div className="flex items-center gap-4">
                          <motion.div 
                            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <step.icon className="w-5 h-5" />
                          </motion.div>
                          <div className="text-left">
                            <span className="text-xs text-muted-foreground">Paso {step.step}</span>
                            <p className="font-medium text-foreground group-hover:text-primary transition-colors">{step.title}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-14 text-muted-foreground">
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="mb-2">{step.description}</p>
                          <p className="text-sm bg-muted/50 p-3 rounded-lg">{step.details}</p>
                        </motion.div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Card className="bg-card border-border overflow-hidden">
            <CardHeader>
              <CardTitle className="text-foreground">Beneficios Funcionales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-4">
                {[
                  "Prevencion de caries",
                  "Eliminacion de placa bacteriana",
                  "Fortalecimiento del esmalte",
                  "Aliento fresco",
                  "Limpieza profunda"
                ].map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="p-4 bg-primary/5 rounded-lg border border-primary/10 text-center cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, type: "spring" }}
                    whileHover={{ y: -5, scale: 1.05, backgroundColor: "rgba(227, 24, 55, 0.1)" }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + 0.1 * index, type: "spring" }}
                    >
                      <CheckCircle2 className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    </motion.div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
