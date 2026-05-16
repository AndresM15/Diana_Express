"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X, Calculator, Code, FileText, Link2, DollarSign, AlertTriangle, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface FormulaDefinition {
  id: string
  name: string
  formulaExcel: string
  formulaHuman: string
  inputs: { name: string; value: string; source: string }[]
  result: string
  sheet: string
  usesTRM: boolean
  usesBenchmark: boolean
  dependencies: string[]
  businessExplanation: string
}

const formulaDefinitions: Record<string, FormulaDefinition> = {
  'material-total': {
    id: 'material-total',
    name: 'Costo Total de Materiales por Unidad',
    formulaExcel: '=SUM(H9:H15)',
    formulaHuman: 'costo_materiales = suma(costo_por_unidad de cada material)',
    inputs: [
      { name: 'Agua purificada', value: '44 COP', source: 'Hoja Materiales' },
      { name: 'Carbonato de calcio', value: '144 COP', source: 'Hoja Materiales' },
      { name: 'Sílice hidratada', value: '153 COP', source: 'Hoja Materiales' },
      { name: 'Glicerina', value: '131,25 COP', source: 'Hoja Materiales' },
      { name: 'Indicador pH', value: '93,375 COP', source: 'Hoja Materiales' },
      { name: 'Tubo plástico', value: '498 COP', source: 'Hoja Materiales' },
      { name: 'Caja plegadiza', value: '332 COP', source: 'Hoja Materiales' }
    ],
    result: '1.395,625 COP',
    sheet: 'Materiales y Empaque',
    usesTRM: true,
    usesBenchmark: true,
    dependencies: ['costo-unitario-material', 'cantidad-por-unidad'],
    businessExplanation: 'Representa el costo directo de materiales e insumos para producir una unidad de crema dental BIOLUMIN de 90g. Incluye materias primas y empaque.'
  },
  'tangible-total': {
    id: 'tangible-total',
    name: 'Inversión Tangible Total (CAPEX)',
    formulaExcel: '=SUM(E4:E11)',
    formulaHuman: 'inversion_tangible = suma(costo_total de cada recurso tangible)',
    inputs: [
      { name: 'Tanque mezclador', value: '18.000.000 COP', source: 'Hoja Tangibles' },
      { name: 'Homogeneizador', value: '12.000.000 COP', source: 'Hoja Tangibles' },
      { name: 'Llenadora tubos', value: '24.000.000 COP', source: 'Hoja Tangibles' },
      { name: 'Selladora tubos', value: '7.500.000 COP', source: 'Hoja Tangibles' },
      { name: 'Etiquetadora', value: '6.500.000 COP', source: 'Hoja Tangibles' },
      { name: 'Balanza y mesa', value: '1.200.000 COP', source: 'Hoja Tangibles' },
      { name: 'Kit utensilios', value: '1.800.000 COP', source: 'Hoja Tangibles' },
      { name: 'Área productiva', value: '20.000.000 COP', source: 'Hoja Tangibles' }
    ],
    result: '91.000.000 COP',
    sheet: 'CAPEX Tangible',
    usesTRM: true,
    usesBenchmark: false,
    dependencies: ['cantidad-recurso', 'costo-unitario-recurso'],
    businessExplanation: 'Inversión inicial en maquinaria, equipos, herramientas e infraestructura necesaria para la producción. Se deprecia a lo largo de la vida útil de cada activo.'
  },
  'tangible-mensual': {
    id: 'tangible-mensual',
    name: 'Costo Mensual Equivalente Tangibles',
    formulaExcel: '=SUM(G4:G11)',
    formulaHuman: 'costo_mensual_tangibles = suma(costo_total / (vida_util_anos * 12))',
    inputs: [
      { name: 'Tanque mezclador', value: '187.500 COP/mes', source: 'Calculado' },
      { name: 'Homogeneizador', value: '125.000 COP/mes', source: 'Calculado' },
      { name: 'Llenadora tubos', value: '200.000 COP/mes', source: 'Calculado' },
      { name: 'Otros equipos', value: '370.000 COP/mes', source: 'Calculado' }
    ],
    result: '882.500 COP',
    sheet: 'CAPEX Tangible',
    usesTRM: true,
    usesBenchmark: false,
    dependencies: ['tangible-total', 'vida-util'],
    businessExplanation: 'Distribución lineal del CAPEX tangible en el tiempo. Permite estimar el costo mensual de depreciación para análisis de punto de equilibrio.'
  },
  'intangible-total': {
    id: 'intangible-total',
    name: 'Inversión Intangible Total',
    formulaExcel: '=SUM(D4:D9)',
    formulaHuman: 'inversion_intangible = suma(costo_estimado de cada recurso intangible)',
    inputs: [
      { name: 'Formulación', value: '8.000.000 COP', source: 'Hoja Intangibles' },
      { name: 'ERP/Software', value: '2.400.000 COP', source: 'Hoja Intangibles' },
      { name: 'Diseño gráfico', value: '3.000.000 COP', source: 'Hoja Intangibles' },
      { name: 'Registro marca', value: '1.200.000 COP', source: 'Hoja Intangibles' },
      { name: 'Documentación BPM', value: '4.500.000 COP', source: 'Hoja Intangibles' },
      { name: 'Gestión INVIMA', value: '6.000.000 COP', source: 'Hoja Intangibles' }
    ],
    result: '25.100.000 COP',
    sheet: 'Recursos Intangibles',
    usesTRM: true,
    usesBenchmark: true,
    dependencies: ['costo-estimado-intangible'],
    businessExplanation: 'Inversión en conocimiento técnico, software, licencias y procesos regulatorios necesarios para operar legalmente y con calidad.'
  },
  'payroll-total': {
    id: 'payroll-total',
    name: 'Costo Empresa Nómina Mensual',
    formulaExcel: '=SUM(M9:M14)',
    formulaHuman: 'costo_empresa_total = suma(nomina_directa + prestaciones + aportes por cargo)',
    inputs: [
      { name: 'Químico formulador', value: '3.230.606,86 COP', source: 'Calculado' },
      { name: 'Supervisor producción', value: '2.955.241,52 COP', source: 'Calculado' },
      { name: 'Analista calidad', value: '3.036.810,85 COP', source: 'Calculado' },
      { name: 'Operario (x2)', value: '5.430.978,53 COP', source: 'Calculado' },
      { name: 'Auxiliar empaque', value: '2.715.489,26 COP', source: 'Calculado' },
      { name: 'Técnico mantenimiento', value: '2.715.489,26 COP', source: 'Calculado' }
    ],
    result: '20.084.616,28 COP',
    sheet: 'Nómina y Costo Empresa',
    usesTRM: true,
    usesBenchmark: false,
    dependencies: ['salario-aplicado', 'auxilio', 'prestaciones', 'aportes'],
    businessExplanation: 'Costo total mensual que representa el equipo de 7 personas para la operación. Incluye salarios, prestaciones sociales y aportes del empleador según normatividad colombiana 2026.'
  },
  'salario-aplicado': {
    id: 'salario-aplicado',
    name: 'Salario Aplicado',
    formulaExcel: '=MAX(D9,$B$4)',
    formulaHuman: 'salario_aplicado = max(salario_referencia, SMMLV)',
    inputs: [
      { name: 'Salario referencia', value: 'Variable por cargo', source: 'Indeed/Computrabajo' },
      { name: 'SMMLV 2026', value: '1.750.905 COP', source: 'Parámetro global' }
    ],
    result: 'Mayor entre referencia y SMMLV',
    sheet: 'Nómina y Costo Empresa',
    usesTRM: false,
    usesBenchmark: true,
    dependencies: ['smmlv'],
    businessExplanation: 'Garantiza que ningún salario sea inferior al mínimo legal vigente, ajustando automáticamente cargos con referencia de mercado por debajo del SMMLV.'
  },
  'auxilio-transporte': {
    id: 'auxilio-transporte',
    name: 'Auxilio de Transporte',
    formulaExcel: '=IF(E9<=2*$B$4,B9*$B$5,0)',
    formulaHuman: 'auxilio = si salario_aplicado <= 2*SMMLV, entonces personas * auxilio_transporte; si no, 0',
    inputs: [
      { name: 'Umbral 2 SMMLV', value: '3.501.810 COP', source: 'Calculado' },
      { name: 'Auxilio 2026', value: '249.095 COP', source: 'Parámetro global' }
    ],
    result: 'Aplica si salario <= umbral',
    sheet: 'Nómina y Costo Empresa',
    usesTRM: false,
    usesBenchmark: false,
    dependencies: ['smmlv', 'auxilio-base'],
    businessExplanation: 'Beneficio legal para trabajadores con salario hasta 2 SMMLV. No constituye salario pero sí base para liquidar prestaciones.'
  },
  'aportes-empleador': {
    id: 'aportes-empleador',
    name: 'Aportes del Empleador',
    formulaExcel: '=B9*E9*(12%+4%+0.522%+IF($B$6="Sí",0,8.5%+2%+3%))',
    formulaHuman: 'aportes = personas * salario_aplicado * (pensión + caja + ARL + exoneración)',
    inputs: [
      { name: 'Pensión empleador', value: '12%', source: 'Normativo' },
      { name: 'Caja compensación', value: '4%', source: 'Normativo' },
      { name: 'ARL Clase I', value: '0,522%', source: 'Normativo' },
      { name: 'Si NO exonerada:', value: '+13,5%', source: 'Salud+SENA+ICBF' }
    ],
    result: 'Variable según exoneración',
    sheet: 'Nómina y Costo Empresa',
    usesTRM: false,
    usesBenchmark: false,
    dependencies: ['salario-aplicado', 'empresa-exonerada'],
    businessExplanation: 'Contribuciones obligatorias del empleador al sistema de seguridad social. Si la empresa está exonerada (Ley 1607), no paga salud (8.5%), SENA (2%) ni ICBF (3%).'
  },
  'valuation-weighted': {
    id: 'valuation-weighted',
    name: 'Promedio Ponderado de Viabilidad',
    formulaExcel: '=SUMPRODUCT(B3:B7,C3:C7)',
    formulaHuman: 'promedio_ponderado = suma(ponderacion * puntuacion por factor)',
    inputs: [
      { name: 'Competencia', value: '0.30 × 5 = 1.50', source: 'Valoración' },
      { name: 'Innovación', value: '0.25 × 4 = 1.00', source: 'Valoración' },
      { name: 'Tendencia', value: '0.20 × 5 = 1.00', source: 'Valoración' },
      { name: 'Recursos', value: '0.15 × 5 = 0.75', source: 'Valoración' },
      { name: 'Rentabilidad', value: '0.10 × 4 = 0.40', source: 'Valoración' }
    ],
    result: '4,65 / 5',
    sheet: 'Promedio Ponderado',
    usesTRM: false,
    usesBenchmark: false,
    dependencies: ['ponderacion-factor', 'puntuacion-factor'],
    businessExplanation: 'Indica la viabilidad global del proyecto. Un resultado de 4.65/5 señala alta viabilidad, sustentada en competencia técnica, recursos disponibles y alineación con tendencias de prevención.'
  }
}

