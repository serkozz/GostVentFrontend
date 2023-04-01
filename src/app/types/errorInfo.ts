import { HttpStatusCode } from "@angular/common/http";

export interface ErrorInfo {
  statusCode: HttpStatusCode,
  statusName: string,
  message: string
}