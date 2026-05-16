"use client"

import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts"
import { TrendingUp, AlertTriangle, Calculator, Info, BarChart3 } from "lucide-react"
import { useRef, useState } from "react"

// Forecast data
const forecast2027 = {
  lineal: [1200000, 300000, 200000, 210000, 420000, 540000, 780000, 670000, 310000, 520000, 420000, 500000],
  suavizado: [1050000, 280000, 190000, 200000, 390000, 500000, 720000, 640000, 290000, 490000, 400000, 470000]
}

const forecast2028 = {
  lineal: [570455, 557636, 544818, 532000, 519182, 506364, 493545, 480727, 467909, 455091, 442273, 429455],
  suavizado: [1050000, 819000, 630300, 501210, 467847, 477493, 550245, 577172, 491020, 490714, 463500, 465450]
}

const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

const chartData2027 = months.map((month, index) => ({
  mes: month,
  lineal: forecast2027.lineal[index],
  suavizado: forecast2027.suavizado[index]
}))

const chartData2028 = months.map((month, index) => ({
  mes: month,
  lineal: forecast2028.lineal[index],
  suavizado: forecast2028.suavizado[index]
}))

// Market context
const marketContext = {
  participacionColgate: 38.2,
  tamanoMercado: 1.6, // billones COP
  precioPromedio: 10000,
  volumenAnual: 60 // millones de tubos
}

function formatValue(value: number) {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  }
  return `$${(value / 1000).toFixed(0)}K`
}

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

