import {Router} from "express";
import {AppDataSource} from "../data-source.js";
import {ProductionLine} from "../entities/ProductionLine";


const router = Router();

router.get('/productionlines', async(req, res) =>
{
    const productionLines = await AppDataSource.getRepository(ProductionLine).find();

    res.json(productionLines);
});

router.get('/productionlines/:id', async(req, res) =>
{
    const id : number = parseInt(req.params.id);
    console.log(id);
    const productionLine = await AppDataSource
        .getRepository(ProductionLine)
        .findOneBy({
            plantID: id
        });

    if (!productionLine) res.json({ message: `productionLine with ID ${id} not found.`})

    else res.json(productionLine);
});

router.put('/productionlines/:id', async(req, res) =>
{
    const id : number = parseInt(req.params.id);
    const productionLineData = req.body;

    const productionLineRepository = AppDataSource.getRepository(ProductionLine);
    const existingProductionLine = await productionLineRepository.findOneBy({ plantID: id});
    if(!existingProductionLine)
    {
        res.status(404).json({ message: `productionLine with id ${id} not found.`});
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
        res.status(500).json({ message: 'Error updating productionLine.', error });
    }
});

router.post('/productionlines', async (req, res) =>
{
    const productionLineData = req.body;
    console.log(productionLineData);


    const requiredFields = [
        'plantID',
        'productID',
        'productQuantity',
        'productMinimum'
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
        console.error('Error creating productionLine', error);
        res.status(500).json({message: 'Failed to create productionLine', error});
    }
});

router.delete('/productionlines/:id', async (req, res) =>
{
    const id = parseInt(req.params.id);

    const productionLineRepository = AppDataSource.getRepository(ProductionLine);

    const productionLine = await productionLineRepository.findOneBy({plantID: id});

    if (!productionLine)
    {
        res.status(404).json({ message: `productionLine with id ${id} not found` });
        return;
    }

    try
    {
        await productionLineRepository.remove(productionLine)

        res.json({ message: `productionLine with ID ${id} successfully deleted` });
    }
    catch (error)
    {
        console.error('Error deleting productionLine', error);
        res.status(500).json({ message: "Failed to delete the productionLine", error});
    }
});


export default router
