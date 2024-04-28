import { ToastAndroid } from "react-native";
import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product";
import { showErrorMessage } from "../../helpers/axiosError";


export const updateCreateProduct = async (product: Partial<Product>) => {
    product.stock = Number(product.stock);
    product.price = Number(product.price);

    if (!product.id) {
        throw new Error('Create product not implemented yet');
    }

    return await updateProduct(product);
}

// TODO: revisar si viene el usuario
const updateProduct = async (product: Partial<Product>) => {
    try {
        const { id, images = [], ...rest } = product;
        const checkedImages = prepareImages(images);

        const { data } = await tesloApi.patch(`/products/${id}`, { ...rest, images: checkedImages });

        ToastAndroid.show('Product updated', ToastAndroid.SHORT);

        return data;
    } catch (error) {
        showErrorMessage(error);
    }
}

const prepareImages = (images: string[]) => {
    //TODO: revisar files
    return images.map(image => image.split('/').pop());
}