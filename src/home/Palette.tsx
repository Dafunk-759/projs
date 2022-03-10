import { useState } from "react"

import {
  Container,
  Paper,
  Typography,
  Divider,
  Stack,
  Input,
  InputLabel,
  FormHelperText,
  ButtonGroup,
  Button
} from "../components"

import { usePalette } from "../ThemeContext"

import type { PropsWithChildren, OnChange } from "../types"

export default function Palette() {
  const {
    primary,
    secondary,
    previewPalette,
    submitPalette
  } = usePalette()
  const [primaryColor, setPrimaryColor] = useState(primary)
  const [secondaryColor, setSecondaryColor] =
    useState(secondary)

  const onPreview = () => {
    previewPalette(primaryColor, secondaryColor)
  }

  const onSubmit = () => {
    submitPalette(primaryColor, secondaryColor)
  }

  return (
    <Layout>
      <Typography sx={{ m: 1 }} component="h4">
        Palette
      </Typography>
      <Divider sx={{ m: 1 }} />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-around"
      >
        <ColorSelector
          colorValue={primaryColor}
          onChange={e => setPrimaryColor(e.target.value)}
          type="primary"
        />
        <Divider orientation="vertical" flexItem />
        <ColorSelector
          type="secondary"
          colorValue={secondaryColor}
          onChange={e => setSecondaryColor(e.target.value)}
        />
      </Stack>
      <Divider sx={{ m: 1 }} />
      <ButtonGroup
        sx={{ m: 1 }}
        variant="contained"
        aria-label="palette control button group"
      >
        <Button onClick={onPreview}>preview</Button>
        <Button onClick={onSubmit}>submit</Button>
      </ButtonGroup>
    </Layout>
  )
}

function ColorSelector({
  type,
  colorValue,
  onChange
}: {
  type: "primary" | "secondary"
  colorValue: string
  onChange: OnChange
}) {
  const id = type + "-color-selector"

  return (
    <Stack>
      <InputLabel
        htmlFor={id}
      >{`${type} color selector`}</InputLabel>
      <Input
        sx={{
          width: 40,
          height: 40,
          alignSelf: "flex-start"
        }}
        id={id}
        type="color"
        aria-label="color-selector"
        name="color-selector"
        color={type}
        value={colorValue}
        onChange={onChange}
      />
      <FormHelperText>{`selected: ${colorValue}`}</FormHelperText>
    </Stack>
  )
}

function Layout(props: PropsWithChildren) {
  return (
    <Container>
      <Paper sx={{ p: 2 }}>{props.children}</Paper>
    </Container>
  )
}
