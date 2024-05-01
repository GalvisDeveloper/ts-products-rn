import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { Button } from '@ui-kitten/components';
import MyIcon from './MyIcon';

interface Props {
	style?: StyleProp<ViewStyle>;
	iconName?: string;

	onPress: () => void;
}

const FAB = ({ style, iconName = 'plus', onPress }: Props) => {
	return <Button style={[style, { ...styles.fabBtn }]} accessoryLeft={<MyIcon name={iconName} white />} onPress={onPress} />;
};

export default FAB;

const styles = StyleSheet.create({
	fabBtn: {
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.4,
		shadowRadius: 10,
		elevation: 3,
		borderRadius: 13,
	},
});
