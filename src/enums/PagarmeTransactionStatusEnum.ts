export enum PagarmeTransactionStatusEnum {
  processing = "processing",
  authorized = "authorized",
  paid = "paid",
  refunded = "refunded",
  waiting_payment = "waiting_payment",
  pending_refund = "pending_refund",
  refused = "refused",
  chargedback = "chargedback",
  analyzing = "analyzing",
  pending_review = "pending_review",
}
