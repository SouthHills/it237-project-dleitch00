import {Router} from "express";
import {AppDataSource} from "../data-source.js";
import {Blueprint} from "../entities/Blueprint.js";
import {redirectNonAdmins} from "../utils/authentication.js";


const router = Router();

router.get('/blueprints', async(req, res) =>
{
    const blueprints = await AppDataSource.getRepository(Blueprint).find();

    res.json(blueprints);
});

//http://localhost:3000/blueprint?prodId=1&componentId=4
router.get('/blueprint/', async(req, res) =>
{
    const prodIdParam = req.query.prodId as string | undefined;
    const componentIdParam = req.query.componentId as string | undefined;
    console.log(prodIdParam);
    console.log(componentIdParam);

    if(!prodIdParam || !componentIdParam)
    {
        res.status(400).json({ message: "Both prodId and componentId query parameters are required." });
        return;
    }

    const prodId : number = parseInt(prodIdParam);
    const compId : number = parseInt(componentIdParam);

    const blueprint = await AppDataSource
        .getRepository(Blueprint)
        .findOneBy({
            productID: prodId,
            componentID: compId
        });

    if (!blueprint) res.status(404).json({ message: `Blueprint with Product ID ${prodId} not found.`})

    else res.json(blueprint);
});

router.put('/blueprint', async(req, res) =>
{
    const prodIdParam = req.query.prodId as string | undefined;
    const componentIdParam = req.query.componentId as string | undefined;

    if(!prodIdParam || !componentIdParam)
    {
        res.status(400).json({ message: "Both prodId and componentId query parameters are required." });
        return;
    }

    const prodId : number = parseInt(prodIdParam);
    const compId : number = parseInt(componentIdParam);
    const blueprintData = req.body;

    const blueprintRepository = AppDataSource.getRepository(Blueprint);
    const existingBlueprint = await blueprintRepository.findOneBy({
        productID: prodId,
        componentID: compId
    });

    if(!existingBlueprint)
    {
        res.status(404).json({ message: `Blueprint with Product ID ${prodId} and Component ID ${compId} not found.`});
        return;
    }

   blueprintRepository.merge(existingBlueprint, blueprintData);
    try
    {
        const updatedBlueprint = await blueprintRepository.save(existingBlueprint);
        res.json(updatedBlueprint);
    }
    catch (error)
    {
        res.status(500).json({ message: 'Error updating blueprint.', error });
    }
});

router.post('/blueprints', redirectNonAdmins, async (req, res) =>
{
    const blueprintData = req.body;
    console.log(blueprintData);


    const requiredFields = [
        'productID',
        'componentID',
        'componentAmount'
    ];

    if (requiredFields.some(field => blueprintData[field] == undefined || blueprintData[field] === null))
    {
        res.status(400).json({message: "Values are required for all attributes"});
    }

    const blueprintRepository = AppDataSource.getRepository(Blueprint);

    try
    {
        const newBlueprint = blueprintRepository.create(blueprintData);

        const savedBlueprint = await blueprintRepository.save(newBlueprint);

        res.status(201).json(savedBlueprint);
    }
    catch (error)
    {
        console.error('Error creating blueprint', error);
        res.status(500).json({message: 'Failed to create blueprint', error});
    }
});

router.delete('/blueprint', redirectNonAdmins, async (req, res) =>
{
    const prodIdParam = req.query.prodId as string | undefined;
    const componentIdParam = req.query.componentId as string | undefined;

    if(!prodIdParam || !componentIdParam)
    {
        res.status(400).json({ message: "Both prodId and componentId query parameters are required." });
        return;
    }

    const prodId : number = parseInt(prodIdParam);
    const compId : number = parseInt(componentIdParam);

    const blueprintRepository = AppDataSource.getRepository(Blueprint);

    const blueprint = await blueprintRepository.findOneBy({
        productID: prodId,
        componentID: compId
    });

    if (!blueprint)
    {
        res.status(404).json({ message: `Blueprint with Product ID ${prodId} and Component ID ${compId} not found` });
        return;
    }

    try
    {
        await blueprintRepository.remove(blueprint)

        res.json({ message: `Blueprint with Product ID ${prodId} and Component ID ${compId} successfully deleted` });
    }
    catch (error)
    {
        console.error('Error deleting blueprint', error);
        res.status(500).json({ message: "Failed to delete the blueprint", error});
    }
});


export default router