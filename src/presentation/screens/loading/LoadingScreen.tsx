import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const LoadingScreen = () => {
	return (
		<View style={styles.ct}>
			<Text>LoadingScreen</Text>
		</View>
	);
};

export default LoadingScreen;

const styles = StyleSheet.create({
	ct: {
		flex: 1,
		backgroundColor: '#1b1b1b',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
