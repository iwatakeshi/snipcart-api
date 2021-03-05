export type CustomerStatus = 'confirmed' | 'unconfirmed'
export type Customer = {
  id: string
  email: string
  billingAddressName: string
  billingAddressCompanyName: string
  billingAddressAddress1: string
  billingAddressAddress2?: string
  billingAddressCity: string
  billingAddressCountry: string
  billingAddressProvince: string
  billingAddressPostalCode: string
  billingAddressPhone: string
  shippingAddressName: string
  shippingAddressCompanyName: string
  shippingAddressAddress1: string
  shippingAddressAddress2?: string
  shippingAddressCity: string
  shippingAddressCountry: string
  shippingAddressProvince: string
  shippingAddressPostalCode: string
  shippingAddressPhone: string
  shippingAddressSameAsBilling: boolean
  sessionToken?: string
  status: CustomerStatus
  statistics: {
    ordersCount: number
    ordersAmount: number
  }
}
