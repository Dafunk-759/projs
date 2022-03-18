import {
  Container,
  Typography,
  Stack,
  Divider
} from "../components"

import type { LocalText } from "../context/ThemeContext"
import { useLocalLang } from "../context/ThemeContext"

const enText = {
  h5: "404",
  subtitle2: "Page counld not be found"
}

const zhText: typeof enText = {
  h5: "404",
  subtitle2: "抱歉，页面不存在，检查url是否正确。"
}

const text: LocalText<typeof enText> = {
  enUS: enText,
  zhCN: zhText
}

export default function NotFound() {
  const { locale } = useLocalLang()

  return (
    <Container fixed sx={{ mt: 10 }}>
      <Stack
        direction="row"
        spacing={4}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5">
          {text[locale].h5}
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Typography variant="subtitle2">
          {text[locale].subtitle2}
        </Typography>
      </Stack>
    </Container>
  )
}
