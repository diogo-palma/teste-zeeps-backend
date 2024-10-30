import Account from "../../../domain/interfaces/account";
import AccountService from "../../../domain/services/account";
import { AccountDTO } from "../../../domain/dtos/account";
import { AccountValidator } from "../../validators/account";
import { AccountFilter } from "../../filters/account";
import { AcccountResponseMessages } from "../../../domain/enums/account";



export default class AccountController {
  constructor(
    private readonly service: AccountService,
    private readonly validator: AccountValidator,
    private readonly filter: AccountFilter
  ) {}

  async list(req, res){
    const { page = 1, limit = 10, ...filters } = req.query;

    try {      
      const accounts = await this.service.list({ 
        page: Number(page), 
        limit: Number(limit), 
        filters 
      });
      const filteredDocs = accounts.docs.map((account) =>
        this.filter.filter(account)
      );
      res.sendResponse(filteredDocs, null, null, true, accounts.pagination);
    } catch (error) {
      throw { statusCode: 403, error: error.errors || error.message || error }
    }

  }

  async create(req, res) {
    try {      
      const validatedData = await this.validator.validate(req.body);
      const createdAccount = await this.service.create(validatedData);
      const responseAccount = this.filter.filter(createdAccount);

      res.sendResponse(responseAccount, AcccountResponseMessages.ACCOUNT_CREATED);
    } catch (error) {
      console.log("error", error)
      throw { statusCode: 403, error: error.errors || error.message || error }
    }
  }

  async edit(req, res) {
    const { TECL_ID, ...updateData } = req.body;

    if (!TECL_ID) {
      throw {statusCode: 403, error: AcccountResponseMessages.REQUIRE_TECL_ID }      
    }

    try {
      const updatedAccount = await this.service.update(TECL_ID, updateData);

      if (!updatedAccount) {  
        throw { message: AcccountResponseMessages.ACCOUNT_NOT_FOUND}              
      }

      const filteredAccount = this.filter.filter(updatedAccount);
      res.sendResponse(filteredAccount, AcccountResponseMessages.ACCOUNT_UPDATED);
    } catch (error) {
      throw { statusCode: 403, error: error.errors || error.message || error }
    }
  }


  async show(req, res) {
    const { id } = req.params;

    try {      
      const account = await this.service.show(id);      
      if (account){
        const filteredAccount = this.filter.filter(account);
        return res.sendResponse(filteredAccount);  
      }else{
        throw {message:  AcccountResponseMessages.ACCOUNT_NOT_FOUND}
      }
      
    } catch (error) {
      throw { statusCode: 403, error: error.errors || error.message || error }
    }  
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const result = await this.service.delete(id);
      res.sendResponse(result, AcccountResponseMessages.ACCOUNT_DELETED);  
    } catch (error) {
      throw { statusCode: 403, error: error.errors || error.message || error }
    }    
  }


}
