// Data Store with all Excel data and calculation logic

import type { Material, TangibleAsset, IntangibleAsset, PayrollRole, ValuationFactor, SegmentationStep } from './data-types'

// Initial materials data
export const initialMaterials: Material[] = [
  {
    material: 'Arroz precocido premium',
    clasificacion: 'Materia prima',
    unidad: 'g',
    cantidadPorUnidad: 85,
    costoCompraRef: 12000,
    baseCompra: '1.000 g',
    costoUnitario: 12,
    costoPorUnidad: 1020,
    observacion: 'Origen Diana Agrícola'
  },
  {
    material: 'Aceite vegetal',
    clasificacion: 'Materia prima',
    unidad: 'ml',
    cantidadPorUnidad: 8,
    costoCompraRef: 18000,
    baseCompra: '1.000 ml',
    costoUnitario: 18,
    costoPorUnidad: 144,
    observacion: 'Textura y sabor'
  },
  {
    material: 'Sal y condimentos',
    clasificacion: 'Materia prima',
    unidad: 'g',
    cantidadPorUnidad: 4,
    costoCompraRef: 25000,
    baseCompra: '1.000 g',
    costoUnitario: 25,
    costoPorUnidad: 100,
    observacion: 'Perfil gastronómico'
  },
  {
    material: 'Mix quinua y verduras',
    clasificacion: 'Materia prima',
    unidad: 'g',
    cantidadPorUnidad: 15,
    costoCompraRef: 32000,
    baseCompra: '1.000 g',
    costoUnitario: 32,
    costoPorUnidad: 480,
    observacion: 'Variante premium-funcional'
  },
  {
    material: 'Pouch laminado UHT',
    clasificacion: 'Empaque primario',
    unidad: 'unidad',
    cantidadPorUnidad: 1,
    costoCompraRef: 420,
    baseCompra: '1 unidad',
    costoUnitario: 420,
    costoPorUnidad: 420,
    observacion: 'Steam-Tech'
  },
  {
    material: 'Caja display cartón',
    clasificacion: 'Empaque secundario',
    unidad: 'unidad',
    cantidadPorUnidad: 1,
    costoCompraRef: 1800,
    baseCompra: '1 unidad',
    costoUnitario: 1800,
    costoPorUnidad: 1800,
    observacion: 'Canal retail'
  }
]

// Initial tangible assets data
export const initialTangibleAssets: TangibleAsset[] = [
  { tipo: 'Maquinaria', recurso: 'Línea precocción Steam-Tech', cantidad: 1, costoUnitario: 85000000, costoTotal: 85000000, vidaUtil: 10, costoMensual: 708333.33 },
  { tipo: 'Maquinaria', recurso: 'Esterilizador y selladora UHT', cantidad: 1, costoUnitario: 62000000, costoTotal: 62000000, vidaUtil: 10, costoMensual: 516666.67 },
  { tipo: 'Maquinaria', recurso: 'Llenadora semiautomática de pouches', cantidad: 1, costoUnitario: 28000000, costoTotal: 28000000, vidaUtil: 8, costoMensual: 291666.67 },
  { tipo: 'Equipos', recurso: 'Balanza y mesa de control', cantidad: 1, costoUnitario: 3500000, costoTotal: 3500000, vidaUtil: 5, costoMensual: 58333.33 },
  { tipo: 'Equipos', recurso: 'Etiquetadora semiautomática', cantidad: 1, costoUnitario: 5500000, costoTotal: 5500000, vidaUtil: 8, costoMensual: 57291.67 },
  { tipo: 'Infraestructura', recurso: 'Acondicionamiento área UHT', cantidad: 1, costoUnitario: 42000000, costoTotal: 42000000, vidaUtil: 10, costoMensual: 350000 }
]

