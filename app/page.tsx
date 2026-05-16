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
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div id="hero">
        <Hero />
      </div>
      
      <div id="valor">
        <ValueProposition />
      </div>
      
      <div id="canvas">
        <BusinessCanvas />
      </div>
      
      <div id="kpis">
        <KPIDashboard />
      </div>
      
      <div id="mercado">
        <MarketCharts />
      </div>
      
      <div id="costos">
        <CostStructure />
      </div>
      
      <div id="pronostico">
        <Forecast />
      </div>
      
      <div id="produccion">
        <ProductionProcess />
      </div>
      
      <div id="datos">
        <DataWorkspace />
      </div>
      
      <div id="conclusiones">
        <Conclusions />
      </div>
      
      <Footer />
    </main>
  )
}
