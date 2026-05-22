import type { Variants } from "framer-motion"

export const easeOutExpo = [0.16, 1, 0.3, 1] as const
export const easeInOut = [0.65, 0, 0.35, 1] as const
export const easeBounce = [0.34, 1.45, 0.64, 1] as const

/** Encabezado: aparece con recorte lateral */
export const titleReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  show: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.75, ease: easeInOut },
  },
}

/** Icono: cae desde arriba (sin giro 360°) */
export const iconDrop: Variants = {
  hidden: { opacity: 0, y: -28, scale: 0.6 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: easeBounce },
  },
}

/** Bloque intro: desenfoque + subida */
export const fadeBlurUp: Variants = {
  hidden: { opacity: 0, y: 56, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: easeOutExpo },
  },
}

/** Tarjetas: entrada desde abajo con rebote suave */
export const riseBounce: Variants = {
  hidden: { opacity: 0, y: 80 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeBounce },
  },
}

/** Alternancia izquierda / derecha */
export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -72 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
}

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 72 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
}

/** Pop rápido (sin spring elástico largo) */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: easeOutExpo },
  },
}

/** Contenedor con hijos escalonados */
export function staggerContainer(stagger = 0.1, delay = 0.12): Variants {
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }
}

/** Hover en tarjetas: escala + sombra (reemplaza whileHover y: -8) */
export const cardHoverLift = {
  rest: { scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" },
  hover: {
    scale: 1.04,
    boxShadow: "0 20px 40px -12px rgba(0, 61, 165, 0.25)",
    transition: { duration: 0.28, ease: easeOutExpo },
  },
}

/** Icono al hover: pulso, no sacudida */
export const iconPulseHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.15,
    transition: { duration: 0.3, ease: easeOutExpo },
  },
}

/** Hero: secuencia dramática */
export const heroStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
}

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
}

export const heroKpiFlip: Variants = {
  hidden: { opacity: 0, rotateX: 75, y: 40 },
  show: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: { duration: 0.55, ease: easeBounce },
  },
}
