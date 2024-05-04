import { Button, Card } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CameraAdapter } from '../../../config/adapters';
import { ActionCamera } from '../../../infraestructure/enums/action.camera';

interface SetFieldsValueProps {
	(field: string, value: any, shouldValidate?: boolean | undefined): void;
}

interface Props {
	images: string[];

	setFieldValueForm?: SetFieldsValueProps;
	modalAction?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChoosePictureOption = ({ images, setFieldValueForm, modalAction }: Props) => {

	const handlePicture = async (action: ActionCamera) => {
		let actionChoose: Promise<string[]> = new Promise(() => {});
		if (modalAction) await modalAction(false);
		switch (action) {
			case ActionCamera.PICK_IMAGE:
				actionChoose = Promise.resolve(await CameraAdapter.pickImage());
				break;
			case ActionCamera.TAKE_PICTURE:
				actionChoose = Promise.resolve(await CameraAdapter.takePicture());
				break;
			default:
				actionChoose = Promise.resolve([]);
				break;
		}

		if (setFieldValueForm) {
			actionChoose
				?.then((image: string[]) => {
					setFieldValueForm('images', images.concat(image));
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

	return (
		<Card disabled={true} style={{ width: '90%', justifyContent: 'center', alignSelf: 'center' }}>
			<Text>What do you want to do?</Text>

			<View style={{ height: 10 }} />

			<View style={styles.btn_group}>
				<Button onPress={() => handlePicture(ActionCamera.PICK_IMAGE)}>Select Picture</Button>
				<Button onPress={() => handlePicture(ActionCamera.TAKE_PICTURE)}>Take Picture</Button>
			</View>
		</Card>
	);
};

export default ChoosePictureOption;

const styles = StyleSheet.create({
	btn_group: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
});
