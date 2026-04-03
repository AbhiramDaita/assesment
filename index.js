import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';

const app = express();
const port = 3000;
dotenv.config();


app.use(express.json());
app.use('/api/v1', routes);



app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});