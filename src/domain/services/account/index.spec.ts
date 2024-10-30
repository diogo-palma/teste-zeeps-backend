import AccountService from '.';
import AccountRepositoryInterface from '../../repositories/account.interface';
import Account from '../../interfaces/account';
import mongoose from 'mongoose';

describe('AccountService', () => {
  let accountService: AccountService;
  let mockRepository: jest.Mocked<AccountRepositoryInterface>;

  beforeEach(() => {
    mockRepository = {
      findOne: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      list: jest.fn(),
    } as unknown as jest.Mocked<AccountRepositoryInterface>;

    accountService = new AccountService(mockRepository);
  });

 
  it('should create an account when calling create', async () => {
    const newAccount: Account = {
      TECL_NOME: 'Teste',
      TECL_ENDERECO: 'Rua teste',
      TECL_CIDADE: 'Cidade teste',
      TECL_UF: 'RJ',
      TECL_TELEFONE: '87654321',
      TECL_EMAIL: 'teste@teste.com',
    };
    mockRepository.insert.mockResolvedValue(newAccount);

    const result = await accountService.create(newAccount);
    expect(result).toEqual(newAccount);
    expect(mockRepository.insert).toHaveBeenCalledWith(newAccount);
  });


  it('should delete an account when calling delete', async () => {
    const mockId = new mongoose.Types.ObjectId();
    const mockAccount = { 
      TECL_ID: mockId,
      TECL_NOME: "Nome Teste",
      TECL_ENDERECO: "Endereço Teste",
      TECL_CIDADE: "Cidade Teste",
      TECL_UF: "UF Teste",
      TECL_TELEFONE: "123456789" 
    };

    mockRepository.findOne.mockResolvedValue(mockAccount); 
    mockRepository.delete.mockResolvedValue(); 

    await accountService.delete(mockId.toHexString());
    
    expect(mockRepository.findOne).toHaveBeenCalledWith({ TECL_ID: mockId.toHexString() });
    expect(mockRepository.delete).toHaveBeenCalledWith(mockId.toHexString());
  });

  it('should list paginated accounts when calling list', async () => {
    const mockAccounts = {
      docs: [{ 
        TECL_ID: new mongoose.Types.ObjectId().toHexString(),
        TECL_NOME: 'Teste',        
        TECL_ENDERECO: 'Rua teste',
        TECL_CIDADE: 'Cidade teste',
        TECL_UF: 'RJ',
        TECL_TELEFONE: '87654321',
        TECL_EMAIL: 'teste@teste.com',
      }],
      totalDocs: 1,
      page: 1,
      limit: 10,
      totalPages: 1
    };
    mockRepository.list.mockResolvedValue(mockAccounts);

    const result = await accountService.list({ page: 1, limit: 10 });
    expect(result).toEqual({
      docs: mockAccounts.docs,
      pagination: {
        total: mockAccounts.totalDocs,
        page: mockAccounts.page,
        limit: mockAccounts.limit,
        totalPages: mockAccounts.totalPages
      },
    });
    expect(mockRepository.list).toHaveBeenCalledWith({ page: 1, limit: 10 });
  });
});
