"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Beaker, Shield, Sparkles, Zap, Activity } from "lucide-react"
import { useRef } from "react"

const floatingAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
}

const pulseRing = {
  scale: [1, 1.1, 1],
  opacity: [0.3, 0.6, 0.3],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(227, 24, 55, 0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(8, 145, 178, 0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(227, 24, 55, 0.05) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      {/* Decorative animated elements */}
      <motion.div 
        className="absolute top-20 right-20 w-72 h-72 rounded-full bg-accent/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/20"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5
          }}
        />
      ))}

      <motion.div style={{ y, opacity }} className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-accent/10 text-accent-foreground border-accent/20">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="inline-block mr-2"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                </motion.span>
                Innovacion en Cuidado Oral
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span 
                className="text-foreground inline-block"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Hace visible
              </motion.span>
              <br />
              <motion.span 
                className="text-primary inline-block"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                lo invisible
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-xl text-muted-foreground max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Primera crema dental fluorada con <strong className="text-foreground">alerta visual inteligente de acidez</strong>. 
              Te avisa cuando tu pH oral se aproxima a un nivel critico.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 relative overflow-hidden group">
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  Explorar Producto
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-border hover:bg-muted group">
                  Ver Analisis
                  <motion.span
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowDown className="ml-2 w-4 h-4" />
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Quick stats with stagger animation */}
            <motion.div 
              className="flex gap-8 pt-8 border-t border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {[
                { value: "92.7%", label: "Aceptacion potencial" },
                { value: "76.8%", label: "Interes directo" },
                { value: "220", label: "Encuestados" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.p 
                    className="text-3xl font-bold text-foreground"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 1 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right - Product visualization with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* pH Indicator visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-72 h-72">
                  {/* Animated outer rings */}
                  <motion.div 
                    className="absolute inset-0 rounded-full border-4 border-accent/30"
                    animate={pulseRing}
                  />
                  <motion.div 
                    className="absolute -inset-4 rounded-full border-2 border-primary/10"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute -inset-8 rounded-full border border-accent/10"
                    animate={{
                      scale: [1.05, 1, 1.05],
                      rotate: [360, 180, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Middle ring */}
                  <motion.div 
                    className="absolute inset-4 rounded-full border-2 border-primary/20"
                    animate={{
                      borderColor: ["rgba(227, 24, 55, 0.2)", "rgba(8, 145, 178, 0.3)", "rgba(227, 24, 55, 0.2)"]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  {/* Inner content */}
                  <motion.div 
                    className="absolute inset-8 rounded-full bg-gradient-to-br from-card to-muted flex items-center justify-center shadow-2xl"
                    animate={floatingAnimation}
                  >
                    <div className="text-center">
                      <motion.div 
                        className="text-6xl font-bold text-primary"
                        animate={{
                          textShadow: [
                            "0 0 20px rgba(227, 24, 55, 0.3)",
                            "0 0 40px rgba(227, 24, 55, 0.5)",
                            "0 0 20px rgba(227, 24, 55, 0.3)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        pH
                      </motion.div>
                      <motion.div 
                        className="text-2xl font-medium text-foreground mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                      >
                        6.5 - 7.5
                      </motion.div>
                      <motion.div 
                        className="text-sm text-muted-foreground mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4 }}
                      >
                        Rango optimo
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Floating badges with enhanced animations */}
                  <motion.div 
                    className="absolute -left-8 top-1/4 bg-card p-3 rounded-xl shadow-lg border border-border"
                    initial={{ opacity: 0, x: -40, rotate: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0, 
                      rotate: 0,
                      y: [0, -8, 0]
                    }}
                    transition={{ 
                      opacity: { delay: 0.8 },
                      y: { duration: 3, repeat: Infinity, delay: 0.5 }
                    }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <Beaker className="w-6 h-6 text-accent" />
                  </motion.div>

                  <motion.div 
                    className="absolute -right-8 top-1/2 bg-card p-3 rounded-xl shadow-lg border border-border"
                    initial={{ opacity: 0, x: 40, rotate: 20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0, 
                      rotate: 0,
                      y: [0, 8, 0]
                    }}
                    transition={{ 
                      opacity: { delay: 1 },
                      y: { duration: 2.5, repeat: Infinity, delay: 0.8 }
                    }}
                    whileHover={{ scale: 1.2, rotate: -10 }}
                  >
                    <Shield className="w-6 h-6 text-primary" />
                  </motion.div>

                  <motion.div 
                    className="absolute -left-4 bottom-1/4 bg-card p-3 rounded-xl shadow-lg border border-border"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      y: [0, -6, 0]
                    }}
                    transition={{ 
                      opacity: { delay: 1.2 },
                      y: { duration: 3.5, repeat: Infinity, delay: 1 }
                    }}
                    whileHover={{ scale: 1.2, rotate: 15 }}
                  >
                    <Zap className="w-6 h-6 text-chart-4" />
                  </motion.div>

                  <motion.div 
                    className="absolute -right-4 bottom-1/3 bg-card p-3 rounded-xl shadow-lg border border-border"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      y: [0, 6, 0]
                    }}
                    transition={{ 
                      opacity: { delay: 1.4 },
                      y: { duration: 2.8, repeat: Infinity, delay: 1.2 }
                    }}
                    whileHover={{ scale: 1.2, rotate: -15 }}
                  >
                    <Activity className="w-6 h-6 text-chart-3" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">Scroll para explorar</span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1"
          >
            <motion.div
              className="w-1.5 h-3 rounded-full bg-primary"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
