export interface OrderRequest {
    customerName: string;
    email: string;
    phoneNumber: string;
    amount: 0n;
}

export interface OrderResponse {
    secretKey: string;
    razorpayOrderId: string;
    applicationFee: string;
    secretId: string;
    pgName: string;
}