// Initial intangible assets data
export const initialIntangibleAssets: IntangibleAsset[] = [
  { tipo: 'Conocimiento técnico', recurso: 'Desarrollo de formulación y estabilidad', cantidad: 1, costoEstimado: 8000000, mesesAmortizacion: 24, costoMensualEq: 333333.3333, observacion: 'Proyecto técnico inicial' },
  { tipo: 'Software', recurso: 'ERP / control de inventarios y trazabilidad', cantidad: 1, costoEstimado: 2400000, mesesAmortizacion: 12, costoMensualEq: 200000, observacion: 'Licencia anual' },
  { tipo: 'Software', recurso: 'Diseño gráfico y etiquetado del producto', cantidad: 1, costoEstimado: 3000000, mesesAmortizacion: 12, costoMensualEq: 250000, observacion: 'Diseño y ajustes del empaque' },
  { tipo: 'Licencias', recurso: 'Registro de marca', cantidad: 1, costoEstimado: 1200000, mesesAmortizacion: 60, costoMensualEq: 20000, observacion: 'Protección del signo distintivo' },
  { tipo: 'Procesos / métodos', recurso: 'Documentación BPM y POES', cantidad: 1, costoEstimado: 4500000, mesesAmortizacion: 24, costoMensualEq: 187500, observacion: 'Manualización del proceso' },
  { tipo: 'Licencias', recurso: 'Gestión regulatoria y soporte INVIMA', cantidad: 1, costoEstimado: 6000000, mesesAmortizacion: 24, costoMensualEq: 250000, observacion: 'Trámite y acompañamiento' }
]

// Initial payroll data
export const initialPayrollRoles: PayrollRole[] = [
  {
    cargo: 'Químico formulador / director técnico',
    personas: 1,
    fuenteSalarial: 'Computrabajo',
    salarioRef: 2123230,
    salarioAplicado: 2123230,
    auxilio: 249095,
    nominaDirecta: 2372325,
    prima: 197614.6725,
    cesantias: 197614.6725,
    intCesantias: 23713.7607,
    vacaciones: 88538.691,
    aportes: 350800.0606,
    costoEmpresa: 3230606.8573,
    costoEmpresaUSD: 778.46
  },
  {
    cargo: 'Supervisor de producción',
    personas: 1,
    fuenteSalarial: 'Indeed',
    salarioRef: 1924197,
    salarioAplicado: 1924197,
    auxilio: 249095,
    nominaDirecta: 2173292,
    prima: 181035.2236,
    cesantias: 181035.2236,
    intCesantias: 21724.226832,
    vacaciones: 80239.0149,
    aportes: 317915.82834,
    costoEmpresa: 2955241.517272,
    costoEmpresaUSD: 712.11
  },
  {
    cargo: 'Analista de calidad',
    personas: 1,
    fuenteSalarial: 'Indeed',
    salarioRef: 1983155,
    salarioAplicado: 1983155,
    auxilio: 249095,
    nominaDirecta: 2232250,
    prima: 185946.425,
    cesantias: 185946.425,
    intCesantias: 22313.571,
    vacaciones: 82697.5635,
    aportes: 327656.8691,
    costoEmpresa: 3036810.8536,
    costoEmpresaUSD: 731.76
  },
  {
    cargo: 'Operario de producción',
    personas: 2,
    fuenteSalarial: 'Indeed',
    salarioRef: 1281053,
    salarioAplicado: 1750905,
    auxilio: 498190,
    nominaDirecta: 4000000,
    prima: 333200,
    cesantias: 333200,
    intCesantias: 39984,
    vacaciones: 146025.477,
    aportes: 578569.0482,
    costoEmpresa: 5430978.5252,
    costoEmpresaUSD: 1308.67
  },
  {
    cargo: 'Auxiliar de empaque',
    personas: 1,
    fuenteSalarial: 'Indeed',
    salarioRef: 975270,
    salarioAplicado: 1750905,
    auxilio: 249095,
    nominaDirecta: 2000000,
    prima: 166600,
    cesantias: 166600,
    intCesantias: 19992,
    vacaciones: 73012.7385,
    aportes: 289284.5241,
    costoEmpresa: 2715489.2626,
    costoEmpresaUSD: 654.33
  },
  {
    cargo: 'Técnico de mantenimiento',
    personas: 1,
    fuenteSalarial: 'Indeed',
    salarioRef: 1710193,
    salarioAplicado: 1750905,
    auxilio: 249095,
    nominaDirecta: 2000000,
    prima: 166600,
    cesantias: 166600,
    intCesantias: 19992,
    vacaciones: 73012.7385,
    aportes: 289284.5241,
    costoEmpresa: 2715489.2626,
    costoEmpresaUSD: 654.33
  }
]

