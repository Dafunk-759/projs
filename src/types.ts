import type {
  ReactElement,
  ChangeEventHandler,
  MouseEventHandler
} from "react"

type Obj = Record<string, unknown>

export type PropsWithChildren<A = Obj> = {
  children: ReactElement | ReactElement[]
} & A

export type OnChange = ChangeEventHandler<
  HTMLTextAreaElement | HTMLInputElement
>

export type OnClick = MouseEventHandler<HTMLButtonElement>
