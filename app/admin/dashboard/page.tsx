"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LogOut, BarChart3, Users, Zap, Settings } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = localStorage.getItem("user")
        if (!userData) {
          router.push("/")
          return
        }

        const parsedUser = JSON.parse(userData)
        if (parsedUser.role !== "admin") {
          router.push("/")
          return
        }

        setUser(parsedUser)
        setIsLoading(false)
      } catch (error) {
        router.push("/")
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div
            className="w-12 h-12 rounded-full animate-spin mx-auto"
            style={{
              backgroundImage: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)",
              WebkitMaskImage: "radial-gradient(circle at 50% 50%, transparent 30%, black 70%)",
            }}
          />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 border-b border-gray-200">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto"
            style={{ backgroundImage: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)" }}
          >
            <Zap className="w-6 h-6 text-white" />
          </div>
          {sidebarOpen && <p className="text-center text-xs font-semibold mt-2">Admin</p>}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: BarChart3, label: "Dashboard", href: "/admin/dashboard" },
            { icon: Users, label: "Usuarios", href: "/admin/usuarios" },
            { icon: Zap, label: "Campañas", href: "/admin/campanas" },
            { icon: Settings, label: "Configuración", href: "/admin/settings" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                sidebarOpen ? "hover:bg-gray-100" : "justify-center hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-2">
          <Button
            variant="outline"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full justify-center"
            size="sm"
          >
            {sidebarOpen ? "Ocultar" : "Mostrar"}
          </Button>
          <Button
            onClick={handleLogout}
            className="w-full text-white justify-center"
            style={{ backgroundImage: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)" }}
            size="sm"
          >
            {sidebarOpen ? "Cerrar sesión" : <LogOut className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <h1 className="text-3xl font-bold font-heading">Panel de Control</h1>
          <p className="text-gray-600 mt-1">Bienvenido, {user?.email}</p>
        </header>

        <main className="flex-1 p-8 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Usuarios totales", value: "1,243", icon: Users },
              { label: "Campañas activas", value: "24", icon: Zap },
              { label: "Volumen transacciones", value: "+$5M", icon: BarChart3 },
              { label: "Tasa de éxito", value: "95%", icon: BarChart3 },
            ].map((stat, index) => (
              <Card
                key={index}
                className="p-6 bg-white border-2 rounded-xl"
                style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundImage: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)" }}
                  >
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-white border-2 rounded-xl" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
            <h2 className="text-xl font-bold font-heading mb-4">Actividad reciente</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Nueva campaña creada</p>
                  <p className="text-sm text-gray-600">Café artesanal orgánico</p>
                </div>
                <span className="text-sm text-green-600 font-medium">Hace 2h</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Nuevo usuario registrado</p>
                  <p className="text-sm text-gray-600">comerciante@email.com</p>
                </div>
                <span className="text-sm text-green-600 font-medium">Hace 1h</span>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