// Valuation factors
export const initialValuationFactors: ValuationFactor[] = [
  { factor: 'COMPETENCIA', ponderacion: 0.30, puntuacion: 4, resultadoPonderado: 1.20, justificacion: 'Competencia en RTE y marcas importadas, pero ventaja en confianza de marca Diana y origen nacional.' },
  { factor: 'INNOVACIÓN', ponderacion: 0.25, puntuacion: 5, resultadoPonderado: 1.25, justificacion: 'Steam-Tech y pouch de 90 segundos diferencian frente al arroz tradicional.' },
  { factor: 'TENDENCIA', ponderacion: 0.20, puntuacion: 5, resultadoPonderado: 1.00, justificacion: 'El segmento Ready-to-Eat crece con doble dígito; la conveniencia es necesidad en 2026.' },
  { factor: 'RECURSOS', ponderacion: 0.15, puntuacion: 5, resultadoPonderado: 0.75, justificacion: 'Integración vertical Grupo Diana: agrícola, plantas, logística e inversiones JMH.' },
  { factor: 'RENTABILIDAD', ponderacion: 0.10, puntuacion: 5, resultadoPonderado: 0.50, justificacion: 'VPN $627 MM y TIR 51,2% superan WACC 12%; proyecto viable.' }
]

// Segmentation steps
export const initialSegmentationSteps: SegmentationStep[] = [
  { paso: 1, nombre: 'Definición del objeto y alcance', contenido: 'Objetivos: capturar el segmento Ready-to-Eat y diversificar Alimentos con valor agregado. Alcance: jóvenes 18-40 en 5 ciudades piloto (Bogotá, Medellín, Cali, Manizales, Pereira).' },
  { paso: 2, nombre: 'Análisis del mercado total', contenido: 'El arroz en Colombia es masivo y maduro; el subsegmento RTE es el de mayor dinamismo. Canal moderno y tiendas de conveniencia (Oxxo, Ara, D1) son puntos clave para el urbano.' },
  { paso: 3, nombre: 'Elaboración de perfiles', contenido: 'Estudiantes: presupuesto limitado, microondas principal, zonas universitarias. Jóvenes profesionales (DINKs): ingresos estables, pagan prima por quinua. Hogares unipersonales: porciones exactas sin desperdicio.' },
  { paso: 4, nombre: 'Evaluación de la segmentación', contenido: 'Mantener tres segmentos en lanzamiento. No aumentar: diluye presupuesto publicitario. No reducir: se pierden volumen universitario y margen premium.' },
  { paso: 5, nombre: 'Selección de subgrupos objetivo', contenido: 'Target principal: Jóvenes profesionales (DINKs) por rentabilidad y menor sensibilidad al precio. Secundario: estudiantes por volumen en ciudades universitarias.' },
  { paso: 6, nombre: 'Estrategia comercial', contenido: 'Profesionales: precio por valor, Rappi/Turbo, LinkedIn/Instagram (#HackAlmuerzo). Estudiantes: penetración, combos Glacial, vending campus, TikTok #Diana90sChallenge.' },
  { paso: 7, nombre: 'Análisis final', contenido: 'Grupo Diana cuenta con plantas adaptables, red logística multicanal y respaldo de Inversiones JMH para financiar Steam-Tech sin comprometer operación.' }
]

