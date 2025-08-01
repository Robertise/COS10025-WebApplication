import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

import { getSensors } from './functions/getSensors.js';
import { getAlerts } from './functions/getAlerts.js';
const app = express();

app.use(cors());
app.use(express.json());



app.get('/sensors', getSensors);
app.get('/alerts', getAlerts);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});