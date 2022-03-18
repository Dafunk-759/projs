import {
  AppBar,
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Button,
  Brightness4Icon,
  Brightness7Icon,
  Autocomplete,
  TextField,
  RouterLink,
  Container,
  Stack,
  Avatar,
  ColorLensIcon
} from "../components"

import type {
  SupportedLocales,
  LocalText,
  ColorMode
} from "../context/ThemeContext"
import {
  useDarkLightMode,
  useLocalLang
} from "../context/ThemeContext"

import type { PropsWithChildren, OnClick } from "../types"
import { useNavigate } from "react-router-dom"

import avatarImg from "./avatar.png"

export default function Layout({
  children
}: PropsWithChildren) {
  return (
    <>
      <Header />
      <Container sx={{ mt: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          {children}
        </Stack>
      </Container>
    </>
  )
}

const headerText: LocalText = {
  zhCN: "主页",
  enUS: "Home"
}

function Header() {
  const { mode, toggleColorMode } = useDarkLightMode()
  const { setLocale, locale, locales } = useLocalLang()
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Avatar sx={{ mr: 2 }} alt="Jq" src={avatarImg} />
          <Button
            variant="contained"
            color="inherit"
            component={RouterLink}
            to="/"
          >
            {headerText[locale]}
          </Button>
          <Autocomplete
            options={Object.keys(locales)}
            getOptionLabel={key =>
              `${key.substring(0, 2)}-${key.substring(
                2,
                4
              )}`
            }
            value={locale}
            sx={{ m: 2, ml: "auto", maxWidth: 125 }}
            disableClearable
            onChange={(_, newValue: string | null) => {
              setLocale(newValue as SupportedLocales)
            }}
            renderInput={params => (
              <TextField {...params} label="Locale" />
            )}
          />
          <PaletteIcon
            onClick={() => navigate("/palette")}
          />
          <ColorModeIcon
            onClick={toggleColorMode}
            mode={mode}
          />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

function PaletteIcon({ onClick }: { onClick: OnClick }) {
  return (
    <Tooltip title="edit palette">
      <IconButton onClick={onClick} color="inherit">
        <ColorLensIcon />
      </IconButton>
    </Tooltip>
  )
}

function ColorModeIcon({
  onClick,
  mode
}: {
  onClick: OnClick
  mode: ColorMode
}) {
  return (
    <Tooltip title="change color mode">
      <IconButton onClick={onClick} color="inherit">
        {mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Tooltip>
  )
}
