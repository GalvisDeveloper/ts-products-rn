import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Icon, useTheme } from '@ui-kitten/components';

interface Props {
	name: string;
	white?: boolean;
	color?: string;
}

const MyIcon = ({ name, white, color }: Props) => {
	const theme = useTheme();

	if (white) {
		color = theme['color-basic-100'];
	} else if (!color) {
		color = theme['text-basic-color'];
	} else {
		color = theme[color] ?? theme['text-basic-color'];
	}

	return <Icon style={styles.icon} fill={color} name={name} />;
};

export default MyIcon;

const styles = StyleSheet.create({
	icon: {
		width: 32,
		height: 32,
	},
});
