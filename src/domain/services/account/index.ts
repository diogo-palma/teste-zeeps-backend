import { AcccountResponseMessages } from '../../enums/account';
import Account from '../../interfaces/account';
import AccountRepositoryInterface from '../../repositories/account.interface';

export default class AccountService {

  constructor(
    private readonly repository: AccountRepositoryInterface,
  ){}


  async show(id: string): Promise<Account> {
    return this.repository.findOne({TECL_ID: id});
  }
  
  async create(account: Account): Promise<Account> {    
    return this.repository.insert(account);
  }

  async update(id: string, account: Partial<Account>): Promise<Account> {
    return this.repository.update(account, { TECL_ID: id });
  }

  async delete(id: string): Promise<void> {
        
    const account = await this.repository.findOne({TECL_ID: id});
    if (!account) {
      throw { message: AcccountResponseMessages.ACCOUNT_NOT_FOUND };
    }
  
    this.repository.delete(id);
  }

  async list(options: { page: number; limit: number; filters?: any }): Promise<{ docs: Account[]; pagination: { total: number; page: number; limit: number, totalPages: number } }> {
    const result = await this.repository.list(options); 
    const totalPages = Math.ceil(result.totalDocs / options.limit); 
    
    return {
      docs: result.docs,
      pagination: {
        total: result.totalDocs, 
        page: result.page, 
        limit: result.limit, 
        totalPages
      }
    };
  }
}