import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { Button } from '@ui-kitten/components';

interface Props extends StackScreenProps<RootStackParams, 'Product'> {}

const ProductScreen = ({ navigation }: Props) => {
	return (
		<View>
			<Text>ProductScreen</Text>

			<Button onPress={() => navigation.navigate('Login')}> Ir a login </Button>
		</View>
	);
};

export default ProductScreen;

const styles = StyleSheet.create({});
