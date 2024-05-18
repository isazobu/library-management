const express = require('express');


import { errorHandler, notFound } from './middleware/errorHandler';
import rootRoutes from './rootRoutes';


const app = express();

app.use(express.json());

app.use('/books', rootRoutes.bookRouter);
app.use('/users', rootRoutes.userRouter);

app.use(errorHandler);
app.use(notFound);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
