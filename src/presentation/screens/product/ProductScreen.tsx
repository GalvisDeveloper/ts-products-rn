import { StackScreenProps } from '@react-navigation/stack';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, ButtonGroup, Input, Layout, Modal, useTheme } from '@ui-kitten/components';
import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { getProductById, updateCreateProduct } from '../../../actions/products';
import { genders, sizes } from '../../../config/constants/global';
import { Product } from '../../../domain/entities/product';
import ChoosePictureOption from '../../components/ui/ChoosePictureOption';
import SlideImages from '../../components/products/SlideImages';
import FullScreenLoader from '../../components/ui/FullScreenLoader';
import MyIcon from '../../components/ui/MyIcon';
import MainLayout from '../../layouts/MainLayout';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'Product'> {}

const ProductScreen = ({ route }: Props) => {
	const [isOpenModalImage, setIsOpenModalImage] = useState(false);

	let { params } = route;

	const theme = useTheme();
	const productIdRef = useRef(params.productId);

	const queryClient = useQueryClient();

	const { data: product } = useQuery({
		queryKey: ['product', productIdRef.current],
		queryFn: async () => {
			return await getProductById(productIdRef.current);
		},
	});

	const mutation = useMutation({
		mutationFn: (data: Product) => updateCreateProduct({ ...data, id: productIdRef.current }),
		onSuccess: (data: Product) => {
			productIdRef.current = data.id;
			// Invalidate the cache
			queryClient.invalidateQueries({ queryKey: ['product', 'infinite'] });
			queryClient.invalidateQueries({ queryKey: ['product', productIdRef.current] });
		},
	});

	if (!product) {
		return <MainLayout title='Loading...' children={<FullScreenLoader />} />;
	}

	return (
		<Formik initialValues={product} onSubmit={mutation.mutate}>
			{({ values, handleChange, handleSubmit, errors, setFieldValue }) => (
				<MainLayout
					title={product.title}
					subTitle={`Price: ${product.price}`}
					rightActionIcon='image-outline'
					rightAction={() => setIsOpenModalImage(true)}
				>
					<ScrollView style={styles.main_sv}>
						{/* Flat list images  */}
						<Layout style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
							<SlideImages images={values.images} />
						</Layout>

						{/* Brief info of the product */}
						<Layout style={styles.ly_info}>
							<Input
								label='Title'
								value={values.title}
								style={{ marginVertical: 5 }}
								onChangeText={handleChange('title')}
							/>
							<Input
								label='Slug'
								value={values.slug}
								style={{ marginVertical: 5 }}
								onChangeText={handleChange('slug')}
							/>
							<Input
								label='Description'
								value={values.description}
								style={{ marginVertical: 5 }}
								multiline
								numberOfLines={5}
								onChangeText={handleChange('description')}
							/>
						</Layout>

						{/* Price and stock */}
						<Layout style={styles.ly_price_stock}>
							<Input
								label='Price'
								value={values.price.toString()}
								style={{ flex: 1 }}
								onChangeText={(text) => {
									handleChange('price')(text.replace(/[^0-9]/g, ''));
								}}
								keyboardType='numeric'
							/>
							<Input
								label='Stock'
								value={values.stock.toString()}
								style={{ flex: 1 }}
								onChangeText={(text) => {
									handleChange('stock')(text.replace(/[^0-9]/g, ''));
								}}
								keyboardType='numeric'
							/>
						</Layout>

						{/* Selectors */}
						{/* Sizes */}
						<ButtonGroup style={styles.bt_group} appearance='outline' size='small'>
							{sizes.map((size) => (
								<Button
									key={size}
									style={{
										...styles.bt_group_item,
										backgroundColor: values.sizes.includes(size)
											? theme['color-primary-200']
											: undefined,
									}}
									onPress={() =>
										setFieldValue(
											'sizes',
											values.sizes.includes(size)
												? values.sizes.filter((s) => s !== size)
												: values.sizes.concat(size),
										)
									}
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
										backgroundColor: values.gender.startsWith(gender)
											? theme['color-primary-200']
											: undefined,
									}}
									onPress={() => setFieldValue('gender', gender)}
								>
									{gender}
								</Button>
							))}
						</ButtonGroup>

						{/* Save Button */}
						<Button
							onPress={() => handleSubmit()}
							style={{ margin: 15 }}
							accessoryLeft={<MyIcon name='save-outline' white />}
							disabled={mutation.isPending}
						>
							Save
						</Button>

						<Layout style={{ height: 200 }} />
					</ScrollView>

					<Modal
						visible={isOpenModalImage}
						backdropStyle={styles.modal_backdrop}
						onBackdropPress={() => setIsOpenModalImage(false)}
					>
						<ChoosePictureOption
							images={values.images}
							setFieldValueForm={setFieldValue}
							modalAction={setIsOpenModalImage}
						/>
					</Modal>
				</MainLayout>
			)}
		</Formik>
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
	modal_backdrop: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
});
