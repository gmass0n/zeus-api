import { PagarmeTransactionStatusEnum } from "../enums/PagarmeTransactionStatusEnum";

export class PagarmeTransactionResponseDTO {
  id: number;
  status: PagarmeTransactionStatusEnum;
  amount: number;
  installments: number;
}