// Payroll calculation functions
export function calculatePayroll(
  role: Omit<PayrollRole, 'salarioAplicado' | 'auxilio' | 'nominaDirecta' | 'prima' | 'cesantias' | 'intCesantias' | 'vacaciones' | 'aportes' | 'costoEmpresa' | 'costoEmpresaUSD'>,
  smmlv: number,
  auxTransporte: number,
  isExempt: boolean,
  trm: number
): PayrollRole {
  const umbralAuxilio = 2 * smmlv
  const salarioAplicado = Math.max(role.salarioRef, smmlv)
  const auxilio = salarioAplicado <= umbralAuxilio ? role.personas * auxTransporte : 0
  const nominaDirecta = role.personas * salarioAplicado + auxilio
  const prima = nominaDirecta * 0.0833
  const cesantias = nominaDirecta * 0.0833
  const intCesantias = cesantias * 0.12
  const vacaciones = role.personas * salarioAplicado * 0.0417
  
  // Aportes: pensión 12% + caja 4% + ARL 0.522% + (if not exempt: salud 8.5% + SENA 2% + ICBF 3%)
  const baseAportes = 0.12 + 0.04 + 0.00522
  const aportesExentos = isExempt ? 0 : 0.085 + 0.02 + 0.03
  const aportes = role.personas * salarioAplicado * (baseAportes + aportesExentos)
  
  const costoEmpresa = nominaDirecta + prima + cesantias + intCesantias + vacaciones + aportes
  const costoEmpresaUSD = costoEmpresa / trm

  return {
    ...role,
    salarioAplicado,
    auxilio,
    nominaDirecta,
    prima,
    cesantias,
    intCesantias,
    vacaciones,
    aportes,
    costoEmpresa,
    costoEmpresaUSD
  }
}

// Material cost recalculation
export function calculateMaterialCost(material: Material): Material {
  const baseQty = parseBaseCompra(material.baseCompra)
  const costoUnitario = material.clasificacion.includes('Empaque') 
    ? material.costoCompraRef 
    : material.costoCompraRef / baseQty
  const costoPorUnidad = material.cantidadPorUnidad * costoUnitario
  
  return {
    ...material,
    costoUnitario,
    costoPorUnidad
  }
}

function parseBaseCompra(base: string): number {
  const match = base.match(/(\d+[\d.,]*)/)
  if (match) {
    return parseFloat(match[1].replace(',', '.').replace('.', ''))
  }
  return 1
}

// Tangible asset recalculation
export function calculateTangibleAsset(asset: TangibleAsset): TangibleAsset {
  const costoTotal = asset.cantidad * asset.costoUnitario
  const costoMensual = costoTotal / (asset.vidaUtil * 12)
  
  return {
    ...asset,
    costoTotal,
    costoMensual
  }
}

// Intangible asset recalculation
export function calculateIntangibleAsset(asset: IntangibleAsset): IntangibleAsset {
  const costoMensualEq = asset.costoEstimado / asset.mesesAmortizacion
  
  return {
    ...asset,
    costoMensualEq
  }
}

// Valuation factor recalculation
export function calculateValuationFactor(factor: ValuationFactor): ValuationFactor {
  return {
    ...factor,
    resultadoPonderado: factor.ponderacion * factor.puntuacion
  }
}

// Sources data
export const sourcesData = [
  { tipo: 'Documento del proyecto', detalle: 'Presentación comercial y catálogo Diana Express', fuente: 'Diana-Express.pdf' },
  { tipo: 'Documento del proyecto', detalle: 'Supuestos financieros: VPN, TIR, precio $5.500', fuente: 'Diana Express - Modelo de Costos y Proyecciones Financieras - SUPUESTOS.pdf' },
  { tipo: 'Documento del proyecto', detalle: 'Segmentación de mercado Grupo Diana', fuente: 'Taller - Un ejemplo practico de segmentacion (1).pdf' },
  { tipo: 'Encuesta', detalle: 'Intención de compra real 78% (pestaña Encuesta Diana)', fuente: 'Modelo de Costos - SUPUESTOS.pdf' },
  { tipo: 'Salario legal', detalle: 'SMMLV 2026 y auxilio de transporte 2026', fuente: 'https://www.buk.co/blog/salario-minimo-2026-en-colombia' },
  { tipo: 'Salario rol', detalle: 'Químico formulador', fuente: 'https://co.computrabajo.com/salarios/quimico-formulador' },
  { tipo: 'Salario rol', detalle: 'Supervisor de producción', fuente: 'https://co.indeed.com/career/supervisor-de-producción/salaries' },
  { tipo: 'Salario rol', detalle: 'Analista de calidad', fuente: 'https://co.indeed.com/career/analista-de-calidad/salaries' },
  { tipo: 'Salario rol', detalle: 'Operario de producción', fuente: 'https://co.indeed.com/career/operario-producción/salaries' },
  { tipo: 'Salario rol', detalle: 'Auxiliar de empaque', fuente: 'https://co.indeed.com/career/auxiliar-de-empaque/salaries' },
  { tipo: 'Salario rol', detalle: 'Técnico de mantenimiento', fuente: 'https://co.indeed.com/career/técnico-en-mantenimiento/salaries' },
  { tipo: 'Supuesto académico', detalle: 'TRM de referencia para convertir costos en USD a COP', fuente: '4.150 COP/USD' }
]

