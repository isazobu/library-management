const express = require('express');

import bookRouter  from './books/routes';
import { errorHandler, notFound } from './middleware/errorHandler';


const app = express();

app.use(express.json());

app.use('/books', bookRouter);

app.use(errorHandler);
app.use(notFound);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
