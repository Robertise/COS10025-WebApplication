import express from 'express';
import cors from 'cors';

import { getSensors } from './functions/getSensors.js';

const app = express();

app.use(cors());
app.use(express.json());



app.get('/sensors', getSensors);


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});