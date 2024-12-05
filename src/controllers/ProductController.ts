
import { Request, Response } from 'express';
import Product from "../models/ProductModel";

class ProductController {
    public async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const { name, description, price, stock } = req.body;

            const files = req.files as Express.Multer.File[];
            const imagePaths = files.map((file) => file.path);

            const newProduct = new Product({
                name,
                description,
                price,
                stock,
                images: imagePaths,
            });

            await newProduct.save();
            res.status(200).json(newProduct);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: "Error creating product", error: error.message });
            } else {
                res.status(400).json({ message: "Unknown error occurred" });
            }
        }
    }


    public async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await Product.find({});
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: "Error while getting all products", error });
        }
    }

    public async getSingleProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const product = await Product.findById(id);
            if (!product) {
                res.status(404).json({ message: "product not found" });
                return;
            }
            res.status(200).json(product);

        }
        catch (error) { res.status(500).json({ message: "Error while getting single product", error }) }
    }

    public async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { name, description, price, stock } = req.body;
            const newImagePaths = (req.files as Express.Multer.File[])?.map(
                (file) => file.path
            );

            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                {
                    name,
                    description,
                    price,
                    stock,
                    images: newImagePaths?.length ? newImagePaths : undefined,
                },
                { new: true, runValidators: true }
            );

            if (!updatedProduct) {
                res.status(404).json({ message: "Product not found" });
                return;
            }
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ message: "Error updating product" });
        }
    }


    public async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                res.status(404).json({ message: "product not found" })
            }
            res.status(200).json(product)
        }
        catch (error) { res.status(500).json({ message: "Error while delete this product", error }) }
    }


    public async filteredProduct(req: Request, res: Response): Promise<void> {
        try {
            const { name, stock, createdAt } = req.query;
            const filter: any = {};
            if (name) {
                filter.name = { $regex: name, $options: "i" }
            }

            if (stock) {
                filter.stock = { $gte: Number(stock) }
            }
            if (createdAt){
                const startDate = new Date(createdAt as string);
                const endDate = new Date(startDate);
                endDate.setDate(endDate.getDate() + 1);
                filter.createdAt={$gte:startDate,$lte:endDate}
            }
                const products = await Product.find(filter)
            res.status(200).json(products)
        }
        catch (error) {
            res.status(500).json({ message: "Error while filtering the product", error })
        }
    }




}


export default new ProductController();
