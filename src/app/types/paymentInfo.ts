export interface YooKassaPaymentInfo {
    id:                     string;
    status:                 string;
    amount:                 Amount;
    description:            string;
    recipient:              Recipient;
    paymentMethod:         PaymentMethod;
    createdAt:             Date;
    confirmation?:          Confirmation;
    test:                   boolean;
    paid:                   boolean;
    refundable:             boolean;
    metadata:               Metadata;
    cancellationDetails?:  CancellationDetails;
    expiresAt?:            Date;
    authorizationDetails?: AuthorizationDetails;
    incomeAmount?:         Amount;
    capturedAt?:           Date;
    refundedAmount?:       Amount;
}

export function translateStatus(status: string) {
  switch (status) {
    case "pending":
      return "В ожидании"
    case "waiting_for_capture":
      return "Ожидает подтверждения"
    case "canceled":
      return "Отменен"
    case "succeeded":
      return "Оплачен"
    default:
      return "Неизвестен"
  }
}

export interface Amount {
    value:    string;
    currency: Currency;
}

export enum Currency {
    Rub = "RUB",
}

export interface AuthorizationDetails {
    rrn:            string;
    authCode:      string;
    threeDSecure: ThreeDSecure;
}

export interface ThreeDSecure {
    applied:             boolean;
    methodCompleted:    boolean;
    challengeCompleted: boolean;
}

export interface CancellationDetails {
    party:  string;
    reason: string;
}

export interface Confirmation {
    type:             string;
    returnUrl:       string;
    confirmationUrl: string;
}

export interface Metadata {
}

export interface PaymentMethod {
    type:   Type;
    id:     string;
    saved:  boolean;
    title?: string;
    card?:  Card;
}

export interface Card {
    first6:         string;
    last4:          string;
    expiryYear:    string;
    expiryMonth:   string;
    cardType:      string;
    issuerCountry: string;
}

export enum Type {
    BankCard = "bank_card",
}

export interface Recipient {
    accountId: string;
    gatewayId: string;
}