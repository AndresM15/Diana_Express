"use client"

import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts"
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react"
import { useRef, useState } from "react"
import { SectionHeader } from "@/components/section-header"
import { staggerContainer, riseBounce, popIn } from "@/lib/motion-presets"

// Data for willingness to pay
const willingnessData = [
  { range: "$4K-5K", respuestas: 52, fill: "var(--color-chart-3)" },
  { range: "$5K-6K", respuestas: 118, fill: "var(--color-chart-1)" },
  { range: "$6K+", respuestas: 64, fill: "var(--color-chart-2)" }
]

// Purchase decision factors
const factorsData = [
  { factor: "Conveniencia", valor: 142, fill: "var(--color-chart-1)" },
  { factor: "Calidad", valor: 98, fill: "var(--color-chart-2)" },
  { factor: "Marca Diana", valor: 76, fill: "var(--color-chart-3)" },
  { factor: "Precio", valor: 54, fill: "var(--color-chart-4)" },
  { factor: "Nutricion", valor: 41, fill: "var(--color-chart-5)" }
]

// Age segmentation data
const ageData = [
  { edad: "<18", si: 12, talVez: 0, no: 1 },
  { edad: "18-25", si: 89, talVez: 16, no: 11 },
  { edad: "26-35", si: 33, talVez: 7, no: 0 },
  { edad: ">35", si: 35, talVez: 12, no: 2 }
]

// Interest distribution for pie chart
const interestPie = [
  { name: "Si", value: 78, fill: "#E30613" },
  { name: "Tal vez", value: 14, fill: "#003DA5" },
  { name: "No", value: 8, fill: "#94a3b8" }
]

const gridStagger = staggerContainer(0.12, 0.18)
const cardRise = riseBounce
const tabPop = popIn

