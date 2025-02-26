export type TicketRequestFormType = {
  cityId: number
  residenceType?: string
  districtId?: number
  regionId?: string
  apartmentNumber?: string
  houseNumber?: string
  phone: string
  extraPhone?: string
}
export type TicketRequestType = TicketRequestFormType & {
  deviceId?: string
  platformType: string
  serviceId?: string
  serviceType?: TicketServiceTypeEnum
  tariffId?: string
  routerPaymentType?: RouterPaymentTypeEnum
  type?: TicketResponseTypeEnum
}

export enum TicketResponseTypeEnum {
  WIFI = 'WIFI',
  TV = 'TV',
}

export enum TicketServiceTypeEnum {
  INSTALLATION = 'INSTALLATION',
  REPAIR = 'REPAIR',
  OTHER = 'OTHER',
}

export enum RouterPaymentTypeEnum {
  BUY_NOW = 'BUY_NOW',
  INSTALLMENTS = 'INSTALLMENTS',
  PERIOD = 'PERIOD',
}
