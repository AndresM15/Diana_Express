"use client"

import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Wheat, Leaf, Zap, Sparkles, ShieldCheck } from "lucide-react"
import { useRef } from "react"
import { SectionHeader } from "@/components/section-header"
import {
  staggerContainer,
  slideFromLeft,
  slideFromRight,
  iconPulseHover,
  popIn,
} from "@/lib/motion-presets"

const propositions = [
  {
    icon: Clock,
    title: "Listo en 90 segundos",
    description: "Arroz precocido en pouch de 100 g para microondas. Sin agua adicional: conveniencia real para rutinas urbanas.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20"
  },
  {
    icon: Wheat,
    title: "Arroz tradicional premium",
    description: "Grano separado, textura ideal y sabor auténtico. La porción exacta que evita desperdicio en hogares unipersonales.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20"
  },
  {
    icon: Leaf,
    title: "Quinua con verduras",
    description: "Variante premium-funcional con mayor fibra y nutrientes. Pensada para jóvenes profesionales que buscan bienestar.",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    borderColor: "border-chart-3/20"
  },
  {
    icon: Zap,
    title: "Tecnología Steam-Tech",
    description: "Empaque inteligente con precocción controlada, barrera protectora y rehidratación rápida por vapor interno.",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    borderColor: "border-chart-4/20"
  },
  {
    icon: Sparkles,
    title: "100% integración vertical",
    description: "Diana Agrícola asegura calidad desde el campo: variedades premium, cultivo sostenible y trazabilidad completa.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20"
  },
  {
    icon: ShieldCheck,
    title: "Respaldo Grupo Diana",
    description: "+60 años de historia, estándares ISO/HACCP y compromiso social con el campo colombiano.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20"
  }
]

export function ValueProposition() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeader
          icon={Sparkles}
          title="Catálogo y Propuesta de Valor"
          iconBoxClassName="bg-white/70 border-accent/30"
          description={
            <>
              Diana Express transforma el arroz básico en una{" "}
              <strong className="text-foreground"> solución Ready-to-Eat de alta calidad</strong>,
              combinando rapidez, nutrición y el respaldo agroindustrial del Grupo Diana.
            </>
          }
        />

        <motion.div
          ref={ref}
          variants={staggerContainer(0.12, 0.15)}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {propositions.map((prop, index) => (
            <motion.div
              key={index}
              variants={index % 2 === 0 ? slideFromLeft : slideFromRight}
              whileHover={{ scale: 1.04, transition: { duration: 0.25 } }}
            >
              <Card className="h-full bg-white/95 border-2 border-white shadow-md group overflow-hidden">
                <CardContent className="p-6">
                  <motion.div
                    className={`w-14 h-14 rounded-2xl ${prop.bgColor} ${prop.borderColor} border-2 flex items-center justify-center mb-4`}
                    variants={iconPulseHover}
                    initial="rest"
                    whileHover="hover"
                  >
                    <prop.icon className={`w-7 h-7 ${prop.color}`} />
                  </motion.div>

                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {prop.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {prop.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={popIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="p-5 bg-white/80 border-2 border-accent/30 rounded-2xl text-center shadow-md">
            <p className="text-sm text-muted-foreground">
              <strong className="text-accent">Presentación:</strong> Pouch de 100 g (comercial) y referencia financiera en pouch de 250 g a $5.500 COP.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
