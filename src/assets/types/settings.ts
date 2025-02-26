import { PricingPlan } from 'Assets/types/tariffs'

export type ConfirmationModalType = {
  isOpen: boolean
  onCancel?: () => void
  onConfirm?: () => void
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
}
export type NewsType = {
  createdAt: string
  id: string
  shortImage: string
  subtitle: string
  title: string
}

export type RouterType = {
  catalogs: DeviceCatalogType[]
  tags: { name: string; id: string; color: string }[]
  coverageArea: string
  id: string
  image: string
  isActive: boolean
  limitOfDevices: string
  installmentPeriod: string
  installmentPrice: number
  name: string
  position: number
  price: number
  speed: string
  tariffs?: PricingPlan[]
}
export type DeviceCatalogType = {
  color: string
  description: string
  id: string
  image: string
  title: string
}

export type SendCallBackRequestType = {
  fullName?: string
  phone?: string
  companyName?: string
  category: ApplicationEnumCategories
  type: ApplicationEnumTypes
}
export type NestedChannelType = {
  name: string
  id: string
  image: string
}
export type NestedChannelCategoryType = {
  name: string
  channels: NestedChannelType[]
  id: string
}

export enum ApplicationEnumTypes {
  COMPANY = 'COMPANY',
  CLIENT = 'CLIENT',
}

export enum ApplicationEnumCategories {
  TV = 'TV',
  INTERNET = 'INTERNET',
  SERVICE = 'SERVICE',
}

export enum EnumIsAgreeToPolicy {
  NotAgreed = 'NotAgreed',
  Agreed = 'Agreed',
  Error = 'Error',
}
