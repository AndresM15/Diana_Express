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
      type: "spring" as const,
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
      className="bg-diana-navy text-primary-foreground py-12 overflow-hidden relative"
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-1.5 diana-brand-bar"
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
                className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary to-accent"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ borderRadius: "50%" }}
                />
                <span className="text-primary-foreground font-bold relative z-10">D</span>
              </motion.div>
              <span className="font-bold text-xl">Diana Express</span>
            </motion.div>
            <p className="text-primary-foreground/75 max-w-md">
              Arroz precocido listo en 90 segundos con tecnología Steam-Tech. 
              La conveniencia premium del Grupo Diana.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">Secciones</h4>
            <ul className="space-y-2 text-primary-foreground/75">
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
                    className="hover:text-primary-foreground transition-colors flex items-center gap-1 group"
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
            <ul className="space-y-2 text-primary-foreground/75">
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
                    className="hover:text-primary-foreground transition-colors flex items-center gap-1 group"
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
          className="border-t border-primary-foreground/15 pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p 
              className="text-primary-foreground/60 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              2026 Diana Express - Grupo Diana / UAM
            </motion.p>
            <motion.div 
              className="flex items-center gap-6 text-sm text-primary-foreground/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              {[
                "Grupo: DIANA",
                "Unidad: Alimentos",
                "Piloto: 5 ciudades"
              ].map((item, index) => (
                <motion.span 
                  key={index}
                  className="bg-primary-foreground/10 px-3 py-1 rounded-full border border-primary-foreground/10"
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
