import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, TrendingUp } from "lucide-react"
import Image from "next/image"

const campaigns = [
  {
    id: 1,
    title: "Café Artesanal Orgánico",
    description: "Café de altura cultivado por pequeños productores locales",
    image: "/organic-coffee-beans-artisan.jpg",
    goal: 50000,
    current: 38500,
    backers: 127,
    category: "Alimentos",
  },
  {
    id: 2,
    title: "Ropa Sostenible",
    description: "Moda ética hecha con materiales reciclados",
    image: "/sustainable-fashion-clothing-eco.jpg",
    goal: 75000,
    current: 62000,
    backers: 203,
    category: "Moda",
  },
  {
    id: 3,
    title: "Juguetes Educativos",
    description: "Juguetes de madera que estimulan la creatividad infantil",
    image: "/wooden-educational-toys-children.jpg",
    goal: 30000,
    current: 28500,
    backers: 89,
    category: "Educación",
  },
]

export function FeaturedCampaignsSection() {
  return (
    <section id="campanas" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">Destacados</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-balance">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Proyectos
            </span>
            <span className="text-foreground"> en tendencia</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Descubre ideas innovadoras que están transformando industrias
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => {
            const progress = (campaign.current / campaign.goal) * 100
            return (
              <Card
                key={campaign.id}
                className="overflow-hidden border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl group"
              >
                <CardHeader className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={campaign.image || "/placeholder.svg"}
                      alt={campaign.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full w-10 h-10 bg-white/90 hover:bg-white"
                      >
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/90 text-xs font-medium text-foreground">
                        {campaign.category}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{campaign.title}</h3>
                    <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{campaign.description}</p>
                  </div>

                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-foreground">${campaign.current.toLocaleString()}</span>
                      <span className="text-muted-foreground">de ${campaign.goal.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{campaign.backers} colaboradores</span>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                  >
                    Apoyar
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            Ver todas las campañas
          </Button>
        </div>
      </div>
    </section>
  )
}
