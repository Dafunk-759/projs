import { createContext, useState, useContext } from "react"
import { useTheme } from "@mui/material/styles"

type PaletteContext = {
  previewPalette: (
    primary: string,
    secondary: string
  ) => void
  submitPalette: (
    primary: string,
    secondary: string
  ) => void
}

const paletteContext = createContext<PaletteContext>({
  previewPalette: (
    primary: string,
    secondary: string
  ) => {},
  submitPalette: (primary: string, secondary: string) => {}
})

export const PaletteProvider = paletteContext.Provider

export function usePaletteState() {
  const [paletteState, setPaletteState] = useState({
    primary:
      localStorage.getItem("theme.palette.primary") ??
      "#1976d2",
    secondary:
      localStorage.getItem("theme.palette.secondary") ??
      "#9c27b0"
  })

  const palette: PaletteContext = {
    previewPalette: (primary, secondary) => {
      setPaletteState({
        primary,
        secondary
      })
    },
    submitPalette: (primary, secondary) => {
      localStorage.setItem("theme.palette.primary", primary)
      localStorage.setItem(
        "theme.palette.secondary",
        secondary
      )
      setPaletteState({
        primary,
        secondary
      })
    }
  }

  return {
    palette,
    paletteState
  }
}

export function usePalette() {
  const theme = useTheme()
  const { previewPalette, submitPalette } =
    useContext(paletteContext)

  return {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    previewPalette,
    submitPalette
  }
}