interface FormulaPanelProps {
  formulaId: string | null
  onClose: () => void
}

export function FormulaPanel({ formulaId, onClose }: FormulaPanelProps) {
  const formula = formulaId ? formulaDefinitions[formulaId] : null

  return (
    <AnimatePresence>
      {formula && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l shadow-2xl z-50 overflow-y-auto"
        >
          <Card className="h-full rounded-none border-0">
            <CardHeader className="sticky top-0 bg-background z-10 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">Inspector de Fórmula</CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Formula Name */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">{formula.name}</h3>
                <Badge variant="outline" className="text-xs">
                  <FileText className="w-3 h-3 mr-1" />
                  {formula.sheet}
                </Badge>
              </div>

              <Separator />

              {/* Formula Excel */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium text-muted-foreground">Fórmula Excel</span>
                </div>
                <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                  {formula.formulaExcel}
                </div>
              </div>

              {/* Formula Human */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-muted-foreground">Fórmula en Lenguaje Humano</span>
                </div>
                <div className="bg-blue-500/5 border border-blue-500/20 p-3 rounded-lg text-sm">
                  {formula.formulaHuman}
                </div>
              </div>

              {/* Inputs */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Link2 className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-muted-foreground">Inputs Utilizados</span>
                </div>
                <div className="space-y-2">
                  {formula.inputs.map((input, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-muted/50 p-2 rounded-md text-sm">
                      <span className="text-muted-foreground">{input.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{input.value}</span>
                        <Badge variant="outline" className="text-xs">{input.source}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Result */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Resultado</span>
                </div>
                <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                  <span className="text-2xl font-bold text-primary">{formula.result}</span>
                </div>
              </div>

              <Separator />

              {/* Metadata */}
              <div className="flex flex-wrap gap-2">
                {formula.usesTRM && (
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                    <DollarSign className="w-3 h-3 mr-1" />
                    Usa TRM
                  </Badge>
                )}
                {formula.usesBenchmark && (
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-500/30">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Usa Benchmark
                  </Badge>
                )}
              </div>

              {/* Dependencies */}
              {formula.dependencies.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Link2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Dependencias</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formula.dependencies.map((dep) => (
                      <Badge key={dep} variant="secondary" className="text-xs">
                        {dep}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Business Explanation */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Explicación de Negocio</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {formula.businessExplanation}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
