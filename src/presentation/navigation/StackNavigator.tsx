import { StackCardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import HomeScreen from '../screens/home/HomeScreen';
import LoadingScreen from '../screens/loading/LoadingScreen';
import ProductScreen from '../screens/product/ProductScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

export type RootStackParams = {
	Loading: undefined;
	Login: undefined;
	Register: undefined;
	Home: undefined;
	Product: { productId: string };
};

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({ current }) => ({
	cardStyle: {
		opacity: current.progress,
	},
});

const StackNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName='Loading'
			screenOptions={({ route }) => {
				return {
					headerShown: false,
					cardStyleInterpolator: route.name === 'Product' ? undefined : fadeAnimation,
				};
			}}
		>
			<Stack.Screen name='Loading' component={LoadingScreen} />
			<Stack.Screen name='Login' component={LoginScreen} />
			<Stack.Screen name='Home' component={HomeScreen} />
			<Stack.Screen name='Register' component={RegisterScreen} />
			<Stack.Screen name='Product' component={ProductScreen} />
		</Stack.Navigator>
	);
};

export default StackNavigator;
