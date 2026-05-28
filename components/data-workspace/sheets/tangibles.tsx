"use client";

import React from "react";
import { useProyectoStore } from "@/lib/data-store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HardDrive, Factory } from "lucide-react";

export function TangiblesSheet() {
  const { tangibles } = useProyectoStore();

  // Calcular la inversión total tangible
  const inversionTotalTangible = tangibles.reduce(
    (sum, item) => sum + item.costoEstimated * item.cantidad,
    0
  );

  const getBadgeVariant = (tipo: string) => {
    switch (tipo) {
      case "Maquinaria": return "default";
      case "Equipos": return "secondary";
      case "Herramientas": return "outline";
      case "Infraestructura": return "destructive";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Físicos Registrados</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tangibles.length} Activos Principales</div>
            <p className="text-xs text-muted-foreground">
              Maquinaria industrial y adecuación física de planta
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inversión Total Tangible</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${inversionTotalTangible.toLocaleString("es-CO", { maximumFractionDigits: 0 })} COP
            </div>
            <p className="text-xs text-muted-foreground">
              Capital requerido para montaje de infraestructura física
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventario de Bienes Tangibles y Maquinaria</CardTitle>
          <CardDescription>
            Detalle de los requerimientos físicos para la precocción al vapor, dosificación y esterilización térmica UHT.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recurso Físico</TableHead>
                <TableHead>Tipo de Recurso</TableHead>
                <TableHead className="text-center">Cantidad</TableHead>
                <TableHead className="text-right">Costo Unitario Estimado</TableHead>
                <TableHead className="text-right">Inversión Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tangibles.map((item) => {
                const totalItem = item.costoEstimated * item.cantidad;
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.nombre}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(item.tipo)}>{item.tipo}</Badge>
                    </TableCell>
                    <TableCell className="text-center font-semibold">{item.cantidad}</TableCell>
                    <TableCell className="text-right">
                      ${item.costoEstimated.toLocaleString("es-CO", { maximumFractionDigits: 0 })}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      ${totalItem.toLocaleString("es-CO", { maximumFractionDigits: 0 })}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}