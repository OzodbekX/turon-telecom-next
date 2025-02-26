import { RouterType } from 'Assets/types/settings'

export interface PricingPlan {
  apartmentTypes: string[]
  billingTariffId: number
  billingType: string
  createdAt: string
  description: string[]
  devicesMaxAmount: number
  devicesMinAmount: number
  id: string
  image: string
  imageMobile: string
  isActive: true
  name: string
  price: number
  speedByTime: {
    fromTime: number
    toTime: number
    speed: number
  }[]
  type: 'medium' | 'premium' | 'default'
  updatedAt: string
  devices?: RouterType[]
}

export interface CategoryType {
  description: string
  id: string
  imageDesktop: string
  imageMobile: string
  internetTariffs: null
  name: string
  shortDescription: string
  url: string
  anotherCategories: CategoryType[]
}

export interface QuestionaryForm {
  recommendedRouter: RouterType
  recommendedTariff: PricingPlan
}
