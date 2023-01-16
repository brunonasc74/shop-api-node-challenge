import express from 'express';
import router from './router';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from './doc/swagger.json';

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.get('/', (_, res) => res.redirect('/api-docs'));

router(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`running on port ${PORT}`));
