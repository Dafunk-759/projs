import {
  FastfoodIcon,
  LocalDrinkIcon,
  CookieIcon
} from "../../components"

import type {
  PropsWithChildren,
  DivProps
} from "../../types"

export type ItemId = 0 | 1 | 2
export type Item = {
  id: ItemId
}

/**
 * `Items` 是一个稀疏数组 如：[item1, item2, undefined, item3]
 * `undefined` 表示空出的位置
 *
 * 由于`Items`是稀疏数组，所以不能通过`items.length`获取item数目
 * 使用`total`helper.
 */
export type Items = (Item | undefined)[]

export const total = (items: Items) =>
  items.reduce((len, cur) => (cur ? len + 1 : len), 0)

/**
 * `exch` 交换 `i` 位置和 `j` 位置元素
 * 返回一个新数组
 */
export const exch = (
  i: number,
  j: number,
  items: Items
): Items => {
  const copy = [...items]
  let t = copy[i]
  copy[i] = copy[j]
  copy[j] = t
  return copy
}

/**
 * `addItem` 在给定位置`i`插入一个item
 */
export const addItem = (
  i: number,
  itemId: ItemId,
  items: Items
): Items => {
  const copy = [...items]
  copy[i] = {
    id: itemId
  }
  return copy
}

/**
 * 装备表 数组的下标对应`item.id`
 */
export const itemsTable = [
  <FastfoodIcon />,
  <LocalDrinkIcon />,
  <CookieIcon />
]

/**
 * `item` 的类型
 * 用来区分item在`bag`中还是在`store`中
 */
export type ItemType = "bag" | "store"

/**
 * `id`创建的item的id (通过查item table，获取item)
 * `index`创建的item的位置
 *
 * 返回一个`可拖拽`的item
 */
export const makeItems = (
  id: ItemId,
  index: number,
  type: ItemType
) => {
  return (
    <Draggable
      data-item-type={type}
      data-item={index}
      data-item-id={id}
    >
      {itemsTable[id]}
    </Draggable>
  )
}

function Draggable({
  children,
  ...props
}: PropsWithChildren & DivProps) {
  return (
    <div
      {...props}
      draggable
      style={{
        cursor: "grab"
      }}
    >
      {children}
    </div>
  )
}
