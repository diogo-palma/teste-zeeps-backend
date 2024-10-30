import * as yup from 'yup';

yup.setLocale({
	mixed: {
			required: 'O campo ${path} é obrigatório',
	},
	string: {
			
			min: 'Este campo deve ter pelo menos ${min} caracteres',
			max: 'Este campo deve ter no máximo ${max} caracteres',
	},
});   

export const AccountDTO = yup.object().shape({    
	TECL_ID: yup.mixed().optional(),
	TECL_NOME: yup.string().required(),
	TECL_ENDERECO: yup.string().required(),
	TECL_CIDADE: yup.string().required(),
	TECL_UF: yup.string().required(),
	TECL_TELEFONE: yup.string().required(),
	TECL_EMAIL: yup.string().email().optional(),
});
