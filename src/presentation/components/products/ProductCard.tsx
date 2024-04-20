import { Card, Text } from '@ui-kitten/components';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Product } from '../../../domain/entities/product';
import { FadeInImage } from '../ui/FadeInImage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props {
	product: Product;
}

const ProductCard = ({ product }: Props) => {
	const navigation = useNavigation<NavigationProp<RootStackParams>>();

	return (
		<Card style={styles.ct} onPress={() => navigation.navigate('Product', { productId: product.id })}>
			{product.images.length === 0 ? (
				<Image source={require('../../../assets/no-product-image.png')} />
			) : (
				<FadeInImage uri={product.images[0]} style={{ flex: 1, width: '100%', height: 200 }} />
			)}

			<Text style={styles.title} numberOfLines={2}>
				{product.title}
			</Text>
		</Card>
	);
};

const styles = StyleSheet.create({
	ct: {
		flex: 1,
		margin: 5,
		borderRadius: 10,
		backgroundColor: 'white',
	},
	title: {
		textAlign: 'center',
		color: 'black',
	},
});

export default ProductCard;
