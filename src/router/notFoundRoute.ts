import { Router, Request, Response } from 'express';
const router = Router();

router.get('*', (req: Request, res: Response) => {
	const apiDocsUrl = `${req.protocol}://${req.get('host')}/api-docs`;
	res.status(404).send({
		status: 404,
		message: `Resource not found, go to /api-docs for more information`,
		apiDocs: `${apiDocsUrl}`
	});
});

export default router;
