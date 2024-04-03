/**
 * @format
 * @param {string} appName - the name of the application 
 * @return {JSX.Element}
 * @function
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
