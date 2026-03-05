import {Router} from "express";
import {AppDataSource} from "../data-source.js";
import {Vendor} from "../entities/Vendor.js";
import {redirectNonAdmins} from "../utils/authentication.js";


const router = Router();

router.get('/vendors', redirectNonAdmins,  async(req, res) =>
{
    const vendors = await AppDataSource.getRepository(Vendor).find();

    res.json(vendors);
});

router.get('/vendors/:id', redirectNonAdmins, async(req, res) =>
{
    const id : number = parseInt(req.params.id);
    console.log(id);
    const vendor = await AppDataSource
        .getRepository(Vendor)
        .findOneBy({
            vendorID: id
        });

    if (!vendor) res.json({ message: `Vendor with ID ${id} not found.`})

    else res.json(vendor);
});

router.put('/vendors/:id', redirectNonAdmins, async(req, res) =>
{
    const id : number = parseInt(req.params.id);
    const vendorData = req.body;

    const vendorRepository = AppDataSource.getRepository(Vendor);
    const existingVendor = await vendorRepository.findOneBy({ vendorID: id});
    if(!existingVendor)
    {
        res.status(404).json({ message: `Vendor with id ${id} not found.`});
        return;
    }

   vendorRepository.merge(existingVendor, vendorData);
    try
    {
        const updatedVendor = await vendorRepository.save(existingVendor);
        res.json(updatedVendor);
    }
    catch (error)
    {
        res.status(500).json({ message: 'Error updating vendor.', error });
    }
});

router.post('/vendors', redirectNonAdmins, async (req, res) =>
{
    const vendorData = req.body;
    console.log(vendorData);


    const requiredFields = [
        'vendorID',
        'vendorName',
        'vendorSpecialization',
        'vendorHqZIP',
        'vendorHqNation',
        'vendorHqStreet',
        'vendorHqCity',
    ];

    if (requiredFields.some(field => vendorData[field] == undefined || vendorData[field] === null))
    {
        res.status(400).json({message: "Values are required for all attributes"});
    }

    const vendorRepository = AppDataSource.getRepository(Vendor);

    try
    {
        const newVendor = vendorRepository.create(vendorData);

        const savedVendor = await vendorRepository.save(newVendor);

        res.status(201).json(savedVendor);
    }
    catch (error)
    {
        console.error('Error creating vendor', error);
        res.status(500).json({message: 'Failed to create vendor', error});
    }
});

router.delete('/vendors/:id', redirectNonAdmins, async (req, res) =>
{
    const id = parseInt(req.params.id);

    const vendorRepository = AppDataSource.getRepository(Vendor);

    const vendor = await vendorRepository.findOneBy({vendorID: id});

    if (!vendor)
    {
        res.status(404).json({ message: `Vendor with id ${id} not found` });
        return;
    }

    try
    {
        await vendorRepository.remove(vendor)

        res.json({ message: `Vendor with ID ${id} successfully deleted` });
    }
    catch (error)
    {
        console.error('Error deleting vendor', error);
        res.status(500).json({ message: "Failed to delete the vendor", error});
    }
});


export default router
