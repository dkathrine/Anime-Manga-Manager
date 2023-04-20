import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import animeRoutes from './routes/anime.js';

dotenv.config();

const port = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());

app.use("/library", animeRoutes);

const main = async() => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(`${process.env.MONGODB_CONNECTION}/${process.env.MONGODB_DATABASE}`);
}
main().catch((err) => console.log(`Connection failed!: ${err}`));

app.listen(port, () => console.log(`Server listening on ${port}`));