import {
  Paper,
  Stack,
  TextField,
  Fab,
  KeyboardArrowDownIcon,
  Alert,
  CopyButton
} from "../../components"

import { useState } from "react"

import type {
  PropsWithChildren,
  OnChange,
  OnClick
} from "../../types"
import { useAppSelector, useAppDispatch } from "../../store"
import { useCopy } from "../../hooks"

import { selectAll, updateInput } from "./bin2DecSlice"

export default function Bin2Dec() {
  const dispatch = useAppDispatch()
  const [inputVaue, setInputValue] = useState("")
  const { input, valid, info, ret } =
    useAppSelector(selectAll)

  const onSubmit = () => {
    dispatch(updateInput(inputVaue))
  }

  return (
    <Container>
      <Input
        value={inputVaue}
        info={info}
        error={!valid}
        onChange={e => {
          setInputValue(e.target.value)
        }}
      />
      <SubmitButton onSubmit={onSubmit} />
      <ResultInfo ret={ret} isSuccess={valid} />
    </Container>
  )
}

function Container({ children }: PropsWithChildren) {
  return (
    <Paper>
      <Stack alignItems="center">{children}</Stack>
    </Paper>
  )
}

function Input({
  value,
  onChange,
  info,
  error = false
}: {
  value: string
  onChange: OnChange
  info: string
  error: boolean
}) {
  return (
    <TextField
      error={error}
      sx={{ m: 2, maxWidth: 200 }}
      id="bin-input"
      label="Input Binary Number"
      value={value}
      onChange={onChange}
      variant="outlined"
      helperText={info}
    />
  )
}

function SubmitButton({ onSubmit }: { onSubmit: OnClick }) {
  return (
    <Fab
      onClick={onSubmit}
      sx={{ m: 2 }}
      variant="extended"
    >
      <KeyboardArrowDownIcon />
      checkout
    </Fab>
  )
}

function ResultInfo({
  ret,
  isSuccess
}: {
  ret: string
  isSuccess: boolean
}) {
  const { copySuccess, copyText } = useCopy()

  const text = isSuccess
    ? `The ret is: ${ret}`
    : "Not valid input!"

  const type = isSuccess ? "success" : "error"

  return (
    <Stack
      direction="row"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Alert severity={type} sx={{ m: 2 }}>
        {text}
      </Alert>
      <CopyButton
        onClick={() => copyText(ret)}
        disabled={!isSuccess}
        color={copySuccess ? "success" : "default"}
      />
    </Stack>
  )
}
