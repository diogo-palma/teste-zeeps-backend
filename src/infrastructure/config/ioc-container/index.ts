import AccountController from '../../../application/controllers/account';
import { AccountFilter } from '../../../application/filters/account';
import { AccountValidator } from '../../../application/validators/account';
import AccountService from '../../../domain/services/account';
import AccountRepository from '../../repositories/account';

const accountRepository = new AccountRepository();
const accountService = new AccountService(accountRepository);
const accountValidator = new AccountValidator();
const accountFilter = new AccountFilter();
const accountController = new AccountController(accountService, accountValidator, accountFilter);

const iocContainer = {
  account: accountController
}

const container = {
  get: key => iocContainer[key]
}

export default container;