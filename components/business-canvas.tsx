"use client"

import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Users, 
  Handshake, 
  Settings, 
  Gift, 
  Heart, 
  Store, 
  UserCheck,
  Wallet,
  Receipt
} from "lucide-react"
import { useRef } from "react"

const canvasData = {
  sociosClave: {
    icon: Handshake,
    title: "Socios Clave",
    color: "bg-primary/10 text-primary",
    hoverBg: "group-hover:bg-primary/20",
    items: [
      "Proveedores de microencapsulacion e indicadores de pH",
      "Cadenas retail: supermercados, droguerias, hard discount",
      "Marketplaces: Amazon, Mercado Libre",
      "Asociaciones odontologicas y universidades",
      "Influencers de salud y bienestar",
      "Centros de investigacion"
    ]
  },
  actividadesClave: {
    icon: Settings,
    title: "Actividades Clave",
    color: "bg-chart-2/20 text-chart-2",
    hoverBg: "group-hover:bg-chart-2/30",
    items: [
      "I+D y pruebas de estabilidad/seguridad",
      "Produccion y control de calidad",
      "Marketing educativo y demostraciones",
      "Gestion de canales y e-commerce"
    ]
  },
  recursosClave: {
    icon: Gift,
    title: "Recursos Clave",
    color: "bg-chart-3/20 text-chart-3",
    hoverBg: "group-hover:bg-chart-3/30",
    items: [
      "Marca Colgate (reconocimiento y confianza)",
      "Tecnologia de microencapsulacion",
      "Red de distribucion consolidada",
      "Equipo de marketing y trade marketing",
      "Certificaciones regulatorias"
    ]
  },
  propuestaValor: {
    icon: Heart,
    title: "Propuesta de Valor",
    color: "bg-primary/10 text-primary",
    hoverBg: "group-hover:bg-primary/20",
    items: [
      "Primera crema dental con alerta visual de acidez",
      "Hace visible un riesgo invisible",
      "Refuerza habitos de autocuidado en tiempo real",
      "Combina ciencia preventiva + experiencia interactiva",
      "Posicionamiento innovador, educativo y tecnologico"
    ]
  },
  relacionCliente: {
    icon: UserCheck,
    title: "Relacion con el Cliente",
    color: "bg-chart-4/20 text-chart-4",
    hoverBg: "group-hover:bg-chart-4/30",
    items: [
      "Contenido educativo (salud bucal, pH, caries)",
      "Atencion posventa y FAQ web/QR",
      "Alianzas con odontologos e influencers de salud"
    ]
  },
  canales: {
    icon: Store,
    title: "Canales",
    color: "bg-accent/20 text-accent",
    hoverBg: "group-hover:bg-accent/30",
    items: [
      "Grandes superficies: Exito, Jumbo, Olimpica, Alkosto",
      "Droguerias: Cruz Verde, Farmatodo, La Rebaja",
      "Marketplaces: Mercado Libre, Amazon, Rappi",
      "Activaciones: universidades, ferias de salud"
    ]
  },
  segmentoClientes: {
    icon: Users,
    title: "Segmento de Clientes",
    color: "bg-chart-5/20 text-chart-5",
    hoverBg: "group-hover:bg-chart-5/30",
    items: [
      "Primario: Adultos jovenes 18-35 anos",
      "Padres de ninos entre 6-14 anos",
      "Secundario: Consumidores premium/early adopters",
      "Instituciones educativas",
      "Empresas con programas de bienestar"
    ]
  },
  estructuraCostos: {
    icon: Receipt,
    title: "Estructura de Costos",
    color: "bg-destructive/10 text-destructive",
    hoverBg: "group-hover:bg-destructive/20",
    items: [
      "Desarrollo tecnologico y validacion cientifica",
      "Materias primas (microcapsulas + base fluorada)",
      "Produccion y control de calidad",
      "Marketing educativo y lanzamiento",
      "Trade marketing y exhibicion en PDV",
      "Logistica y distribucion",
      "Costos regulatorios y certificaciones"
    ]
  },
  fuentesIngreso: {
    icon: Wallet,
    title: "Fuentes de Ingreso",
    color: "bg-chart-4/20 text-chart-4",
    hoverBg: "group-hover:bg-chart-4/30",
    items: [
      "Venta unitaria retail",
      "Multipacks familiares",
      "Ediciones especiales (kids / whitening)",
      "Canal institucional (kits escolares y corporativos)",
      "E-commerce con modelo de suscripcion"
    ]
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
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

export function BusinessCanvas() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-primary mx-auto mb-6 rounded-full"
          />
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Business Model Canvas
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Modelo de negocio integral para el lanzamiento y escalamiento de Colgate Biolumin en el mercado colombiano.
          </motion.p>
        </motion.div>

        {/* Canvas Grid - Following standard BMC layout */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-5 gap-4"
        >
          {/* Row 1: Partners, Activities, Value Prop, Relationships, Segments */}
          <CanvasCard data={canvasData.sociosClave} className="lg:row-span-2" index={0} />
          
          <div className="lg:col-span-1 space-y-4">
            <CanvasCard data={canvasData.actividadesClave} index={1} />
            <CanvasCard data={canvasData.recursosClave} index={2} />
          </div>
          
          <CanvasCard data={canvasData.propuestaValor} className="lg:row-span-2" index={3} />
          
          <div className="lg:col-span-1 space-y-4">
            <CanvasCard data={canvasData.relacionCliente} index={4} />
            <CanvasCard data={canvasData.canales} index={5} />
          </div>
          
          <CanvasCard data={canvasData.segmentoClientes} className="lg:row-span-2" index={6} />
          
          {/* Row 2: Costs and Revenue */}
          <CanvasCard data={canvasData.estructuraCostos} className="lg:col-span-2" index={7} />
          <CanvasCard data={canvasData.fuentesIngreso} className="lg:col-span-2" index={8} />
        </motion.div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
        >
          {[
            { label: "Disenado para", value: "COLGATE" },
            { label: "Disenado por", value: "GRUPO #2" },
            { label: "Fecha", value: "20-02-26" },
            { label: "Version", value: "#1" }
          ].map((item, index) => (
            <motion.span 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-muted/50 px-4 py-2 rounded-full"
            >
              <strong>{item.label}:</strong> {item.value}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

interface CanvasCardProps {
  data: {
    icon: React.ElementType
    title: string
    color: string
    hoverBg: string
    items: string[]
  }
  className?: string
  index: number
}

function CanvasCard({ data, className = "", index }: CanvasCardProps) {
  const Icon = data.icon
  
  return (
    <motion.div variants={cardVariants}>
      <Card className={`h-full bg-card border-border hover:shadow-lg transition-all duration-300 group overflow-hidden ${className}`}>
        <motion.div
          className={`absolute inset-0 ${data.hoverBg} opacity-0 transition-opacity duration-300`}
        />
        <CardHeader className="pb-3 relative">
          <CardTitle className="flex items-center gap-2 text-base">
            <motion.span 
              className={`p-2 rounded-lg ${data.color} transition-transform duration-300 group-hover:scale-110`}
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-4 h-4" />
            </motion.span>
            <span className="text-foreground">{data.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 relative">
          <ul className="space-y-2">
            {data.items.map((item, itemIndex) => (
              <motion.li 
                key={itemIndex} 
                className="text-sm text-muted-foreground flex items-start gap-2 group/item"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.05 + itemIndex * 0.03 }}
              >
                <motion.span 
                  className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0"
                  whileHover={{ scale: 2, backgroundColor: "var(--primary)" }}
                />
                <span className="group-hover/item:text-foreground transition-colors duration-200">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}
