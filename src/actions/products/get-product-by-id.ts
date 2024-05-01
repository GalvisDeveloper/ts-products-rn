import { tesloApi } from "../../config/api/tesloApi";
import { Product } from '../../domain/entities/product';
import { showErrorMessage } from "../../helpers/axiosError";
import { Gender, ProductListResponse } from "../../infraestructure/interfaces/products/product.responses";
import { ProductMapper } from "../../infraestructure/mappers/product/product.mapper";

const emptyProduct = {
    id: '',
    title: 'New Product',
    description: '',
    price: 0,
    images: [],
    slug: '',
    gender: Gender.Unisex,
    sizes: [],
    stock: 0,
    tags: [],
}


export const getProductById = async (id: string): Promise<Product> => {
    if (id === 'new') return emptyProduct;
    try {
        const { data } = await tesloApi.get<ProductListResponse>(`/products/${id}`);
        return ProductMapper.tesloProductToEntity(data);
    } catch (error) {
        showErrorMessage(error);
        throw new Error(`Error getting product by id: ${id}`);
    }
}