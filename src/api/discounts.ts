import { AxiosInstance } from 'axios';
import { Discount, DiscountType } from '../types/discounts';
import Trigger from '../types/trigger';

type QueryParamsBase = {
  /** The discount friendly name */
  name: string;
  /** The date when this discount should expires, if null, the discount will never expire. */
  expires?: string;
  /** The maximum number of usage for the discount, if null, customers will be able to use this discount indefinitely. */
  maxNumberOfUsages?: number;
  /**
   * Condition that will trigger the discount.
   * Possible values:
   *  * Total
   *  * Code
   *  * Product
   */
  trigger: Trigger;
  /**
   * The type of action that the discount will apply.
   *
   * Possible values:
   *  * FixedAmount
   *  * FixedAmountOnItems
   *  * Rate
   *  * AlternatePrice
   *  * Shipping
   *  * AmountOnSubscription
   *  * RateOnSubscription
   */
  type: DiscountType;
  /** The number of days it will take for shipping, you can leave it to null. */
  shippingGuaranteedDaysToDelivery?: number;
};

type RequiredTypeParams =
  | {
      type: 'FixedAmount' | 'AmountOnSubscription';
      /** The amount that will be deducted from order total. */
      amount: number;
    }
  | {
      type: 'FixedAmountOnItems';
      /** A comma separated list of unique ID of your products defined with `data-item-id`. The fixed amount will be deducted from each product that matches. */
      productIds: string;
    }
  | {
      type: 'Rate' | 'RateOnSubscription';
      /** The rate in percentage that will be deducted from order total. */
      rate: string;
    }
  | {
      type: 'AlternatePrice';
      /** The name of the alternate price list to use. */
      alternativePrice: string;
    }
  | {
      type: 'Shipping';
      /** The shipping amount that will be available to your customers. */
      shippingCost: number;
      /** The shipping method name that will be displayed to your customers. */
      shippingDescription: string;
    };

type RequiredTriggerParams =
  | {
      trigger: 'Code';
      /** The code that will need to be entered by the customer. */
      code: string;
    }
  | {
      trigger: 'Total';
      /** The minimum order amount. */
      totalToReach: string;
    }
  | {
      trigger: 'Product';
      /** The unique ID of your product defined with `data-item-id`. */
      itemId: string;
    };

type CreateQueryParams = QueryParamsBase &
  RequiredTriggerParams &
  RequiredTypeParams;

type UpdateQueryParams = QueryParamsBase & {
  /** Whether the discount is archived or not */
  archived?: boolean;
  /** This indicates if this discount can be applied when other discounts are in the cart. Also, when a cart contains a discount that isn't combinable, no others discount can be added. */
  combinable?: boolean;
} & RequiredTriggerParams &
  RequiredTypeParams;

export class DiscountAPI {
  constructor(private readonly axios: AxiosInstance) {}
  /**
   * This method returns all discounts for your account.
   * @param params
   */
  find = () => this.axios.get<Discount[]>('discounts');
  /**
   * This method returns a particular discount.
   * @param id The discount unique id.
   */
  findOne = (id: string) => this.axios.get<Discount>(`discounts/${id}`);
  /**
   * This method creates a new discount
   * @param params
   * @returns
   */
  create = (params: CreateQueryParams) =>
    this.axios.post<Discount>('discounts', {
      params,
    });
  /**
   * This method updates the status of the specified order. You can use this endpoint to set the order tracking number, change its status, or add useful metadata information.
   *
   * Changing the status of an order from `Pending` to `Processed` as well as
   * changing the payment status from `Authorized` to `Paid` will capture a payment.
   * This only applies to [two-step payments](https://stripe.com/docs/charges#auth-capture) offered by Stripe.
   *
   * @param id The discount unique id.
   * @param params
   */
  update = (id: string, params: UpdateQueryParams) =>
    this.axios.put<Discount>(`orders/${id}`, {
      params,
    });
}
