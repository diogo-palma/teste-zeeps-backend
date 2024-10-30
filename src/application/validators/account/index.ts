import { AccountDTO } from "../../../domain/dtos/account";
import Account from "../../../domain/interfaces/account";

export class AccountValidator {
  async validate(data: any): Promise<Account> {
    return await AccountDTO.validate(data, { abortEarly: false }) as Account;
  }
}