import {Router} from "express";
import {AppDataSource} from "../data-source.js";
import {Product} from "../entities/Product.js";
import {IProduct} from "../shared/IProduct.js";
import {ProductionLine} from "../entities/ProductionLine.js";

const router = Router();

// Get all products
router.get('/products', async(req, res) =>
{
    const products = await AppDataSource.getRepository(Product).find();

    const responseData: IProduct[] = products.map(product => ({
        productID: product.productID,
        productName: product.productName,
        productDescription: product.productDescription,
        productPrice: product.productPrice
    }));

    res.json(responseData);
});

router.get('/products/:id', async(req, res) =>
{
    const id : number = parseInt(req.params.id);
    console.log(id);
    const product : Product | null = await AppDataSource
        .getRepository(Product)
        .findOneBy({
            productID: id
        });

    if (!product) return res.json({ message: `Product with ID ${id} not found.`})

    const responseData: IProduct = {
        productID: product?.productID!,
        productName: product?.productName!,
        productDescription: product?.productDescription!,
        productPrice: product?.productPrice!

    }

    res.json(responseData);
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
        const responseData: IProduct = updatedProduct;
        res.json(responseData);
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
        const newProduct = productRepository.create(productData as Product);

        const savedProduct = await productRepository.save(newProduct);
        const responseData: IProduct = savedProduct;

        res.status(201).json(responseData);
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
