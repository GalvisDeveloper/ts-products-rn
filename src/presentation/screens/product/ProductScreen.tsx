import { StackScreenProps } from '@react-navigation/stack';
import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { StyleSheet, Text } from 'react-native';
import { getProductById } from '../../../actions/products/get-product-by-id';
import FullScreenLoader from '../../components/ui/FullScreenLoader';
import MainLayout from '../../layouts/MainLayout';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'Product'> {}

const ProductScreen = ({ navigation, route }: Props) => {
	let { params } = route;
	const productIdRef = useRef(params.productId);

	const { data: product } = useQuery({
		queryKey: ['product', productIdRef.current],
		queryFn: async () => {
			return await getProductById(productIdRef.current);
		},
	});

	if (!product) {
		return <MainLayout title='Loading...' children={<FullScreenLoader />} />;
	}

	return <MainLayout title={product.title} subTitle={`Price: ${product.price}`} children={<Text>{product.title}</Text>} />;
};

export default ProductScreen;

const styles = StyleSheet.create({});
