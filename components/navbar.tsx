"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { useEffect, useState } from "react"
import { LoginModal } from "@/components/login-modal"

export function Navbar() {
  const [activeSection, setActiveSection] = useState("inicio")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "como-funciona", "campanas", "unete"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#como-funciona", label: "Cómo funciona" },
    { href: "#campanas", label: "Campañas" },
    { href: "#unete", label: "Únete" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="#inicio" onClick={handleNavClick}>
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative ${
                  activeSection === link.href.slice(1)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)" }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setLoginModalOpen(true)
                setMobileMenuOpen(false)
              }}
            >
              Iniciar sesión
            </Button>
            <Button
              size="sm"
              className="text-white hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)" }}
              asChild
            >
              <Link href="/register">Comenzar</Link>
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              // Close icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Menu icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white/95 backdrop-blur-md animate-fade-in">
            <div className="flex flex-col space-y-4 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className={`text-base font-medium transition-colors py-2 ${
                    activeSection === link.href.slice(1) ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border pt-4 flex flex-col gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setLoginModalOpen(true)
                    handleNavClick()
                  }}
                  className="justify-start"
                >
                  Iniciar sesión
                </Button>
                <Button
                  size="sm"
                  className="text-white hover:opacity-90 transition-opacity justify-start"
                  style={{ background: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)" }}
                  asChild
                >
                  <Link href="/register" onClick={handleNavClick}>
                    Comenzar
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </nav>
  )
}
