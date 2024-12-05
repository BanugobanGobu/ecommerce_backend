import mongoose, { Schema, Document } from 'mongoose';


export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    images?: string[];
    stock: number;
}

const productSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    stock: { type: Number, required: true },
},{timestamps:true});

const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;
