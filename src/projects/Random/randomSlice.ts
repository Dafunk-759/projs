import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../store"

import { createSlice } from "@reduxjs/toolkit"

// Define a type for the slice state
type RandomState = {
  count: number
  min: number
  max: number
  result: number[]
  sole: boolean
}

type Payload = Omit<RandomState, "result">
// 假设max一定大于等于min
function generateRandomNumbers({
  count,
  min,
  max,
  sole
}: Payload) {
  const x = max - min

  // Math.random() * x => 0 - x (0到x)
  // 0到x加min，为min到x+min
  // x = max - min
  // 所以最后为min到max
  const random = () => Math.round(Math.random() * x + min)

  if (sole) {
    const set = new Set<number>()
    const range = Math.min(max - min + 1, count)

    for (let i = 0; i < range; i++) {
      let r = random()
      while (set.has(r)) {
        r = random()
      }
      set.add(r)
    }

    return Array.from(set)
  } else {
    return Array.from({ length: count }, () => random())
  }
}

// Define the initial state using that type
const initialState: RandomState = {
  count: 1,
  min: 0,
  max: 1e9,
  result: [],
  sole: true
}

export const randomSlice = createSlice({
  name: "random",
  // `createSlice` will infer the state type
  // from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare
    // the contents of `action.payload`
    updateState: (
      _,
      { payload }: PayloadAction<Payload>
    ) => ({
      ...payload,
      result: generateRandomNumbers(payload)
    })
  }
})

export const { updateState } = randomSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAll = (state: RootState) => state.random

export const { reducer: randomReducer } = randomSlice
