import express from 'express';
import router from './router';

const app = express();
app.use(express.json());

router(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`running on port ${PORT}`));
