import { AccountDTO } from "../../../domain/dtos/account";
import Account from "../../../domain/interfaces/account";

export class AccountFilter {
  filter(account: Account): Partial<Account> {
    return Object.keys(AccountDTO.fields).reduce((acc, key) => {
      if (key in account) {
        acc[key] = account[key];
      }
      return acc;
    }, {});
  }
}