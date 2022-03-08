import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../store"

import { createSlice } from "@reduxjs/toolkit"

// Define a type for the slice state
type Bin2DecState = {
  input: string
  valid: boolean
  info: string
  ret: string
}

const normalInfo = `
  Enter some binary numbers and checkout ret!
`

const errorInfo = `
  Your input is not a valid binary number!                                        
`

// Define the initial state using that type
const initialState: Bin2DecState = {
  input: "",
  valid: true,
  info: normalInfo,
  ret: ""
}

const binaryReg = /[0|1]/
const isBinary = (s: string) =>
  s.length <= 0
    ? false
    : Array.from(s).every(c => binaryReg.test(c))

export const counterSlice = createSlice({
  name: "bin2Dec",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateInput: (
      state,
      { payload }: PayloadAction<string>
    ) => {
      state.input = payload
      const valid = isBinary(payload)

      if (valid) {
        state.info = normalInfo
        state.valid = valid
        state.ret = parseInt(payload, 2).toString()
      } else {
        state.valid = false
        state.ret = ""
        state.info = errorInfo
      }
    }
  }
})

export const { updateInput } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAll = (state: RootState) => state.bin2Dec

export const { reducer: bin2DecReducer } = counterSlice
