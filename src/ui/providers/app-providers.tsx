import React from "react"
import { ThemeProvider } from "../components/theme-provider"

interface AppProvider {
    children: React.ReactNode
}

export const Providers = ({ children }: AppProvider) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  )
}