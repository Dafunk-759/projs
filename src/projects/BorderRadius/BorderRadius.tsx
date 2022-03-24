import { useState } from "react"

import type { OnChange } from "../../types"

import {
  Stack,
  Typography,
  Box,
  TextField,
  CopyButton,
  SelectInput,
  CenterStack as Layout
} from "../../components"

import { useCopy } from "../../hooks"

type Position = "tl" | "tr" | "bl" | "br"
type Unit = "px" | "%"

const toPos = (s: string, unit: string) => {
  if (s.length <= 0) return `0${unit}`
  return s + unit
}

export default function BorderRadius() {
  const [unit, setUnit] = useState<Unit>("px")
  const [tl, setTl] = useState("")
  const [tr, setTr] = useState("")
  const [bl, setBl] = useState("")
  const [br, setBr] = useState("")

  // border-radius 是按顺时针排列的 (上左 上右 下右 下左)
  const borderRadius = [tl, tr, br, bl]
    .map(s => toPos(s, unit))
    .join(" ")

  return (
    <Layout
      alignItems="center"
      sx={{
        "& > :not(style)": { m: 2 }
      }}
    >
      <Typography variant="h4">border radius</Typography>

      <Preview borderRadius={borderRadius} />

      <SelectInput
        sx={{ minWidth: 120, alignSelf: "flex-start" }}
        name="unit"
        label="单位"
        options={[
          { name: "%", value: "%" },
          { name: "px", value: "px" }
        ]}
        value={unit}
        onChange={e => setUnit(e.target.value as Unit)}
      />

      <Stack
        sx={{ alignSelf: "stretch" }}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <RadiusInput
          position="tl"
          value={tl}
          setValue={setTl}
          label="top-left"
        />
        <RadiusInput
          position="tr"
          value={tr}
          setValue={setTr}
          label="top-right"
        />
        <RadiusInput
          position="bl"
          value={bl}
          setValue={setBl}
          label="bottom-left"
        />
        <RadiusInput
          position="br"
          value={br}
          setValue={setBr}
          label="bottom-right"
        />
      </Stack>

      <Code borderRadius={borderRadius} />
    </Layout>
  )
}

function RadiusInput({
  value,
  setValue,
  position,
  label
}: {
  value: string
  setValue: (s: string) => void
  position: Position
  label: string
}) {
  const onChange: OnChange = e => {
    const value = e.target.value
    if (value !== undefined && value !== null) {
      if (Array.from(value).every(c => /[0-9]/.test(c))) {
        setValue(value)
      }
    }
  }

  return (
    <TextField
      id={position}
      label={label}
      variant="outlined"
      size="small"
      value={value}
      onChange={onChange}
    />
  )
}

type Props = {
  borderRadius: string
}

function Preview({ borderRadius }: Props) {
  return (
    <Box
      sx={[
        {
          width: 300,
          height: 300,
          backgroundColor: "primary.main",
          display: "flex",
          borderRadius,
          transition: "border-radius 0.75s ease"
        },
        theme => ({
          [theme.breakpoints.down("sm")]: {
            width: 200,
            height: 200
          }
        })
      ]}
    ></Box>
  )
}

function Code({ borderRadius }: Props) {
  const code = `border-radius: ${borderRadius};`
  const { copySuccess, copyText } = useCopy()

  return (
    <Box
      sx={{
        alignSelf: "stretch",
        borderRadius: "5px",
        bgcolor: "secondary.main",
        p: 2,
        display: "flex",
        flexFlow: "column",
        overflow: "auto"
      }}
    >
      <CopyButton
        onClick={() => copyText(code)}
        sx={{ alignSelf: "flex-end" }}
        color={copySuccess ? "success" : "default"}
      />
      <pre>
        <code>{code}</code>
      </pre>
    </Box>
  )
}
