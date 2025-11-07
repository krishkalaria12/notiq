import React from "react"
import { ThemeProvider } from "./theme-provider"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

interface AppProvider {
    children: React.ReactNode
}

export const Providers = ({ children }: AppProvider) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  )
}