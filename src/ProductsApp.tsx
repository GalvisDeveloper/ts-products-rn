import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import StackNavigator from './presentation/navigation/StackNavigator';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AuthProvider from './presentation/providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

const ProductsApp = () => {
	const colorScheme = useColorScheme();
	const theme = colorScheme === 'dark' ? eva.dark : eva.light;

	const bgColor = colorScheme === 'dark' ? theme['color-basic-800'] : theme['color-primary-100'];

	return (
		<QueryClientProvider client={client}>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={theme}>
				<NavigationContainer
					theme={{
						dark: colorScheme === 'dark',
						colors: {
							primary: theme['color-primary-500'],
							background: bgColor,
							card: theme['color-primary-100'],
							text: theme['text-basic-color'],
							border: theme['color-primary-800'],
							notification: theme['color-primary-500'],
						},
					}}
				>
					<AuthProvider>
						<StackNavigator />
					</AuthProvider>
				</NavigationContainer>
			</ApplicationProvider>
		</QueryClientProvider>
		
	);
};

export default ProductsApp;

const styles = StyleSheet.create({});
