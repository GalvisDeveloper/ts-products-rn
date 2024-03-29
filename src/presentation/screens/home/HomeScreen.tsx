import { StyleSheet } from 'react-native';
import React from 'react';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';

const HomeScreen = () => {
	return (
		<Layout style={styles.ct}>
			<Text>HomeScreen</Text>

			<Icon name='facebook' />

			<Button onPress={() => {}}> Close </Button>
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
