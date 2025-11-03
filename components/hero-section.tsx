import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 -z-10" />

      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Lanzamiento Beta 2025</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Impulsa tus ideas
            </span>
            <br />
            <span className="text-foreground">con compras colectivas</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Conecta con una comunidad que cree en tu proyecto. Lanza campañas de compra colectiva y haz realidad tus
            ideas con el apoyo de personas reales.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-base px-8"
              asChild
            >
              <Link href="/register">
                Crear campaña
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 bg-transparent" asChild>
              <Link href="#campanas">Explorar proyectos</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-sm text-muted-foreground">Proyectos financiados</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                $2M+
              </div>
              <div className="text-sm text-muted-foreground">Recaudados</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                10K+
              </div>
              <div className="text-sm text-muted-foreground">Colaboradores</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
