import merge from 'lodash/merge';
import { OrderAPI } from './orders';
import axios, { AxiosInstance } from 'axios';
import { CustomerAPI } from './customers';
import { DiscountAPI } from './discounts';

export type SnipcartOptions = {
  endpoint?: string;
  apiKey?: string;
  timeout?: number;
};

export default class Snipcart {
  private options: SnipcartOptions;
  private readonly axios: AxiosInstance;
  constructor(options: SnipcartOptions = {}) {
    this.options = merge({}, Snipcart.defaultOptions(), options);

    if (!this.options.apiKey) throw new Error('No Snipcart API key provided.');

    const btoa = (obj: string) => Buffer.from(obj).toString('base64');

    this.axios = axios.create({
      baseURL: this.options.endpoint,
      timeout: this.options.timeout,
      headers: {
        Authorization: `Basic ${btoa(this.options.apiKey)}`,
        Accept: 'application/json',
      },
    });
  }

  get orders() {
    return new OrderAPI(this.axios);
  }

  get customers() {
    return new CustomerAPI(this.axios);
  }

  get discounts() {
    return new DiscountAPI(this.axios);
  }

  /**
   * Returns the default configuration for Snipcart
   */
  static defaultOptions = (): Partial<SnipcartOptions> => ({
    endpoint: process.env.SNIPCART_ENDPOINT || 'https://app.snipcart.com/api',
    apiKey: process.env.SNIPCART_API_KEY || process.env.SNIPCART_SECRET_KEY,
    timeout: 300 * 1000, // 5 minutes
  });
}
