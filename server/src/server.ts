import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {AppDataSource} from "./data-source.js";
import blueprintRoute from "./routes/blueprintRoute";
import componentRoute from "./routes/componentRoute";
import employeeRoute from "./routes/employeeRoute";
import plantRoute from "./routes/plantRoute";
import productionlineRoute from "./routes/productionlineRoute";
import productRoute from "./routes/productRoute";
import vendorRoute from "./routes/vendorRoute";

const app = express();
const port: number = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(blueprintRoute);
app.use(componentRoute);
app.use(employeeRoute);
app.use(plantRoute);
app.use(productionlineRoute);
app.use(productRoute);
app.use(vendorRoute);

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












