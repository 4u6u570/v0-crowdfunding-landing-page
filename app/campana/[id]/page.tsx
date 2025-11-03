"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  Users,
  Target,
  MapPin,
  Star,
  Share2,
  ShoppingCart,
  CheckCircle2,
  Package,
  Shield,
  TrendingUp,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function CampaignDetailPage() {
  const params = useParams()
  const id = params.id as string

  // Mock campaign data - in production this would come from a database
  const campaigns = [
    {
      id: "1",
      title: "Café artesanal orgánico",
      description:
        "Café de especialidad cultivado en las sierras con métodos sostenibles. Nuestro café es 100% orgánico, cultivado a más de 1500 metros de altura, con procesos de secado natural que preservan todos los aromas y sabores únicos de la región. Cada lote es cuidadosamente seleccionado y tostado para garantizar la máxima calidad.",
      fullDescription: `Este café proviene de pequeños productores de las sierras que han mantenido prácticas agrícolas sostenibles por generaciones. El cultivo se realiza bajo sombra, lo que no solo protege el ecosistema local sino que también produce granos de mayor calidad.

El proceso de beneficiado es completamente natural, sin uso de químicos, y el secado se realiza al sol durante 15-20 días. Esto permite que los granos desarrollen un perfil de sabor complejo con notas de chocolate, caramelo y frutas rojas.

Cada bolsa de 1kg incluye información detallada sobre el origen, el productor, y recomendaciones de preparación para diferentes métodos (espresso, filtrado, prensa francesa).`,
      image: "/organic-coffee-beans-artisan.jpg",
      raised: 38500,
      goal: 50000,
      supporters: 127,
      timeLeft: "12 días",
      status: "active",
      provider: {
        name: "Café de las Sierras",
        logo: "/coffee-logo.png",
        location: "Salta, Argentina",
        rating: 4.8,
        reviews: 156,
      },
      minOrder: 5,
      unitPrice: 2500,
      category: "Alimentos",
    },
    {
      id: "2",
      title: "Ropa sostenible",
      description:
        "Moda consciente hecha con materiales reciclados y producción local. Cada prenda está diseñada para durar, combinando estilo contemporáneo con responsabilidad ambiental.",
      fullDescription: `Nuestra línea de ropa sostenible representa un compromiso real con el medio ambiente y la producción ética. Utilizamos exclusivamente materiales reciclados certificados, incluyendo algodón orgánico, poliéster reciclado de botellas PET, y fibras naturales de producción local.

Cada prenda es confeccionada en talleres locales que garantizan condiciones laborales justas y salarios dignos. El proceso de producción minimiza el uso de agua y energía, y todos los tintes utilizados son libres de químicos tóxicos.

La colección incluye prendas básicas versátiles que pueden combinarse fácilmente, promoviendo un guardarropa minimalista y duradero. Cada compra incluye información sobre el impacto ambiental evitado y consejos de cuidado para maximizar la vida útil de las prendas.`,
      image: "/sustainable-fashion.png",
      raised: 45200,
      goal: 60000,
      supporters: 203,
      timeLeft: "8 días",
      status: "active",
      provider: {
        name: "EcoModa Argentina",
        logo: "/elegant-fashion-logo.png",
        location: "Buenos Aires, Argentina",
        rating: 4.9,
        reviews: 234,
      },
      minOrder: 10,
      unitPrice: 3500,
      category: "Textil",
    },
    {
      id: "3",
      title: "Juguetes educativos",
      description:
        "Juguetes de madera que estimulan la creatividad y el aprendizaje. Diseñados por pedagogos y fabricados con maderas certificadas de bosques sostenibles.",
      fullDescription: `Nuestros juguetes educativos están diseñados en colaboración con pedagogos especializados en desarrollo infantil. Cada pieza está pensada para estimular diferentes áreas del aprendizaje: motricidad fina, resolución de problemas, creatividad y pensamiento lógico.

Utilizamos exclusivamente maderas certificadas FSC de bosques gestionados de forma sostenible. Todos los acabados son con pinturas y barnices no tóxicos, seguros para niños de todas las edades. El diseño minimalista y atemporal asegura que estos juguetes puedan pasar de generación en generación.

La colección incluye bloques de construcción, rompecabezas, juegos de encastre y figuras que fomentan el juego libre y la imaginación. Cada set viene con una guía para padres con sugerencias de actividades y juegos educativos.`,
      image: "/wooden-educational-toys-children.jpg",
      raised: 52800,
      goal: 70000,
      supporters: 315,
      timeLeft: "5 días",
      status: "active",
      provider: {
        name: "Juguetes Naturales",
        logo: "/colorful-stacked-toys-logo.png",
        location: "Córdoba, Argentina",
        rating: 4.7,
        reviews: 189,
      },
      minOrder: 3,
      unitPrice: 4200,
      category: "Juguetería",
    },
    {
      id: "4",
      title: "Productos de limpieza ecológicos",
      description:
        "Limpiadores biodegradables para el hogar y comercio. Fórmulas concentradas que rinden más y cuidan el planeta.",
      fullDescription: `Nuestra línea de productos de limpieza ecológicos ofrece la misma efectividad que los productos convencionales, pero sin los químicos agresivos que dañan el medio ambiente y la salud.

Todas las fórmulas son biodegradables, libres de fosfatos, cloro y fragancias sintéticas. Los ingredientes activos provienen de fuentes vegetales renovables y son completamente seguros para uso en hogares con niños y mascotas.

Los productos vienen en formato concentrado, lo que reduce significativamente el uso de plástico y los costos de transporte. Cada botella rinde hasta 3 veces más que los productos convencionales. Ofrecemos también un programa de recarga para minimizar aún más el impacto ambiental.

La línea incluye limpiador multiuso, desengrasante, limpiador de pisos, y productos especializados para baño y cocina.`,
      image: "/eco-cleaning-products.jpg",
      raised: 50000,
      goal: 40000,
      supporters: 189,
      timeLeft: "Finalizada",
      status: "completed",
      provider: {
        name: "EcoLimpio",
        logo: "/cleaning-logo.png",
        location: "Mendoza, Argentina",
        rating: 4.6,
        reviews: 142,
      },
      minOrder: 12,
      unitPrice: 1800,
      category: "Limpieza",
    },
  ]

  const campaign = campaigns.find((c) => c.id === id) || campaigns[0]
  const isCompleted = campaign.status === "completed"
  const progress = Math.min((campaign.raised / campaign.goal) * 100, 100)

  const [quantity, setQuantity] = useState(campaign.minOrder)
  const [showReservationModal, setShowReservationModal] = useState(false)

  const relatedCampaigns = campaigns.filter((c) => c.id !== id).slice(0, 3)

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Image */}
            <div className="relative rounded-xl overflow-hidden shadow-lg" style={{ height: "500px" }}>
              <img
                src={campaign.image || "/placeholder.svg"}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
              {isCompleted && (
                <div
                  className="absolute top-6 right-6 px-4 py-2 rounded-full text-white text-sm font-semibold flex items-center gap-2"
                  style={{ backgroundColor: "#2ECC71" }}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Meta alcanzada
                </div>
              )}
            </div>

            {/* Campaign Info */}
            <div className="space-y-6">
              <div>
                <Badge
                  className="mb-3"
                  style={{
                    background: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)",
                    color: "white",
                  }}
                >
                  {campaign.category}
                </Badge>
                <h1 className="text-4xl font-bold font-heading mb-4">{campaign.title}</h1>
                <p className="text-lg text-muted-foreground">{campaign.description}</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Progreso del lote</span>
                  <span className="font-semibold">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)",
                    }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 bg-white rounded-xl border-2" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)" }}
                    >
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold font-heading">${campaign.raised.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">de ${campaign.goal.toLocaleString()}</div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-white rounded-xl border-2" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)" }}
                    >
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold font-heading">{campaign.supporters}</div>
                      <div className="text-xs text-muted-foreground">participantes</div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-white rounded-xl border-2" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)" }}
                    >
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold font-heading">${campaign.unitPrice.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">precio por unidad</div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-white rounded-xl border-2" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)" }}
                    >
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold font-heading">{campaign.timeLeft}</div>
                      <div className="text-xs text-muted-foreground">restantes</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  size="lg"
                  className="flex-1 text-lg h-14 rounded-xl"
                  style={{
                    background: isCompleted ? "#CCCCCC" : "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)",
                    color: "#FFFFFF",
                    textShadow: "0 1px 2px rgba(0,0,0,0.25)",
                    cursor: isCompleted ? "not-allowed" : "pointer",
                  }}
                  disabled={isCompleted}
                  onClick={() => !isCompleted && setShowReservationModal(true)}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isCompleted ? "Campaña finalizada" : "Reservar cupo"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-xl border-2 bg-white hover:bg-gray-50"
                  style={{ borderColor: "#FF3D8A", color: "#FF3D8A" }}
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Success Banner */}
              {isCompleted && (
                <Card
                  className="p-4 rounded-xl border-2"
                  style={{
                    backgroundColor: "#E8F9EF",
                    borderColor: "#C5EBD0",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0" style={{ color: "#2ECC71" }} />
                    <div>
                      <div className="font-semibold" style={{ color: "#1B5E20" }}>
                        ¡Campaña exitosa!
                      </div>
                      <div className="text-sm" style={{ color: "#1B5E20" }}>
                        Esta campaña alcanzó su meta. El proveedor está preparando los pedidos.
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-heading mb-6">Descripción del lote</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line">
              {campaign.fullDescription}
            </div>
          </div>
        </div>
      </section>

      {/* Provider Section */}
      <section className="py-12 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-heading mb-6">Sobre el proveedor</h2>
            <Card className="p-6 bg-white rounded-xl border-2" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <div className="flex items-start gap-6">
                <img
                  src={campaign.provider.logo || "/placeholder.svg"}
                  alt={campaign.provider.name}
                  className="w-20 h-20 rounded-xl object-cover border-2"
                  style={{ borderColor: "#FF7B5F" }}
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold font-heading mb-2">{campaign.provider.name}</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{campaign.provider.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{campaign.provider.rating}</span>
                      <span className="text-sm text-muted-foreground">({campaign.provider.reviews} reseñas)</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5" style={{ color: "#2ECC71" }} />
                      <span className="text-sm">Verificado</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" style={{ color: "#FF7B5F" }} />
                      <span className="text-sm">Alta demanda</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" style={{ color: "#2ECC71" }} />
                      <span className="text-sm">Envíos a tiempo</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Campaigns */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold font-heading mb-8">Campañas relacionadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCampaigns.map((relatedCampaign) => (
                <Card
                  key={relatedCampaign.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-2 rounded-xl"
                  style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
                >
                  <div className="relative">
                    <img
                      src={relatedCampaign.image || "/placeholder.svg"}
                      alt={relatedCampaign.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold font-heading">{relatedCampaign.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{relatedCampaign.description}</p>

                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${(relatedCampaign.raised / relatedCampaign.goal) * 100}%`,
                            background: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)",
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">${relatedCampaign.raised.toLocaleString()}</span>
                        <span className="text-muted-foreground">{relatedCampaign.supporters} participantes</span>
                      </div>
                    </div>

                    <Button
                      className="w-full rounded-xl"
                      style={{
                        background: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)",
                        color: "#FFFFFF",
                        textShadow: "0 1px 2px rgba(0,0,0,0.25)",
                      }}
                      asChild
                    >
                      <Link href={`/campana/${relatedCampaign.id}`}>Ver campaña</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Modal */}
      {showReservationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card
            className="max-w-md w-full p-6 bg-white rounded-xl"
            style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}
          >
            <h3 className="text-2xl font-bold font-heading mb-4">Reservar cupo</h3>
            <p className="text-muted-foreground mb-6">
              Seleccioná la cantidad de unidades que querés reservar. Mínimo: {campaign.minOrder} unidades.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Cantidad de unidades</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(campaign.minOrder, quantity - 1))}
                    className="rounded-lg"
                  >
                    -
                  </Button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(campaign.minOrder, Number.parseInt(e.target.value) || campaign.minOrder))
                    }
                    className="flex-1 text-center border-2 rounded-lg p-2 font-semibold"
                    min={campaign.minOrder}
                  />
                  <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)} className="rounded-lg">
                    +
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Precio por unidad</span>
                  <span className="font-semibold">${campaign.unitPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span style={{ color: "#FF3D8A" }}>${(quantity * campaign.unitPrice).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-xl bg-transparent"
                onClick={() => setShowReservationModal(false)}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 rounded-xl"
                style={{
                  background: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)",
                  color: "#FFFFFF",
                  textShadow: "0 1px 2px rgba(0,0,0,0.25)",
                }}
                onClick={() => {
                  // In production, this would process the reservation
                  alert(
                    `Reserva confirmada: ${quantity} unidades por $${(quantity * campaign.unitPrice).toLocaleString()}`,
                  )
                  setShowReservationModal(false)
                }}
              >
                Confirmar reserva
              </Button>
            </div>
          </Card>
        </div>
      )}

      <Footer />
    </main>
  )
}

function Footer() {
  return (
    <footer
      className="border-t border-border"
      style={{ background: "linear-gradient(90deg, rgba(255, 123, 95, 0.1) 0%, rgba(255, 61, 138, 0.1) 100%)" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-sm text-muted-foreground">
          <p>Hecho con ❤️ en Latinoamérica — © 2025 Crowdfunding</p>
        </div>
      </div>
    </footer>
  )
}
