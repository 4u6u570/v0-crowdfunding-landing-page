"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function CampaignsTable() {
  const [campaigns] = useState([
    {
      id: 1,
      title: "Café artesanal orgánico",
      creator: "Lucía García",
      status: "active",
      raised: 38500,
      goal: 50000,
      supporters: 127,
    },
    {
      id: 2,
      title: "Ropa sostenible",
      creator: "Martín López",
      status: "active",
      raised: 45200,
      goal: 60000,
      supporters: 203,
    },
    {
      id: 3,
      title: "Juguetes educativos",
      creator: "Carla Rodríguez",
      status: "completed",
      raised: 70000,
      goal: 70000,
      supporters: 315,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#4169E1"
      case "completed":
        return "#2ECC71"
      case "paused":
        return "#FFB84D"
      default:
        return "#6F6F6F"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Activa"
      case "completed":
        return "Completada"
      case "paused":
        return "Pausada"
      default:
        return status
    }
  }

  return (
    <Card className="rounded-xl border-2" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-[#F5F5F5]">
              <th className="text-left p-4 font-semibold text-sm">Campaña</th>
              <th className="text-left p-4 font-semibold text-sm">Creador</th>
              <th className="text-left p-4 font-semibold text-sm">Estado</th>
              <th className="text-left p-4 font-semibold text-sm">Progreso</th>
              <th className="text-left p-4 font-semibold text-sm">Apoyos</th>
              <th className="text-left p-4 font-semibold text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="border-b border-border hover:bg-[#F9F9F9] transition-colors">
                <td className="p-4">
                  <div>
                    <p className="font-medium">{campaign.title}</p>
                    <p className="text-xs text-muted-foreground">ID: #{campaign.id}</p>
                  </div>
                </td>
                <td className="p-4 text-sm">{campaign.creator}</td>
                <td className="p-4">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: getStatusColor(campaign.status) }}
                  >
                    {getStatusLabel(campaign.status)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-[#E5E5E5] rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${(campaign.raised / campaign.goal) * 100}%`,
                          backgroundImage: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)",
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold ml-2">
                      {Math.round((campaign.raised / campaign.goal) * 100)}%
                    </span>
                  </div>
                </td>
                <td className="p-4 text-sm font-medium">{campaign.supporters}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      Ver
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      Editar
                    </Button>
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
