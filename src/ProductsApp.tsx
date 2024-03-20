import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import StackNavigator from './presentation/navigation/StackNavigator';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

const ProductsApp = () => {
	const colorScheme = useColorScheme();
	const theme = colorScheme === 'dark' ? eva.dark : eva.light;

	console.log(theme);

	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={theme}>
				<NavigationContainer>
					<StackNavigator />
				</NavigationContainer>
			</ApplicationProvider>
		</>
	);
};

export default ProductsApp;

const styles = StyleSheet.create({});
