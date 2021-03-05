export default interface APIReponse<T> {
  totalItems: number;
  offset: number;
  limit: number;
  items: T[];
}
