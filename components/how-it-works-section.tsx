import { Lightbulb, Users, Rocket, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Lightbulb,
    title: "Crea tu campaña",
    description: "Define tu proyecto, establece tu meta y comparte tu visión con el mundo.",
    color: "from-primary to-primary/70",
  },
  {
    icon: Users,
    title: "Conecta con tu comunidad",
    description: "Comparte tu campaña y atrae a personas que creen en tu idea.",
    color: "from-secondary to-secondary/70",
  },
  {
    icon: Rocket,
    title: "Alcanza tu meta",
    description: "Recibe el apoyo necesario para hacer realidad tu proyecto.",
    color: "from-accent to-accent/70",
  },
  {
    icon: CheckCircle,
    title: "Haz realidad tu visión",
    description: "Cumple tu promesa y construye una relación duradera con tus colaboradores.",
    color: "from-primary to-secondary",
  },
]

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-balance">
            <span className="text-foreground">Cómo </span>
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              funciona
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Cuatro pasos simples para transformar tu idea en realidad
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative group">
                <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg h-full">
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
