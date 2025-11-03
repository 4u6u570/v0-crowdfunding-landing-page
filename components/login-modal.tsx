"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.addEventListener("keydown", handleEscape)
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Error al iniciar sesión")
        setIsLoading(false)
        return
      }

      setTimeout(() => {
        if (data.user.role === "admin") {
          window.location.href = "/admin/dashboard"
        } else {
          window.location.href = "/dashboard"
        }
      }, 1500)
    } catch (err) {
      setError("Error de conexión")
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-auto"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 id="modal-title" className="text-2xl font-bold font-heading text-foreground">
              Bienvenido de nuevo 👋
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Ingresá a tu cuenta para continuar.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 text-2xl leading-none"
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        {/* Form content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

          {/* Email input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-lg border-gray-200 focus:border-transparent focus:ring-2 focus:ring-primary transition-all"
              disabled={isLoading}
            />
          </div>

          {/* Password input */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Contraseña
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-lg border-gray-200 focus:border-transparent focus:ring-2 focus:ring-primary transition-all"
              disabled={isLoading}
            />
          </div>

          {/* Remember me checkbox */}
          <div className="flex items-center space-x-2">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 cursor-pointer"
              disabled={isLoading}
            />
            <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
              Recordarme
            </label>
          </div>

          {/* Main submit button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full text-white rounded-lg h-12 font-medium transition-all"
            style={{
              backgroundImage: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)",
              opacity: isLoading ? 0.9 : 1,
            }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Ingresando...</span>
              </div>
            ) : (
              "Ingresar"
            )}
          </Button>

          {/* Forgot password link */}
          <div className="text-center">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-muted-foreground">o</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Create account button */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 rounded-lg font-medium border-gray-200 text-foreground hover:bg-gray-50 transition-colors bg-transparent"
            onClick={() => {
              onClose()
            }}
          >
            Crear cuenta nueva
          </Button>
        </form>
      </div>
    </div>
  )
}
