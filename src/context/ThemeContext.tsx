import type { PropsWithChildren } from "../types"

import {
  createTheme,
  ThemeProvider
} from "@mui/material/styles"

import {
  useLocalState,
  LocalProvider
} from "./LocalLangContext"
export type {
  SupportedLocales,
  LocalContext,
  LocalText
} from "./LocalLangContext"
export { useLocalLang } from "./LocalLangContext"

import {
  useColorModeState,
  ColorModeProvider
} from "./ColorModeContext"
export type { ColorMode } from "./ColorModeContext"
export { useColorMode as useDarkLightMode } from "./ColorModeContext"

import {
  usePaletteState,
  PaletteProvider
} from "./PaletteContext"
export { usePalette } from "./PaletteContext"

export function AppTheme({ children }: PropsWithChildren) {
  const { mode, colorMode } = useColorModeState()

  const localLang = useLocalState()
  const { locales, locale } = localLang

  const { paletteState, palette } = usePaletteState()

  const theme = createTheme(
    {
      palette: {
        mode,
        primary: {
          main: paletteState.primary
        },
        secondary: {
          main: paletteState.secondary
        }
      }
    },
    locales[locale]
  )

  return (
    <PaletteProvider value={palette}>
      <LocalProvider value={localLang}>
        <ColorModeProvider value={colorMode}>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </ColorModeProvider>
      </LocalProvider>
    </PaletteProvider>
  )
}
