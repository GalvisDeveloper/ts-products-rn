import { Layout, List } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Product } from '../../../domain/entities/product';
import ProductCard from './ProductCard';

interface Props {
	products: Product[];
	//todo: fetch nextPage
}

const ProductList = ({ products }: Props) => {
	return (
		<List
			data={products}
			numColumns={2}
			keyExtractor={(item, idx) => `${item.id}-${idx}`}
			renderItem={({ item }) => <ProductCard product={item} />}
			ListFooterComponent={<Layout style={{ height: 150 }}></Layout>}
		/>
	);
};

const styles = StyleSheet.create({
	ct: {},
});

export default ProductList;
