import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import HomeScreen from '../screens/home/HomeScreen';
import LoadingScreen from '../screens/loading/LoadingScreen';
import ProductScreen from '../screens/product/ProductScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

export type RootStackParams = {
	LoadingScreen: undefined;
	LoginScreen: undefined;
	RegisterScreen: undefined;
	HomeScreen: undefined;
	ProductScreen: { productId: string };
};

const Stack = createStackNavigator();

const StackNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName='Login'
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='Loading' component={LoadingScreen} />
			<Stack.Screen name='Login' component={LoginScreen} />
			<Stack.Screen name='Register' component={RegisterScreen} />
			<Stack.Screen name='Home' component={HomeScreen} />
			<Stack.Screen name='Product' component={ProductScreen} />
		</Stack.Navigator>
	);
};

export default StackNavigator;
