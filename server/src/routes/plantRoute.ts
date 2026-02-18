import {Router} from "express";
import {AppDataSource} from "../data-source.js";
import {Plant} from "../entities/Plant.js";


const router = Router();

router.get('/plants', async(req, res) =>
{
    const plants = await AppDataSource.getRepository(Plant).find();

    res.json(plants);
});

router.get('/plants/:id', async(req, res) =>
{
    const id : number = parseInt(req.params.id);
    console.log(id);
    const plant = await AppDataSource
        .getRepository(Plant)
        .findOneBy({
            plantID: id
        });

    if (!plant) res.json({ message: `Plant with ID ${id} not found.`})

    else res.json(plant);
});

router.put('/plants/:id', async(req, res) =>
{
    const id : number = parseInt(req.params.id);
    const plantData = req.body;

    const plantRepository = AppDataSource.getRepository(Plant);
    const existingPlant = await plantRepository.findOneBy({ plantID: id});
    if(!existingPlant)
    {
        res.status(404).json({ message: `Plant with id ${id} not found.`});
        return;
    }

   plantRepository.merge(existingPlant, plantData);
    try
    {
        const updatedPlant = await plantRepository.save(existingPlant);
        res.json(updatedPlant);
    }
    catch (error)
    {
        res.status(500).json({ message: 'Error updating plant.', error });
    }
});

router.post('/plants', async (req, res) =>
{
    const plantData = req.body;
    console.log(plantData);


    const requiredFields = [
        'plantID',
        'plantZIP',
        'plantNation',
        'plantStreet',
        'plantName',
        'plantStatus',
        'plantCity'
    ];

    if (requiredFields.some(field => plantData[field] == undefined || plantData[field] === null))
    {
        res.status(400).json({message: "Values are required for all attributes"});
    }

    const plantRepository = AppDataSource.getRepository(Plant);

    try
    {
        const newPlant = plantRepository.create(plantData);

        const savedPlant = await plantRepository.save(newPlant);

        res.status(201).json(savedPlant);
    }
    catch (error)
    {
        console.error('Error creating plant', error);
        res.status(500).json({message: 'Failed to create plant', error});
    }
});

router.delete('/plants/:id', async (req, res) =>
{
    const id = parseInt(req.params.id);

    const plantRepository = AppDataSource.getRepository(Plant);

    const plant = await plantRepository.findOneBy({plantID: id});

    if (!plant)
    {
        res.status(404).json({ message: `Plant with id ${id} not found` });
        return;
    }

    try
    {
        await plantRepository.remove(plant)

        res.json({ message: `Plant with ID ${id} successfully deleted` });
    }
    catch (error)
    {
        console.error('Error deleting plant', error);
        res.status(500).json({ message: "Failed to delete the plant", error});
    }
});


export default router
