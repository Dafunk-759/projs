import { useState, useRef, Fragment } from "react"

import { useTheme } from "../../context/ThemeContext"
import {
  CenterStack,
  Typography,
  Box,
  Stack
} from "../../components"
import type { PropsWithChildren } from "../../types"

import type { ItemId, Items, ItemType } from "./Items"
import {
  exch,
  addItem,
  itemsTable,
  makeItems,
  total
} from "./Items"

import type { Target } from "./useDragdrop"
import { useDragdrop, makeDraglogger } from "./useDragdrop"

const isDiv = (target: Target): target is HTMLDivElement =>
  target !== null && target instanceof HTMLDivElement

const isDropZone = (
  target: Target,
  dropzoneName: string
): target is HTMLDivElement =>
  isDiv(target) && target.classList.contains(dropzoneName)

const logger = makeDraglogger([])

const unsafe_getDataset: <A extends HTMLDivElement>(
  el: A | null,
  dataName: string
) => string = (el, dataName) => {
  if (el === null) {
    throw new Error("element not exist")
  }

  const ret = el?.dataset[dataName]
  if (ret) {
    return ret
  } else {
    throw new Error("dataset not found!")
  }
}

const row = 5
const col = 5

export default function ItemBag() {
  // 暂时默认有一个元素(若没有元素的话 布局会出问题)
  const [items, setItems] = useState<Items>([{ id: 0 }])

  const draggedRef = useRef<HTMLDivElement | null>(null)

  const theme = useTheme()
  const dragEnterColor = theme.palette.secondary.dark

  useDragdrop(
    {
      drag: event => {
        logger("drag", event.target)
      },
      dragstart: event => {
        logger("dragstart", event.target)

        const target = event.target
        if (isDiv(target)) {
          // 保存拖动元素的引用(ref.)
          draggedRef.current = target
          target.style.opacity = "0.5"
        }
        // 使其半透明
      },
      dragend: event => {
        logger("dragend", event.target)

        // 重置透明度
        if (isDiv(event.target)) {
          event.target.style.opacity = ""
        }
      },
      dragover: event => {
        logger("dragover", event.target)
      },
      dragenter: event => {
        logger("dragenter", event.target, _ =>
          console.log(dragEnterColor)
        )

        // 当可拖动的元素进入可放置的目标时高亮目标节点
        if (isDropZone(event.target, "dropzone")) {
          event.target.style.background = dragEnterColor
        }
      },
      dragleave: event => {
        logger("dragleave", event.target)

        // 当拖动元素离开可放置目标节点，重置其背景
        if (isDropZone(event.target, "dropzone")) {
          event.target.style.background = ""
        }
      },
      drop: event => {
        logger("drop", event.target, _ => {
          console.log("dragged", draggedRef.current)
        })

        // 将拖动的元素到所选择的放置目标节点中
        if (isDropZone(event.target, "dropzone")) {
          const item = Number(
            unsafe_getDataset(draggedRef.current, "item")
          )
          const itemId = Number(
            unsafe_getDataset(draggedRef.current, "itemId")
          ) as ItemId
          const itemType = unsafe_getDataset(
            draggedRef.current,
            "itemType"
          ) as ItemType
          const drop = Number(
            unsafe_getDataset(event.target, "dropzone")
          )

          if (itemType === "bag") {
            setItems(items => exch(item, drop, items))
          } else {
            if (event.target.firstChild === null) {
              setItems(items =>
                addItem(drop, itemId, items)
              )
            }
          }
          event.target.style.background = ""
        }
      }
    },
    [draggedRef, dragEnterColor]
  )

  const store = (
    <Box>
      <Stack direction="row" spacing={2}>
        <Tag>
          <Typography>Store</Typography>
        </Tag>
      </Stack>
      <Bag row={1} col={itemsTable.length} dropzone={false}>
        {makeItems(0, 0, "store")}
        {makeItems(1, 1, "store")}
        {makeItems(2, 2, "store")}
      </Bag>
    </Box>
  )

  const bagTitle = (
    <Stack direction="row" spacing={2}>
      <Tag>
        <Typography>Bag</Typography>
      </Tag>
      <Tag>
        <Typography>{`Total: ${total(items)}`}</Typography>
      </Tag>
    </Stack>
  )

  const bagBody = (
    <Bag row={row} col={col} dropzone={true}>
      {items.map((item, i) =>
        item ? (
          <Fragment key={i}>
            {makeItems(item.id, i, "bag")}
          </Fragment>
        ) : (
          <Fragment key={i}></Fragment>
        )
      )}
    </Bag>
  )

  return (
    <CenterStack
      alignItems="center"
      sx={{
        "& > :not(style)": {
          m: 2
        }
      }}
    >
      <Typography variant="h5">Item Bag</Typography>

      {store}

      <Box>
        {bagTitle}
        {bagBody}
      </Box>
      <Typography variant="body1">
        1. 尝试把store中的物品拖动到bag中。 2.
        尝试拖动bag中的物品到空位置或者和其他物品交换。
      </Typography>
    </CenterStack>
  )
}

function Bag({
  row,
  col,
  dropzone,
  children
}: PropsWithChildren<{
  row: number
  col: number
  dropzone: boolean
}>) {
  const items = Array.isArray(children)
    ? children
    : [children]
  const total = row * col

  const dropzonProp = dropzone
    ? { className: "dropzone" }
    : {}

  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${col}, minmax(20px, 1fr))`}
      gridTemplateRows={`repeat(${row}, minmax(20px, 1fr))`}
      gap={{ xs: 1, sm: 2 }}
      sx={{
        bgcolor: "primary.light",
        p: { xs: 1, sm: 2 }
      }}
    >
      {Array.from({ length: total }, (_, i) => (
        <Box
          key={i}
          sx={{
            bgcolor: "secondary.light",
            p: 1
          }}
          data-dropzone={i}
          {...dropzonProp}
        >
          {items[i]}
        </Box>
      ))}
    </Box>
  )
}

function Tag({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        minWidth: 40,
        height: 30,
        bgcolor: "primary.light",
        mb: 1,
        display: "grid",
        placeContent: "center",
        p: 1
      }}
    >
      {children}
    </Box>
  )
}