export function MarketCharts() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [activeTab, setActiveTab] = useState("precio")

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeader
          icon={TrendingUp}
          title="Analisis de Mercado"
          lightOnDark
          iconClassName="text-white"
          iconBoxClassName="bg-white/15"
          description="Segmentacion Grupo Diana: estudiantes, jovenes profesionales y hogares unipersonales en mercado Ready-to-Eat."
        />

        <Tabs defaultValue="precio" className="space-y-8" onValueChange={setActiveTab}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-muted p-1 rounded-xl">
              {[
                { value: "precio", icon: DollarSign, label: "Precio" },
                { value: "factores", icon: ShoppingCart, label: "Factores" },
                { value: "segmentos", icon: Users, label: "Segmentos" }
              ].map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-lg transition-all"
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          {/* Willingness to Pay */}
          <TabsContent value="precio">
            <motion.div 
              ref={ref}
              variants={gridStagger}
              initial="hidden"
              animate={isInView && activeTab === "precio" ? "show" : "hidden"}
              className="grid lg:grid-cols-2 gap-8"
            >
              <motion.div variants={cardRise}>
                <Card className="bg-card border-border h-full hover:shadow-xl transition-shadow duration-300 group">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        className="p-2 rounded-lg bg-primary/10"
                      >
                        <DollarSign className="w-5 h-5 text-primary" />
                      </motion.div>
                      Disposicion de Pago
                    </CardTitle>
                    <CardDescription>
                      Distribucion de respuestas por rango de precio (COP)
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
                        <BarChart data={willingnessData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                          <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} />
                          <YAxis dataKey="range" type="category" stroke="var(--color-muted-foreground)" fontSize={12} width={80} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: "var(--color-card)",
                              border: "1px solid var(--color-border)",
                              borderRadius: "8px"
                            }}
                            labelStyle={{ color: "var(--color-foreground)" }}
                          />
                          <Bar dataKey="respuestas" radius={[0, 4, 4, 0]} animationDuration={1500} />
                        </BarChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={cardRise}>
                <Card className="bg-card border-border h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground">Insight de Precio</CardTitle>
                    <CardDescription>
                      Analisis del rango de precio optimo
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <motion.div 
                      className="p-6 bg-primary/10 rounded-xl border border-primary/20 relative overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                      <p className="text-sm text-muted-foreground mb-2 relative">Rango preferido</p>
                      <motion.p 
                        className="text-3xl font-bold text-primary relative"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.3 }}
                      >
                        $4.500COP
                      </motion.p>
                      <p className="text-sm text-muted-foreground mt-2 relative">39 respuestas (34.5%)</p>
                    </motion.div>
                    
                    <div className="space-y-4">
                      {[
                        { range: "$7.000COP", count: "6 (5.3%)", highlight: false },
                        { range: "$5.500COP", count: "28 (24.8%)", highlight: true },
                        { range: "$3.500COP", count: "40 (35.4%)", highlight: false }
                      ].map((item, index) => (
                        <motion.div 
                          key={index}
                          className={`flex justify-between items-center p-3 rounded-lg ${
                            item.highlight 
                              ? "bg-primary/5 border border-primary/20" 
                              : "bg-muted/50"
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <span className={item.highlight ? "text-foreground font-medium" : "text-muted-foreground"}>
                            {item.range}
                          </span>
                          <span className={item.highlight ? "font-bold text-primary" : "font-semibold text-foreground"}>
                            {item.count}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Purchase Factors */}
          <TabsContent value="factores">
            <motion.div 
              variants={gridStagger}
              initial="hidden"
              animate={activeTab === "factores" ? "show" : "hidden"}
              className="grid lg:grid-cols-2 gap-8"
            >
              <motion.div variants={cardRise}>
                <Card className="bg-card border-border h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="p-2 rounded-lg bg-chart-2/10"
                      >
                        <ShoppingCart className="w-5 h-5 text-chart-2" />
                      </motion.div>
                      Factores de Decision de Compra
                    </CardTitle>
                    <CardDescription>
                      Que influye mas en la decision de compra?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      className="h-80"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={factorsData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                          <XAxis dataKey="factor" stroke="var(--color-muted-foreground)" fontSize={11} angle={-15} textAnchor="end" height={60} />
                          <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: "var(--color-card)",
                              border: "1px solid var(--color-border)",
                              borderRadius: "8px"
                            }}
                          />
                          <Bar dataKey="valor" radius={[4, 4, 0, 0]} animationDuration={1500} />
                        </BarChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={cardRise}>
                <Card className="bg-card border-border h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground">Distribucion de Interes</CardTitle>
                    <CardDescription>
                      Respuestas totales por categoria
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      className="h-80"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={interestPie}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                            animationDuration={1500}
                          >
                            {interestPie.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Legend />
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Age Segmentation */}
          <TabsContent value="segmentos">
            <motion.div
              variants={gridStagger}
              initial="hidden"
              animate={activeTab === "segmentos" ? "show" : "hidden"}
            >
              <motion.div variants={cardRise}>
                <Card className="bg-card border-border hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="p-2 rounded-lg bg-chart-4/10"
                      >
                        <Users className="w-5 h-5 text-chart-4" />
                      </motion.div>
                      Segmentacion por Edad
                    </CardTitle>
                    <CardDescription>
                      Distribucion de interes segun grupo etario
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      className="h-96"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ageData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                          <XAxis dataKey="edad" stroke="var(--color-muted-foreground)" fontSize={12} />
                          <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: "var(--color-card)",
                              border: "1px solid var(--color-border)",
                              borderRadius: "8px"
                            }}
                          />
                          <Legend />
                          <Bar dataKey="si" name="Si" fill="#E30613" radius={[4, 4, 0, 0]} animationDuration={1500} />
                          <Bar dataKey="talVez" name="Tal vez" fill="#0891b2" radius={[4, 4, 0, 0]} animationDuration={1500} />
                          <Bar dataKey="no" name="No" fill="#94a3b8" radius={[4, 4, 0, 0]} animationDuration={1500} />
                        </BarChart>
                      </ResponsiveContainer>
                    </motion.div>

                    {/* Age insights */}
                    <motion.div 
                      className="grid md:grid-cols-4 gap-4 mt-8"
                      variants={gridStagger}
                      initial="hidden"
                      animate="show"
                    >
                      {ageData.map((group, index) => {
                        const total = group.si + group.talVez + group.no
                        const acceptance = ((group.si + group.talVez) / total * 100).toFixed(1)
                        return (
                          <motion.div 
                            key={index} 
                            className="p-4 bg-muted/50 rounded-lg text-center hover:bg-muted/80 transition-colors cursor-pointer"
                            variants={cardRise}
                            whileHover={{ scale: 1.03 }}
                          >
                            <p className="text-lg font-semibold text-foreground">{group.edad} anos</p>
                            <motion.p 
                              className="text-2xl font-bold text-primary mt-2"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", delay: 0.3 + index * 0.1 }}
                            >
                              {acceptance}%
                            </motion.p>
                            <p className="text-xs text-muted-foreground">aceptacion</p>
                            <p className="text-xs text-muted-foreground mt-1">{total} respuestas</p>
                          </motion.div>
                        )
                      })}
                    </motion.div>
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
