import { Size, Tag } from "../../infraestructure/interfaces/products/product.responses";


export interface Product {
    id:          string;
    title:       string;
    price:       number;
    description: string;
    slug:        string;
    stock:       number;
    sizes:       Size[];
    gender:      string;
    tags:        Tag[];
    images:      string[];
}

