"use client"

import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Activity, Brain, Zap, Sparkles, ShieldCheck } from "lucide-react"
import { useRef } from "react"

const propositions = [
  {
    icon: Eye,
    title: "Hace visible lo invisible",
    description: "Alerta cuando el pH oral se aproxima a un nivel critico asociado a acidez.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20"
  },
  {
    icon: Activity,
    title: "Autocuidado en tiempo real",
    description: "Refuerza habitos preventivos con feedback visual inmediato durante el cepillado.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20"
  },
  {
    icon: Brain,
    title: "Educativo e interactivo",
    description: "Combina ciencia preventiva con experiencia interactiva para toda la familia.",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    borderColor: "border-chart-3/20"
  },
  {
    icon: Zap,
    title: "Tecnologia de microencapsulacion",
    description: "Indicadores de pH grado cosmetico que responden al ambiente oral.",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    borderColor: "border-chart-4/20"
  },
  {
    icon: Sparkles,
    title: "Innovacion en cuidado oral",
    description: "Primera crema dental fluorada con alerta visual inteligente de acidez.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20"
  },
  {
    icon: ShieldCheck,
    title: "Respaldo cientifico",
    description: "Validacion clinica con asociaciones odontologicas y universidades.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20"
  }
]

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

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9, rotateX: -15 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
}

const iconVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.2, 
    rotate: [0, -10, 10, -10, 0],
    transition: { duration: 0.5 }
  }
}

export function ValueProposition() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Propuesta de Valor
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Colgate Biolumin transforma el cepillado de rutina en una 
            <strong className="text-foreground"> experiencia educativa preventiva</strong>, 
            combinando tecnologia innovadora con ciencia del cuidado oral.
          </motion.p>
        </motion.div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {propositions.map((prop, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className={`h-full bg-card border-border hover:shadow-xl transition-all duration-500 group cursor-pointer relative overflow-hidden`}>
                {/* Animated background gradient on hover */}
                <motion.div
                  className={`absolute inset-0 ${prop.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                
                {/* Animated corner accent */}
                <motion.div
                  className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${prop.bgColor}`}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 2 }}
                  transition={{ duration: 0.5 }}
                />

                <CardContent className="p-6 relative z-10">
                  <motion.div 
                    className={`w-14 h-14 rounded-2xl ${prop.bgColor} ${prop.borderColor} border flex items-center justify-center mb-4`}
                    variants={iconVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        delay: index * 0.2 
                      }}
                    >
                      <prop.icon className={`w-7 h-7 ${prop.color}`} />
                    </motion.div>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors"
                    layoutId={`title-${index}`}
                  >
                    {prop.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-muted-foreground text-sm leading-relaxed"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {prop.description}
                  </motion.p>

                  {/* Animated underline */}
                  <motion.div
                    className={`h-0.5 ${prop.color.replace('text-', 'bg-')} mt-4 origin-left`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Important note with animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <motion.div
            className="p-4 bg-accent/10 border border-accent/20 rounded-xl text-center relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-sm text-muted-foreground relative z-10">
              <strong className="text-foreground">Nota importante:</strong> El cambio de color es una senal orientativa para autocuidado, no un diagnostico clinico.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
