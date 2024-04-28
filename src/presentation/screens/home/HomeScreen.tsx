import { useFocusEffect } from '@react-navigation/native';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@ui-kitten/components';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { getProductsPaginated } from '../../../actions/products/get-product-paginated';
import ProductList from '../../components/products/ProductList';
import FullScreenLoader from '../../components/ui/FullScreenLoader';
import MainLayout from '../../layouts/MainLayout';
import { useAuthStore } from '../../store/auth/useAuthStore';

const HomeScreen = () => {
	const queryClient = useQueryClient();
	const { logout } = useAuthStore();

	const { isLoading, data, fetchNextPage } = useInfiniteQuery({
		queryKey: ['products', 'infinite'],
		staleTime: 1000 * 60 * 60, // 1 hour
		initialPageParam: 0,
		queryFn: async (params) => {
			return await getProductsPaginated(params.pageParam);
		},
		getNextPageParam: (lastPage, pages) => {
			return pages.length;
		},
	});

	useFocusEffect(
		useCallback(() => {
			queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
		}, [queryClient]),
	);

	return (
		<MainLayout title='TesloShop Products' subTitle='Welcome to TesloShop, here you can find the best products for you!'>
			<Button onPress={logout}> Log out </Button>
			{isLoading ? <FullScreenLoader /> : <ProductList products={data?.pages.flat() ?? []} fetchNextPage={fetchNextPage} />}
		</MainLayout>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	ct: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
