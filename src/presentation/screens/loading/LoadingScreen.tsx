import { Layout, Spinner } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

const LoadingScreen = () => {
	return (
		<Layout style={styles.ct}>
			<Spinner status='primary' size='large' />
		</Layout>
	);
};

export default LoadingScreen;

const styles = StyleSheet.create({
	ct: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
