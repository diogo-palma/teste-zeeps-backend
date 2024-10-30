import mongoose, { ObjectId } from "mongoose";

export interface Account {
  TECL_ID?: mongoose.Types.ObjectId;
  TECL_NOME: string;
  TECL_ENDERECO: string;
  TECL_CIDADE: string;
  TECL_UF: string;
  TECL_TELEFONE: string;
  TECL_EMAIL?: string;
}

export default Account;