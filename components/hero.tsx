"use client";

import { motion } from "framer-motion";
import { useProyectoStore } from "@/lib/data-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, ShieldCheck, Play } from "lucide-react";
import { heroStagger, heroItem, heroKpiFlip } from "@/lib/motion-presets";

export function Hero() {
  const { volumenProduccionMensual } = useProyectoStore();

  return (
    <div className="relative overflow-hidden py-16 sm:py-28">
      <div className="absolute top-16 right-[8%] -z-10 h-48 w-48 rounded-full bg-primary/30 blur-2xl diana-float" />
      <div className="absolute bottom-10 left-[5%] -z-10 h-40 w-40 rounded-2xl bg-accent/25 blur-xl diana-float-delayed rotate-12" />
      <div className="absolute top-1/3 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full border-4 border-white/40 diana-float" />
      <div className="absolute top-0 left-0 right-0 h-1.5 diana-brand-bar" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={heroStagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={heroItem}>
            <Badge
              variant="outline"
              className="mb-4 border-primary/30 bg-white/80 text-primary gap-1.5 py-1 px-3 text-xs font-semibold shadow-sm"
            >
              <Zap className="h-3.5 w-3.5 fill-current" /> Proyecto Agroindustrial 2026 — Grupo Diana
            </Badge>
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl"
          >
            Diana Express
            <span className="block diana-text-gradient text-3xl sm:text-4xl mt-3 font-bold">
              La revolución del arroz listo en el hogar colombiano
            </span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mt-6 text-lg leading-8 text-foreground/80 max-w-2xl mx-auto"
          >
            Arroz precocido en pouch con tecnología{" "}
            <strong className="text-accent">Steam-Tech</strong>: listo en 90 segundos en el
            microondas, con la calidad premium y el respaldo de más de 60 años del{" "}
            <strong className="text-primary">Grupo Diana</strong>.
          </motion.p>

          <motion.div
            variants={heroItem}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button size="lg" className="gap-2 shadow-lg shadow-primary/30">
              <Clock className="h-4 w-4" /> Ver Modelo de Costos
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-2 border-accent bg-white/90 text-accent hover:bg-accent hover:text-accent-foreground"
            >
              <Play className="h-4 w-4 fill-current" /> Conocer Steam-Tech
            </Button>
          </motion.div>
        </motion.div>

        <motion.dl
          className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 text-center sm:grid-cols-3 sm:mt-20 lg:mt-24 lg:gap-10"
          variants={heroStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{ perspective: 1200 }}
        >
          <motion.div
            variants={heroKpiFlip}
            className="flex flex-col rounded-2xl border-2 border-primary/20 bg-white/90 p-6 shadow-lg shadow-primary/10 backdrop-blur-sm"
          >
            <dt className="text-sm font-semibold text-muted-foreground">Tiempo de Preparación</dt>
            <dd className="order-first mb-1 text-3xl font-bold text-primary">90 Segundos</dd>
            <p className="mt-1 text-xs text-muted-foreground">Sin agua adicional en microondas</p>
          </motion.div>

          <motion.div
            variants={heroKpiFlip}
            className="flex flex-col rounded-2xl border-2 border-accent/25 bg-white/90 p-6 shadow-lg shadow-accent/10 backdrop-blur-sm"
          >
            <dt className="text-sm font-semibold text-muted-foreground">Vida Útil Garantizada</dt>
            <dd className="order-first mb-1 text-3xl font-bold text-accent">12 Meses</dd>
            <p className="mt-1 text-xs text-muted-foreground">Almacenamiento a temperatura ambiente</p>
          </motion.div>

          <motion.div
            variants={heroKpiFlip}
            className="flex flex-col rounded-2xl border-2 border-border bg-white/95 p-6 shadow-md backdrop-blur-sm"
          >
            <dt className="flex items-center justify-center gap-1.5 text-sm font-semibold text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Meta Piloto Mensual
            </dt>
            <dd className="order-first mb-1 text-3xl font-bold text-foreground">
              {volumenProduccionMensual.toLocaleString()} u
            </dd>
            <p className="mt-1 text-xs text-muted-foreground">Demanda mensual promedio (5 ciudades piloto)</p>
          </motion.div>
        </motion.dl>
      </div>
    </div>
  );
}
