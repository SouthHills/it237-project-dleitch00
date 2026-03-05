import {Router} from "express";
import {AppDataSource} from "../data-source.js";
import {ProductionLine} from "../entities/ProductionLine.js";
import {redirectNonAdmins} from "../utils/authentication.js";


const router = Router();

router.get('/productionLines', async(req, res) =>
{
    const productionLines = await AppDataSource.getRepository(ProductionLine).find();

    res.json(productionLines);
});

//http://localhost:3000/productionLine?productID=1&plantID=4
router.get('/productionLine', async(req, res) =>
{
    const prodIdParam = req.query.productID as string | undefined;
    const plantIdParam = req.query.plantID as string | undefined;

    if(!prodIdParam || !plantIdParam)
    {
        res.status(400).json({ message: "Both productID and plantID query parameters are required." });
        return;
    }

    const prodID : number = parseInt(prodIdParam);
    const plantID : number = parseInt(plantIdParam);

    const productionLine = await AppDataSource
        .getRepository(ProductionLine)
        .findOneBy({
            productID: prodID,
            plantID: plantID
        });

    if (!productionLine) res.status(404).json({ message: `ProductionLine with Product ID ${prodID} and Plant ID ${plantID} not found.`})

    else res.json(productionLine);
});

// update
router.put('/productionLine', redirectNonAdmins, async(req, res) =>
{
    const prodIdParam = req.query.productID as string | undefined;
    const plantIdParam = req.query.plantID as string | undefined;

    if(!prodIdParam || !plantIdParam)
    {
        res.status(400).json({ message: "Both productID and plantID query parameters are required." });
        return;
    }

    const productID : number = parseInt(prodIdParam);
    const plantID : number = parseInt(plantIdParam);

    const productionLineData = req.body;

    const productionLineRepository = AppDataSource.getRepository(ProductionLine);
    const existingProductionLine = await productionLineRepository.findOneBy({ productID, plantID});
    if(!existingProductionLine)
    {
        res.status(404).json({ message: `Production Line with productID ${productID} and plantID ${plantID} not found.`});
        return;
    }

    productionLineRepository.merge(existingProductionLine, productionLineData);
    try
    {
        const updatedProductionLine = await productionLineRepository.save(existingProductionLine);
        res.json(updatedProductionLine);
    }
    catch (error)
    {
        res.status(500).json({ message: 'Error updating product line.', error });
    }
});

router.post('/productionLines', redirectNonAdmins, async (req, res) =>
{
    const productionLineData = req.body;
    console.log(productionLineData);


    const requiredFields = [
        'productID',
        'plantID',
        'productQuantity',
        'productMinimum',
    ];

    if (requiredFields.some(field => productionLineData[field] == undefined || productionLineData[field] === null))
    {
        res.status(400).json({message: "Values are required for all attributes"});
    }

    const productionLineRepository = AppDataSource.getRepository(ProductionLine);

    try
    {
        const newProductionLine = productionLineRepository.create(productionLineData);

        const savedProductionLine = await productionLineRepository.save(newProductionLine);

        res.status(201).json(savedProductionLine);
    }
    catch (error)
    {
        console.error('Error creating production line', error);
        res.status(500).json({message: 'Failed to create production line', error});
    }
});

router.delete('/productionLine', redirectNonAdmins, async (req, res) =>
{
    const prodIdParam = req.query.productID as string | undefined;
    const plantIdParam = req.query.plantID as string | undefined;

    if(!prodIdParam || !plantIdParam)
    {
        res.status(400).json({ message: "Both productID and plantID query parameters are required." });
        return;
    }

    const productID : number = parseInt(prodIdParam);
    const plantID : number = parseInt(plantIdParam);


    const productionLineRepository = AppDataSource.getRepository(ProductionLine);

    const productionLine = await productionLineRepository.findOneBy({productID, plantID});

    if (!productionLine)
    {
        res.status(404).json({ message: `ProductLine with productID ${productID} and plantID ${plantID} not found` });
        return;
    }

    try
    {
        await productionLineRepository.remove(productionLine)

        res.json({ message: `ProductLine with productID ${productID} and plantID ${plantID} successfully deleted` });
    }
    catch (error)
    {
        console.error('Error deleting production line', error);
        res.status(500).json({ message: "Failed to delete the production line", error});
    }
});


export default router
