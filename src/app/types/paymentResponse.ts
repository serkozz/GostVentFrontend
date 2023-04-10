export interface PaymentResponse {
    id:             string;
    status:         string;
    amount:         Amount;
    description:    string;
    recipient:      Recipient;
    payment_method: PaymentMethod;
    createdAt:     Date;
    confirmation:   Confirmation;
    test:           boolean;
    paid:           boolean;
    refundable:     boolean;
    metadata:       Metadata;
}

export interface Amount {
    value:    string;
    currency: string;
}

export interface Confirmation {
    type:             string;
    returnUrl:       string;
    confirmationUrl: string;
}

export interface Metadata {
}

export interface PaymentMethod {
    type:  string;
    id:    string;
    saved: boolean;
}

export interface Recipient {
    accountId: string;
    gatewayId: string;
}
