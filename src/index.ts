
import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
const morgan = require('morgan')

import * as errorHandler from './middleware/errorHandler';
import logger from './middleware/logger';

import rootRoutes from './rootRoutes';


const app = express();
require('dotenv').config();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use('/books', rootRoutes.bookRouter);
app.use('/users', rootRoutes.userRouter);


app.use(errorHandler.notFoundErrorHandler);

app.use(errorHandler.errorHandler);





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
