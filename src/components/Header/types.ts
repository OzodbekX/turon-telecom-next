export type MenuItem = {
  title: string
  path?: string
  id?: number
  description?: string // Optional, because not all items may have a description
  children?: MenuItem[] // Optional, as not all items will have children
}
