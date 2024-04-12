import { API_URL } from "../../../config/api/tesloApi";
import { Product } from "../../../domain/entities/product";
import { ProductListResponse } from "../../interfaces/products/product.responses";


export class ProductMapper {
    static tesloProductToEntity(product: ProductListResponse): Product {
        return {
            ...product,
            images: product.images.map(image => `${API_URL}/files/product/${image}`) // Se obtiene la imagen de cada producto por servicio
        }
    }
}