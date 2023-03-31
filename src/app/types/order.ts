import { OrderStatus } from "./orderStatus";
import { ProductType } from "./productType";

export interface Order {
  id: number,
  client: number | null,
  name: string
  productType: ProductType
  creationDate: Date
  leadDays: number
  status: OrderStatus
  price: number
}