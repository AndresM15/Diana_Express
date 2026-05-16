"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

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
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-foreground text-background py-12 overflow-hidden relative"
    >
      {/* Animated background accent */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"
        animate={{ 
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      <div className="container mx-auto px-6">
        <motion.div 
          className="grid md:grid-cols-4 gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div className="md:col-span-2" variants={itemVariants}>
            <motion.div 
              className="flex items-center gap-2 mb-4"
              whileHover={{ x: 5 }}
            >
              <motion.div 
                className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center relative overflow-hidden"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ borderRadius: "50%" }}
                />
                <span className="text-primary-foreground font-bold relative z-10">C</span>
              </motion.div>
              <span className="font-bold text-xl">Colgate Biolumin</span>
            </motion.div>
            <p className="text-background/70 max-w-md">
              Primera crema dental fluorada con alerta visual inteligente de acidez. 
              Innovacion que hace visible lo invisible.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">Secciones</h4>
            <ul className="space-y-2 text-background/70">
              {[
                { label: "Propuesta de Valor", href: "#valor" },
                { label: "Business Canvas", href: "#canvas" },
                { label: "KPIs", href: "#kpis" },
                { label: "Analisis de Mercado", href: "#mercado" }
              ].map((link, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <motion.a 
                    href={link.href} 
                    className="hover:text-background transition-colors flex items-center gap-1 group"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">Analisis</h4>
            <ul className="space-y-2 text-background/70">
              {[
                { label: "Estructura de Costos", href: "#costos" },
                { label: "Pronostico", href: "#pronostico" },
                { label: "Produccion", href: "#produccion" },
                { label: "Conclusiones", href: "#conclusiones" }
              ].map((link, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <motion.a 
                    href={link.href} 
                    className="hover:text-background transition-colors flex items-center gap-1 group"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div 
          className="border-t border-background/20 pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p 
              className="text-background/60 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              2026 Colgate Biolumin - Proyecto Grupo #2
            </motion.p>
            <motion.div 
              className="flex items-center gap-6 text-sm text-background/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              {[
                "Disenado para: COLGATE",
                "Fecha: 20-02-26",
                "Version: #1"
              ].map((item, index) => (
                <motion.span 
                  key={index}
                  className="bg-background/10 px-3 py-1 rounded-full"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
