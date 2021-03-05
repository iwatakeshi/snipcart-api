import Trigger from './trigger';

export type DiscountType =
  | 'FixedAmount'
  | 'FixedAmountOnItems'
  | 'Rate'
  | 'AlternatePrice'
  | 'Shipping'
  | 'AmountOnSubscription'
  | 'RateOnSubscription';

export type Discount = {
  id: string;
  name: string;
  trigger: Trigger;
  code?: string;
  itemId?: string;
  totalToReach?: number;
  type: DiscountType;
  rate?: number;
  amount?: number;
  alternatePrice?: string;
  maxNumberOfUsages?: number;
  expires?: string;
  numberOfUsages?: number;
  numberOfUsagesUncompleted?: number;
  shippingDescription?: string;
  shippingCost?: number;
  shippingGuaranteedDaysToDelivery?: number;
};
