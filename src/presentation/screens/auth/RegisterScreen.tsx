import { StackScreenProps } from '@react-navigation/stack';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MyIcon from '../../components/ui/MyIcon';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useAuthStore } from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'Register'> {}

const RegisterScreen = ({ navigation }: Props) => {
	const { height } = useWindowDimensions();

	const { signUp } = useAuthStore();

	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
	});

	const onSignUp = async () => {
		if (form.email === '' || form.password === '' || form.name === '') return;

		const success = await signUp(form.email, form.password, form.name);
		if (success) {
			navigation.navigate('Home');
			return;
		}
	};

	return (
		<Layout style={styles.ct}>
			<ScrollView style={styles.sv} showsVerticalScrollIndicator={false}>
				<Layout style={{ paddingTop: height * 0.25 }}>
					<Text category='h1'>Sign Up</Text>
					<Text category='p2'>Please, give us your info</Text>
				</Layout>

				{/* Inputs */}
				<Layout style={{ paddingTop: 20 }}>
					<Input
						accessoryLeft={<MyIcon name='person-outline' />}
						placeholder='Name'
						keyboardType='default'
						autoCapitalize='words'
						style={{ marginBottom: 10 }}
						onChangeText={(name) => setForm({ ...form, name })}
					/>

					<Input
						accessoryLeft={<MyIcon name='email-outline' />}
						placeholder='Email'
						keyboardType='email-address'
						autoCapitalize='none'
						style={{ marginBottom: 10 }}
						onChangeText={(email) => setForm({ ...form, email })}
					/>

					<Input
						accessoryLeft={<MyIcon name='lock-outline' />}
						placeholder='Password'
						secureTextEntry
						autoCapitalize='none'
						style={{ marginBottom: 10 }}
						onChangeText={(password) => setForm({ ...form, password })}
					/>
				</Layout>

				{/* Space */}
				<Layout style={{ height: 20 }} />

				{/* Button */}
				<Layout>
					<Button accessoryRight={<MyIcon name='arrow-forward-outline' white />} onPress={onSignUp}>
						Sign Up
					</Button>
				</Layout>

				{/* Space */}
				<Layout style={{ height: 50 }} />

				{/* Go to Register */}
				<Layout style={styles.nav}>
					<Text category='p2'>Do you have an account?</Text>

					{/* <Text status='primary' category='s1' onPress={() => {}}>
						Sign Up
					</Text> */}
					<Button
						appearance='ghost'
						onPress={() => {
							navigation.navigate('Login');
						}}
					>
						Sign In
					</Button>
				</Layout>
			</ScrollView>
		</Layout>
	);
};

export default RegisterScreen;

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
