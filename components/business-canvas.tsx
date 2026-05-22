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
import { SectionHeader } from "@/components/section-header"
import { staggerContainer, popIn, slideFromLeft } from "@/lib/motion-presets"

const canvasData = {
  sociosClave: {
    icon: Handshake,
    title: "Socios Clave",
    color: "bg-primary/10 text-primary",
    hoverBg: "group-hover:bg-primary/20",
    items: [
      "Diana Agrícola: insumos y trazabilidad desde el campo",
      "Inversiones JMH S.A.S.: infraestructura y capital de lanzamiento",
      "Supermercados y canal moderno (Éxito, Jumbo, Oxxo, Ara, D1)",
      "Plataformas delivery: Rappi y Turbo",
      "Proveedores de empaque laminado y tecnología UHT",
      "Campus universitarios para vending y activaciones"
    ]
  },
  actividadesClave: {
    icon: Settings,
    title: "Actividades Clave",
    color: "bg-chart-2/20 text-chart-2",
    hoverBg: "group-hover:bg-chart-2/30",
    items: [
      "Precocción controlada y sellado Steam-Tech",
      "Control de calidad e inocuidad (ISO / HACCP)",
      "Marketing educativo (#Diana90sChallenge)",
      "Gestión omnicanal: retail, conveniencia y e-commerce"
    ]
  },
  recursosClave: {
    icon: Gift,
    title: "Recursos Clave",
    color: "bg-chart-3/20 text-chart-3",
    hoverBg: "group-hover:bg-chart-3/30",
    items: [
      "Marca Diana (+60 años de confianza)",
      "Plantas de procesamiento del Grupo Diana",
      "Red logística Alimentos y Bebidas",
      "Maquinaria de esterilización y sellado de pouches",
      "Equipo técnico agroindustrial y comercial"
    ]
  },
  propuestaValor: {
    icon: Heart,
    title: "Propuesta de Valor",
    color: "bg-primary/10 text-primary",
    hoverBg: "group-hover:bg-primary/20",
    items: [
      "Arroz listo en 90 segundos en microondas",
      "Tecnología Steam-Tech: textura perfecta del grano",
      "Conveniencia sin sacrificar calidad premium",
      "Integración vertical: del campo al pouch",
      "Variantes tradicional y quinua con verduras"
    ]
  },
  relacionCliente: {
    icon: UserCheck,
    title: "Relacion con el Cliente",
    color: "bg-chart-4/20 text-chart-4",
    hoverBg: "group-hover:bg-chart-4/30",
    items: [
      "Contenido educativo sobre ahorro de tiempo",
      "Embajadores de marca en universidades",
      "Campañas en TikTok, Instagram y LinkedIn",
      "Combos con bebidas Glacial del grupo"
    ]
  },
  canales: {
    icon: Store,
    title: "Canales",
    color: "bg-accent/20 text-accent",
    hoverBg: "group-hover:bg-accent/30",
    items: [
      "Grandes superficies y tiendas especializadas",
      "Tiendas de conveniencia (Oxxo, Ara, D1)",
      "Vending en campus universitarios",
      "Rappi / Turbo y tiendas virtuales",
      "Tiendas de barrio en zonas universitarias"
    ]
  },
  segmentoClientes: {
    icon: Users,
    title: "Segmento de Clientes",
    color: "bg-chart-5/20 text-chart-5",
    hoverBg: "group-hover:bg-chart-5/30",
    items: [
      "Jóvenes profesionales (DINKs): rentabilidad y premium",
      "Estudiantes universitarios: volumen y penetración",
      "Hogares unipersonales: porciones exactas",
      "Parejas sin hijos y oficinistas urbanos 18-40 años"
    ]
  },
  estructuraCostos: {
    icon: Receipt,
    title: "Estructura de Costos",
    color: "bg-destructive/10 text-destructive",
    hoverBg: "group-hover:bg-destructive/20",
    items: [
      "Materias primas e insumos de pouch",
      "Maquinaria Steam-Tech y línea UHT",
      "Nómina operativa y calidad",
      "Marketing de lanzamiento y trade",
      "Logística multicanal",
      "Regulatorio INVIMA y certificaciones"
    ]
  },
  fuentesIngreso: {
    icon: Wallet,
    title: "Fuentes de Ingreso",
    color: "bg-chart-4/20 text-chart-4",
    hoverBg: "group-hover:bg-chart-4/30",
    items: [
      "Venta unitaria pouch ($5.500 COP referencia)",
      "Combos 3x4 y bundles con Glacial",
      "Variante premium quinua con verduras",
      "Canal vending institucional",
      "Expansión a 5 ciudades piloto año 1"
    ]
  }
}

const gridStagger = staggerContainer(0.07, 0.1)
const cardPop = popIn

export function BusinessCanvas() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeader
          icon={Heart}
          title="Business Model Canvas"
          iconBoxClassName="bg-primary/15"
          description="Modelo de negocio integral para el lanzamiento de Diana Express en el segmento Ready-to-Eat del mercado colombiano."
        />

        <motion.div 
          ref={ref}
          variants={gridStagger}
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
          variants={slideFromLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
        >
          {[
            { label: "Disenado para", value: "GRUPO DIANA" },
            { label: "Unidad", value: "ALIMENTOS" },
            { label: "Fecha", value: "2026" },
            { label: "Version", value: "PILOTO" }
          ].map((item, index) => (
            <motion.span 
              key={index}
              className="bg-white/90 border border-primary/20 px-4 py-2 rounded-full shadow-sm"
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
    <motion.div variants={cardPop} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
      <Card className={`h-full bg-white/95 border-2 border-border/80 shadow-sm group overflow-hidden ${className}`}>
        <CardHeader className="pb-3 relative">
          <CardTitle className="flex items-center gap-2 text-base">
            <motion.span 
              className={`p-2 rounded-lg ${data.color}`}
              whileHover={{ scale: 1.12 }}
              transition={{ duration: 0.2 }}
            >
              <Icon className="w-4 h-4" />
            </motion.span>
            <span className="text-foreground">{data.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 relative">
          <ul className="space-y-2">
            {data.items.map((item, itemIndex) => (
              <li 
                key={itemIndex} 
                className="text-sm text-muted-foreground flex items-start gap-2 group/item"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span className="group-hover/item:text-foreground transition-colors duration-200">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}
