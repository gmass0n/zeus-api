import axios, { AxiosInstance } from "axios";
import { PagarmeCustomerResponseDTO } from "../dtos/PagarmeCustomerResponseDTO";
import { PagarmeTransactionResponseDTO } from "../dtos/PagarmeTransactionResponseDTO";
import { UserRecurrencyStatusEnum } from "../enums/UserRecurrencyStatusEnum";

import { AppError } from "../errors/AppError";

export class PagarmeService {
  private pagarmeApi: AxiosInstance;

  constructor() {
    this.pagarmeApi = axios.create({
      baseURL: process.env.PAGARME_API_URL,
      params: {
        api_key: process.env.PAGARME_API_TOKEN,
      },
    });
  }

  public async findCustomerByEmail(
    email: string
  ): Promise<PagarmeCustomerResponseDTO> {
    try {
      const { data: customers } = await this.pagarmeApi.get<
        PagarmeCustomerResponseDTO[]
      >("/customers");

      return customers?.find((customer) => customer.email === email);
    } catch (error) {
      if (error.response?.data?.message) {
        throw new AppError({
          message: error.response.data.message,
          statusCode: error.response.status,
          tag: "PAGARME_ERROR",
        });
      }

      throw new Error();
    }
  }

  public async validateCustomerRecurrency(
    email: string
  ): Promise<UserRecurrencyStatusEnum> {
    const { data: transactions } = await this.pagarmeApi.get<
      PagarmeTransactionResponseDTO[]
    >("/transactions", {
      params: { "customer.email": email },
    });

    console.log(transactions);

    return UserRecurrencyStatusEnum.unauthorized;
  }
}
