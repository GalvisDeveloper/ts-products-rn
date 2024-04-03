import { StackScreenProps } from '@react-navigation/stack';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Alert, StyleSheet, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MyIcon from '../../components/ui/MyIcon';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useAuthStore } from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'Login'> {}

const LoginScreen = ({ navigation }: Props) => {
	const { height } = useWindowDimensions();

	const { login } = useAuthStore();

	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const onLogin = async () => {
		if (form.email === '' || form.password === '') return;

		const success = await login(form.email, form.password);
		if (success) {
			navigation.navigate('Home');
			return;
		}

		Alert.alert('Error', 'Invalid credentials', [{ text: 'Ok' }], { cancelable: true });
	};

	return (
		<Layout style={styles.ct}>
			<ScrollView style={styles.sv} showsVerticalScrollIndicator={false}>
				<Layout style={{ paddingTop: height * 0.25 }}>
					<Text category='h1'>Sign In</Text>
					<Text category='p2'>Please, put your email and password</Text>
				</Layout>

				{/* Inputs */}
				<Layout style={{ paddingTop: 20 }}>
					<Input
						accessoryLeft={<MyIcon name='email-outline' />}
						placeholder='Email'
						keyboardType='email-address'
						autoCapitalize='none'
						style={{ marginBottom: 10 }}
						value={form.email}
						onChangeText={(email) => setForm({ ...form, email })}
					/>

					<Input
						accessoryLeft={<MyIcon name='lock-outline' />}
						placeholder='Password'
						secureTextEntry
						autoCapitalize='none'
						style={{ marginBottom: 10 }}
						value={form.password}
						onChangeText={(password) => setForm({ ...form, password })}
					/>
				</Layout>

				{/* Space */}
				<Layout style={{ height: 20 }} />

				{/* Button */}
				<Layout>
					<Button
						accessoryRight={<MyIcon name='arrow-forward-outline' white />}
						onPress={() => onLogin()}
					>
						Sign In
					</Button>
				</Layout>

				{/* Space */}
				<Layout style={{ height: 50 }} />

				{/* Go to Register */}
				<Layout style={styles.nav}>
					<Text category='p2'>Don't have an account?</Text>

					{/* <Text status='primary' category='s1' onPress={() => {}}>
						Sign Up
					</Text> */}
					<Button
						appearance='ghost'
						onPress={() => {
							navigation.navigate('Register');
						}}
					>
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
