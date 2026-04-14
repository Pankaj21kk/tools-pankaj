"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"

export const AnimatedThemeToggler = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button">) => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const initializeTheme = () => {
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme === "dark" || savedTheme === "light") {
        document.documentElement.classList.toggle("dark", savedTheme === "dark")
        setIsDark(savedTheme === "dark")
        return
      }

      // Start with light mode unless the user has explicitly chosen a theme.
      document.documentElement.classList.remove("dark")
      setIsDark(false)
    }

    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    initializeTheme()
    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    document.documentElement.classList.toggle("dark", newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label="Toggle theme"
      className={cn(className)}
      {...props}
    >
      {isDark ? <Sun /> : <Moon />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
