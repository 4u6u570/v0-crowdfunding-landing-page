"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ProvidersTable() {
  const [providers] = useState([
    {
      id: 1,
      name: "Café Regional",
      category: "Alimentos",
      contact: "lucia@caferegional.com",
      status: "verified",
    },
    {
      id: 2,
      name: "Textiles Sostenibles",
      category: "Ropa",
      contact: "martin@textiles.com",
      status: "verified",
    },
    {
      id: 3,
      name: "Juguetes Eco",
      category: "Juguetes",
      contact: "carla@jugueteseco.com",
      status: "pending",
    },
  ])

  return (
    <Card className="rounded-xl border-2" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-[#F5F5F5]">
              <th className="text-left p-4 font-semibold text-sm">Nombre</th>
              <th className="text-left p-4 font-semibold text-sm">Categoría</th>
              <th className="text-left p-4 font-semibold text-sm">Contacto</th>
              <th className="text-left p-4 font-semibold text-sm">Estado</th>
              <th className="text-left p-4 font-semibold text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr key={provider.id} className="border-b border-border hover:bg-[#F9F9F9] transition-colors">
                <td className="p-4 font-medium">{provider.name}</td>
                <td className="p-4 text-sm">{provider.category}</td>
                <td className="p-4 text-sm text-muted-foreground">{provider.contact}</td>
                <td className="p-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      provider.status === "verified" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {provider.status === "verified" ? "Verificado" : "Pendiente"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      Editar
                    </Button>
                    {provider.status === "pending" && (
                      <Button size="sm" className="text-xs text-white" style={{ backgroundColor: "#2ECC71" }}>
                        Aprobar
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
