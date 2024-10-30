import { Document, Model, Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import Account from '../../../../domain/interfaces/account';

interface AccountDocument extends Document, Account {}

interface AccountModel extends Model<AccountDocument> {
  paginate(query: any, options: any): Promise<any>;
}

const AccountSchema = new Schema<AccountDocument>(
  {
    TECL_ID: { type: Schema.Types.ObjectId, required: true, auto: true },
    TECL_NOME: { type: String, required: true },
    TECL_ENDERECO: { type: String, required: true },
    TECL_CIDADE: { type: String, required: true },
    TECL_UF: { type: String, required: true },
    TECL_TELEFONE: { type: String, required: true },
    TECL_EMAIL: { type: String, unique: true, sparse: true },  
  },
  {
    collection: 'Account',
    timestamps: true,   
  }
);

AccountSchema.plugin(mongoosePaginate);

const AccountModel = model<AccountDocument, AccountModel>("Account", AccountSchema);

export default AccountModel;
