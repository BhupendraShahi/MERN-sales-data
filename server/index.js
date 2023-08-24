import express from 'express';
import mongoose from 'mongoose';
import apiRoutes from './routes/api.js';
import dataSeeder from './utils/dataSeeder.js';
import cors from "cors";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.use(express.json());

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

app.use('/api/seed', dataSeeder);
app.use('/api', apiRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});