import {Router} from "express";
import {AppDataSource} from "../data-source.js";
import {Product} from "../entities/Product";


const router = Router();

router.get('/products', async(req, res) =>
{
    const products = await AppDataSource.getRepository(Product).find();

    res.json(products);
});

router.get('/products/:id', async(req, res) =>
{
    const id : number = parseInt(req.params.id);
    console.log(id);
    const product = await AppDataSource
        .getRepository(Product)
        .findOneBy({
            productID: id
        });

    if (!product) res.json({ message: `Product with ID ${id} not found.`})

    else res.json(product);
});

router.put('/products/:id', async(req, res) =>
{
    const id : number = parseInt(req.params.id);
    const productData = req.body;

    const productRepository = AppDataSource.getRepository(Product);
    const existingProduct = await productRepository.findOneBy({ productID: id});
    if(!existingProduct)
    {
        res.status(404).json({ message: `Product with id ${id} not found.`});
        return;
    }

   productRepository.merge(existingProduct, productData);
    try
    {
        const updatedProduct = await productRepository.save(existingProduct);
        res.json(updatedProduct);
    }
    catch (error)
    {
        res.status(500).json({ message: 'Error updating product.', error });
    }
});

router.post('/products', async (req, res) =>
{
    const productData = req.body;
    console.log(productData);


    const requiredFields = [
        'productID',
        'productName',
        'productDescription',
        'productPrice'
    ];

    if (requiredFields.some(field => productData[field] == undefined || productData[field] === null))
    {
        res.status(400).json({message: "Values are required for all attributes"});
    }

    const productRepository = AppDataSource.getRepository(Product);

    try
    {
        const newProduct = productRepository.create(productData);

        const savedProduct = await productRepository.save(newProduct);

        res.status(201).json(savedProduct);
    }
    catch (error)
    {
        console.error('Error creating product', error);
        res.status(500).json({message: 'Failed to create product', error});
    }
});

router.delete('/products/:id', async (req, res) =>
{
    const id = parseInt(req.params.id);

    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOneBy({productID: id});

    if (!product)
    {
        res.status(404).json({ message: `Product with id ${id} not found` });
        return;
    }

    try
    {
        await productRepository.remove(product)

        res.json({ message: `Product with ID ${id} successfully deleted` });
    }
    catch (error)
    {
        console.error('Error deleting product', error);
        res.status(500).json({ message: "Failed to delete the product", error});
    }
});


export default router
