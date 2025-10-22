"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const disableLocalStorage = process.env.NEXT_PUBLIC_DISABLE_LOCAL_STORAGE === 'true'
  // When local storage is disabled, force a non-persistent theme to avoid localStorage usage
  const providerProps: ThemeProviderProps = disableLocalStorage
    ? { ...props, forcedTheme: props.forcedTheme ?? 'light', enableSystem: false }
    : props

  return <NextThemesProvider {...providerProps}>{children}</NextThemesProvider>
}
