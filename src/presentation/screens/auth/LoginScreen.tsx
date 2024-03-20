import { StyleSheet, useWindowDimensions } from 'react-native';
import React from 'react';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';

const LoginScreen = () => {
	const { height } = useWindowDimensions();

	return (
		<Layout style={styles.ct}>
			<ScrollView style={styles.sv}>
				<Layout style={{ paddingTop: height * 0.35 }}>
					<Text category='h1'>Sign In</Text>
					<Text category='p2'>Please, put your email and password</Text>
				</Layout>

				{/* Inputs */}
				<Layout style={{ paddingTop: 20 }}>
					<Input placeholder='Email' keyboardType='email-address' autoCapitalize='none' style={{ marginBottom: 10 }} />

					<Input placeholder='Password' secureTextEntry autoCapitalize='none' style={{ marginBottom: 10 }} />
				</Layout>

				{/* Space */}
				<Layout style={{ height: 20 }} />

				{/* Button */}
				<Layout>
					<Button onPress={() => {}}>Sign In</Button>
				</Layout>

				{/* Space */}
				<Layout style={{ height: 50 }} />

				{/* Go to Register */}
				<Layout style={styles.nav}>
					<Text category='p2'>Don't have an account?</Text>

					{/* <Text status='primary' category='s1' onPress={() => {}}>
						Sign Up
					</Text> */}
					<Button appearance='ghost' onPress={() => {}}>
						Sign Up
					</Button>
				</Layout>
			</ScrollView>
		</Layout>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	ct: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	sv: {
		marginHorizontal: 40,
	},
	nav: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});
