import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {AppDataSource} from "./data-source.js";
import blueprintRoute from "./routes/blueprintRoute.js";
import componentRoute from "./routes/componentRoute.js";
import employeeRoute from "./routes/employeeRoute.js";
import plantRoute from "./routes/plantRoute.js";
import productionlineRoute from "./routes/productionlineRoute.js";
import productRoute from "./routes/productRoute.js";
import vendorRoute from "./routes/vendorRoute.js";

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












