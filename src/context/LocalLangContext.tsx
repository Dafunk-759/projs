import { createContext, useState, useContext } from "react"
import { zhCN, enUS } from "@mui/material/locale"

const locales = {
  zhCN,
  enUS
}

export type SupportedLocales = keyof typeof locales

export type LocalContext = {
  setLocale: (lang: SupportedLocales) => void
  locale: SupportedLocales
  locales: typeof locales
}

export type LocalText<A = string> = {
  [key in SupportedLocales]: A
}

const localContext = createContext<LocalContext>({
  setLocale: (lang: SupportedLocales) => {}
} as LocalContext)

export const LocalProvider = localContext.Provider

export function useLocalState() {
  const [locale, setLocale] =
    useState<SupportedLocales>("zhCN")

  const localLang = {
    setLocale,
    locale,
    locales
  }

  return localLang
}

export function useLocalLang() {
  return useContext(localContext)
}
