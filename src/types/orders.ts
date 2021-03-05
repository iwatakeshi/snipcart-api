export type CustomField = {
  name: string;
  value: any;
};

export type OrderItem = {
  token: string;
  creationDate: string;
  modificationDate: string;
  status: string;
  paymentMethod: string;
  invoiceNumber: string;
  email: string;
  cardHolderName: string;
  creditCardLast4Digits: string;
  billingAddressName: string;
  billingAddressCompanyName: string;
  billingAddressAddress1: string;
  billingAddressAddress2: string;
  billingAddressCity: string;
  billingAddressCountry: string;
  billingAddressProvince: string;
  billingAddressPostalCode: string;
  billingAddressPhone: string;
  notes?: string;
  shippingAddressName: string;
  shippingAddressCompanyName: string;
  shippingAddressAddress1: string;
  shippingAddressAddress2: string;
  shippingAddressCity: string;
  shippingAddressCountry: string;
  shippingAddressProvince: string;
  shippingAddressPostalCode: string;
  shippingAddressPhone: string;
  shippingAddressSameAsBilling: boolean;
  finalGrandTotal: number;
  shippingFees: number;
  shippingMethod: string;
  items: LineItem[];
  taxes: Tax[];
  promocodes: PromoCodes[];
  willBePaidLater: boolean;
  customFields: CustomField[];
  paymentTransactionId?: string;
};

export type LineItem = {
  uniqueId: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  url: string;
  weight: number;
  description: string;
  image: string;
  customFields: CustomField[];
  stackable: boolean;
  maxQuantity?: number;
  totalPrice: number;
  totalWeight: number;

  paymentSchedule: {
    interval: 'Day' | 'Week' | 'Month' | 'Year';
    intervalCount: number;
    trialPeriodInDays?: number;
    startsOn: string;
  };
  pausingAction: string;
  cancellationAction: string;
  startsOn: string;
  token: string;
  fileGuid?: string;
  initialData: string;
  categories: any[];
  totalPriceWithoutTaxes: number;
  originalPrice?: string;
  minQuantity: number;
  addedOn: string;
  modificationDate: string;
  shippable: boolean;
  taxable: boolean;
  duplicatable: boolean;
  width?: number;
  height?: number;
  length?: number;
  metadata?: Record<string, any>;
  taxes: any[];
  alternatePrices: any;
  unitPrice: number;
  hasDimensions: boolean;
  hasTaxesIncluded: boolean;
  totalPriceWithoutDiscountsAndTaxes: number;
};

export type PromoCodes = {
  code: string;
  name: string;
  type: string;
  rate: number;
};

export type Tax = {
  taxName: string;
  taxRate: number;
  amount: number;
  numberForInvoice: string;
};

export type OrderStatus =
  | 'inprogress'
  | 'processed'
  | 'disputed'
  | 'shipped'
  | 'delivered'
  | 'pending'
  | 'cancelled';

export type PaymentStatus =
  | 'paid'
  | 'deferred'
  | 'paiddeferred'
  | 'chargedback'
  | 'refunded'
  | 'paidout'
  | 'failed'
  | 'pending'
  | 'expired'
  | 'cancelled'
  | 'open'
  | 'authorized';
