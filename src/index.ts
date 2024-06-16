import dotenv from "dotenv"
import config from 'config';
import express, {Express} from "express"
import { middlewares } from "./setups/middleware.startup"
import { errorHandler } from "./middleware/errorHandler";
import { connect } from "./model/connect";
import mongoose from "mongoose";
import { routesFunctions } from "./setups/routes.app";

dotenv.config()
const app = express()

const port = config.get<number>('port')

middlewares(app)

routesFunctions(app)

app.use(errorHandler);

connect(process.env.DB_url || '')

mongoose.connection.on('error', () => {console.log("something is wrong. Check your internet connection");})

mongoose.connection.once('open', () => {
    app.listen(port, () => { console.log(`app is running on port ${port}`)})
})

