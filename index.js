/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import ProductsApp from './src/ProductsApp';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => ProductsApp);
