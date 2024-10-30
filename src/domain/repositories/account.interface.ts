import Account from "../interfaces/account"


export default interface AccountRepositoryInterface {
  find(query: any): Promise<Account[]>;

  findOne(query: any): Promise<Account>;

  findById(id: string): Promise<Account>;

  insert(account: Account): Promise<Account>;

  update(account: Partial<Account>, findQuery: Object): Promise<Account>;
   
  delete(id: string): Promise<void>;

  list(options: { page: number; limit: number; filters?: any }): Promise<any>;
}