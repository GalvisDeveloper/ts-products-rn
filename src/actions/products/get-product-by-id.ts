import { tesloApi } from "../../config/api/tesloApi";
import { Product } from '../../domain/entities/product';
import { showErrorMessage } from "../../helpers/axiosError";
import { ProductListResponse } from "../../infraestructure/interfaces/products/product.responses";
import { ProductMapper } from "../../infraestructure/mappers/product/product.mapper";

export const getProductById = async (id: string): Promise<Product> => {
    try {
        const { data } = await tesloApi.get<ProductListResponse>(`/products/${id}`);
        return ProductMapper.tesloProductToEntity(data);
    } catch (error) {
        showErrorMessage(error);
        throw new Error(`Error getting product by id: ${id}`);
    }
}