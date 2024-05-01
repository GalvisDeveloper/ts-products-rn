import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FadeInImage } from '../ui/FadeInImage';

interface Props {
	images: string[];
}

const SlideImages = ({ images }: Props) => {
	return (
		<>
			{images.length === 0 ? (
				<Image source={require('../../../assets/no-product-image.png')} style={styles.image_list} />
			) : (
				<FlatList
					data={images}
					keyExtractor={(item, idx) => `${item}-${idx}`}
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => <FadeInImage uri={item} style={styles.image_list} />}
					horizontal
				/>
			)}
		</>
	);
};

export default SlideImages;

const styles = StyleSheet.create({
	image_list: {
		width: 190,
		height: 190,
		marginHorizontal: 7,
	},
});
