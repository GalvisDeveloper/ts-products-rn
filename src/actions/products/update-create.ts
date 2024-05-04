import { ToastAndroid } from "react-native";
import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product";
import { showErrorMessage } from "../../helpers/axiosError";


export const updateCreateProduct = async (product: Partial<Product>) => {
    product.stock = Number(product.stock);
    product.price = Number(product.price);

    if (!product.id || product.id === 'new') {
        return await createProduct(product);
    }

    return await updateProduct(product);
}

// TODO: revisar si viene el usuario
const updateProduct = async (product: Partial<Product>) => {
    try {
        const { id, images = [], ...rest } = product;
        const checkedImages = await prepareImages(images);

        const { data } = await tesloApi.patch(`/products/${id}`, { ...rest, images: checkedImages });

        ToastAndroid.show('Product updated', ToastAndroid.SHORT);

        return data;
    } catch (error) {
        showErrorMessage(error);
    }
}

const prepareImages = async (images: string[]) => {
    const fileImages = images.filter(image => image.startsWith('file://'));
    const currentImages = images.filter(image => !image.startsWith('file://'));

    if (fileImages.length > 0) {
        const uploadPromises = fileImages.map(uploadImage);
        const uploadedImages = await Promise.all(uploadPromises);

        currentImages.push(...uploadedImages);
    }

    return currentImages.map(image => image.split('/').pop());
}

const uploadImage = async (image: string) => {
    try {
        const formData = new FormData();

        formData.append(`file`, {
            uri: image,
            name: image.split('/').pop(),
            type: 'image/jpg'
        });

        const { data } = await tesloApi.post<{ image: string }>(`/files/product`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return data.image;
    } catch (error) {
        showErrorMessage(error);
        return '';
    }

}


const createProduct = async (product: Partial<Product>) => {
    try {
        const { id, images = [], ...rest } = product;
        const checkedImages = await prepareImages(images);

        const { data } = await tesloApi.post(`/products`, { ...rest, images: checkedImages });

        ToastAndroid.show('Product created', ToastAndroid.SHORT);

        return data;
    } catch (error) {
        showErrorMessage(error);
    }
}