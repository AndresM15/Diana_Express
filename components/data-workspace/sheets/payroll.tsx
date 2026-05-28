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
import { Input } from "@/components/ui/input";
import { Users, Landmark } from "lucide-react";

export default function PayrollSheet() {
  const { nomina, updateSalarioBase } = useProyectoStore();

  // Calcular totales de nómina
  const totalEmpleados = nomina.reduce((sum, emp) => sum + emp.cantidad, 0);
  const nominaCostoMensualTotal = nomina.reduce(
    (sum, emp) => sum + (emp.salarioBase * emp.cargaPrestacionalFactor) * emp.cantidad,
    0
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Personal de Planta</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmpleados} Colaboradores</div>
            <p className="text-xs text-muted-foreground">
              Estructura operativa para el procesamiento UHT y empaque
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presupuesto Mensual de Nómina</CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${nominaCostoMensualTotal.toLocaleString("es-CO", { maximumFractionDigits: 0 })} COP
            </div>
            <p className="text-xs text-muted-foreground">
              Incluye salario base + 52% de prestaciones sociales de ley
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Presupuesto de Mano de Obra Directa e Indirecta</CardTitle>
          <CardDescription>
            Personal requerido para operar de manera segura el equipamiento industrial en Manizales.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cargo Organizacional</TableHead>
                <TableHead className="text-center">Personal</TableHead>
                <TableHead className="text-right">Salario Base Mensual</TableHead>
                <TableHead className="text-center">Factor Prestacional</TableHead>
                <TableHead className="text-right">Costo Total Mensual con Ley</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nomina.map((empleado) => {
                const costoIndividualConLey = empleado.salarioBase * empleado.cargaPrestacionalFactor;
                const costoTotalCargo = costoIndividualConLey * empleado.cantidad;

                return (
                  <TableRow key={empleado.id}>
                    <TableCell className="font-medium">{empleado.cargo}</TableCell>
                    <TableCell className="text-center font-semibold">{empleado.cantidad}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-xs text-muted-foreground">$</span>
                        <Input
                          type="number"
                          value={empleado.salarioBase}
                          onChange={(e) => updateSalarioBase(empleado.id, parseInt(e.target.value) || 0)}
                          className="w-28 h-8 text-right p-1"
                          step="50000"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">
                      {((empleado.cargaPrestacionalFactor - 1) * 100).toFixed(0)}% (Factor: {empleado.cargaPrestacionalFactor})
                    </TableCell>
                    <TableCell className="text-right font-bold text-primary">
                      ${costoTotalCargo.toLocaleString("es-CO", { maximumFractionDigits: 0 })}
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