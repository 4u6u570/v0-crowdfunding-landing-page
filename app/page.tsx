"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"

// Simple icon components
const IconShirt = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 2H8L6 6v12h12V6l-2-4z" />
  </svg>
)

const IconLaptop = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h7v2H9v2h6v-2h-2v-2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z" />
  </svg>
)

const IconCoffee = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.5 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h13.5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 6h2v2h-2V9zm-11-3h8v2H6.5V6z" />
  </svg>
)

const IconWatch = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
  </svg>
)

const IconBag = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 6h-2V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4-2h-4v2h4V4z" />
  </svg>
)

const IconGamepad = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 2H3c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 9h-2v2H8v-2H6v-1h2V8h1v2h2v1z" />
  </svg>
)

const IconSparkles = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const IconHome = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
)

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FeaturedCampaignsSection />
      <JoinSection />
      <Footer />
    </main>
  )
}

function HeroSection() {
  const [counts, setCounts] = useState({ projects: 0, raised: 0, supporters: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    const targets = { projects: 200, raised: 5, supporters: 3 }
    let step = 0

    const timer = setInterval(() => {
      step++
      setCounts({
        projects: Math.floor((targets.projects / steps) * step),
        raised: Math.floor((targets.raised / steps) * step * 10) / 10,
        supporters: Math.floor((targets.supporters / steps) * step),
      })

      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 60
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 60
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const floatingIcons = [
    { Icon: IconShirt, x: "8%", y: "15%", speed: 0.8, delay: 0, color: "#FF7B5F", size: 72 },
    { Icon: IconLaptop, x: "88%", y: "12%", speed: 1.2, delay: 0.1, color: "#FF3D8A", size: 80 },
    { Icon: IconCoffee, x: "5%", y: "40%", speed: 1.1, delay: 0.4, color: "#FF7B5F", size: 56 },
    { Icon: IconWatch, x: "92%", y: "45%", speed: 0.85, delay: 0.5, color: "#FF3D8A", size: 64 },
    { Icon: IconBag, x: "12%", y: "75%", speed: 1.0, delay: 0.2, color: "#B06AB3", size: 68 },
    { Icon: IconGamepad, x: "85%", y: "72%", speed: 0.9, delay: 0.3, color: "#FF6B6B", size: 76 },
    { Icon: IconSparkles, x: "25%", y: "25%", speed: 1.15, delay: 0.6, color: "#B06AB3", size: 52 },
    { Icon: IconHome, x: "75%", y: "28%", speed: 0.95, delay: 0.7, color: "#FF6B6B", size: 60 },
  ]

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 md:pt-24 lg:pt-32 overflow-hidden bg-[#FAFAFA] pb-12 sm:pb-16 md:pb-20 lg:pb-24"
    >
      <div className="absolute inset-0 z-0 hidden md:block">
        <div
          className="absolute w-[600px] h-[600px] rounded-full transition-transform duration-300 ease-out"
          style={{
            top: "-200px",
            left: "-200px",
            backgroundColor: "rgba(255, 99, 71, 0.15)",
            filter: "blur(100px)",
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full transition-transform duration-300 ease-out"
          style={{
            bottom: "-200px",
            right: "-200px",
            backgroundColor: "rgba(176, 106, 179, 0.15)",
            filter: "blur(100px)",
            transform: `translate(${mousePosition.x}px, ${-mousePosition.y}px)`,
          }}
        />
      </div>

      <div className="absolute inset-0 z-[5] pointer-events-none hidden md:block">
        {floatingIcons.map((item, index) => (
          <div
            key={index}
            className="absolute transition-all duration-500 ease-out animate-float"
            style={{
              left: item.x,
              top: item.y,
              transform: `translate(${mousePosition.x * item.speed}px, ${mousePosition.y * item.speed}px)`,
              animationDelay: `${item.delay}s`,
            }}
          >
            <div
              className="flex items-center justify-center shadow-lg backdrop-blur-sm"
              style={{
                width: `${item.size * 0.8}px`,
                height: `${item.size * 0.8}px`,
                borderRadius: "20px",
                backgroundImage: `linear-gradient(135deg, ${item.color}20, ${item.color}40)`,
                border: `2px solid ${item.color}30`,
              }}
            >
              <div style={{ width: `${item.size * 0.4}px`, height: `${item.size * 0.4}px`, color: item.color }}>
                <item.Icon />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-7 md:space-y-8 animate-fade-in">
          <div className="flex flex-col items-center gap-2 pt-6 md:pt-4">
            <div className="flex items-center -space-x-2">
              <img
                src="/young-woman-casual-style.jpg"
                alt="User avatar"
                className="w-6 sm:w-8 md:w-8 h-6 sm:h-8 md:h-8 rounded-full border-2 border-white shadow-md object-cover"
              />
              <img
                src="/young-man-streetwear.jpg"
                alt="User avatar"
                className="w-6 sm:w-8 md:w-8 h-6 sm:h-8 md:h-8 rounded-full border-2 border-white shadow-md object-cover"
              />
              <img
                src="/young-woman-colorful-outfit.jpg"
                alt="User avatar"
                className="w-6 sm:w-8 md:w-8 h-6 sm:h-8 md:h-8 rounded-full border-2 border-white shadow-md object-cover"
              />
              <img
                src="/young-man-casual-tshirt.jpg"
                alt="User avatar"
                className="w-6 sm:w-8 md:w-8 h-6 sm:h-8 md:h-8 rounded-full border-2 border-white shadow-md object-cover"
              />
              <img
                src="/young-woman-denim-jacket.jpg"
                alt="User avatar"
                className="w-6 sm:w-8 md:w-8 h-6 sm:h-8 md:h-8 rounded-full border-2 border-white shadow-md object-cover"
              />
              <img
                src="/young-woman-colorful-outfit.jpg"
                alt="User avatar"
                className="w-6 sm:w-8 md:w-8 h-6 sm:h-8 md:h-8 rounded-full border-2 border-white shadow-md object-cover"
              />
            </div>
            <p className="text-xs sm:text-xs md:text-sm text-[#6F6F6F] font-medium">
              +100 personas participando en campañas colectivas
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-heading text-balance leading-tight">
            <span className="text-[#1E1E1E]">Compramos mejor, </span>
            <span className="inline-block juntos-gradient-static">juntos.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#6F6F6F] max-w-2xl mx-auto text-pretty font-medium">
            Conectamos proveedores y comercios para realizar compras colectivas seguras. Los fondos se resguardan hasta
            completar cada lote.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto hover:opacity-90 transition-opacity text-base sm:text-lg px-6 sm:px-8 h-11 sm:h-12 shadow-lg rounded-xl"
              style={{
                backgroundImage: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)",
                color: "#FFFFFF",
                textShadow: "0 1px 2px rgba(0,0,0,0.25)",
              }}
              asChild
            >
              <Link href="#campanas">Explorar campañas activas</Link>
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-auto text-white bg-black hover:bg-[#1A1A1A] transition-colors text-base sm:text-lg px-6 sm:px-8 h-11 sm:h-12 shadow-lg rounded-xl"
              asChild
            >
              <Link href="/proveedor">Quiero ser proveedor</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pt-6 sm:pt-8 md:pt-10 max-w-3xl mx-auto pb-12 sm:pb-16 md:pb-20">
            <div
              className="space-y-1 sm:space-y-2 bg-white rounded-xl p-3 sm:p-4 md:p-5 shadow-sm"
              style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-[#1E1E1E]">
                +{counts.projects}
              </div>
              <div className="text-xs sm:text-xs md:text-sm text-[#6F6F6F] font-medium">campañas completadas</div>
            </div>
            <div
              className="space-y-1 sm:space-y-2 bg-white rounded-xl p-3 sm:p-4 md:p-5 shadow-sm"
              style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-[#1E1E1E]">
                +${counts.raised}M
              </div>
              <div className="text-xs sm:text-xs md:text-sm text-[#6F6F6F] font-medium">en compras colectivas</div>
            </div>
            <div
              className="space-y-1 sm:space-y-2 bg-white rounded-xl p-3 sm:p-4 md:p-5 shadow-sm col-span-1 sm:col-span-2 lg:col-span-1"
              style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-[#1E1E1E]">
                +{counts.supporters}K
              </div>
              <div className="text-xs sm:text-xs md:text-sm text-[#6F6F6F] font-medium">comercios participando</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      number: "1",
      title: "Explorá campañas activas",
      description: "Descubrí lotes disponibles en distintas categorías.",
    },
    {
      number: "2",
      title: "Reservá tus cupos",
      description:
        "Elegí la cantidad de unidades o cupos que querés asegurar. Los fondos quedan protegidos hasta cumplir la meta.",
    },
    {
      number: "3",
      title: "Meta alcanzada",
      description:
        "Si la campaña se completa, el proveedor nacional despacha o nuestro equipo importa el lote y lo distribuye localmente.",
    },
    {
      number: "4",
      title: "Recibí tu pedido",
      description: "Cada participante recibe su parte del lote de forma segura y controlada.",
    },
  ]

  return (
    <section id="como-funciona" ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center space-y-4 mb-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading">
            Cómo funciona nuestra red de compras colectivas
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un modelo simple y transparente que une a proveedores y comerciantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card
              key={index}
              className={`p-6 space-y-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-2 rounded-xl ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundImage: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)" }}
                >
                  {step.number}
                </div>
              </div>
              <h3 className="text-lg font-semibold font-heading">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </Card>
          ))}
        </div>

        <div
          className={`mt-12 max-w-3xl mx-auto ${isVisible ? "animate-fade-in" : "opacity-0"}`}
          style={{ animationDelay: "400ms" }}
        >
          <Card
            className="p-6 rounded-xl border-2"
            style={{
              backgroundColor: "#E8F9EF",
              borderColor: "#C5EBD0",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1 text-2xl">💚</div>
              <div className="space-y-2">
                <h4 className="font-semibold font-heading text-lg" style={{ color: "#1B5E20" }}>
                  Protección garantizada
                </h4>
                <p className="text-sm" style={{ color: "#1B5E20" }}>
                  Los fondos se retienen hasta que la campaña se completa o finaliza. Si no se cumple la meta, se
                  devuelve automáticamente.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const testimonials = [
    {
      quote: "Gracias a la red pude vender mi producción completa en menos de una semana.",
      author: "Lucía",
      role: "productora textil",
      image: "/woman-designer-portrait.png",
    },
    {
      quote: "Antes compraba caro y en poca cantidad. Ahora me uno a campañas y accedo a precios de fábrica.",
      author: "Martín",
      role: "comerciante minorista",
      image: "/entrepreneur-portrait.png",
    },
    {
      quote: "Compramos juntos desde Salta, Mendoza y Tucumán. Todo llegó en tiempo y forma.",
      author: "Carla",
      role: "distribuidora",
      image: "/woman-artisan-portrait.jpg",
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center space-y-4 mb-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading">Historias reales</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`p-8 space-y-6 hover:shadow-lg transition-all duration-300 bg-white border-2 rounded-xl ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              }}
            >
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="w-16 h-16 rounded-full object-cover border-2"
                  style={{ borderColor: "#FF7B5F" }}
                />
                <div>
                  <div className="font-semibold font-heading">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedCampaignsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 2)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 2) % 2)
  }

  const campaigns = [
    {
      title: "Café artesanal orgánico",
      description: "Café de especialidad cultivado en las sierras con métodos sostenibles",
      image: "/organic-coffee-beans-artisan.jpg",
      raised: 38500,
      goal: 50000,
      supporters: 127,
      timeLeft: "12 días",
      status: "active",
    },
    {
      title: "Ropa sostenible",
      description: "Moda consciente hecha con materiales reciclados y producción local",
      image: "/sustainable-fashion.png",
      raised: 45200,
      goal: 60000,
      supporters: 203,
      timeLeft: "8 días",
      status: "active",
    },
    {
      title: "Juguetes educativos",
      description: "Juguetes de madera que estimulan la creatividad y el aprendizaje",
      image: "/wooden-educational-toys-children.jpg",
      raised: 52800,
      goal: 70000,
      supporters: 315,
      timeLeft: "5 días",
      status: "active",
    },
    {
      title: "Productos de limpieza ecológicos",
      description: "Limpiadores biodegradables para el hogar y comercio",
      image: "/eco-cleaning-products.jpg",
      raised: 28000,
      goal: 40000,
      supporters: 89,
      timeLeft: "15 días",
      status: "active",
    },
    {
      title: "Especias y condimentos gourmet",
      description: "Mezclas artesanales de especias de productores locales",
      image: "/gourmet-spices.jpg",
      raised: 19500,
      goal: 30000,
      supporters: 67,
      timeLeft: "10 días",
      status: "active",
    },
    {
      title: "Accesorios de cuero artesanal",
      description: "Billeteras, cinturones y bolsos hechos a mano",
      image: "/leather-accessories.jpg",
      raised: 41000,
      goal: 55000,
      supporters: 142,
      timeLeft: "6 días",
      status: "active",
    },
  ]

  return (
    <section id="campanas" ref={sectionRef} className="py-16 sm:py-24 bg-gradient-to-b from-secondary/20 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center space-y-4 mb-12 sm:mb-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading">
            Campañas de compra colectiva activas
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Sumate a lotes abiertos y accedé a precios mayoristas verificados.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {[0, 1].map((slideIndex) => (
                <div
                  key={slideIndex}
                  className="min-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2"
                >
                  {campaigns.slice(slideIndex * 3, slideIndex * 3 + 3).map((campaign, index) => (
                    <CampaignCard
                      key={slideIndex * 3 + index}
                      campaign={campaign}
                      index={slideIndex * 3 + index}
                      isVisible={isVisible}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
            style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
          >
            <svg className="w-6 h-6" style={{ color: "#FF7B5F" }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
            style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
          >
            <svg className="w-6 h-6" style={{ color: "#FF7B5F" }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Button
            size="lg"
            className="w-full sm:w-auto text-white hover:opacity-90 transition-opacity text-base sm:text-lg px-6 sm:px-8 h-11 sm:h-12 rounded-xl"
            style={{
              backgroundImage: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)",
            }}
            asChild
          >
            <Link href="/campanas">Ver todas las campañas</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function CampaignCard({ campaign, index, isVisible }: { campaign: any; index: number; isVisible: boolean }) {
  const isCompleted = campaign.status === "completed"

  return (
    <Card
      className={`overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-2 rounded-xl ${
        isVisible ? "animate-fade-in" : "opacity-0"
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <div className="relative">
        <img src={campaign.image || "/placeholder.svg"} alt={campaign.title} className="w-full h-48 object-cover" />
        {isCompleted && (
          <div
            className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-sm font-semibold"
            style={{ backgroundColor: "#2ECC71" }}
          >
            Meta alcanzada
          </div>
        )}
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold font-heading">{campaign.title}</h3>
        <p className="text-sm text-muted-foreground">{campaign.description}</p>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
            <span>Progreso del lote</span>
            <span>{Math.round((campaign.raised / campaign.goal) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(campaign.raised / campaign.goal) * 100}%`,
                backgroundImage: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)",
              }}
            />
          </div>
          <div className="flex justify-between text-sm pt-2">
            <div className="flex flex-col">
              <span className="font-semibold">${campaign.raised.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">de ${campaign.goal.toLocaleString()}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-semibold">{campaign.supporters}</span>
              <span className="text-xs text-muted-foreground">cupos reservados</span>
            </div>
          </div>
          {!isCompleted && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground text-pretty">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <span>Tiempo restante: {campaign.timeLeft}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {isCompleted ? (
            <Button
              className="flex-1 text-white hover:opacity-90 transition-opacity rounded-xl"
              style={{
                backgroundImage: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)",
              }}
              asChild
            >
              <Link href={`/campana/${index + 1}`}>Ver lote</Link>
            </Button>
          ) : (
            <>
              <Button
                className="flex-1 text-white hover:opacity-90 transition-opacity rounded-xl"
                style={{
                  backgroundImage: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)",
                }}
                asChild
              >
                <Link href={`/campana/${index + 1}`}>Reservar cupo</Link>
              </Button>
              <Button
                variant="outline"
                className="border-2 bg-white rounded-xl hover:bg-gray-50"
                style={{ borderColor: "#EAEAEA", color: "#FF3D8A" }}
                asChild
              >
                <Link href={`/campana/${index + 1}`}>Ver lote</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}

function JoinSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { label: "95% tasa de éxito" },
    { label: "24h tiempo de aprobación" },
    { label: "0% comisión inicial" },
    { label: "Soporte 24/7" },
  ]

  return (
    <section id="unete" ref={sectionRef} className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 ${isVisible ? "animate-fade-in" : "opacity-0"}`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading">
            Sumate a la red de compras colectivas.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Ya seas proveedor o comerciante, podés unirte a nuestra comunidad y aprovechar los beneficios de comprar en
            grupo. Nosotros garantizamos la transparencia, los fondos y la entrega.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto text-white hover:opacity-90 transition-opacity text-base sm:text-lg px-6 sm:px-8 h-11 sm:h-12 rounded-xl"
              style={{
                backgroundImage: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)",
              }}
              asChild
            >
              <Link href="/proveedor">Registrarme como proveedor</Link>
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-auto border-2 text-base sm:text-lg px-6 sm:px-8 h-11 sm:h-12 bg-white rounded-xl hover:bg-gray-50"
              style={{ borderColor: "#EAEAEA", color: "#1E1E1E" }}
              asChild
            >
              <Link href="#campanas">Explorar campañas activas</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 sm:pt-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`flex flex-col items-center gap-2 sm:gap-3 ${isVisible ? "animate-fade-in" : "opacity-0"}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className="w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundImage: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)" }}
                >
                  <svg className="w-5 sm:w-6 h-5 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-medium text-center">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer
      className="border-t border-border"
      style={{ backgroundImage: "linear-gradient(90deg, rgba(255, 123, 95, 0.1) 0%, rgba(255, 61, 138, 0.1) 100%)" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundImage: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)" }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.5 13.5A1.5 1.5 0 003 12c0-.83.67-1.5 1.5-1.5S6 11.17 6 12a1.5 1.5 0 01-1.5 1.5zm0-4A1.5 1.5 0 003 8c0-.83.67-1.5 1.5-1.5S6 7.17 6 8a1.5 1.5 0 01-1.5 1.5z" />
                </svg>
              </div>
              <span className="text-xl font-bold font-heading">Crowdfund</span>
            </div>
            <p className="text-sm text-muted-foreground">Impulsando el comercio con compras colectivas</p>
          </div>

          <div>
            <h4 className="font-semibold font-heading mb-4">Plataforma</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#como-funciona" className="hover:text-foreground transition-colors">
                  Cómo funciona
                </Link>
              </li>
              <li>
                <Link href="#campanas" className="hover:text-foreground transition-colors">
                  Campañas
                </Link>
              </li>
              <li>
                <Link href="/proveedor" className="hover:text-foreground transition-colors">
                  Ser proveedor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold font-heading mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/preguntas-frecuentes" className="hover:text-foreground transition-colors">
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/soporte" className="hover:text-foreground transition-colors">
                  Soporte
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold font-heading mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/terminos" className="hover:text-foreground transition-colors">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-foreground transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-foreground transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>Hecho con ❤️ en Latinoamérica — © 2025 Crowdfunding</p>
        </div>
      </div>
    </footer>
  )
}
