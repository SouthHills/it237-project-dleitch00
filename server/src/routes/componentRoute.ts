import {Router} from "express";
import {AppDataSource} from "../data-source.js";
import {Component} from "../entities/Component.js";


const router = Router();

router.get('/components', async(req, res) =>
{
    const components = await AppDataSource.getRepository(Component).find();

    const responseData = components.map(component => ({
        componentID: component.componentID,
        componentName: component.componentName,
        componentDescription: component.componentDescription,
        componentMinimumQuantity: component.componentMinimumQuantity,
        componentPrice: component.componentPrice,
        vendorID: component.vendorID,
        vendorName: component.vendor ? component.vendor.vendorName : null
    }));

    res.json(responseData);
});

router.get('/components/:id', async(req, res) =>
{
    const id : number = parseInt(req.params.id);
    console.log(req.params.id);
    console.log(id);
    const component = await AppDataSource
        .getRepository(Component)
        .findOneBy({
            componentID: id
        });

    if (!component) res.json({ message: `Component with ID ${id} not found.`})

    else res.json(component);
});

router.put('/components/:id', async(req, res) =>
{
    const id : number = parseInt(req.params.id);
    const componentData = req.body;

    const componentRepository = AppDataSource.getRepository(Component);
    const existingComponent = await componentRepository.findOneBy({ componentID: id});
    if(!existingComponent)
    {
        res.status(404).json({ message: `Component with id ${id} not found.`});
        return;
    }

   componentRepository.merge(existingComponent, componentData);
    try
    {
        const updatedComponent = await componentRepository.save(existingComponent);
        res.json(updatedComponent);
    }
    catch (error)
    {
        res.status(500).json({ message: 'Error updating component.', error });
    }
});

router.post('/components', async (req, res) =>
{
    const componentData = req.body;
    console.log(componentData);


    const requiredFields = [
        'componentID',
        'componentName',
        'componentDescription',
        'componentMinimumQuantity',
        'componentPrice'
    ];

    if (requiredFields.some(field => componentData[field] == undefined || componentData[field] === null))
    {
        res.status(400).json({message: "Values are required for all attributes"});
    }

    const componentRepository = AppDataSource.getRepository(Component);

    try
    {
        const newComponent = componentRepository.create(componentData);

        const savedComponent = await componentRepository.save(newComponent);

        res.status(201).json(savedComponent);
    }
    catch (error)
    {
        console.error('Error creating component', error);
        res.status(500).json({message: 'Failed to create component', error});
    }
});

router.delete('/components/:id', async (req, res) =>
{
    const id = parseInt(req.params.id);

    const componentRepository = AppDataSource.getRepository(Component);

    const component = await componentRepository.findOneBy({componentID: id});

    if (!component)
    {
        res.status(404).json({ message: `Component with id ${id} not found` });
        return;
    }

    try
    {
        await componentRepository.remove(component)

        res.json({ message: `Component with ID ${id} successfully deleted` });
    }
    catch (error)
    {
        console.error('Error deleting component', error);
        res.status(500).json({ message: "Failed to delete the component", error});
    }
});


export default router
