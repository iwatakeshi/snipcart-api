import { AxiosInstance } from 'axios';
import APIReponse from '../types/api-response';
import { OrderItem, OrderStatus, PaymentStatus } from '../types/orders';

type FindQueryParams = {
  /**
   * Number of results to skip. Default is 0.
   */
  offset: number;
  /**
   * Number of results to fetch. Default is 20.
   */
  limit: number;
  /**
   * A status criteria for your order collection.
   */
  status: OrderStatus;
  /**
   * 	The invoice number of the order to retrieve.
   */
  invoiceNumber: string;
  /**
   * Returns only orders containing that product.
   *
   * **Note that this has to be the user defined ID, not the unique ID defined by Snipcart**
   */
  productId: string;
  /**
   * The name of the person who made the purchase.
   */
  placedBy: string;
  /**
   * Returns only the orders placed after this date.
   */
  from: string;
  /**
   * Returns only the orders placed before this date.
   */
  to: string;
  /**
   * Returns only the orders that are recurring or not.
   */
  isRecurringOrder: boolean;
};

type FindOneQueryParms = {
  /**
   * The order unique token (guid)
   */
  code: string;
};

type UpdateQueryParams = {
  /**
   * The order unique token (guid). This parameter must be passed through the URL.
   */
  token: string;
  /**
   * The order status.
   */
  status: OrderStatus;
  /**
   * The order payment status.
   */
  paymentStatus: PaymentStatus;
  /**
   * The tracking number associated to the order
   */
  trackingNumber: string;
  /**
   * The URL where the customer will be able to track its order.
   */
  trackingUrl: string;
  /**
   * A simple JSON object that can hold any data associated to this order.
   */
  metadata: string;
};

export class OrderAPI {
  constructor(private readonly axios: AxiosInstance) {}
  /**
   * This method returns all orders that have been completed.
   * @param params
   */
  find = (params: Partial<FindQueryParams> = { limit: 20, offset: 0 }) =>
    this.axios.get<APIReponse<OrderItem>>('orders', {
      params,
    });
  /**
   * This method returns a particular order with all items, promo codes and taxes that were applied on this order.
   * @param token
   */
  findOne = (token: string, params: Partial<FindOneQueryParms> = {}) =>
    this.axios.get<OrderItem>(`orders/${token}`, {
      params,
    });
  /**
   * This method updates the status of the specified order. You can use this endpoint to set the order tracking number, change its status, or add useful metadata information.
   *
   * Changing the status of an order from `Pending` to `Processed` as well as
   * changing the payment status from `Authorized` to `Paid` will capture a payment.
   * This only applies to [two-step payments](https://stripe.com/docs/charges#auth-capture) offered by Stripe.
   *
   * @param token
   * @param params
   */
  update = (token: string, params: Partial<UpdateQueryParams> = {}) =>
    this.axios.put<OrderItem>(`orders/${token}`, {
      params,
    });
}