// Benchmark crosswalk data
export const benchmarkCrosswalk = [
  { item: 'Indicador de pH', benchmarkUSD: 45, unidad: 'USD/kg', trmUsado: 4150, resultadoCOP: 186750, coincide: true, enWorkbook: 186750 },
  { item: 'Tubo laminado', benchmarkUSD: 0.12, unidad: 'USD/unidad', trmUsado: 4150, resultadoCOP: 498, coincide: true, enWorkbook: 498 },
  { item: 'Empaque secundario', benchmarkUSD: 0.08, unidad: 'USD/unidad', trmUsado: 4150, resultadoCOP: 332, coincide: true, enWorkbook: 332 },
  { item: 'Tapas plásticas', benchmarkUSD: 0.03, unidad: 'USD/unidad', trmUsado: 4150, resultadoCOP: 124.5, coincide: false, enWorkbook: null },
  { item: 'Diseño gráfico', benchmarkUSD: 8000, unidad: 'USD/proyecto', trmUsado: 4150, resultadoCOP: 33200000, coincide: false, enWorkbook: 3000000 },
  { item: 'Distribución/logística', benchmarkUSD: 0.20, unidad: 'USD/unidad', trmUsado: 4150, resultadoCOP: 830, coincide: false, enWorkbook: null }
]

// Scoring scale
export const scoringScale = [
  { etiqueta: 'Inexistente', puntaje: 1, explicacion: 'No existe el menor indicio de este factor en la oportunidad o idea de negocio objeto de análisis.' },
  { etiqueta: 'Imposible de lograr', puntaje: 2, explicacion: 'Aunque la oportunidad está presente en el factor, el emprendedor no podría alcanzarlo.' },
  { etiqueta: 'Difícilmente alcanzable', puntaje: 3, explicacion: 'El factor es posible de alcanzar, pero implica un altísimo esfuerzo por parte del emprendedor para lograrlo.' },
  { etiqueta: 'Medianamente alcanzable', puntaje: 4, explicacion: 'El factor es posible de alcanzar con un esfuerzo importante y representativo.' },
  { etiqueta: 'Plenamente alcanzable', puntaje: 5, explicacion: 'El factor es perfectamente alcanzable con las condiciones actuales del emprendedor.' }
]

