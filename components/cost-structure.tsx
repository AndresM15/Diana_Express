"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Package, Factory, Users, DollarSign, Calculator } from "lucide-react"

// Cost data
const materialsCost = {
  total: 1395.625,
  items: [
    { name: "Agua purificada", cost: 44, unit: "COP/unidad" },
    { name: "Carbonato de calcio", cost: 144, unit: "COP/unidad" },
    { name: "Sílice hidratada", cost: 153, unit: "COP/unidad" },
    { name: "Glicerina", cost: 131.25, unit: "COP/unidad" },
    { name: "Indicador encapsulado de pH", cost: 93.375, unit: "COP/unidad" },
    { name: "Tubo plástico laminado 90g", cost: 498, unit: "COP/unidad" },
    { name: "Caja plegadiza de cartón", cost: 332, unit: "COP/unidad" }
  ]
}

const tangibleAssets = {
  totalInversion: 91000000,
  costoMensual: 882500,
  items: [
    "Tanque mezclador industrial",
    "Homogeneizador",
    "Llenadora semiautomática de tubos",
    "Selladora de tubos",
    "Etiquetadora semiautomática",
    "Balanza industrial y mesa de pesaje",
    "Kit utensilios sanitarios y recipientes",
    "Acondicionamiento de área productiva"
  ]
}

const intangibleAssets = {
  totalInversion: 25100000,
  costoMensual: 1240833.33,
  items: [
    "Desarrollo de formulación y estabilidad",
    "ERP / control de inventarios y trazabilidad",
    "Diseño gráfico y etiquetado",
    "Registro de marca",
    "Documentación BPM y POES",
    "Gestión regulatoria y soporte INVIMA"
  ]
}

const payroll = {
  totalPersonas: 7,
  costoMensual: 20084616.28,
  smmlv2026: 1750905,
  auxTransporte: 249095,
  roles: [
    "Químico formulador / Director técnico",
    "Supervisor de producción",
    "Analista de calidad",
    "Operarios de producción (x3)",
    "Auxiliar de empaque",
    "Técnico de mantenimiento"
  ]
}

const usdReferences = [
  { item: "Base de crema dental con flúor", cantidad: "10,000 kg", precioUSD: 4, unidad: "USD/kg" },
  { item: "Indicador de pH", cantidad: "200 kg", precioUSD: 45, unidad: "USD/kg" },
  { item: "Tubos plásticos laminados", cantidad: "500,000 unid", precioUSD: 0.12, unidad: "USD/unidad" },
  { item: "Tapas plásticas", cantidad: "500,000 unid", precioUSD: 0.03, unidad: "USD/unidad" },
  { item: "Empaques secundarios", cantidad: "500,000 unid", precioUSD: 0.08, unidad: "USD/unidad" },
  { item: "Diseño gráfico y etiquetado", cantidad: "1 proyecto", precioUSD: 8000, unidad: "USD/proyecto" },
  { item: "Distribución y logística", cantidad: "Por unidad", precioUSD: 0.20, unidad: "USD/unidad" }
]

function formatCOP(value: number) {
  // Manual formatting to avoid hydration mismatch between server/client locales
  const rounded = Math.round(value)
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `$ ${formatted}`
}

