import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import StackNavigator from './presentation/navigation/StackNavigator';

const ProductsApp = () => {
	const colorScheme = useColorScheme();
	const theme = colorScheme === 'dark' ? eva.dark : eva.light;

	return (
		<ApplicationProvider {...eva} theme={theme}>
			<NavigationContainer>
				<StackNavigator />
			</NavigationContainer>
		</ApplicationProvider>
	);
};

export default ProductsApp;

const styles = StyleSheet.create({});
