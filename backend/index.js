import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { authRouter } from './routes/authRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
// DB connection =>
mongoose.connect(process.env.MONGO_URI)
.then(
  () => console.log('DB connected')
)
.catch(err => console.log(err));


app.use(express.static('client'));
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter)



app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});