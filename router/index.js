import express from 'express';
import routes from './routes/index.js'

const indexRouter = express.Router();

indexRouter.use('/', routes);

export default indexRouter;
