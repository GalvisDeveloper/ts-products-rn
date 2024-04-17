import { tesloApi } from "../../config/api/tesloApi"
import { Product } from "../../domain/entities/product";
import { ProductListResponse } from "../../infraestructure/interfaces/products/product.responses";
import { ProductMapper } from "../../infraestructure/mappers/product/product.mapper";

export const getProductsPaginated = async (page: number, limit: number = 20): Promise<Product[]> => {
    try {
        const { data } = await tesloApi.get<ProductListResponse[]>(`/products?offset=${page * 10}&limit=${limit}`)

        const products = data.map(ProductMapper.tesloProductToEntity);

        return products;
    } catch (error) {
        console.log(error)
        throw new Error(`Error al obtener los productos, ${error}`)
    }
}