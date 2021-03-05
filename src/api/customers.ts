import { AxiosInstance } from 'axios';
import { CustomerStatus, Customer } from '../types/customers';
import { OrderItem } from '../types/orders';

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
   * 	The status of your customers, `Confirmed` means that the customers have created
   * an account and `Unconfirmed` are those who checked out as guests.
   */
  status: CustomerStatus;
  /**
   * Returns only the orders placed after this date.
   */
  from: string;
  /**
   * Returns only the orders placed before this date.
   */
  to: string;
  /**
   * The email of the customer who placed the order.
   */
  email: string;
  /**
   * The name of the customer who placed the order.
   */
  name: string;
};

type FindResponse = {
  totalItems: number;
  offset: number;
  limit: number;
  items: Customer[];
};

export class CustomerAPI {
  constructor(private readonly axios: AxiosInstance) {}
  /**
   * This method returns the list of all your existing customers.
   * @param params
   */
  find = (params: Partial<FindQueryParams> = { limit: 20, offset: 0 }) =>
    this.axios.get<FindResponse>('customers', { params });

  /**
   * This method returns a specific customer
   * @param id The customer unique ID.
   */
  findOne = (id: string) => this.axios.get<Customer>(`customers/${id}`);

  /**
   * This methods returns a list of orders
   */
  orders = (id: string) =>
    this.axios.get<OrderItem[]>(`customers/${id}/orders`);
}
