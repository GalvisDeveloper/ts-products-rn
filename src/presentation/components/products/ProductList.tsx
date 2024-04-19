import { Layout, List } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Product } from '../../../domain/entities/product';
import ProductCard from './ProductCard';

interface Props {
	products: Product[];
	fetchNextPage: () => void;
}

const ProductList = ({ products, fetchNextPage }: Props) => {
	const [isRefreshing, setIsRefreshing] = useState(false);

	const onPullToRefresh = async () => {
		setIsRefreshing(true);
		// sleep 2
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setIsRefreshing(false);
	};

	return (
		<List
			data={products}
			numColumns={2}
			keyExtractor={(item, idx) => `${item.id}-${idx}`}
			renderItem={({ item }) => <ProductCard product={item} />}
			ListFooterComponent={<Layout style={{ height: 150 }}></Layout>}
			onEndReached={fetchNextPage}
			onEndReachedThreshold={0.5}
			// refreshControl={ <List.RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
		/>
	);
};

const styles = StyleSheet.create({
	ct: {},
});

export default ProductList;
