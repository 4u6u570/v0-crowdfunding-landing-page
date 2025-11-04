"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  { icon: "📊", label: "Dashboard", href: "/admin" },
  { icon: "📦", label: "Campañas", href: "/admin/campaigns" },
  { icon: "🏭", label: "Proveedores", href: "/admin/providers" },
  { icon: "🏪", label: "Comerciantes", href: "/admin/merchants" },
  { icon: "👥", label: "Usuarios", href: "/admin/users" },
  { icon: "🚚", label: "Logística", href: "/admin/logistics" },
]

export function Sidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname()

  return (
    <aside
      className={`fixed md:static inset-y-16 left-0 z-40 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } bg-white border-r border-border overflow-hidden`}
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
            style={{ backgroundImage: "linear-gradient(90deg, #FF7B5F 0%, #FF3D8A 100%)" }}
          >
            👑
          </div>
          {isOpen && <span className="font-bold font-heading">Admin</span>}
        </div>
      </div>

      <nav className="space-y-2 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-gradient-to-r from-[#FF7B5F] to-[#FF3D8A] text-white"
                  : "hover:bg-[#F5F5F5] text-foreground"
              }`}
              title={item.label}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
