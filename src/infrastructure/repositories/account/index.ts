import AccountModel from '../../database/mongo/models/account'
import Account from '../../../domain/interfaces/account'


export default class AccountRepository {
  find = async (query: any): Promise<Account[]> => {
    const ret: any[] = await AccountModel.find(query).sort({createdAt: -1}).lean()
    return ret;
  }

  findOne = async (query: any):  Promise<Account> => {
    const ret: any = await AccountModel.findOne(query).sort({createdAt: -1}).lean()
    return ret;
  }

  findById = async (id: string):  Promise<Account> => {
    const ret: any = await AccountModel.findById(id).lean()
    return ret;
  }

  insert = async (account: Account):  Promise<Account> => {
    const obj = new AccountModel(account);
    const ret: any = await obj.save();
    return ret;
  }

  update = async (account: Partial<Account>, findQuery: Object): Promise<Account | null> => {
    const updatedAccount = await AccountModel.findOneAndUpdate(findQuery, account, { new: true }).lean();
    return updatedAccount as Account | null;
  }

  delete = async (id: string): Promise<void> => {
    await AccountModel.findOneAndDelete({ TECL_ID: id }).lean();
  }

  async list(options: { page: number; limit: number; filters?: any }): Promise<any> {
    const { page, limit, filters } = options;
    const query: any = {};

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {   
          if (typeof value === 'string' && value) {
            query[key] = { $regex: `.*${value}.*`, $options: 'i' }; 
          }
      });
    }
    
    const result = await AccountModel.paginate(query, {
      page,
      limit,
    });

    return result; 
  }

}