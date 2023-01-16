import { Request } from 'express';
import * as yup from 'yup';

const productSchema = yup.object().shape({
	name: yup.string().min(3).max(50).required(),
	category: yup.string().min(3).max(50).required(),
	status: yup.string().uppercase().oneOf(['ACTIVE', 'INACTIVE']),
	quantity: yup.number().moreThan(0).required()
});

const validateRequest = async (req: Request) => {
	try {
		const validatedData = await productSchema.validate(req.body, {
			abortEarly: false
		});
		return validatedData;
	} catch (validationError) {
		throw validationError;
	}
};

export default validateRequest;
