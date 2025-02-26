export enum LoginTypeEnum {
  WITH_LOGIN = 'WITH_LOGIN',
  WITH_PONE = 'WITH_PONE',
}
export type SubscriberType = {
  balance: number
  endPeriodDate: string
  identity: string
  nextSubscriptionDate: string
  phone: string
  startPeriodDate: string
  subscriptionPrice: number
  subscriptionStatus: boolean
  tariffName: string
  turonId: number
}