// Logical framework matrix (original and normalized)
export const logicalFramework = {
  original: {
    fin: { objetivo: 'Contribuir al crecimiento económico y a la innovación en el sector de alimentos y bebidas saludables en la región.', ivo: 'Incremento del 5% en la participación del sector de bebidas saludables en el mercado regional en 3 años. Generación de 50 nuevos empleos directos e indirectos.', mv: 'Informes gremiales y cámaras de comercio. Estadísticas de mercado.', supuestos: 'Crecimiento estable del consumo en el sector de alimentos y bebidas saludables.' },
    proposito: { objetivo: 'Introducir y posicionar el nuevo producto (bebida funcional) en el mercado objetivo en un periodo de 12 meses.', ivo: 'Alcanzar el 10% de participación en el nicho objetivo durante el primer año. Lograr ventas de 20.000 unidades en los primeros 12 meses.', mv: 'Reportes de ventas. Estudios de mercado y sondeos de marca.', supuestos: 'Aceptación del producto por parte del consumidor objetivo y estabilidad en precios de insumos.' },
    componentes: { objetivo: '1. Producto desarrollado y listo para el mercado. 2. Estrategia de marketing y comunicación implementada. 3. Red de distribución consolidada. 4. Clientes satisfechos y fidelizados.', ivo: 'Producto validado en pruebas piloto antes del mes 4. Campaña de lanzamiento en medios digitales y físicos ejecutada en el mes 6. 200 puntos de venta activos al mes 12. 70% de satisfacción en encuestas a clientes.', mv: 'Informes internos del proyecto. Registros de marketing y distribución. Encuestas de satisfacción.', supuestos: 'Alianzas comerciales con distribuidores y minoristas.' },
    actividades: { objetivo: '1.1. Desarrollar fórmula y diseño del producto. 1.2. Pruebas piloto y validación con grupos focales. 2.1. Diseñar plan de marketing y branding. 2.2. Campaña digital y en punto de venta. 3.1. Negociar con distribuidores y minoristas. 3.2. Capacitación en ventas al equipo comercial. 4.1. Implementar programa de fidelización.', ivo: 'Fórmula validada antes del mes 3. Diseño de marca y empaques listos en el mes 4. Campaña digital alcanzando 100.000 interacciones en 6 meses. 50 vendedores capacitados en el primer semestre. Programa de fidelización implementado en el mes 10.', mv: 'Documentación técnica. Informes de marketing y redes sociales. Reportes de ventas. Listados de clientes fidelizados.', supuestos: 'Acceso a recursos financieros, cumplimiento de normatividad sanitaria y estabilidad en costos de producción.' }
  },
  normalized: {
    fin: { objetivo: 'Contribuir a la innovación y crecimiento del cuidado oral preventivo en Colombia.', ivo: 'Incremento del 3% en la categoría de dentífricos premium en 3 años. Generación de 50 empleos directos e indirectos.', mv: 'Informes gremiales, ANDI, Nielsen. Estadísticas del sector cosmético.', supuestos: 'Crecimiento estable del consumo en higiene oral preventiva.' },
    proposito: { objetivo: 'Introducir y posicionar Diana Express (arroz precocido Steam-Tech) en 5 ciudades piloto en 12 meses.', ivo: 'Alcanzar 5% de penetración (170.000 unidades año 1). Demanda mensual promedio 14.167 unidades.', mv: 'Reportes de ventas. Encuesta Diana (78% intención compra). KPIs retail.', supuestos: 'Estabilidad TRM y aceptación del precio $5.500 COP por pouch 250g.' },
    componentes: { objetivo: '1. Producto validado técnicamente. 2. Marketing educativo implementado. 3. Distribución consolidada en grandes superficies y droguerías. 4. Usuarios satisfechos y fidelizados.', ivo: 'Estabilidad del indicador validada mes 4. Campaña educativa ejecutada mes 6. 500 puntos de venta activos mes 12. 75% satisfacción en encuestas.', mv: 'Informes de I+D y calidad. Registros de marketing. Encuestas NPS.', supuestos: 'Alianzas con Éxito, Jumbo, Droguerías Cruz Verde.' },
    actividades: { objetivo: '1.1. Validar formulación y estabilidad del indicador de pH. 1.2. Pruebas piloto con grupos focales. 2.1. Diseñar branding y contenido educativo. 2.2. Implementar QR/FAQ y demostraciones. 3.1. Negociar con retail y farmacias. 3.2. Capacitar equipos de trade marketing. 4.1. Implementar programa de fidelización y seguimiento.', ivo: 'Formulación validada mes 3. Empaques y QR listos mes 4. 100.000 interacciones digitales en 6 meses. 80 vendedores capacitados. Fidelización activa mes 10.', mv: 'Documentación técnica INVIMA. Analytics digitales. Reportes de trade. Base de clientes registrados.', supuestos: 'Aprobación regulatoria INVIMA, presupuesto de marketing disponible, estabilidad TRM.' }
  }
}

export { useProyectoStore, ProyectoStoreProvider } from './proyecto-store'
export type { ProyectoMaterial, ProyectoIntangible } from './proyecto-store'
