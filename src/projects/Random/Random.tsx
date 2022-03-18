import { useState, useRef } from "react"

import {
  Container,
  Paper,
  Stack,
  Typography,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  TextField,
  MenuItem,
  Skeleton,
  Box
} from "../../components"

import type {
  PropsWithChildren,
  OnChange
} from "../../types"

import { useAppSelector, useAppDispatch } from "../../store"
import { selectAll, updateState } from "./randomSlice"

type InputType = "count" | "min" | "max"
type NumberInputDetail = {
  label: string
  placeholder: string
  range: [number, number]
  helperText: string
}

const numberInputTable: Record<
  InputType,
  NumberInputDetail
> = {
  count: {
    label: "数目",
    placeholder: "随机数的数目",
    range: [1, 10],
    helperText: "生成的随机数的数目(1-10)"
  },
  min: {
    label: "最小值",
    placeholder: "随机数的最小值",
    range: [0, 1e9],
    helperText: "生成的随机数的最小值(0-1e9)"
  },
  max: {
    label: "最大值",
    placeholder: "随机数的最大值",
    range: [0, 1e9],
    helperText: "生成的随机数的最大值(0-1e9)"
  }
}

export default function Random() {
  const state = useAppSelector(selectAll)
  const dispatch = useAppDispatch()

  const [count, setCount] = useState(state.count)
  const [min, setMin] = useState(state.min)
  const [max, setMax] = useState(state.max)
  const [sole, setSole] = useState(state.sole)

  const error = max < min

  const { running, start, cancel } = useRandomNumber(
    () => dispatch(updateState({ count, min, max, sole })),
    50
  )

  return (
    <Layout>
      <Typography sx={{ alignSelf: "center" }} variant="h5">
        随机数生成器
      </Typography>
      <NumberInput
        value={count}
        onChange={e => setCount(+e.target.value)}
        type="count"
        disabled={running}
      />
      <NumberInput
        error={error}
        value={min}
        onChange={e => setMin(+e.target.value)}
        type="min"
        disabled={running}
      />
      <NumberInput
        error={error}
        value={max}
        onChange={e => setMax(+e.target.value)}
        type="max"
        disabled={running}
      />
      <SelectInput
        disabled={running}
        sole={sole}
        setSole={setSole}
      />
      <Button
        disabled={error}
        variant="contained"
        sx={{ alignSelf: "center" }}
        onClick={running ? cancel : start}
      >
        {running ? "结束" : "生成"}
      </Button>
      <ShowResult result={state.result} />
    </Layout>
  )
}

function useRandomNumber(cb: () => void, ms: number) {
  const [running, setRunning] = useState(false)
  const timmerRef = useRef<number>()

  function start() {
    setRunning(true)
    timmerRef.current = setInterval(cb, ms)
  }

  function cancel() {
    setRunning(false)
    clearInterval(timmerRef.current)
  }

  return {
    running,
    start,
    cancel
  }
}

function Layout({ children }: PropsWithChildren) {
  return (
    <Container sx={{marginBottom: 2}}>
      <Paper>
        <Stack
          alignItems="stretch"
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

function NumberInput({
  type,
  value,
  onChange,
  disabled,
  error = false
}: {
  type: InputType
  value: number
  onChange: OnChange
  disabled: boolean
  error?: boolean
}) {
  const { label, placeholder, range, helperText } =
    numberInputTable[type]

  const [min, max] = range
  const helperTextId = `${type}-helper-text`

  return (
    <FormControl variant="standard" error={error}>
      <InputLabel htmlFor={type}>{label}</InputLabel>
      <Input
        id={type}
        inputProps={{
          "aria-label": type,
          type: "number",
          placeholder,
          min,
          max
        }}
        value={value}
        onChange={onChange}
        fullWidth
        aria-describedby={helperTextId}
        disabled={disabled}
      />
      <FormHelperText id={helperTextId}>
        {helperText}
      </FormHelperText>
    </FormControl>
  )
}

function SelectInput({
  sole,
  setSole,
  disabled
}: {
  sole: boolean
  setSole: (sole: boolean) => void
  disabled: boolean
}) {
  const selectOptions = [
    {
      value: "sole",
      label: "唯一"
    },
    {
      value: "notSole",
      label: "不唯一"
    }
  ]

  return (
    <TextField
      id="select-sole"
      select
      label="是否唯一"
      value={sole ? "sole" : "notSole"}
      variant="standard"
      onChange={e => {
        switch (e.target.value) {
          case "sole":
            return setSole(true)
          case "notSole":
            return setSole(false)
        }
      }}
      helperText="请选择是否生成的随机数是否唯一"
      disabled={disabled}
    >
      {selectOptions.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

function ShowResult({ result }: { result: number[] }) {
  const { copyText } = useCopy()

  const style = {
    width: "100%",
    maxWidth: 360,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
    alignSelf: "center",
    bgcolor: "background.paper"
  }

  if (result.length <= 0) {
    return (
      <Box sx={style}>
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton animation="wave" key={i} />
        ))}
      </Box>
    )
  }

  return (
    <List sx={style}>
      {result.map((item, i) => (
        <ListItem key={i}>
          <ListItemButton
            onClick={() => copyText(String(item))}
          >
            <ListItemText primary={String(item)} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}

function useCopy() {
  const [copySuccess, setCopyState] = useState(false)

  const copyText = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(_ => setCopyState(true))
      .catch(_ => setCopyState(false))
  }

  return {
    copySuccess,
    copyText
  }
}
