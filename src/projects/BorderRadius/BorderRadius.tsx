import { useState } from "react"

import type {
  PropsWithChildren,
  OnChange,
  OnClick
} from "../../types"

import {
  Container,
  Paper,
  Stack,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  IconButton,
  ContentCopyIcon
} from "../../components"

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
    <Layout>
      <Typography variant="h4">border radius</Typography>

      <Preview borderRadius={borderRadius} />

      <FormControl
        sx={{ minWidth: 120, alignSelf: "flex-start" }}
      >
        <InputLabel id="unit-label">单位</InputLabel>
        <Select
          labelId="unit-label"
          id="unit-select"
          label="unit"
          value={unit}
          onChange={e => setUnit(e.target.value as Unit)}
        >
          <MenuItem value="%">%</MenuItem>
          <MenuItem value="px">px</MenuItem>
        </Select>
      </FormControl>

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

function Layout({ children }: PropsWithChildren) {
  return (
    <Container sx={{ marginBottom: 2 }}>
      <Paper>
        <Stack
          alignItems="center"
          sx={{
            "& > :not(style)": { m: 2 }
          }}
        >
          {children}
        </Stack>
      </Paper>
    </Container>
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
        success={copySuccess}
        onClick={() => copyText(code)}
      />
      <pre>
        <code>{code}</code>
      </pre>
    </Box>
  )
}

function CopyButton({
  onClick,
  success
}: {
  onClick: OnClick
  success: boolean
}) {
  return (
    <Tooltip title="copy">
      <IconButton
        sx={{ alignSelf: "flex-end" }}
        aria-label="copy"
        onClick={onClick}
        color={success ? "success" : "default"}
      >
        <ContentCopyIcon />
      </IconButton>
    </Tooltip>
  )
}

function useCopy(successTime: number = 2000) {
  const [copySuccess, setCopyState] = useState(false)

  const copyText = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(_ => {
        // copy 成功后2s内显示成功
        // 2s 后恢复初始状态
        setCopyState(true)

        setTimeout(() => {
          setCopyState(false)
        }, successTime)
      })
      .catch(_ => setCopyState(false))
  }

  return {
    copySuccess,
    copyText
  }
}