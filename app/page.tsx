import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { ValueProposition } from "@/components/value-proposition"
import { BusinessCanvas } from "@/components/business-canvas"
import { KPIDashboard } from "@/components/kpi-dashboard"
import { MarketCharts } from "@/components/market-charts"
import { CostStructure } from "@/components/cost-structure"
import { Forecast } from "@/components/forecast"
import { ProductionProcess } from "@/components/production-process"
import { DataWorkspace } from "@/components/data-workspace"
import { Conclusions } from "@/components/conclusions"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-foreground">
      <Navigation />

      <div id="hero" className="section-surface section-hero">
        <Hero />
      </div>

      <div id="valor" className="section-surface section-valor">
        <ValueProposition />
      </div>

      <div id="canvas" className="section-surface section-canvas">
        <BusinessCanvas />
      </div>

      <div id="kpis" className="section-surface section-kpis">
        <KPIDashboard />
      </div>

      <div id="mercado" className="section-surface section-mercado">
        <MarketCharts />
      </div>

      <div id="costos" className="section-surface section-costos">
        <CostStructure />
      </div>

      <div id="pronostico" className="section-surface section-pronostico">
        <Forecast />
      </div>

      <div id="produccion" className="section-surface section-produccion">
        <ProductionProcess />
      </div>

      <div id="datos" className="section-surface section-datos">
        <DataWorkspace />
      </div>

      <div id="conclusiones" className="section-surface section-conclusiones">
        <Conclusions />
      </div>

      <Footer />
    </main>
  )
}
