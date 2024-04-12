import { StyleSheet } from 'react-native';
import React from 'react';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';
import { StorageAdapter } from '../../../config/adapters/async-storage';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { getProductsPaginated } from '../../../actions/products/get-product-paginated';

const HomeScreen = () => {
	const { logout } = useAuthStore();

	getProductsPaginated(0).then((res) => {
		console.log(res);
	});
	return (
		<Layout style={styles.ct}>
			<Text>HomeScreen</Text>

			<Button accessoryLeft={<Icon name='log-out-outline' />} onPress={logout}>
				Close
			</Button>
		</Layout>
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
