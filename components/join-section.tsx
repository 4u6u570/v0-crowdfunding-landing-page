import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Zap } from "lucide-react"
import Link from "next/link"

export function JoinSection() {
  return (
    <section
      id="unete"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary/20">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Únete a la comunidad</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-balance">
            <span className="text-foreground">¿Listo para </span>
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              hacer realidad
            </span>
            <br />
            <span className="text-foreground">tu proyecto?</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Únete a miles de emprendedores y pequeños proveedores que ya están transformando sus ideas en negocios
            exitosos con el apoyo de nuestra comunidad.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-base px-8"
              asChild
            >
              <Link href="/register">
                Crear mi campaña
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 bg-white/80 backdrop-blur-sm" asChild>
              <Link href="/login">
                <Users className="mr-2 w-5 h-5" />
                Explorar comunidad
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 max-w-3xl mx-auto">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">95%</div>
              <div className="text-xs text-muted-foreground">Tasa de éxito</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">24h</div>
              <div className="text-xs text-muted-foreground">Tiempo de aprobación</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">0%</div>
              <div className="text-xs text-muted-foreground">Comisión inicial</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">24/7</div>
              <div className="text-xs text-muted-foreground">Soporte</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