export function CostStructure() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Estructura de Costos
          </h2>
          <p className="text-lg text-muted-foreground">
            Desglose detallado de la inversión inicial, costos operativos mensuales y materiales por unidad producida (base 90g).
          </p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card border-border text-center">
              <CardContent className="pt-6">
                <Package className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Costo materiales/unidad</p>
                <p className="text-2xl font-bold text-foreground">{formatCOP(materialsCost.total)}</p>
                <Badge variant="secondary" className="mt-2">Por unidad</Badge>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-card border-border text-center">
              <CardContent className="pt-6">
                <Factory className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Inversión tangible</p>
                <p className="text-2xl font-bold text-foreground">{formatCOP(tangibleAssets.totalInversion)}</p>
                <Badge variant="secondary" className="mt-2">CAPEX</Badge>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card border-border text-center">
              <CardContent className="pt-6">
                <Calculator className="w-8 h-8 text-chart-3 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Inversión intangible</p>
                <p className="text-2xl font-bold text-foreground">{formatCOP(intangibleAssets.totalInversion)}</p>
                <Badge variant="secondary" className="mt-2">CAPEX</Badge>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-card border-border text-center">
              <CardContent className="pt-6">
                <Users className="w-8 h-8 text-chart-4 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Nómina mensual</p>
                <p className="text-2xl font-bold text-foreground">{formatCOP(payroll.costoMensual)}</p>
                <Badge variant="secondary" className="mt-2">{payroll.totalPersonas} personas</Badge>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Detailed breakdown */}
        <Tabs defaultValue="materiales" className="space-y-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 bg-muted">
            <TabsTrigger value="materiales" className="data-[state=active]:bg-card data-[state=active]:text-foreground">Materiales</TabsTrigger>
            <TabsTrigger value="tangibles" className="data-[state=active]:bg-card data-[state=active]:text-foreground">Tangibles</TabsTrigger>
            <TabsTrigger value="intangibles" className="data-[state=active]:bg-card data-[state=active]:text-foreground">Intangibles</TabsTrigger>
            <TabsTrigger value="nomina" className="data-[state=active]:bg-card data-[state=active]:text-foreground">Nómina</TabsTrigger>
          </TabsList>

          <TabsContent value="materiales">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Package className="w-5 h-5 text-primary" />
                  Materiales Directos por Unidad (90g)
                </CardTitle>
                <CardDescription>
                  Costo desglosado de cada componente del producto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Material</TableHead>
                      <TableHead className="text-right text-muted-foreground">Costo (COP)</TableHead>
                      <TableHead className="text-right text-muted-foreground">% del Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {materialsCost.items.map((item, index) => (
                      <TableRow key={index} className="border-border">
                        <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                        <TableCell className="text-right text-foreground">{formatCOP(item.cost)}</TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {((item.cost / materialsCost.total) * 100).toFixed(1)}%
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-border bg-muted/50">
                      <TableCell className="font-bold text-foreground">TOTAL</TableCell>
                      <TableCell className="text-right font-bold text-primary">{formatCOP(materialsCost.total)}</TableCell>
                      <TableCell className="text-right font-bold text-foreground">100%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Nota:</strong> El empaque (tubo + caja) representa el{' '}
                    <strong className="text-primary">59.5%</strong> del costo total de materiales.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tangibles">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Factory className="w-5 h-5 text-accent" />
                  Recursos Tangibles
                </CardTitle>
                <CardDescription>
                  Equipos e infraestructura de producción
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4 text-foreground">Equipos de Producción</h4>
                    <ul className="space-y-2">
                      {tangibleAssets.items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-2 h-2 rounded-full bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div className="p-6 bg-muted/50 rounded-xl">
                      <p className="text-sm text-muted-foreground">Inversión Total (CAPEX)</p>
                      <p className="text-3xl font-bold text-foreground mt-2">{formatCOP(tangibleAssets.totalInversion)}</p>
                    </div>
                    <div className="p-6 bg-accent/10 rounded-xl border border-accent/20">
                      <p className="text-sm text-muted-foreground">Costo Mensual Equivalente</p>
                      <p className="text-3xl font-bold text-accent mt-2">{formatCOP(tangibleAssets.costoMensual)}</p>
                      <p className="text-xs text-muted-foreground mt-2">Depreciación/amortización</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="intangibles">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Calculator className="w-5 h-5 text-chart-3" />
                  Recursos Intangibles
                </CardTitle>
                <CardDescription>
                  Desarrollo, certificaciones y propiedad intelectual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4 text-foreground">Inversiones Intangibles</h4>
                    <ul className="space-y-2">
                      {intangibleAssets.items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-2 h-2 rounded-full bg-chart-3" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div className="p-6 bg-muted/50 rounded-xl">
                      <p className="text-sm text-muted-foreground">Inversión Total (CAPEX)</p>
                      <p className="text-3xl font-bold text-foreground mt-2">{formatCOP(intangibleAssets.totalInversion)}</p>
                    </div>
                    <div className="p-6 bg-chart-3/10 rounded-xl border border-chart-3/20">
                      <p className="text-sm text-muted-foreground">Costo Mensual Equivalente</p>
                      <p className="text-3xl font-bold text-chart-3 mt-2">{formatCOP(intangibleAssets.costoMensual)}</p>
                      <p className="text-xs text-muted-foreground mt-2">Amortización intangibles</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nomina">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Users className="w-5 h-5 text-chart-4" />
                  Nómina Mensual del Proceso
                </CardTitle>
                <CardDescription>
                  Equipo de producción y control de calidad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4 text-foreground">Roles del Equipo ({payroll.totalPersonas} personas)</h4>
                    <ul className="space-y-2">
                      {payroll.roles.map((role, index) => (
                        <li key={index} className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-2 h-2 rounded-full bg-chart-4" />
                          {role}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div className="p-6 bg-chart-4/10 rounded-xl border border-chart-4/20">
                      <p className="text-sm text-muted-foreground">Costo Total Nómina Mensual</p>
                      <p className="text-3xl font-bold text-chart-4 mt-2">{formatCOP(payroll.costoMensual)}</p>
                      <p className="text-xs text-muted-foreground mt-2">Incluye prestaciones y aportes</p>
                    </div>
                    
                    <Accordion type="single" collapsible className="bg-muted/50 rounded-lg">
                      <AccordionItem value="supuestos" className="border-none">
                        <AccordionTrigger className="px-4 text-sm text-foreground">
                          Supuestos de Nómina 2026
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
                          <div className="space-y-2">
                            <p><strong>SMMLV 2026:</strong> {formatCOP(payroll.smmlv2026)}</p>
                            <p><strong>Auxilio de transporte:</strong> {formatCOP(payroll.auxTransporte)}</p>
                            <p className="text-xs mt-2">Se calculan prestaciones, vacaciones y aportes del empleador. Ajuste automático al SMMLV cuando el salario está por debajo.</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* USD Reference Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <DollarSign className="w-5 h-5 text-chart-4" />
                Referencia de Insumos (USD)
              </CardTitle>
              <CardDescription>
                Precios de referencia internacional para planificación de compras
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Insumo</TableHead>
                      <TableHead className="text-muted-foreground">Cantidad</TableHead>
                      <TableHead className="text-right text-muted-foreground">Precio USD</TableHead>
                      <TableHead className="text-right text-muted-foreground">Unidad</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usdReferences.map((item, index) => (
                      <TableRow key={index} className="border-border">
                        <TableCell className="font-medium text-foreground">{item.item}</TableCell>
                        <TableCell className="text-muted-foreground">{item.cantidad}</TableCell>
                        <TableCell className="text-right text-foreground">${item.precioUSD}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{item.unidad}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                <strong>Nota:</strong> Los valores en USD requieren conversión usando TRM vigente al momento de la compra.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
