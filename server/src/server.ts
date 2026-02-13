import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {AppDataSource} from "./data-source.js";
import blueprintRoute from "./routes/blueprintRoute";

const app = express();
const port: number = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(blueprintRoute);

app.listen(port, () =>
{
    console.log(`Server is listening at http://localhost:${port}`);
});

AppDataSource.initialize()
    .then(() =>
    {
        console.log("Data source has been initialized!");
    })
    .catch((error) =>
    {
        console.error("Error during data source initialization: ", error);
    });












