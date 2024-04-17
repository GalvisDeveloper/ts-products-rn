import { useQuery } from '@tanstack/react-query';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { getProductsPaginated } from '../../../actions/products/get-product-paginated';
import { useAuthStore } from '../../store/auth/useAuthStore';
import MainLayout from '../../layouts/MainLayout';

const HomeScreen = () => {
	const { logout } = useAuthStore();

	const { isLoading, data: products } = useQuery({
		queryKey: ['products', 'infinite'],
		staleTime: 1000 * 60 * 60, // 1 hour
		queryFn: () => getProductsPaginated(0),
	});

	console.log(products);

	return (
		<MainLayout
			title='TesloShop Products'
			subTitle='Welcome to TesloShop, here you can find the best products for you!'
			rightAction={() => {
				console.log('first');
			}}
			rightActionIcon='arrow-back-outline'
		>
			<Layout style={styles.ct}>
				<Text>{JSON.stringify(products, null, 2)}</Text>

				<Button accessoryLeft={<Icon name='log-out-outline' />} onPress={logout}>
					Close
				</Button>
			</Layout>
		</MainLayout>
		// <Layout style={styles.ct}>
		// 	<Text>{JSON.stringify(products, null, 2)}</Text>

		// 	<Button accessoryLeft={<Icon name='log-out-outline' />} onPress={logout}>
		// 		Close
		// 	</Button>
		// </Layout>
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
