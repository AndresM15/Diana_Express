"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { fadeBlurUp, iconDrop, titleReveal } from "@/lib/motion-presets"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  icon: LucideIcon
  title: string
  description: React.ReactNode
  iconClassName?: string
  iconBoxClassName?: string
  lightOnDark?: boolean
}

export function SectionHeader({
  icon: Icon,
  title,
  description,
  iconClassName = "text-primary",
  iconBoxClassName = "bg-primary/15",
  lightOnDark = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={fadeBlurUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="text-center max-w-3xl mx-auto mb-16"
    >
      <motion.div
        variants={iconDrop}
        className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border-2",
          iconBoxClassName,
          lightOnDark ? "border-white/20" : "border-primary/20"
        )}
      >
        <Icon className={cn("w-8 h-8", iconClassName)} />
      </motion.div>

      <motion.h2
        variants={titleReveal}
        className={cn(
          "text-4xl md:text-5xl font-bold mb-6 text-balance",
          lightOnDark ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </motion.h2>

      <motion.p
        variants={fadeBlurUp}
        className={cn(
          "text-lg leading-relaxed",
          lightOnDark ? "text-white/80" : "text-muted-foreground"
        )}
      >
        {description}
      </motion.p>
    </motion.div>
  )
}
