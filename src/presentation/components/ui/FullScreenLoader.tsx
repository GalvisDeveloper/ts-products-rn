import { Layout, Spinner } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const FullScreenLoader = () => {
	return (
		<Layout style={styles.ct}>
			<Spinner size='giant' />
		</Layout>
	);
};

const styles = StyleSheet.create({
	ct: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default FullScreenLoader;