export function Forecast() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [activeTab, setActiveTab] = useState("2027")

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
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-16 h-16 rounded-2xl bg-chart-2/10 flex items-center justify-center mx-auto mb-6"
          >
            <BarChart3 className="w-8 h-8 text-chart-2" />
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Pronostico de Ventas
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Proyecciones para 2027 y 2028 usando dos metodos: pronostico lineal y suavizado exponencial.
          </motion.p>
        </motion.div>

        {/* Market Context */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mb-12"
        >
          <Card className="bg-card border-border overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-2 rounded-lg bg-primary/10"
                >
                  <TrendingUp className="w-5 h-5 text-primary" />
                </motion.div>
                Contexto de Mercado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { value: `${marketContext.participacionColgate}%`, label: "Participacion Colgate", sub: "Mercado nacional", color: "text-primary" },
                  { value: `$${marketContext.tamanoMercado}B`, label: "Tamano del sector", sub: "COP anuales", color: "text-foreground" },
                  { value: `$${marketContext.precioPromedio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`, label: "Precio promedio", sub: "COP por unidad", color: "text-foreground" },
                  { value: `${marketContext.volumenAnual}M`, label: "Volumen anual", sub: "Tubos estimados", color: "text-foreground" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="text-center p-4 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                    variants={itemVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <motion.p 
                      className={`text-3xl font-bold ${item.color}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 + index * 0.1 }}
                    >
                      {item.value}
                    </motion.p>
                    <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Methodology note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Alert className="mb-8 border-accent/50 bg-accent/10">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AlertTriangle className="h-4 w-4 text-accent" />
            </motion.div>
            <AlertTitle className="text-foreground">Nota sobre los datos</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Los valores del pronostico estan expresados con simbolo monetario ($). Se recomienda confirmar si representan 
              <strong className="text-foreground"> ingresos proyectados</strong> o <strong className="text-foreground">unidades vendidas</strong>. 
              La visualizacion actual asume valores monetarios.
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Forecast Charts */}
        <Tabs defaultValue="2027" className="space-y-8" onValueChange={setActiveTab}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-muted p-1 rounded-xl">
              <TabsTrigger 
                value="2027" 
                className="data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-lg transition-all"
              >
                Pronostico 2027
              </TabsTrigger>
              <TabsTrigger 
                value="2028" 
                className="data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-lg transition-all"
              >
                Pronostico 2028
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="2027">
            <motion.div 
              className="grid lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={activeTab === "2027" ? "show" : "hidden"}
            >
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <Card className="bg-card border-border h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground">Comparacion de Metodos - 2027</CardTitle>
                    <CardDescription>
                      Pronostico lineal vs suavizado exponencial (a = 0.3)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      className="h-80"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData2027}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                          <XAxis dataKey="mes" stroke="var(--color-muted-foreground)" fontSize={12} />
                          <YAxis 
                            stroke="var(--color-muted-foreground)" 
                            fontSize={12}
                            tickFormatter={(value) => formatValue(value)}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: "var(--color-card)",
                              border: "1px solid var(--color-border)",
                              borderRadius: "8px"
                            }}
                            formatter={(value: number) => [formatValue(value), ""]}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="lineal" 
                            name="Lineal" 
                            stroke="#E31837" 
                            strokeWidth={2}
                            dot={{ fill: "#E31837", strokeWidth: 2 }}
                            animationDuration={2000}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="suavizado" 
                            name="Suavizado Exp." 
                            stroke="#0891b2" 
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={{ fill: "#0891b2", strokeWidth: 2 }}
                            animationDuration={2000}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-card border-border h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground">Metodologia</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <motion.div 
                      className="p-4 bg-primary/10 rounded-lg border border-primary/20"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-foreground">Pronostico Lineal</span>
                      </div>
                      <p className="text-xs font-mono text-muted-foreground mb-2">Yt = a + b*t</p>
                      <p className="text-sm text-muted-foreground">Proyeccion basada en tendencia lineal historica.</p>
                    </motion.div>

                    <motion.div 
                      className="p-4 bg-accent/10 rounded-lg border border-accent/20"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator className="w-4 h-4 text-accent" />
                        <span className="font-semibold text-foreground">Suavizado Exponencial</span>
                      </div>
                      <p className="text-xs font-mono text-muted-foreground mb-2">Ft+1 = aYt + (1-a)Ft</p>
                      <p className="text-sm text-muted-foreground">a = 0.3 - Mayor peso a datos recientes.</p>
                    </motion.div>

                    <motion.div 
                      className="pt-4 border-t border-border"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">Total Lineal 2027:</strong>
                        <br />
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          {formatValue(forecast2027.lineal.reduce((a, b) => a + b, 0))}
                        </motion.span>
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        <strong className="text-foreground">Total Suavizado 2027:</strong>
                        <br />
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                          {formatValue(forecast2027.suavizado.reduce((a, b) => a + b, 0))}
                        </motion.span>
                      </p>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="2028">
            <motion.div 
              className="grid lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={activeTab === "2028" ? "show" : "hidden"}
            >
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <Card className="bg-card border-border h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground">Comparacion de Metodos - 2028</CardTitle>
                    <CardDescription>
                      Pronostico lineal vs suavizado exponencial (a = 0.3)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      className="h-80"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData2028}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                          <XAxis dataKey="mes" stroke="var(--color-muted-foreground)" fontSize={12} />
                          <YAxis 
                            stroke="var(--color-muted-foreground)" 
                            fontSize={12}
                            tickFormatter={(value) => formatValue(value)}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: "var(--color-card)",
                              border: "1px solid var(--color-border)",
                              borderRadius: "8px"
                            }}
                            formatter={(value: number) => [formatValue(value), ""]}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="lineal" 
                            name="Lineal" 
                            stroke="#E31837" 
                            strokeWidth={2}
                            dot={{ fill: "#E31837", strokeWidth: 2 }}
                            animationDuration={2000}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="suavizado" 
                            name="Suavizado Exp." 
                            stroke="#0891b2" 
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={{ fill: "#0891b2", strokeWidth: 2 }}
                            animationDuration={2000}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-card border-border h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground">Analisis 2028</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert className="border-primary/50 bg-primary/5">
                      <Info className="h-4 w-4 text-primary" />
                      <AlertDescription className="text-sm text-muted-foreground">
                        El modelo lineal muestra tendencia decreciente mientras que el suavizado exponencial estabiliza valores.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <motion.div 
                        className="p-4 bg-muted/50 rounded-lg"
                        whileHover={{ scale: 1.02 }}
                      >
                        <p className="text-sm text-muted-foreground">Total Lineal 2028</p>
                        <motion.p 
                          className="text-2xl font-bold text-foreground"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.3 }}
                        >
                          {formatValue(forecast2028.lineal.reduce((a, b) => a + b, 0))}
                        </motion.p>
                        <Badge variant="destructive" className="mt-2 text-xs">
                          Tendencia decreciente
                        </Badge>
                      </motion.div>

                      <motion.div 
                        className="p-4 bg-accent/10 rounded-lg border border-accent/20"
                        whileHover={{ scale: 1.02 }}
                      >
                        <p className="text-sm text-muted-foreground">Total Suavizado 2028</p>
                        <motion.p 
                          className="text-2xl font-bold text-accent"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.4 }}
                        >
                          {formatValue(forecast2028.suavizado.reduce((a, b) => a + b, 0))}
                        </motion.p>
                        <Badge className="mt-2 text-xs bg-accent text-accent-foreground">
                          Mas estable
                        </Badge>
                      </motion.div>
                    </div>

                    <motion.p 
                      className="text-xs text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Se recomienda el modelo de suavizado exponencial para proyecciones a mediano plazo dado que captura mejor la volatilidad del mercado.
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
