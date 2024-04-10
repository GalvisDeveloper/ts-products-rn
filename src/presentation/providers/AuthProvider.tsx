import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { PropsWithChildren, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { RootStackParams } from '../navigation/StackNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';

const AuthProvider = ({ children }: PropsWithChildren) => {
	const navigator = useNavigation<StackNavigationProp<RootStackParams>>();

	const { checkStatus, status } = useAuthStore();

	useEffect(() => {
		checkStatus();
	}, []);

	useEffect(() => {
		if (status !== 'checking') {
			if (status === 'authenticated') {
				navigator.reset({ index: 0, routes: [{ name: 'Home' }] });
			} else {
				navigator.reset({ index: 0, routes: [{ name: 'Login' }] });
			}
		}
	}, [status]);

	return <>{children}</>;
};

const styles = StyleSheet.create({});

export default AuthProvider;
