import { StackScreenProps } from '@react-navigation/stack';
import { useQuery } from '@tanstack/react-query';
import { Button, ButtonGroup, Input, Layout, Text, useTheme } from '@ui-kitten/components';
import React, { useRef } from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { getProductById } from '../../../actions/products/get-product-by-id';
import { FadeInImage } from '../../components/ui/FadeInImage';
import FullScreenLoader from '../../components/ui/FullScreenLoader';
import MainLayout from '../../layouts/MainLayout';
import { RootStackParams } from '../../navigation/StackNavigator';
import { Gender, Size } from '../../../infraestructure/interfaces/products/product.responses';
import MyIcon from '../../components/ui/MyIcon';

const sizes: Size[] = Object.values(Size);
const genders: Gender[] = Object.values(Gender);

interface Props extends StackScreenProps<RootStackParams, 'Product'> {}

const ProductScreen = ({ navigation, route }: Props) => {
	let { params } = route;

	const theme = useTheme();
	const productIdRef = useRef(params.productId);

	const { data: product } = useQuery({
		queryKey: ['product', productIdRef.current],
		queryFn: async () => {
			return await getProductById(productIdRef.current);
		},
	});

	if (!product) {
		return <MainLayout title='Loading...' children={<FullScreenLoader />} />;
	}

	return (
		<MainLayout title={product.title} subTitle={`Price: ${product.price}`}>
			{/* Flat list images  */}
			<ScrollView style={styles.main_sv}>
				<Layout>
					<FlatList
						data={product.images}
						keyExtractor={(item, idx) => `${item}-${idx}`}
						showsHorizontalScrollIndicator={false}
						renderItem={({ item }) => (
							<FadeInImage uri={item} style={{ width: 190, height: 190, marginHorizontal: 7 }} />
						)}
						horizontal
					/>
				</Layout>

				{/* Brief info of the product */}
				<Layout style={styles.ly_info}>
					<Input label='Title' value={product.title} style={{ marginVertical: 5 }} />
					<Input label='Slug' value={product.slug} style={{ marginVertical: 5 }} />
					<Input
						label='Description'
						value={product.description}
						style={{ marginVertical: 5 }}
						multiline
						numberOfLines={5}
					/>
				</Layout>

				{/* Price and stock */}
				<Layout style={styles.ly_price_stock}>
					<Input label='Price' value={product.price.toString()} style={{ flex: 1 }} />
					<Input label='Stock' value={product.stock.toString()} style={{ flex: 1 }} />
				</Layout>

				{/* Selectors */}
				{/* Sizes */}
				<ButtonGroup style={styles.bt_group} appearance='outline' size='small'>
					{sizes.map((size) => (
						<Button
							key={size}
							style={{
								...styles.bt_group_item,
								backgroundColor: true ? theme['color-primary-200'] : undefined,
							}}
						>
							{size}
						</Button>
					))}
				</ButtonGroup>

				{/* Genders */}
				<ButtonGroup style={styles.bt_group} appearance='outline' size='small'>
					{genders.map((gender) => (
						<Button
							key={gender}
							style={{
								...styles.bt_group_item,
								backgroundColor: true ? theme['color-primary-200'] : undefined,
							}}
						>
							{gender}
						</Button>
					))}
				</ButtonGroup>

				{/* Save Button */}
				<Button
					onPress={() => console.log('Save')}
					style={{ margin: 15 }}
					accessoryLeft={<MyIcon name='save-outline' white />}
				>
					Save
				</Button>

				<Text> {JSON.stringify(product, null, 2)} </Text>

				<Layout style={{ height: 200 }} />
			</ScrollView>
		</MainLayout>
	);
};

export default ProductScreen;

const styles = StyleSheet.create({
	main_sv: {
		flex: 1,
	},
	ly_info: {
		marginHorizontal: 10,
	},
	ly_price_stock: {
		marginVertical: 5,
		marginHorizontal: 15,
		flexDirection: 'row',
		gap: 10,
	},
	bt_group: {
		marginHorizontal: 15,
		margin: 2,
		marginTop: 20,
	},
	bt_group_item: {
		flex: 1,
	},
});
